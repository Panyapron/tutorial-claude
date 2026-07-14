'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderTree, Network, Atom, Link2 } from 'lucide-react';

const comparison = [
  {
    id: 'folder',
    icon: FolderTree,
    name: 'เก็บโนตแบบโฟลเดอร์ (แบบเดิม)',
    color: 'slate',
    desc: 'จัดเก็บโนตเป็นลำดับชั้น โฟลเดอร์ > หมวดหมู่ > โนต',
    limit: 'โนตหนึ่งอยู่ได้ที่เดียว เห็นความเชื่อมโยงข้ามหมวดหมู่ยาก',
  },
  {
    id: 'network',
    icon: Network,
    name: 'Networked Note-taking',
    color: 'fuchsia',
    desc: 'โนตเชื่อมต่อกันได้อิสระ ไม่จำกัดด้วยโครงสร้างลำดับชั้น',
    limit: 'เห็นความเชื่อมโยงที่คาดไม่ถึงระหว่างหัวข้อที่อยู่คนละที่',
  },
];

const principles = [
  {
    icon: Atom,
    title: 'Atomic Notes',
    color: 'violet',
    desc: 'แต่ละโนตเก็ปแค่ 1 ความคิด ไม่ยัดเยือดเยอะ ทำให้นำกลับมาใช้ซ้ำ/เชื่อมกับโนตอื่นได้ง่าย',
  },
  {
    icon: Link2,
    title: 'Backlinks',
    color: 'blue',
    desc: 'เมื่อโนต A ลิงก์ไปหา B ระบบจะเก็บเส้นทางย้อนกลับให้อัตโนมัติ เห็นได้ว่า B ถูกอ้างถึงจากไหนบ้าง',
  },
  {
    icon: Network,
    title: 'Knowledge Graph',
    color: 'emerald',
    desc: 'เมื่อโนตเยอะขึ้น เส้นเชื่อมจะกลายเป็น "เครือข่ายความรู้" ที่โตขึ้นเรื่อยๆ ตามเวลา',
  },
];

const whyMatters = [
  { icon: '💡', title: 'เจอความเชื่อมโยงที่คาดไม่ถึง', desc: 'ความคิดจากคนละหัวข้ออาจเชื่อมกันเป็นไอเดียใหม่' },
  { icon: '📈', title: 'ความรู้สะสมตามเวลา', desc: 'ยิ่งจดมากเท่าไหร่ เครือข่ายยิ่งแน่นและมีคุณค่ามากขึ้น' },
  { icon: '🔍', title: 'ค้นหาตามบริบท ไม่ใช่ตามโฟลเดอร์', desc: 'หาความรู้เจอได้จากความเชื่อมโยง ไม่ต้องจำว่าเก็บไว้ที่ไหน' },
  { icon: '🧩', title: 'ต่อยอดความรู้เดิมได้ง่าย', desc: 'โนตใหม่เชื่อมกับโนตเก่าได้ทันที ไม่ต้องเริ่มนับหนึ่งใหม่' },
];

const colorMap: Record<string, string> = {
  slate: 'border-slate-600/40 bg-slate-700/20 text-slate-400',
  fuchsia: 'border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-400',
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
};

export default function WhatIsNetworkedNotes() {
  const [active, setActive] = useState('network');
  const item = comparison.find(c => c.id === active)!;
  const Icon = item.icon;

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        Networked Note-taking คือ
        <strong className="text-white"> วิธีจดโนตที่เชื่อมโยงกันเป็นเครือข่าย (network)</strong> แทนที่จะเก็บเรียงเป็นลำดับชั้นแบบโฟลเดอร์เหมือนเดิม
        แนวคิดนี้เป็นที่รู้จักกันดีในชื่อระเบียบเช่น Zettelkasten และถูกใช้ในแอพมอย่าง Obsidian, Roam, Logseq
      </p>

      {/* Folder vs Network comparison */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">ต่างจากการจดโนตแบบเดิมอย่างไร</h3>
        <div className="flex gap-2 mb-4">
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
          className={`rounded-xl border p-4 ${colorMap[item.color].split(' ').slice(0, 2).join(' ')}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon size={18} className={colorMap[item.color].split(' ')[2]} />
            <span className="font-semibold text-white text-sm">{item.name}</span>
          </div>
          <p className="text-slate-300 text-sm mb-1">{item.desc}</p>
          <p className="text-slate-500 text-xs">ข้อจำกัด: {item.limit}</p>
        </motion.div>
      </div>

      {/* Core principles */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">3 หลักการสำคัญ</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {principles.map((p, i) => {
            const PIcon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-xl border ${colorMap[p.color].split(' ').slice(0, 2).join(' ')}`}
              >
                <PIcon size={20} className={colorMap[p.color].split(' ')[2]} />
                <h4 className="font-semibold text-white text-sm mt-2 mb-1">{p.title}</h4>
                <p className="text-slate-400 text-xs">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Why it matters */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">ทำไมถึงสำคัญ?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {whyMatters.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800"
            >
              <span className="text-2xl">{w.icon}</span>
              <div>
                <div className="font-medium text-white">{w.title}</div>
                <div className="text-sm text-slate-400">{w.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-fuchsia-500/5 border border-fuchsia-500/20">
        <p className="text-sm text-slate-300 leading-relaxed">
          💡 <strong className="text-fuchsia-400">Key Insight:</strong> คุณค่าของ networked note-taking ไม่ได้อยู่ที่โนตแต่ละใบ แต่อยู่ที่
          <strong className="text-white"> เส้นที่เชื่อมระหว่างโนต</strong> — นี่คือจุดที่ Claude เข้ามาช่วยได้ดีมาก เพราะ Claude
          อ่านและเข้าใจความหมายของโนตได้ แล้วช่วยหาความเชื่อมโยงที่คุณอาจมองข้ามไป — เรียนต่อในบทถัดไป
        </p>
      </div>
    </div>
  );
}
