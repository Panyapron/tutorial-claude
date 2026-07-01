'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Key, FolderOpen, CheckCircle2, Copy, Check } from 'lucide-react';

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative bg-slate-900 rounded-xl border border-slate-700 overflow-hidden my-3">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-xs text-slate-400 font-mono">{lang}</span>
        <button onClick={copy} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-sm text-slate-100 font-mono overflow-x-auto whitespace-pre">{code}</pre>
    </div>
  );
}

const steps = [
  {
    icon: Terminal,
    title: 'ติดตั้ง Claude Code',
    color: 'violet',
    content: (
      <div>
        <p className="text-slate-300 mb-3">ติดตั้งผ่าน npm (ต้องมี Node.js 18+ และ npm)</p>
        <CodeBlock code="npm install -g @anthropic-ai/claude-code" />
        <p className="text-slate-400 text-sm">หลังติดตั้ง ตรวจสอบด้วย:</p>
        <CodeBlock code="claude --version" />
        <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3 mt-3">
          <p className="text-violet-300 text-sm">💡 บน macOS/Linux อาจต้องใช้ <code className="bg-slate-700 px-1 rounded">sudo npm install -g</code> หากมีปัญหาสิทธิ์</p>
        </div>
      </div>
    ),
  },
  {
    icon: Key,
    title: 'ตั้งค่า API Key',
    color: 'blue',
    content: (
      <div>
        <p className="text-slate-300 mb-3">มีสองวิธีในการตั้งค่า API Key:</p>
        <p className="text-slate-400 text-sm font-semibold mb-1">วิธีที่ 1: Login ผ่าน Browser (แนะนำ)</p>
        <CodeBlock code="claude login" />
        <p className="text-slate-400 text-sm font-semibold mb-1 mt-3">วิธีที่ 2: ตั้งค่า Environment Variable</p>
        <CodeBlock code="export ANTHROPIC_API_KEY=sk-ant-api03-..." lang="bash" />
        <CodeBlock code="# เพิ่มใน ~/.bashrc หรือ ~/.zshrc เพื่อให้คงอยู่ถาวร\nexport ANTHROPIC_API_KEY=your_key_here" lang="bash" />
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mt-3">
          <p className="text-blue-300 text-sm">🔑 รับ API Key ได้ที่ <span className="underline">console.anthropic.com</span></p>
        </div>
      </div>
    ),
  },
  {
    icon: FolderOpen,
    title: 'รัน Claude Code ครั้งแรก',
    color: 'emerald',
    content: (
      <div>
        <p className="text-slate-300 mb-3">เข้าไปในโฟลเดอร์โปรเจกต์แล้วรัน:</p>
        <CodeBlock code="cd my-project\nclaude" />
        <p className="text-slate-400 text-sm mt-3 mb-1">Claude Code จะสร้างไฟล์ config ครั้งแรก และเริ่ม interactive session:</p>
        <div className="bg-slate-900 rounded-lg border border-slate-700 p-3 font-mono text-sm">
          <p className="text-green-400">✓ Welcome to Claude Code!</p>
          <p className="text-slate-400">Working directory: /my-project</p>
          <p className="text-slate-400">Model: claude-sonnet-5</p>
          <p className="text-violet-300 mt-2">&gt; How can I help you today?</p>
        </div>
        <p className="text-slate-400 text-sm mt-3">ลองพิมพ์: <code className="bg-slate-700 px-1 rounded">Explain this codebase</code></p>
      </div>
    ),
  },
  {
    icon: FolderOpen,
    title: 'โครงสร้างไดเรกทอรี .claude/',
    color: 'amber',
    content: (
      <div>
        <p className="text-slate-300 mb-3">Claude Code สร้างโฟลเดอร์ <code className="bg-slate-700 px-1 rounded">.claude/</code> ในโปรเจกต์:</p>
        <div className="bg-slate-900 rounded-xl border border-slate-700 p-4 font-mono text-sm">
          <p className="text-slate-400">.claude/</p>
          <p className="text-slate-300 ml-4">├── settings.json <span className="text-slate-500">  # permissions & config</span></p>
          <p className="text-slate-300 ml-4">├── commands/       <span className="text-slate-500">  # custom slash commands</span></p>
          <p className="text-slate-300 ml-8">└── review.md</p>
          <p className="text-slate-300 ml-4">└── CLAUDE.md       <span className="text-slate-500">  # project context</span></p>
        </div>
        <div className="grid grid-cols-1 gap-2 mt-3">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2">
            <p className="text-amber-300 text-xs font-semibold">settings.json</p>
            <p className="text-slate-400 text-xs">กำหนด permissions, environment, hooks สำหรับโปรเจกต์</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2">
            <p className="text-amber-300 text-xs font-semibold">CLAUDE.md</p>
            <p className="text-slate-400 text-xs">Context ที่ Claude จะอ่านทุกครั้ง เช่น coding standards, architecture</p>
          </div>
        </div>
      </div>
    ),
  },
];

const colorMap: Record<string, string> = {
  violet: 'border-violet-500/40 bg-violet-500/10',
  blue: 'border-blue-500/40 bg-blue-500/10',
  emerald: 'border-emerald-500/40 bg-emerald-500/10',
  amber: 'border-amber-500/40 bg-amber-500/10',
};

const iconColorMap: Record<string, string> = {
  violet: 'text-violet-400',
  blue: 'text-blue-400',
  emerald: 'text-emerald-400',
  amber: 'text-amber-400',
};

export default function SetupLesson() {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];
  const Icon = step.icon;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">ติดตั้งและตั้งค่า Claude Code</h2>
        <p className="text-slate-400">Claude Code คือ AI coding assistant แบบ CLI ที่เข้าถึงโปรเจกต์ได้โดยตรง ทำงานผ่าน terminal</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
              activeStep === i
                ? colorMap[s.color] + ' text-white'
                : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
            }`}
          >
            {i < activeStep ? <CheckCircle2 size={14} className="text-green-400" /> : <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-xs">{i + 1}</span>}
            {s.title}
          </button>
        ))}
      </div>

      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl border p-5 ${colorMap[step.color]}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <Icon size={20} className={iconColorMap[step.color]} />
          <h3 className="text-lg font-semibold text-white">ขั้นตอนที่ {activeStep + 1}: {step.title}</h3>
        </div>
        {step.content}
      </motion.div>

      <div className="flex justify-between">
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 transition-colors text-sm"
        >
          ← ก่อนหน้า
        </button>
        <button
          onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
          disabled={activeStep === steps.length - 1}
          className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-30 transition-colors text-sm"
        >
          ถัดไป →
        </button>
      </div>
    </div>
  );
}
