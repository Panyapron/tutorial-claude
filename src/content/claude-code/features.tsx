'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Edit3, Terminal, Search, GitBranch, Plug, ChevronDown } from 'lucide-react';

const tools = [
  {
    icon: FileText,
    name: 'Read',
    color: 'blue',
    desc: 'อ่านไฟล์ใดก็ได้ในโปรเจกต์',
    example: 'Read src/app/page.tsx',
    detail: 'Claude สามารถอ่านไฟล์ทุกไฟล์ในโปรเจกต์ได้โดยตรง เลือกอ่านเฉพาะบางส่วนของไฟล์สำหรับไฟล์ขนาดใหญ่ได้ด้วย',
  },
  {
    icon: Edit3,
    name: 'Edit / Write',
    color: 'violet',
    desc: 'แก้ไขหรือสร้างไฟล์',
    example: 'Fix the bug in utils.ts line 42',
    detail: 'Edit ทำการแทนที่เฉพาะจุด ไม่เขียนทั้งไฟล์ Write ใช้สำหรับสร้างไฟล์ใหม่ Claude จะขออนุญาตก่อนเสมอหากไม่ได้อยู่ใน auto-accept mode',
  },
  {
    icon: Terminal,
    name: 'Bash',
    color: 'emerald',
    desc: 'รันคำสั่งใน terminal',
    example: 'Run the test suite',
    detail: 'รันคำสั่งได้เลย เช่น npm test, git status, ls -la หรือสคริปต์ใดๆ คุณควบคุมได้ผ่าน permissions ใน settings.json',
  },
  {
    icon: Search,
    name: 'Grep / Glob',
    color: 'amber',
    desc: 'ค้นหาไฟล์และบรรทัด',
    example: 'Find all TODO comments',
    detail: 'Grep ค้นหา pattern ในเนื้อหาไฟล์ Glob ค้นไฟล์ตามรูปแบบ ช่วยให้ Claude เข้าใจโครงสร้าง codebase ได้เร็วขึ้น',
  },
];

const features = [
  {
    icon: GitBranch,
    title: 'Git Integration',
    color: 'orange',
    points: [
      'Claude อ่าน git log และ diff ได้ตลอด',
      'สร้าง commit message และ PR description',
      'ตรวจสอบ conflict และช่วย resolve',
      'อ่าน blame เพื่อหาต้นเหตุของ bug',
    ],
  },
  {
    icon: Plug,
    title: 'MCP Tools',
    color: 'pink',
    points: [
      'เชื่อม GitHub, Jira, Slack และอื่นๆ',
      'อ่านข้อมูล DB โดยตรงจาก Claude',
      'เชื่อม web เพื่อค้นหาข้อมูลที่อัปเดต',
      'สร้าง MCP server เองได้',
    ],
  },
];

const colorMap: Record<string, string> = {
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  amber: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  orange: 'border-orange-500/40 bg-orange-500/10 text-orange-400',
  pink: 'border-pink-500/40 bg-pink-500/10 text-pink-400',
};

export default function FeaturesLesson() {
  const [openTool, setOpenTool] = useState<number | null>(0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">เครื่องมือและความสามารถของ Claude Code</h2>
        <p className="text-slate-400">Claude Code มี built-in tools หลายตัวที่ใช้ทำงานกับ codebase จริงได้</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Built-in Tools</h3>
        <div className="space-y-2">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            const isOpen = openTool === i;
            return (
              <div key={i} className={`rounded-xl border overflow-hidden ${isOpen ? colorMap[tool.color].split(' ').slice(0,2).join(' ') : 'border-slate-700 bg-slate-800/50'}`}>
                <button
                  onClick={() => setOpenTool(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isOpen ? colorMap[tool.color].split(' ')[2] : 'text-slate-400'} />
                    <span className="font-semibold text-white">{tool.name}</span>
                    <span className="text-slate-400 text-sm">— {tool.desc}</span>
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-slate-300 text-sm mb-2">{tool.detail}</p>
                      <div className="bg-slate-900 rounded-lg px-3 py-2 font-mono text-sm">
                        <span className="text-slate-500">Example: </span>
                        <span className="text-emerald-300">{tool.example}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-3">ความสามารถเพิ่มเติม</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className={`rounded-xl border p-4 ${colorMap[feat.color].split(' ').slice(0,2).join(' ')}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={18} className={colorMap[feat.color].split(' ')[2]} />
                  <h4 className="font-semibold text-white">{feat.title}</h4>
                </div>
                <ul className="space-y-1">
                  {feat.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-slate-500 mt-0.5">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
        <h3 className="text-white font-semibold mb-3">ตัวอย่าง Session จริง</h3>
        <div className="space-y-2 font-mono text-sm">
          <div className="flex gap-3">
            <span className="text-violet-400">&gt;</span>
            <span className="text-slate-300">Find all API endpoints in this project and add input validation</span>
          </div>
          <div className="pl-5 text-slate-500 text-xs space-y-1">
            <p>✓ Reading src/api/routes.ts...</p>
            <p>✓ Found 12 endpoints, 4 ยังไม่มี validation</p>
            <p>✓ Editing src/api/middleware/validate.ts...</p>
            <p>✓ Running tests: 47 passed</p>
          </div>
          <div className="flex gap-3">
            <span className="text-violet-400">&gt;</span>
            <span className="text-slate-300">Create a PR description for these changes</span>
          </div>
          <div className="pl-5 text-green-400 text-xs">✓ Generated PR description with summary and testing steps</div>
        </div>
      </div>
    </div>
  );
}
