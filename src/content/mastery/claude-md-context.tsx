'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Eraser, Layers, Check, X } from 'lucide-react';

const includeItems = [
  'เทคโนโลยีหลัก (tech stack) และโครงสร้างโฟลเดอร์',
  'คำสั่งที่ใช้บ่อย (npm run test, npm run build)',
  'ข้อตกลงด้าน code style ที่ทีมยึด',
  'จุดที่มักพลาด / gotcha ที่เจอบ่อย',
];

const avoidItems = [
  'Secrets, API keys, รหัสผ่าน',
  'เอกสารยาวที่ซ้ำกับ README (ลิงก์ไปแทน)',
  'ข้อมูลที่เปลี่ยนบ่อย (เช่น version ของ dependency)',
];

const commands = [
  { cmd: '/clear', desc: 'ล้าง context ทั้งหมดใน session เริ่มใหม่ เหมาะเมื่อสลับไปทำงานคนละเรื่องที่ไม่เกี่ยวข้องกัน', icon: Eraser, color: 'blue' },
  { cmd: '/compact', desc: 'สรุป context เดิมให้สั้นลง แต่ยังเก็บสาระสำคัญไว้ เหมาะกับงานที่ต้องการความต่อเนื่อง', icon: Layers, color: 'violet' },
];

const colorMap: Record<string, string> = {
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
};

const exampleClaudeMd = `# Project: E-commerce Dashboard

## Tech Stack
- Next.js 15 (App Router), TypeScript, Tailwind CSS
- PostgreSQL + Prisma

## Commands
- \`npm run dev\` - รัน dev server
- \`npm run test\` - รัน unit tests ต้องผ่านก่อน commit เสมอ

## Conventions
- ใช้ named exports เสมอ 5ม่ใช้ default export
- Component ทุกตัวต้องมี TypeScript types ชัดเจน

## Gotchas
- API routes ใน /app/api ต้อง export runtime = "nodejs" เสมอ
  (Prisma ไม่รองรับ edge runtime)`;

export default function ClaudeMdContext() {
  const [tab, setTab] = useState<'good' | 'bad'>('good');

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300">CLAUDE.md</code> คือไฟล์ที่
        <strong className="text-white"> Claude Code อ่านทุกครั้งที่เริ่ม session</strong> เป็นบริบท context เกี่ยวกับโปรเจกต์ที่ไม่ต้องพิมพ์ซ้ำทุกครั้ง
      </p>

      {/* Good vs bad content */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">ควรใส่อะไรใน CLAUDE.md?</h3>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTab('good')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
              tab === 'good' ? 'border-emerald-500/40 bg-emerald-500/10 text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
            }`}
          >
            <Check size={14} className="text-emerald-400" /> ควรใส่
          </button>
          <button
            onClick={() => setTab('bad')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
              tab === 'bad' ? 'border-rose-500/40 bg-rose-500/10 text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
            }`}
          >
            <X size={14} className="text-rose-400" /> อย่าใส่
          </button>
        </div>
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl border p-4 ${tab === 'good' ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`}
        >
          <ul className="space-y-2">
            {(tab === 'good' ? includeItems : avoidItems).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className={tab === 'good' ? 'text-emerald-400 mt-0.5' : 'text-rose-400 mt-0.5'}>
                  {tab === 'good' ? '✓' : '✗'}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Example file */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">ตัวอย่าง CLAUDE.md</h3>
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
            <FileText size={14} className="text-slate-400" />
            <span className="text-xs text-slate-400 font-mono">CLAUDE.md</span>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed whitespace-pre">{exampleClaudeMd}</pre>
        </div>
      </div>

      {/* Context management commands */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">จัดการ Context ระหว่างการทำงาน</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {commands.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.cmd} className={`min-w-0 p-4 rounded-xl border ${colorMap[c.color].split(' ').slice(0, 2).join(' ')}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className={colorMap[c.color].split(' ')[2]} />
                  <code className="text-sm font-mono font-bold text-white">{c.cmd}</code>
                </div>
                <p className="text-slate-300 text-sm">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-lime-500/5 border border-lime-500/20">
        <p className="text-sm text-slate-300 leading-relaxed">
          💡 <strong className="text-lime-400">ทำไม session ยาวๆ ถึงช้าลง:</strong> ยิ่งคุยนาน context window ยิ่งเต็ม Claude ต้องอ่านทุกข้อความที่ผ่านมาซ้ำทุกครั้ง
          ถ้าขึ้นงานใหม่ที่ไม่เกี่ยวข้องกับเดิม ใช้ <code className="bg-slate-700 px-1 rounded">/clear</code> เสมอ 5จะช่วยทั้งความเร็วและค่าใช้จ่าย
        </p>
      </div>
    </div>
  );
}
