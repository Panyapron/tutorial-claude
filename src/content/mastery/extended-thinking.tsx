'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, ThumbsUp, ThumbsDown } from 'lucide-react';

const comparison = [
  {
    id: 'normal',
    icon: Zap,
    name: 'การตอบปกติ',
    color: 'blue',
    desc: 'Claude ตอบทันทีโดยไม่แสดงขั้นตอนการคิดให้เห็น เร็วและประหยัดกว่า',
    goodFor: 'คำถามทั่วไป งานเขียนโค้ดง่ายๆ การสนทนาทั่วไป',
  },
  {
    id: 'extended',
    icon: Brain,
    name: 'Extended Thinking',
    color: 'violet',
    desc: 'Claude แสดงขั้นตอนการคิดอย่างละเอียดก่อนสรุปคำตอบ ใช้เวลามากขึ้นแต่แม่นยำกว่า',
    goodFor: 'คณิตศาสตร์ซับซ้อน ตรรกะหลายขั้น เดิมพันที่ซับซ้อน',
  },
];

const goodCases = [
  'แก้ปัญหา bug ที่ซ่อนอยู่ลึก ต้องไล่เรียงหลายไฟล์',
  'วางแผน architecture ที่มีข้อจำกัดหลายอย่าง',
  'โจทย์คณิตศาสตร์/ตรรกะที่มีหลายขั้นตอน',
  'เปรียบเทียบทางเลือกหลายทางที่มี trade-off',
];

const badCases = [
  'ถามข้อมูลง่ายๆ เช่น "syntax ของ for loop ใน Python เขียนยังไง"',
  'งานที่ต้องการคำตอบเร็ว เช่น chat สนทนาทั่วไป',
  'งานที่ทำซ้ำๆ ไม่จำเป็นต้องใช้เหตุผลซับซ้อน',
];

const colorMap: Record<string, string> = {
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
};

export default function ExtendedThinkingLesson() {
  const [active, setActive] = useState('extended');
  const mode = comparison.find(c => c.id === active)!;
  const Icon = mode.icon;

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        Extended Thinking คือโหมดที่ Claude
        <strong className="text-white"> ใช้เวลาคิดหลายขั้นตอนก่อนตอบ</strong> เหมาะกับงานที่ซับซ้อน ต้องใช้ตรรกะหลายขั้น
      </p>

      <div className="flex gap-2">
        {comparison.map(c => {
          const CIcon = c.icon;
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                isActive ? colorMap[c.color].split(' ').slice(0, 2).join(' ') + ' text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              <CIcon size={14} />
              {c.name}
            </button>
          );
        })}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl border p-5 ${colorMap[mode.color].split(' ').slice(0, 2).join(' ')}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Icon size={20} className={colorMap[mode.color].split(' ')[2]} />
          <h3 className="font-semibold text-white">{mode.name}</h3>
        </div>
        <p className="text-slate-300 text-sm mb-2">{mode.desc}</p>
        <p className="text-slate-500 text-xs">เหมาะกับ: {mode.goodFor}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="min-w-0 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <div className="flex items-center gap-2 mb-3">
            <ThumbsUp size={16} className="text-emerald-400" />
            <h4 className="font-semibold text-white text-sm">ควรเปิด Extended Thinking เมื่อ</h4>
          </div>
          <ul className="space-y-1.5">
            {goodCases.map((g, i) => (
              <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">✓</span>{g}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
          <div className="flex items-center gap-2 mb-3">
            <ThumbsDown size={16} className="text-rose-400" />
            <h4 className="font-semibold text-white text-sm">ไม่จำเป็นต้องใช้เมื่อ</h4>
          </div>
          <ul className="space-y-1.5">
            {badCases.map((b, i) => (
              <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                <span className="text-rose-400 mt-0.5">✗</span>{b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-lime-500/5 border border-lime-500/20">
        <p className="text-sm text-slate-300 leading-relaxed">
          💡 <strong className="text-lime-400">Key Insight:</strong> Extended Thinking ใช้เวลาและ token มากกว่าการตอบปกติ
          เลือกใช้เฉพาะเมื่องานจริงๆ ต้องการความแม่นยำสูง จะคุ้มกว่าการเปิดทิ้งไว้ตลอดเวลา
        </p>
      </div>
    </div>
  );
}
