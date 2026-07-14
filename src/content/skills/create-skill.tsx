'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderPlus, FileText, Play, CheckCircle2, Terminal } from 'lucide-react';

const steps = [
  {
    icon: FolderPlus,
    title: 'สร้างโฟลเดอร์',
    color: 'blue',
    content: (
      <div className="space-y-3">
        <p className="text-slate-300">สร้างโฟลเดอร์ <code className="bg-slate-700 px-1 rounded">commands/</code> ใน <code className="bg-slate-700 px-1 rounded">.claude/</code></p>
        <div className="bg-slate-900 rounded-xl border border-slate-700 p-4 font-mono text-sm">
          <p className="text-slate-400">โครงสร้างที่ถูกต้อง:</p>
          <p className="text-slate-300 mt-2">└── .claude/</p>
          <p className="text-slate-300 ml-4">├── settings.json</p>
          <p className="text-violet-300 ml-4">└── commands/           <span className="text-slate-500"># สร้างโฟลเดอร์นี้</span></p>
          <p className="text-violet-300 ml-8">└── review.md       <span className="text-slate-500"># skill file</span></p>
        </div>
        <div className="bg-slate-900 rounded-lg border border-slate-700 p-3 font-mono text-sm">
          <p className="text-slate-400 text-xs mb-1">terminal</p>
          <p className="text-green-300">mkdir -p .claude/commands</p>
        </div>
      </div>
    ),
  },
  {
    icon: FileText,
    title: 'เขียน skill.md',
    color: 'violet',
    content: (
      <div className="space-y-3">
        <p className="text-slate-300">สร้างไฟล์ <code className="bg-slate-700 px-1 rounded">.claude/commands/review.md</code></p>
        <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
          <div className="px-4 py-2 bg-slate-800 border-b border-slate-700">
            <span className="text-xs text-slate-400 font-mono">review.md</span>
          </div>
          <pre className="p-4 text-sm text-slate-300 font-mono whitespace-pre">{`Review the following code and provide feedback:

$ARGUMENTS

Please analyze:
1. Code quality and readability
2. Potential bugs or edge cases
3. Performance concerns
4. Suggestions for improvement

Be specific and constructive.`}</pre>
        </div>
        <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
          <p className="text-violet-300 text-sm"><code className="bg-slate-700 px-1 rounded">$ARGUMENTS</code> คือตัวแปรสำหรับรับ argument ที่ user พิมพ์ตามหลัง /review</p>
        </div>
      </div>
    ),
  },
  {
    icon: Play,
    title: 'ใช้ skill',
    color: 'emerald',
    content: (
      <div className="space-y-3">
        <p className="text-slate-300">รัน Claude Code แล้วพิมพ์:</p>
        <div className="bg-slate-900 rounded-xl border border-slate-700 p-4 font-mono text-sm">
          <div className="flex items-start gap-2 mb-3">
            <span className="text-violet-400">&gt;</span>
            <div>
              <p className="text-white">/review</p>
              <p className="text-slate-400 text-xs mt-1">(Claude จะขอให้อ่านเนื้อหาแล้ว review)</p>
            </div>
          </div>
          <div className="flex items-start gap-2 mb-3">
            <span className="text-violet-400">&gt;</span>
            <div>
              <p className="text-white">/review src/utils/validator.ts</p>
              <p className="text-slate-400 text-xs mt-1">(review ไฟล์ที่ระบุ)</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-violet-400">&gt;</span>
            <div>
              <p className="text-white">/review the authentication flow</p>
              <p className="text-slate-400 text-xs mt-1">(review ตามคำอธิบาย)</p>
            </div>
          </div>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
          <p className="text-emerald-300 text-sm">Claude จะโหลดไฟล์ review.md และแทนที่ $ARGUMENTS ด้วยสิ่งที่คุณพิมพ์</p>
        </div>
      </div>
    ),
  },
  {
    icon: CheckCircle2,
    title: 'ทดสอบและปรับปรุง',
    color: 'amber',
    content: (
      <div className="space-y-3">
        <p className="text-slate-300">เคล็ดลับในการเขียน skill.md ที่ดี:</p>
        <div className="space-y-2">
          {[
            { tip: 'ระบุผลลัพธ์ให้ชัดเจน เช่น "Respond in Thai" หรือ "Format as markdown"', color: 'amber' },
            { tip: 'เพิ่ม context ได้ เช่น project conventions หรือ tech stack', color: 'amber' },
            { tip: 'Skill ชื่อ sub-folder จะใช้ / เช่น deploy/staging.md → /deploy:staging', color: 'amber' },
            { tip: 'เครื่องหมายวรรคค้อนหน้าใน .md จะอ่านไฟล์ Markdown ก่อน inject', color: 'amber' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
              <CheckCircle2 size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-sm">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const colorMap: Record<string, string> = {
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  amber: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
};

export default function CreateSkillLesson() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const Icon = step.icon;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">สร้าง Skill ครั้งแรก</h2>
        <p className="text-slate-400">Skills คือไฟล์ .md ที่บอกสิ่งที่ Claude ควรทำ เรียกใช้ผ่าน /command</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {steps.map((s, i) => {
          const SIcon = s.icon;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                active === i
                  ? colorMap[s.color].split(' ').slice(0, 2).join(' ') + ' text-white'
                  : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              {i < active ? <CheckCircle2 size={14} className="text-green-400" /> : <SIcon size={14} />}
              {s.title}
            </button>
          );
        })}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl border p-5 ${colorMap[step.color].split(' ').slice(0,2).join(' ')}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <Icon size={20} className={colorMap[step.color].split(' ')[2]} />
          <h3 className="text-lg font-semibold text-white">ขั้นตอนที่ {active + 1}: {step.title}</h3>
        </div>
        {step.content}
      </motion.div>

      <div className="flex justify-between">
        <button
          onClick={() => setActive(Math.max(0, active - 1))}
          disabled={active === 0}
          className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 transition-colors text-sm"
        >
          ← ก่อนหน้า
        </button>
        <button
          onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
          disabled={active === steps.length - 1}
          className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-30 transition-colors text-sm"
        >
          ถัดไป →
        </button>
      </div>
    </div>
  );
}
