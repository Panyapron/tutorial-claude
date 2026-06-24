"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const patterns = [
  {
    id: "multi-env",
    title: "Multi-Environment Config",
    icon: "🌍",
    desc: "แยก config ตาม environment",
    color: "from-blue-500 to-cyan-600",
    detail: "ใช้ settings หลายระดับเพื่อแยกค่า dev/staging/prod โดยไม่ต้องเปลี่ยนโค้ด",
    code: `# Dev: .claude/settings.json
{
  "model": "claude-haiku-4-5",
  "permissions": {
    "allow": ["Bash(npm *)", "Read", "Write", "Edit"]
  },
  "env": { "NODE_ENV": "development" }
}

# Prod: .claude/settings.local.json (gitignored)
{
  "model": "claude-opus-4-8",
  "env": {
    "NODE_ENV": "production",
    "DATABASE_URL": "postgresql://prod-server/db"
  }
}`,
  },
  {
    id: "hook-chain",
    title: "Hook Chain Pattern",
    icon: "🔗",
    desc: "ต่อ hooks หลายอันเข้าด้วยกัน",
    color: "from-violet-500 to-purple-600",
    detail: "รัน hooks หลายอันในลำดับ แต่ละอันทำหน้าที่แยก",
    code: `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          { "type": "command", "command": "npm run lint --fix" },
          { "type": "command", "command": "npm run typecheck" },
          { "type": "command", "command": "npm test --passWithNoTests" }
        ]
      }
    ]
  }
}`,
  },
  {
    id: "guard",
    title: "Security Guard Pattern",
    icon: "🛡️",
    desc: "บล็อคคำสั่งอันตราย",
    color: "from-rose-500 to-red-600",
    detail: "ตรวจสอบทุก bash command ก่อนรัน บล็อคคำสั่งอันตราย",
    code: `# guard.sh
#!/bin/bash
CMD="$CLAUDE_TOOL_INPUT"

# Block dangerous commands
DANGEROUS=("rm -rf /" "dd if=" "mkfs" ":(){ :|:& };:")
for pattern in "\${DANGEROUS[@]}"; do
  if echo "$CMD" | grep -q "$pattern"; then
    echo "BLOCKED: $pattern"
    exit 1  # exit 1 = block the tool call
  fi
done
exit 0  # exit 0 = allow`,
  },
  {
    id: "ci-cd",
    title: "CI/CD Integration",
    icon: "🚀",
    desc: "เชื่อม Claude เข้า pipeline",
    color: "from-emerald-500 to-teal-600",
    detail: "ใช้ Claude Code ใน GitHub Actions สำหรับ auto-review",
    code: `# .github/workflows/claude-review.yml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Claude Review
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          npx @anthropic-ai/claude-code \\
            --print \\
            "Review this PR for bugs and security issues. \\
             Focus on the changed files only."`,
  },
];

const teamTips = [
  {
    icon: "📁",
    title: "Commit settings.json, gitignore settings.local.json",
    desc: "แชร์ config สาธารณใน repo แต่เก็บ secrets ไว้ใน local",
  },
  {
    icon: "👥",
    title: "ใช้ Global settings สำหรับ personal preferences",
    desc: "~/.claude/settings.json ใช้เป็น personal config ที่ใช้ทุก project",
  },
  {
    icon: "📝",
    title: "Document hooks ใน README",
    desc: "อธิบายว่า team ใช้ hooks อะไรบ้าง เพื่อไม่ให้ onboarding รุ่นใหม่งง",
  },
  {
    icon: "⚡",
    title: "Hook timeout awareness",
    desc: "Hooks ที่รันนานเกินไปจะถูก timeout ควรให้แต่ละ hook เร็วและเงียบ",
  },
];

export default function HarnessEngineer() {
  const [activePattern, setActivePattern] = useState<string | null>(null);
  const active = patterns.find((p) => p.id === activePattern);

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        นำความรู้เรื่อง Harness ไปใช้ในงานจริง
        ดู patterns สำคัญ 4 รูปแบบที่ engineering team นิยมใช้
      </p>

      {/* Pattern cards */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Production Patterns — คลิกเพื่อดู code</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {patterns.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActivePattern(activePattern === p.id ? null : p.id)}
              className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                activePattern === p.id
                  ? "bg-slate-800 border-slate-600 ring-1 ring-violet-500/30"
                  : "bg-slate-900 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-xl mb-3`}>
                {p.icon}
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">{p.title}</h4>
              <p className="text-xs text-slate-400">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Code panel */}
      {active && (
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden"
        >
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 border-b border-slate-700">
            <span className="text-xl">{active.icon}</span>
            <div>
              <div className="font-semibold text-white text-sm">{active.title}</div>
              <div className="text-xs text-slate-400">{active.detail}</div>
            </div>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">{active.code}</pre>
        </motion.div>
      )}

      {/* Debugging */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
        <h3 className="font-semibold text-white mb-4">🐛 Debug Hooks</h3>
        <div className="space-y-3">
          {[
            { cmd: "CLAUDE_DEBUG=1 claude", desc: "เปิด debug mode แสดง hook logs" },
            { cmd: "claude --print \"test hook\" 2>&1", desc: "ดู stderr output ของ hook" },
            { cmd: "bash -x .claude/hooks/myhook.sh", desc: "เทสต์ hook script โดยตรง" },
          ].map((item) => (
            <div key={item.cmd} className="flex items-start gap-3">
              <code className="text-xs text-emerald-400 bg-slate-800 px-2 py-1.5 rounded font-mono flex-shrink-0">{item.cmd}</code>
              <span className="text-xs text-slate-400 pt-1.5">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Team tips */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Team Best Practices</h3>
        <div className="space-y-3">
          {teamTips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800"
            >
              <span className="text-xl mt-0.5">{tip.icon}</span>
              <div>
                <div className="font-semibold text-white text-sm">{tip.title}</div>
                <div className="text-sm text-slate-400 mt-0.5">{tip.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
