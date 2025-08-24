// src/shared/utils/parseCareer.js
export function parseCareer(raw) {
  if (!raw) return { education: [], experience: [], books: [] };

  // 1) 기본 정규화
  let text = String(raw).replace(/\r\n/g, "\n").trim();

  // 2) XML 태그 형식 처리 (<경력>, <학력>, <저서>)
  text = text
    .replace(/<경력>/gi, "\n■ 경력\n")
    .replace(/<\/경력>/gi, "")
    .replace(/<학력>/gi, "\n■ 학력\n")
    .replace(/<\/학력>/gi, "")
    .replace(/<저서>/gi, "\n■ 저서\n")
    .replace(/<\/저서>/gi, "");

  // 3) 인라인/붙어있는 헤더를 줄바꿈으로 강제 분리
  //    예: "...항목 ■ 학력 -..."  ->  "...항목 \n■ 학력 \n-..."
  //        "■학력"                ->  "■ 학력"
  text = text
    .replace(/■\s*(학력|주요\s*경력?|경력|저서)/g, "■ $1")
    .replace(/(?<!^)\s*■\s*(학력|주요\s*경력?|경력|저서)/g, "\n■ $1");

  // 4) 헤더 바로 뒤에 항목이 붙은 경우도 분리
  //    예: "■ 학력 -고려대..." -> "■ 학력\n-고려대..."
  text = text.replace(/(■\s*(?:학력|주요\s*경력?|경력|저서))\s*(-|•)/g, "$1\n$2");

  const lines = text.split("\n");

  // 5) 느슨한 헤더 매칭 (XML 태그와 기존 형식 모두 지원)
  const headerRegex = /^\s*(?:\[?\s*)?(?:■\s*)?(학력|주요\s*경력?|경력|저서)\s*(?:\]?)\s*$/i;

  let current = null;
  const out = { education: [], experience: [], books: [] };

  const asHeaderKey = (h) => {
    const s = h.replace(/\s/g, "");
    if (s.includes("학력")) return "education";
    if (s.includes("경력")) return "experience";
    if (s.includes("저서")) return "books";
    return null;
  };

  for (const rawLine of lines) {
    let line = rawLine.trim();
    if (!line) continue;

    // (A) 헤더 라인
    const hm = line.match(headerRegex);
    if (hm) {
      current = asHeaderKey(hm[1]) || null;
      continue;
    }

    // (B) 리스트 항목 "- 내용" 또는 "• 내용"
    let itemMatch = line.match(/^[-•]\s*(.+)$/);
    if (itemMatch && current) {
      let item = itemMatch[1].trim();

      // 항목 앞에 실수로 섞인 "학력/경력/저서" 토큰 제거
      item = item.replace(/^(학력|주요\s*경력?|경력|저서)\s*[-:·]?\s*/i, "").trim();

      if (item) out[current].push(item);
      continue;
    }

    // (C) 백업 규칙: 접두사 없이 이어지는 본문(헤더가 유지될 때만)
    if (current && !/^(\[|■|-|•|▶)/.test(line)) {
      // 마찬가지로 섞인 토큰 제거
      line = line.replace(/^(학력|주요\s*경력?|경력|저서)\s*[-:·]?\s*/i, "").trim();
      if (line) out[current].push(line);
    }
  }

  console.log("parseCareer Debug:", {
    originalRaw: raw,
    processedText: text,
    result: out
  });

  return out;
}
