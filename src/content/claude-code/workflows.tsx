'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Bug, RefreshCw, TestTube2, ArrowRight } from 'lucide-react';

const workflows = [
  {
    id: 'review',
    icon: Eye,
    title: 'Code Review',
    color: 'blue',
    tagline: 'วิเคราะห์โค้ดอย่างละเอียด',
    steps: [
      { label: 'บอกให้ review', prompt: 'Review the changes in src/components/UserCard.tsx' },
      { label: 'Claude อ่านและวิเคราะห์', result: 'อ่าน diff และเข้าใจ context' },
      { label: 'รับ Feedback', result: 'บอกปัญหา, ความเสี่ยง, แนวทางปรับปรุง' },
      { label: 'แก้ไขอัตโนมัติ', prompt: 'Fix the issues you found' },
    ],
    prompts: [
      'Review this PR for security vulnerabilities',
      'Check for performance issues in this component',
      'Does this code follow our coding standards?',
    ],
  },
  {
    id: 'bugfix',
    icon: Bug,
    title: 'Bug Fix',
    color: 'red',
    tagline: 'เข้าใจและแก้บั๊กได้เร็ว',
    steps: [
      { label: 'อธิบายปัญหา', prompt: 'TypeError: Cannot read property id of undefined in UserList' },
      { label: 'Claude ค้นหาสาเหตุ', result: 'ค้นหาไฟล์ที่เกี่ยวข้องและวิเคราะห์ logic' },
      { label: 'เสนอ fix', result: 'อธิบาย root cause และวิธีแก้ไข' },
      { label: 'แก้ไขและเพิ่ม test', prompt: 'Apply the fix and add a regression test' },
    ],
    prompts: [
      'Why is this function returning undefined?',
      'Find the cause of this memory leak',
      'This test is failing, help me fix it',
    ],
  },
  {
    id: 'refactor',
    icon: RefreshCw,
    title: 'Refactor',
    color: 'violet',
    tagline: 'ปรับโค้ดโดยไม่เปลี่ยน behavior',
    steps: [
      { label: 'ระบุเป้าหมาย', prompt: 'Refactor UserService to use repository pattern' },
      { label: 'Claude วางแผน', result: 'วิเคราะห์โค้ดและเสนอ approach' },
      { label: 'ดำเนินการ', result: 'แบ่งไฟล์ใหม่ ย้าย logic' },
      { label: 'ตรวจสอบเสมอ', prompt: 'Run tests and make sure nothing broke' },
    ],
    prompts: [
      'Extract this logic into a reusable hook',
      'Convert this class to functional component',
      'Split this large file into smaller modules',
    ],
  },
  {
    id: 'test',
    icon: TestTube2,
    title: 'Test Generation',
    color: 'emerald',
    tagline: 'เพิ่ม test coverage ได้เร็ว',
    steps: [
      { label: 'ส่งไฟล์ให้สร้าง test', prompt: 'Write tests for the PaymentService class' },
      { label: 'Claude วิเคราะห์', result: 'อ่าน implementation และคิด edge cases' },
      { label: 'สร้าง test files', result: 'unit tests + integration tests + mocks' },
      { label: 'รัน tests', prompt: 'Run the tests and fix any issues' },
    ],
    prompts: [
      'Add unit tests for all edge cases',
      'Write integration tests for this API endpoint',
      'Mock the external dependencies in these tests',
    ],
  },
];

const colorMap: Record<string, string> = {
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  red: 'border-red-500/40 bg-red-500/10 text-red-400',
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
};

export default function WorkflowsLesson() {
  const [active, setActive] = useState('review');
  const wf = workflows.find(w => w.id === active)!;
  const Icon = wf.icon;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">เวิร์คฟลอวได้รับความนิยมกับ Claude Code</h2>
        <p className="text-slate-400">เรียนรู้วิธีใช้งานตามงานผ่าน use case จริงๆ</p>
      </div>

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
        <div className="flex items-center gap-3 mb-5">
          <Icon size={20} className={colorMap[wf.color].split(' ')[2]} />
          <div>
            <h3 className="text-lg font-semibold text-white">{wf.title}</h3>
            <p className="text-slate-400 text-sm">{wf.tagline}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 overflow-x-auto pb-2">
          {wf.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-2 flex-shrink-0">
              <div className="min-w-[140px]">
                <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                  <p className="text-xs text-slate-500 mb-1">ขั้นตอน {i + 1}</p>
                  <p className="text-white text-sm font-medium mb-1">{step.label}</p>
                  {step.prompt && (
                    <p className="text-violet-300 text-xs font-mono bg-slate-800 rounded px-2 py-1">{step.prompt}</p>
                  )}
                  {step.result && (
                    <p className="text-emerald-400 text-xs">{step.result}</p>
                  )}
                </div>
              </div>
              {i < wf.steps.length - 1 && (
                <ArrowRight size={16} className="text-slate-600 mt-4 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <div>
        <h3 className="text-white font-semibold mb-3">ตัวอย่าง Prompt สำหรับ {wf.title}</h3>
        <div className="space-y-2">
          {wf.prompts.map((p, i) => (
            <div key={i} className="bg-slate-800/60 rounded-lg border border-slate-700 px-4 py-3 flex items-center gap-3">
              <span className={`text-xs font-semibold ${colorMap[wf.color].split(' ')[2]}`}>{i + 1}</span>
              <p className="text-slate-300 text-sm font-mono">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
