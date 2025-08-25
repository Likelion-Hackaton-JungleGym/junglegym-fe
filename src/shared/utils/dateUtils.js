/**
 * 오늘 날짜 기준 "YY년 M월 N주차" 문자열 반환
 * @param {Date} date
 * @returns {string}
 */
export function getCurrentKoreanWeekLabel(date = new Date()) {
  const year = date.getFullYear() % 100; // 예: 2025 -> 25
  const month = date.getMonth() + 1; // 0-based → 실제 월
  const day = date.getDate();

  // 이번 달의 첫 날 (월요일 기준으로 맞추기 위해 보정)
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let firstDayOfWeek = firstDay.getDay(); // 0=일, 1=월...
  if (firstDayOfWeek === 0) firstDayOfWeek = 7; // 일요일 → 7로 바꿔서 월=1 ~ 일=7

  // 오늘까지 지난 날짜
  const dayOfMonth = day + (firstDayOfWeek - 1);

  // 주차 (월요일 기준)
  const weekNum = Math.ceil(dayOfMonth / 7);

  return `${year}년 ${month}월 ${weekNum}주차`;
}
