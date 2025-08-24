import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = "src/assets_raw"; // 원본 넣는 곳
const OUTPUT_DIR = "public/images"; // 변환 결과 나오는 곳
const SIZES = [480, 768, 1200, 1920];
const QUAL_JPG = 78,
  QUAL_WEBP = 75,
  QUAL_AVIF = 60;

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

if (!fs.existsSync(INPUT_DIR)) {
  console.error(`❌ 원본 폴더 없음: ${INPUT_DIR}`);
  process.exit(1);
}

const files = fs.readdirSync(INPUT_DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));
if (files.length === 0) {
  console.warn(`⚠ 원본 이미지가 없습니다. ${INPUT_DIR}에 JPG/PNG 넣고 다시 실행하세요.`);
  process.exit(0);
}

for (const file of files) {
  const base = path.join(INPUT_DIR, file);
  const name = file.replace(/\.(png|jpe?g)$/i, "");
  const outBase = path.join(OUTPUT_DIR, name);

  for (const w of SIZES) {
    await sharp(base)
      .resize({ width: w })
      .jpeg({ quality: QUAL_JPG, mozjpeg: true })
      .toFile(`${outBase}-${w}w.jpg`);
    await sharp(base)
      .resize({ width: w })
      .webp({ quality: QUAL_WEBP })
      .toFile(`${outBase}-${w}w.webp`);
    await sharp(base)
      .resize({ width: w })
      .avif({ quality: QUAL_AVIF })
      .toFile(`${outBase}-${w}w.avif`);
    console.log(`✔ ${file} → ${w}w (jpg/webp/avif)`);
  }
}
console.log("✅ Done");
