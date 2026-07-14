'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Megaphone, Headphones, Code } from 'lucide-react';

const departments = [
  {
    id: 'legal',
    icon: Scale,
    name: 'Legal',
    color: 'violet',
    tasks: ['สรุปสัญญาที่ซับซ้อนให้อ่านง่าย', 'เปรียบเทียบ redline สองเวอร์ชัน', 'ค้นหาข้อกำหนดที่เกี่ยวข้อง'],
  },
  {
    id: 'marketing',
    icon: Megaphone,
    name: 'Marketing',
    color: 'amber',
    tasks: ['ร่าง draft โพสต์หรือแคมเปญ', 'เช็คความสอดคล้องกับ brand voice', 'สรุป feedback จากลูกค้า'],
  },
  {
    id: 'support',
    icon: Headphones,
    name: 'Support',
    color: 'emerald',
    tasks: ['จัดลำดับความสำคัญของ ticket', 'แนะนำคำตอบมาตรฐาน', 'สรุป sentiment ของลูกค้า'],
  },
  {
    id: 'engineering',
    icon: Code,
    name: 'Engineering',
    color: 'blue',
    tasks: ['Review PR ผ่าน Claude Code workflow', 'วิเคราะห์ CI log', 'ตอบเบสคำถามทางเทคนิค'],
  },
];

const practices = [
  { icon: '🔔', title: 'Subscribe การแจ้งเตือน', desc: 'ติดตาม PR/comment/CI โดยไม่ต้องเปิดหน้าจอค้าง' },
  { icon: '⏰', title: 'ตั้ง check-in อัตโนมัติ', desc: 'ให้ Claude กลับมาเช็คงานเป็นระยะๆ แทนการ refresh เองตลอด' },
  { icon: '🤝', title: 'แชร์ session กับทีม', desc: 'ให้หลายคนเข้าถึงบริบทเดียวกันเพื่อความต่อเนื่องของงาน' },
  { icon: '🔒', title: 'จำกัด repo scope', desc: 'เปิดเฉพาะ repo/ระบบที่จำเป็นต่องานจริง เพื่อความปลอดภัย' },
];

const colorMap: Record<string, string> = {
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  amber: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
};

export default function TeamWorkflows() {
  const [active, setActive] = useState('legal');
  const dept = departments.find(d => d.id === active)!;
  const Icon = dept.icon;

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        แต่ละแผนกใช้ Cowork ต่างกัน ดูตัวอย่างงานจริงและวิธีทำงานเป็นทีมอย่างปลอดภัย
      </p>

      <div>
        <h3 className="text-xl font-semibold text-white mb-4">เลือกแผนกดู use case</h3>
        <div className="flex gap-2 flex-wrap mb-4">
          {departments.map(d => {
            const DIcon = d.icon;
            const isActive = active === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setActive(d.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  isActive ? colorMap[d.color].split(' ').slice(0, 2).join(' ') + ' text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
              >
                <DIcon size={14} />
                {d.name}
              </button>
            );
          })}
        </div>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl border p-4 ${colorMap[dept.color].split(' ').slice(0, 2).join(' ')}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Icon size={18} className={colorMap[dept.color].split(' ')[2]} />
            <span className="font-semibold text-white text-sm">{dept.name} ใช้ Cowork ทำอะไรบ้าง</span>
          </div>
          <ul className="space-y-1.5">
            {dept.tasks.map((t, i) => (
              <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                <span className="text-slate-500 mt-0.5">•</span>{t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Best Practices สำหรับทีม</h3>
        <div className="space-y-3">
          {practices.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800"
            >
              <span className="text-xl mt-0.5">{p.icon}</span>
              <div>
                <div className="font-semibold text-white text-sm">{p.title}</div>
                <div className="text-sm text-slate-400 mt-0.5">{p.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
        <h3 className="font-semibold text-emerald-400 mb-2">🎉 จบคอร์สแล้ว!</h3>
        <p className="text-sm text-slate-300">
          ตอนนี้คุณเข้าใจภาพรวมของ Claude ตั้งแต่ Prompt, Claude Code, MCP, Skills, Harness, Agent Orchestration ไปจนถึง Cowork แล้ว —
          ลองนำความรู้ไปประยุกต์ใช้จริงในงานของคุณได้เลย
        </p>
      </div>
    </div>
  );
}
