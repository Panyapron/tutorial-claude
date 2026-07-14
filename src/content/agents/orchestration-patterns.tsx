'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Split, GitBranch, Clock } from 'lucide-react';

const patterns = [
  {
    id: 'sequential',
    icon: ArrowRightLeft,
    title: 'Sequential Handoff',
    color: 'blue',
    tagline: 'ส่งงานต่อกันเป็นทอด',
    when: 'เมื่องานขั้นตอนหลังต้องการผลลัพธ์ของขั้นก่อนหน้า',
    steps: ['Agent A: ค้นหาข้อมูล', 'Agent B: วิเคราะห์ผลลัพธ์', 'Agent C: เขียนรายงานสรุป'],
    example: 'Explore หาไฟล์ที่เกี่ยวข้อง → code-reviewer วิเคราะห์ปัญหา → Main Agent แก้โค้ดตามข้อเสนอ',
  },
  {
    id: 'parallel',
    icon: Split,
    title: 'Parallel Fan-out',
    color: 'violet',
    tagline: 'กระจายงานหลาย agent พร้อมกัน',
    when: 'งานหลายชิ้นเป็นอิสระจากกัน ไม่ต้องรอกัน',
    steps: ['Main Agent แตกงานเป็น N ชิ้น', 'Spawn N subagents พร้อมกัน', 'รวบรวมผลลัพธ์ทั้งหมดเข้าด้วยกัน'],
    example: 'ค้นหา API endpoints ที่เสี่ยงใน 5 ไฟล์พร้อมกัน แทนที่จะทำทีละไฟล์ตามลำดับ',
  },
  {
    id: 'worktree',
    icon: GitBranch,
    title: 'Isolated Worktree',
    color: 'emerald',
    tagline: 'แยก agent ออกเป็น git worktree ของตัวเอง',
    when: 'งานเสี่ยงหรือทดลองหลายแนวทางโดยไม่กระทบเค้าหลัก',
    steps: ['สร้าง git worktree แยก', 'Agent ทำงานใน worktree นั้นโดยอิสระ', 'รีวิวผลลัพธ์แล้ว merge เข้าหลัก'],
    example: 'ทดลอง refactor ด้วย approach ที่ต่างกัน 2 แบบพร้อมกัน แล้วเทียบเคียงผล',
  },
  {
    id: 'background',
    icon: Clock,
    title: 'Background Execution',
    color: 'amber',
    tagline: 'รัน agent เบื้องหลังขณะทำงานอื่นต่อ',
    when: 'งานใช้เวลานาน แต่ไม่จำเป็นต้องรอผลทันที',
    steps: ['สั่ง agent ทำงานแบบ background', 'ทำงานอื่นต่อไประหว่างรอ', 'รับแจ้งเตือนเมื่อ agent เสร็จ'],
    example: 'รัน test suite เต็มรูปแบบเบื้องหลัง ขณะที่คุยกับ Main Agent เรื่องอื่นต่อ',
  },
];

const colorMap: Record<string, string> = {
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  amber: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
};

export default function OrchestrationPatterns() {
  const [active, setActive] = useState('sequential');
  const pattern = patterns.find(p => p.id === active)!;
  const Icon = pattern.icon;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">รูปแบบการทำงานร่วมกันของ Agent</h2>
        <p className="text-slate-400">4 รูปแบบหลักที่ใช้มอบหมายงานให้ subagent ในสถานการณ์ต่างๆ</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {patterns.map(p => {
          const PIcon = p.icon;
          const isActive = active === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                isActive ? colorMap[p.color].split(' ').slice(0, 2).join(' ') + ' text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              <PIcon size={14} />
              {p.title}
            </button>
          );
        })}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl border p-5 ${colorMap[pattern.color].split(' ').slice(0, 2).join(' ')}`}
      >
        <div className="flex items-center gap-3 mb-2">
          <Icon size={20} className={colorMap[pattern.color].split(' ')[2]} />
          <div>
            <h3 className="text-lg font-semibold text-white">{pattern.title}</h3>
            <p className="text-slate-400 text-sm">{pattern.tagline}</p>
          </div>
        </div>
        <p className="text-slate-300 text-sm mb-4">ใช้เมื่อ: {pattern.when}</p>

        <div className="flex items-start gap-2 overflow-x-auto pb-2">
          {pattern.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-2 flex-shrink-0">
              <div className="min-w-[150px] max-w-[180px]">
                <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                  <p className="text-xs text-slate-500 mb-1">ขั้นตอน {i + 1}</p>
                  <p className="text-white text-sm">{step}</p>
                </div>
              </div>
              {i < pattern.steps.length - 1 && (
                <span className="text-slate-600 mt-4 flex-shrink-0">→</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-slate-900/60 border border-slate-700">
          <p className="text-xs text-slate-500 mb-1">ตัวอย่างการใช้งาน:</p>
          <p className="text-emerald-300 text-sm">{pattern.example}</p>
        </div>
      </motion.div>

      <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
        <h3 className="text-white font-semibold mb-2">เคล็ดลับ: เลือกรูปแบบให้เหมาะกับงาน</h3>
        <p className="text-slate-400 text-sm">อย่ารีบ spawn subagent ถ้างานง่ายกว่า — การ orchestrate มี overhead ของการสร้าง context ใหม่ทุกครั้ง เลือกใช้เมื่องานซับซ้อนจริงๆ เท่านั้น</p>
      </div>
    </div>
  );
}
