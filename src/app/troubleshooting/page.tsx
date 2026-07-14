'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronDown } from 'lucide-react';

const issues = [
  {
    title: 'npm install ขึ้น "ERESOLVE unable to resolve dependency tree"',
    cause: 'next.js ระบุ peer dependency ของ react เป็นเวอร์ชันเก่าเฉพาะเจาะจง แต่เครื่องติดตั้ง react รุ่นใหม่กว่าที่ระบุไว้',
    fix: 'อัปเกรด next ใน package.json เป็นเวอร์ชันที่รองรับ react รุ่นที่ติดตั้งจริง แล้วลบ node_modules + package-lock.json ก่อนติดตั้งใหม่ หลีกเลี่ยงการใช้ --legacy-peer-deps เป็นทางแก้เริ่มต้น',
    code: 'rm -rf node_modules package-lock.json\nnpm i',
  },
  {
    title: 'Turbopack ขึ้น "Module not found" กับ dynamic import ที่มี ${...} สองตัว',
    cause: 'Turbopack ยังไม่รองรับ import() ที่เป็น template literal แบปเต็ม เช่น import(`@/content/${a}/${b}`) เมื่อมีตัวแปรหลายตัว',
    fix: 'เปลี่ยนเป็นสร้าง lookup map ที่มี import() เป็น string ตายตัวชัดเจนทีละ path แทน',
    code: 'const loaders = {\n  "a/b": () => import("@/content/a/b"),\n  "a/c": () => import("@/content/a/c"),\n};\nloaders[`${moduleId}/${lessonId}`]?.();',
  },
  {
    title: 'แก้ class แล้วสีไม่เปลี่ยน ทั้งที่ build ผ่าน',
    cause: 'Tailwind สแกนหา class name ตาม path ใน content array ของ tailwind.config เท่านั้น ถ้าโฟลเดอร์ใหม่ไม่อยู่ใน path นั้น class จะหายเงียบ',
    fix: 'เพิ่มโฟลเดอร์นั้นเข้าไปใน content array แล้ว restart dev server (จำเป็นต้อง restart จริงๆ เพราะ hot-reload ไม่เพียงพอให้ scan ใหม่)',
    code: '// tailwind.config.ts\ncontent: [\n  "./src/app/**/*.{ts,tsx}",\n  "./src/components/**/*.{ts,tsx}",\n  "./src/content/**/*.{ts,tsx}", // อย่าลืมบรรทัดนี้\n]',
  },
  {
    title: 'แก้โค้ดแล้วเว็บไม่เปลี่ยน หรือยังขึ้น error เดิม',
    cause: 'เครื่องอาจยัง pull commit ล่าสุดไม่ครบ หรือ dev server / browser เก็บ cache เก่าไว้',
    fix: 'git pull ให้แน่ใจว่าได้ commit ล่าสุด restart dev server ใหม่ทั้งหมด และ hard refresh browser',
    code: 'git pull origin claude/claude-learning-platform-chsxg5\ngit log --oneline -1\nnpm run dev',
  },
  {
    title: 'โค้ดมีข้อความภาษาไทยแล้ว build พังแบบเงียบ',
    cause: 'มีการขึ้นบรรทัดใหม่หรือเครื่องหมายที่ไม่ได้ escape อยู่ตรงๆ ใน string literal ของ JS/TS',
    fix: 'ตรวจสอบว่าไม่มีการขึ้นบรรทัดใหม่ดิบๆ ใน string ที่ครอบด้วย " ใช้ \\n แทนถ้าต้องการขึ้นบรรทัดจริงๆ',
    code: '// ผิด: "ข้อความ\n"\n// ถูก: "ข้อความ\\n" หรือใช้ template literal `...`',
  },
  {
    title: 'เพิ่มบทเรียนใหม่แล้วขึ้น "กำลังสร้างเนื้อหา" ตลอด',
    cause: 'path ใน lessonLoaders (src/lib/lesson-loaders.ts) ไม่ตรงกับ moduleId/lessonId ที่ระบุใน modules.ts (เช็ค case-sensitive ด้วย)',
    fix: 'เปิดทั้งสองไฟล์เทียบ key ให้ตรงกันเป๊ะๆ และตรวจสอบว่าไฟล์เนื้อหาอยู่จริงที่ src/content/{module}/{lesson}.tsx',
    code: '// modules.ts:      { id: "setup", ... }\n// lesson-loaders.ts: "claude-code/setup": () => import("@/content/claude-code/setup")',
  },
];

export default function TroubleshootingPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="pt-24 pb-24 px-4 bg-apple-bg min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <p className="apple-eyebrow text-apple-gray mb-3">Troubleshooting</p>
          <h1 className="apple-headline text-3xl sm:text-5xl text-apple-ink mb-3">แก้ปัญหาที่พบบ่อย</h1>
          <p className="text-apple-gray">ปัญหาที่มือใหม่มักเจอตอนใช้งาน Claude Code และวิธีแก้</p>
        </div>

        <div className="space-y-3">
          {issues.map((issue, i) => (
            <div key={i} className="apple-card-light overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 p-5 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <AlertTriangle size={18} className="text-amber-500 flex-shrink-0" />
                  <span className="font-medium text-apple-ink">{issue.title}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-apple-gray transition-transform flex-shrink-0 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-sm text-apple-gray mb-2">
                      <strong className="text-apple-ink">สาเหตุ:</strong> {issue.cause}
                    </p>
                    <p className="text-sm text-apple-gray mb-3">
                      <strong className="text-apple-ink">วิธีแก้:</strong> {issue.fix}
                    </p>
                    <pre className="bg-[#111113] text-slate-200 rounded-xl p-3 text-xs font-mono overflow-x-auto whitespace-pre">{issue.code}</pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
