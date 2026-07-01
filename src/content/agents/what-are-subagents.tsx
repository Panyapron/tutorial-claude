'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Search, ClipboardCheck, Compass, ThumbsUp, ThumbsDown } from 'lucide-react';

const agentTypes = [
  {
    id: 'general',
    icon: Bot,
    name: 'general-purpose',
    color: 'violet',
    desc: 'เอจเนทอเนกประสงค์ทั่วไป เข้าถึงเครื่องมือทั้งหมด',
    use: 'งานที่ซับซ้อนหลายขั้นตอน หรือต้องค้นหาและเขียนโค้ดร่วมกัน',
  },
  {
    id: 'explore',
    icon: Search,
    name: 'Explore',
    color: 'blue',
    desc: 'ค้นหาโค้ดแบป read-only เร็ว',
    use: 'หาไฟล์ตาม pattern, grep หา symbol, ไม่แก้ไขอะไร',
  },
  {
    id: 'reviewer',
    icon: ClipboardCheck,
    name: 'code-reviewer',
    color: 'emerald',
    desc: 'อ่าน diff และหา bug/จุดส่อ',
    use: 'review PR ก่อน merge หรือหลังเขียนโค้ดเสร็จ',
  },
  {
    id: 'plan',
    icon: Compass,
    name: 'Plan',
    color: 'amber',
    desc: 'ออกแบบ implementation ก่อนลงมือ',
    use: 'งานสถาปัตยกรรมที่ซับซ้อน ต้องชั่งน้ำหนักก่อนเขียนโค้ด',
  },
];

const goodFor = [
  'งานค้นหาที่ต้องอ่านหลายไฟล์แล้วสรุปสั้นๆ กลับมา',
  'งานที่แยกอิสระได้ ทำขนานกันเพื่อประหยัดเวลา',
  'งานที่จะสร้าง context เยอะ ไม่อยากให้บวมสนทนาหลัก',
];

const badFor = [
  'คำถามง่ายๆ ที่ตอบได้เร็วด้วย Read/Grep โดยตรง',
  'งานที่ต้องใช้ context ของบทสนทนาทั้งหมดร่วมกัน',
  'งานที่ต้องการให้ผู้ใช้ยืนยันทุกขั้นตอน (ไม่เหมาะกับงานเสี่ยงที่ต้องควบคุมทุกขั้น)',
];

const colorMap: Record<string, string> = {
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  amber: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
};

export default function WhatAreSubagents() {
  const [active, setActive] = useState('general');
  const agent = agentTypes.find(a => a.id === active)!;
  const Icon = agent.icon;

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        Subagent คือ
        <strong className="text-white"> Claude อีกตัวหนึ่งที่ถูก spawn ขึ้นมาเฉพาะงาน</strong>
        มี context window แยกของตัวเอง ทำงานเสร็จแล้วส่งสรุปกลับมาให้ agent หลัก
      </p>

      {/* Flow diagram */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-6 text-center">Subagent ทำงานอย่างไร?</h3>
        <div className="space-y-3">
          {[
            { icon: '🧠', label: 'Main Agent มอบหมายงาน', desc: 'เรียก Task tool พร้อม prompt ของงานย่อย', color: 'from-violet-500 to-purple-600' },
            { icon: '🚀', label: 'Spawn Subagent', desc: 'เกิด Claude อีก instance ที่มี context window เป็นของตัวเอง', color: 'from-blue-500 to-cyan-600' },
            { icon: '⚙️', label: 'Subagent ทำงาน', desc: 'ค้นหา, อ่านไฟล์, เขียนโค้ด — โดยไม่กระทบ context หลัก', color: 'from-emerald-500 to-teal-600' },
            { icon: '📩', label: 'ส่งสรุปกลับ', desc: 'Subagent ส่งเฉพาะผลลัพธ์สรุปกลับมา ไม่ใช่ raw log ทั้งหมด', color: 'from-amber-500 to-orange-600' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl flex-shrink-0 shadow-md`}>
                {item.icon}
              </div>
              <div className="flex-1 p-3 rounded-xl bg-slate-800 border border-slate-700">
                <div className="font-medium text-white text-sm">{item.label}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
              </div>
              {i < 3 && <div className="text-slate-600">↓</div>}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Agent types */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">ตัวอย่าง Agent ที่เลือกใช้ได้</h3>
        <div className="flex gap-2 flex-wrap mb-4">
          {agentTypes.map(a => {
            const AIcon = a.icon;
            const isActive = active === a.id;
            return (
              <button
                key={a.id}
                onClick={() => setActive(a.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  isActive ? colorMap[a.color].split(' ').slice(0, 2).join(' ') + ' text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
              >
                <AIcon size={14} />
                {a.name}
              </button>
            );
          })}
        </div>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl border p-4 ${colorMap[agent.color].split(' ').slice(0, 2).join(' ')}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon size={18} className={colorMap[agent.color].split(' ')[2]} />
            <code className="text-sm font-mono font-bold text-white">{agent.name}</code>
          </div>
          <p className="text-slate-300 text-sm mb-1">{agent.desc}</p>
          <p className="text-slate-500 text-xs">ใช้เมื่อ: {agent.use}</p>
        </motion.div>
      </div>

      {/* When to use / not use */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="min-w-0 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <div className="flex items-center gap-2 mb-3">
            <ThumbsUp size={16} className="text-emerald-400" />
            <h4 className="font-semibold text-white text-sm">ควรใช้ Subagent เมื่อ</h4>
          </div>
          <ul className="space-y-1.5">
            {goodFor.map((g, i) => (
              <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">✓</span>{g}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
          <div className="flex items-center gap-2 mb-3">
            <ThumbsDown size={16} className="text-rose-400" />
            <h4 className="font-semibold text-white text-sm">ไม่ควรใช้ Subagent เมื่อ</h4>
          </div>
          <ul className="space-y-1.5">
            {badFor.map((b, i) => (
              <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                <span className="text-rose-400 mt-0.5">✗</span>{b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
        <p className="text-sm text-slate-300 leading-relaxed">
          💡 <strong className="text-cyan-400">Key Insight:</strong> ข้อดีสำคัญของ subagent คือการแยก context window — งานค้นหาที่อาจสร้างผลลัพธ์หลายพันบรรทัด
          จะไม่ทำให้ context หลักของ Claude เต็มไปด้วยข้อมูลดิบ เหลือแค่บทสรุปที่จำเป็น
        </p>
      </div>
    </div>
  );
}
