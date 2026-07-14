'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitMerge, Sparkles, MessagesSquare } from 'lucide-react';

const workflows = [
  {
    id: 'connections',
    icon: GitMerge,
    title: 'หาความเชื่อมโยง',
    color: 'violet',
    prompt: 'Read my last 10 notes and suggest which existing notes they should link to',
    result: 'Claude อ่านโนตทั้งหมดใน vault แล้วเสนอคู่โนตที่มีแนวคิดคล้ายกัน แม้จะไม่ได้ใช้คำเดียวกันเลย',
  },
  {
    id: 'backlinks',
    icon: Sparkles,
    title: 'สร้าง Backlink อัตโนมัติ',
    color: 'blue',
    prompt: 'Add a backlink section to today\'s note pointing to related notes about "prompt engineering"',
    result: 'Claude ค้นหาโนตที่เกี่ยวข้องแล้วเพิ่มลิงก์ [[wikilink]] ให้อัตโนมัติ ไม่ต้องไล่หาเอง',
  },
  {
    id: 'summarize',
    icon: MessagesSquare,
    title: 'สรุป Cluster ความคิด',
    color: 'emerald',
    prompt: 'Summarize all notes tagged #ai-agents into one overview note',
    result: 'รวมโนตที่กระจัดกระจายเข้าด้วยกัน เป็นภาพรวมที่อ่านง่ายขึ้น โดยยังเก็บ link ไปยังแหล่งเดิม',
  },
];

const colorMap: Record<string, string> = {
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
};

export default function AiAssistedWorkflows() {
  const [active, setActive] = useState('connections');
  const wf = workflows.find(w => w.id === active)!;
  const Icon = wf.icon;

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        เมื่อเชื่อม Claude กับ vault ของคุณแล้ว นี่คือ
        <strong className="text-white"> Workflow ที่ใช้งานจริง</strong> ที่ช่วยให้เครือข่ายความรู้ของคุณแข็งแรงขึ้นเรื่อยๆ
      </p>

      <div className="flex gap-2 flex-wrap">
        {workflows.map(w => {
          const WIcon = w.icon;
          const isActive = active === w.id;
          return (
            <button
              key={w.id}
              onClick={() => setActive(w.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                isActive ? colorMap[w.color].split(' ').slice(0, 2).join(' ') + ' text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              <WIcon size={14} />
              {w.title}
            </button>
          );
        })}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl border p-5 ${colorMap[wf.color].split(' ').slice(0, 2).join(' ')}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <Icon size={18} className={colorMap[wf.color].split(' ')[2]} />
          <h3 className="font-semibold text-white">{wf.title}</h3>
        </div>
        <div className="bg-slate-900 rounded-lg px-3 py-2 font-mono text-sm mb-3">
          <span className="text-slate-500">Prompt: </span>
          <span className="text-fuchsia-300">{wf.prompt}</span>
        </div>
        <p className="text-slate-300 text-sm">{wf.result}</p>
      </motion.div>

      <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
        <h3 className="font-semibold text-emerald-400 mb-2">🎉 จบคอร์สแล้ว!</h3>
        <p className="text-sm text-slate-300">
          ตอนนี้คุณเข้าใจทั้งแนวคิด networked note-taking และวิธีใช้ Claude ช่วยเชื่อมโยงความคิดแล้ว
          ลองตั้ง MCP เชื่อม vault ของคุณเองแล้วลองใช้ prompt เหล่านี้ดูครับ
        </p>
      </div>
    </div>
  );
}
