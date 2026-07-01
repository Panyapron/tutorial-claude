'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Terminal, Users2 } from 'lucide-react';

const surfaces = [
  {
    id: 'chat',
    icon: MessageSquare,
    name: 'Claude.ai',
    color: 'blue',
    who: 'ทุกคน',
    desc: 'หน้าเว็บสำหรับสนทนากับ Claude โดยตรง เหมาะกับคำถามทั่วไป เขียนงาน สรุปเอกสาร',
  },
  {
    id: 'code',
    icon: Terminal,
    name: 'Claude Code',
    color: 'emerald',
    who: 'Developer',
    desc: 'CLI ที่รันในเครื่องเอง เข้าถึง codebase โดยตรง เหมาะกับงานเขียนโค้ด',
  },
  {
    id: 'cowork',
    icon: Users2,
    name: 'Claude Cowork',
    color: 'sky',
    who: 'ทุกตำแหน่งงาน',
    desc: 'พื้นที่ทำงานบนเว็บที่เชื่อม Claude เข้ากับงานจริง ไม่ต้องติดตั้งอะไร เหมาะกับทุกบทบาทงาน ไม่ใช่แค่ developer',
    highlight: true,
  },
];

const colorMap: Record<string, string> = {
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  sky: 'border-sky-500/40 bg-sky-500/10 text-sky-400',
};

export default function WhatIsCowork() {
  const [active, setActive] = useState('cowork');
  const surface = surfaces.find(s => s.id === active)!;
  const Icon = surface.icon;

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        Claude Cowork คือ
        <strong className="text-white"> พื้นที่ทำงานบนเว็บ</strong> ที่เปิดให้ทุกคนในองค์กร
        — ไม่ใช่แค่ developer — ใช้ Claude ทำงานจริงได้โดยไม่ต้องติดตั้งอะไรที่เครื่อง
      </p>

      {/* Comparison */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">เทียบกับช่องทางอื่นของ Claude</h3>
        <div className="flex gap-2 flex-wrap mb-4">
          {surfaces.map(s => {
            const SIcon = s.icon;
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  isActive ? colorMap[s.color].split(' ').slice(0, 2).join(' ') + ' text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
              >
                <SIcon size={14} />
                {s.name}
              </button>
            );
          })}
        </div>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl border p-4 ${colorMap[surface.color].split(' ').slice(0, 2).join(' ')}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon size={18} className={colorMap[surface.color].split(' ')[2]} />
            <span className="font-semibold text-white">{surface.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">สำหรับ: {surface.who}</span>
          </div>
          <p className="text-slate-300 text-sm">{surface.desc}</p>
        </motion.div>
      </div>

      {/* Key traits */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">จุดเด่นของ Cowork</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: '🌐', title: 'รันบนเว็บ ไม่ต้องติดตั้ง', desc: 'เปิดใช้งานได้ทันทีจาก browser ไม่ต้องลง CLI หรือตั้ง environment' },
            { icon: '🧑‍💼', title: 'ออกแบบตามบทบาท', desc: 'เลือกบทบาทงานตอน onboarding เพื่อรับ plugin ที่เหมาะสม' },
            { icon: '🔗', title: 'เชื่อมกับงานจริง', desc: 'เชื่อม repo, เอกสาร หรือระบบของทีมผ่าน MCP/plugins' },
            { icon: '💬', title: 'โต้ตอบเหตุการณ์', desc: 'รับแจ้งเตือนเมื่อมี comment/CI ใหม่โดยไม่ต้องเปิดค้างหน้าจอ' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-medium text-white">{item.title}</div>
                <div className="text-sm text-slate-400">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-sky-500/5 border border-sky-500/20">
        <p className="text-sm text-slate-300 leading-relaxed">
          💡 <strong className="text-sky-400">Key Insight:</strong> Cowork ไม่ได้แทนที่ Claude Code — แต่เปิดกว้างการใช้งานออกไปนอกเหนือทีมวิศวกร ให้คนที่ไม่เคยเขียนโค้ด
          ก็สามารถใช้พลัง Claude กับงานของตัวเองได้เต็มที่
        </p>
      </div>
    </div>
  );
}
