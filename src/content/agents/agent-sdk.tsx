'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, ShieldCheck, Users, Code2 } from 'lucide-react';

const concepts = [
  {
    id: 'tools',
    icon: Wrench,
    name: 'Custom Tools',
    color: 'blue',
    desc: 'กำหนด function ที่ agent ของคุณเรียกใช้ได้ นอกเหนือจาก built-in tools',
  },
  {
    id: 'permissions',
    icon: ShieldCheck,
    name: 'Permission Modes',
    color: 'emerald',
    desc: 'ควบคุมว่า agent ทำอะไรได้บ้างโดยไม่ต้องถาม user',
  },
  {
    id: 'subagents',
    icon: Users,
    name: 'Subagent Definitions',
    color: 'violet',
    desc: 'กำหนด agent ย่อยในโค้ด เพื่อใช้ใน product ของคุณเอง',
  },
];

const sdkCode = `import { query } from '@anthropic-ai/claude-agent-sdk';

for await (const message of query({
  prompt: 'Summarize open issues and suggest priorities',
  options: {
    systemPrompt: 'You are a helpful project management assistant.',
    allowedTools: ['Read', 'Grep', 'mcp__github__list_issues'],
    permissionMode: 'acceptEdits',
  },
})) {
  if (message.type === 'result') {
    console.log(message.result);
  }
}`;

const useCases = [
  { icon: '💬', title: 'สร้าง chatbot ที่เข้าถึงเครื่องมือภายใน', desc: 'เชื่อม tools ของบริษัทเข้ากับ agent โดยตรง' },
  { icon: '🤖', title: 'สร้าง developer tool เหมือน Claude Code', desc: 'คือเทคโนโลยีที่ใช้สร้าง Claude Code เอง' },
  { icon: '🔄', title: 'สร้าง automation pipeline', desc: 'รัน agent แบบไม่มีคนควบคุมใน CI/CD หรือ background job' },
];

const colorMap: Record<string, string> = {
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
};

export default function AgentSdkLesson() {
  const [active, setActive] = useState('tools');
  const concept = concepts.find(c => c.id === active)!;
  const Icon = concept.icon;

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        Claude Agent SDK คือ
        <strong className="text-white"> สิ่งที่ทำให้ Claude Code ทำงานได้</strong>
        นำมาให้คุณสร้าง AI agent ของตัวเองด้วยโค้ด แทนที่จะใช้ผ่าน CLI เท่านั้น
      </p>

      <div>
        <h3 className="text-xl font-semibold text-white mb-4">แนวคิดหลัก</h3>
        <div className="flex gap-2 flex-wrap mb-4">
          {concepts.map(c => {
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
          className={`rounded-xl border p-4 ${colorMap[concept.color].split(' ').slice(0, 2).join(' ')}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon size={18} className={colorMap[concept.color].split(' ')[2]} />
            <span className="font-semibold text-white text-sm">{concept.name}</span>
          </div>
          <p className="text-slate-300 text-sm">{concept.desc}</p>
        </motion.div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-4">ตัวอย่าง: สร้าง Agent เอง 30 วินาที</h3>
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
            <Code2 size={14} className="text-slate-400" />
            <span className="text-xs text-slate-400 font-mono">agent.ts</span>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">{sdkCode}</pre>
        </div>
        <p className="mt-3 text-sm text-slate-400">
          โค้ดนี้สร้าง agent ที่อ่าน GitHub issues และสรุป priority ให้ โดยจำกัด tools ที่ใช้ได้เฉพาะ Read, Grep และ GitHub issues
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-4">ใช้ทำอะไรได้บ้าง</h3>
        <div className="space-y-3">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800"
            >
              <span className="text-xl mt-0.5">{uc.icon}</span>
              <div>
                <div className="font-semibold text-white text-sm">{uc.title}</div>
                <div className="text-sm text-slate-400 mt-0.5">{uc.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
        <p className="text-sm text-slate-300 leading-relaxed">
          💡 <strong className="text-cyan-400">Key Insight:</strong> Claude Code เองก็ถูกสร้างด้วยแนวคิดเดียวกับ Agent SDK —
          ถ้าคุณอยากสร้าง AI product ของตัวเองที่มี agent เฉพาะทาง นี่คือจุดเริ่มต้นที่เหมาะสม
        </p>
      </div>
    </div>
  );
}
