"use client";
import { motion } from "framer-motion";

export default function WhatAreSkills() {
  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        Skills คือ
        <strong className="text-white"> คำสั่งแบบ slash command (/skill-name)</strong>
        ที่เมื่อเรียกใช้ จะโหลด instructions จากไฟล์ Markdown เข้าไปใน context ของ Claude
      </p>

      {/* Skill flow */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-6 text-center">Skill ทำงานอย่างไร?</h3>
        <div className="space-y-3">
          {[
            { icon: "⌨️", label: "พิมพ์ /review", desc: "ผู้ใช้พิมพ์ slash command", color: "from-yellow-500 to-orange-500" },
            { icon: "📂", label: "โหลด review.md", desc: "ค้นหาไฟล์ .claude/commands/review.md", color: "from-orange-500 to-amber-500" },
            { icon: "💉", label: "Inject ลงใน Context", desc: "เนื้อหาของไฟล์ถูกใส่เข้าไปใน prompt", color: "from-amber-500 to-yellow-500" },
            { icon: "🤖", label: "Claude ทำงาน", desc: "Claude รับ instructions จาก skill และทำงาน", color: "from-yellow-500 to-lime-500" },
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

      {/* File structure */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">โครงสร้างไฟล์</h3>
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
          <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 text-xs text-slate-400">Project Structure</div>
          <pre className="p-4 text-sm font-mono text-slate-300">{`my-project/
└── .claude/
    └── commands/
        ├── review.md       ← /review
        ├── deploy.md       ← /deploy
        └── test-all.md     ← /test-all`}</pre>
        </div>
      </div>

      {/* Example skill file */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">ตัวอย่างไฟล์ Skill</h3>
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="text-xs text-slate-400 ml-2">.claude/commands/review.md</span>
          </div>
          <pre className="p-4 text-sm font-mono text-slate-300">{`# Code Review

Review the current diff for:
1. Bugs and logic errors
2. Security vulnerabilities  
3. Performance issues
4. Code style and readability

For each issue found:
- Describe the problem
- Explain why it's an issue
- Suggest a fix with code example

Focus on HIGH severity issues first.`}</pre>
        </div>
      </div>
    </div>
  );
}
