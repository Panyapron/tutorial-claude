"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const toolList = [
  { name: "Bash", icon: "🖥️", desc: "เรียกใช้ shell commands", risk: "high" },
  { name: "Read", icon: "📖", desc: "อ่านไฟล์", risk: "low" },
  { name: "Write", icon: "✏️", desc: "เขียนไฟล์", risk: "medium" },
  { name: "Edit", icon: "📝", desc: "แก้ไขไฟล์", risk: "medium" },
  { name: "WebFetch", icon: "🌐", desc: "ดึงข้อมูลจาก URL", risk: "medium" },
  { name: "WebSearch", icon: "🔍", desc: "ค้นหาบนเว็บ", risk: "medium" },
  { name: "mcp__github__*", icon: "🐙", desc: "เครื่องมือ GitHub", risk: "high" },
];

const riskColors = {
  low: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  high: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const riskLabel = { low: "ต่ำ", medium: "กลาง", high: "สูง" };

const settingsSections = [
  {
    key: "permissions",
    label: "permissions",
    desc: "กำหนด tools ที่อนุญาต/ปฏิเสธโดยไม่ต้องขอ",
    color: "text-blue-400",
    example: `"permissions": {
  "allow": [
    "Bash(npm run *)",
    "Read",
    "Edit"
  ],
  "deny": [
    "Bash(rm -rf *)",
    "WebFetch(http://*)"
  ]
}`,
  },
  {
    key: "model",
    label: "model",
    desc: "เลือก Claude model ที่ใช้ใน session",
    color: "text-violet-400",
    example: `"model": "claude-sonnet-4-6"`,
  },
  {
    key: "env",
    label: "env",
    desc: "ตั้งค่า environment variables",
    color: "text-emerald-400",
    example: `"env": {
  "NODE_ENV": "development",
  "API_URL": "http://localhost:3000"
}`,
  },
  {
    key: "mcpServers",
    label: "mcpServers",
    desc: "กำหนด MCP servers ที่เชื่อมต่อ",
    color: "text-orange-400",
    example: `"mcpServers": {
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": { "GITHUB_TOKEN": "..." }
  }
}`,
  },
];

const settingsFiles = [
  { path: "~/.claude/settings.json", scope: "ทุก project ในเครื่อง", label: "Global", color: "from-violet-500 to-purple-600" },
  { path: ".claude/settings.json", scope: "เฉพาะ project นี้ (commit ได้)", label: "Project", color: "from-blue-500 to-cyan-600" },
  { path: ".claude/settings.local.json", scope: "เฉพาะ project + gitignore", label: "Local", color: "from-emerald-500 to-teal-600" },
];

export default function HarnessPermissions() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [allowedTools, setAllowedTools] = useState<string[]>(["Read", "Edit"]);

  const toggleTool = (name: string) => {
    setAllowedTools((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const active = settingsSections.find((s) => s.key === activeSection);

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        Permissions และ Settings ช่วยให้คุณ
        <strong className="text-white"> ควบคุมว่า Claude ทำอะไรได้บ้าง</strong>
        โดยไม่ต้องพิมพ์ approve ทุกครั้ง ตั้งค่า model และเชื่อม MCP servers
      </p>

      {/* Settings file hierarchy */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">ไฟล์ Settings มี 3 ระดับ</h3>
        <div className="space-y-3">
          {settingsFiles.map((f, i) => (
            <motion.div
              key={f.path}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800"
            >
              <div className={`px-2.5 py-1 rounded-lg bg-gradient-to-br ${f.color} text-white text-xs font-bold flex-shrink-0`}>
                {f.label}
              </div>
              <div>
                <code className="text-sm font-mono text-slate-200">{f.path}</code>
                <p className="text-xs text-slate-400 mt-0.5">{f.scope}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-3 text-sm text-slate-500">
          ลำดับความสำคัญ: Local > Project > Global
        </p>
      </div>

      {/* Settings sections explorer */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">โครงสร้าง settings.json — คลิกเพื่อดู</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {settingsSections.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActiveSection(activeSection === s.key ? null : s.key)}
              className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                activeSection === s.key
                  ? "bg-slate-800 border-slate-600"
                  : "bg-slate-900 border-slate-800 hover:border-slate-700"
              }`}
            >
              <code className={`text-sm font-mono font-bold ${s.color}`}>{s.label}</code>
              <p className="text-xs text-slate-400 mt-1">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden"
            >
              <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex items-center gap-2">
                <code className={`text-sm font-mono font-bold ${active.color}`}>{active.label}</code>
                <span className="text-xs text-slate-400">— {active.desc}</span>
              </div>
              <pre className="p-4 text-sm font-mono text-slate-300 overflow-x-auto">{active.example}</pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Permission builder */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Permission Builder</h3>
        <p className="text-sm text-slate-400 mb-4">เลือก tools ที่ต้องการให้คลิกใช้ได้เลยโดยไม่ต้องขออนุญาต:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {toolList.map((tool) => {
            const allowed = allowedTools.includes(tool.name);
            return (
              <button
                key={tool.name}
                onClick={() => toggleTool(tool.name)}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                  allowed
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : "bg-slate-900 border-slate-800 opacity-60"
                }`}
              >
                <span className="text-xl">{tool.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-white">{tool.name}</code>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${riskColors[tool.risk as keyof typeof riskColors]}`}>
                      {riskLabel[tool.risk as keyof typeof riskLabel]}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{tool.desc}</p>
                </div>
                <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                  allowed ? "bg-emerald-500 text-white" : "bg-slate-700"
                }`}>
                  {allowed && <span className="text-[10px]">✓</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Generated config */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
          <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">settings.json (generated)</span>
            <span className="text-xs text-emerald-400">{allowedTools.length} tools allowed</span>
          </div>
          <pre className="p-4 text-sm font-mono text-slate-300 overflow-x-auto">{`{
  "permissions": {
    "allow": [\n${allowedTools.map((t) => `      "${t}"`).join(",\n")}\n    ]
  }
}`}</pre>
        </div>
      </div>

      {/* Pro tips */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-white">Pro Tips</h3>
        {[
          {
            icon: "🎯",
            tip: "ใช้ glob pattern",
            detail: '"Bash(npm *)" อนุญาตเฉพาะ npm commands ไม่ใช่ทั้งหมด',
          },
          {
            icon: "🔐",
            tip: "deny ก่อน allow",
            detail: '"deny" มีความสำคัญสูงกว่า "allow" เสมอ ใช้ประโยชน์ในการ block คำสั่งอันตราย',
          },
          {
            icon: "📁",
            tip: "Project vs Global",
            detail: "เก็บ secrets ไว้ใน settings.local.json และ gitignore เสมอ",
          },
        ].map((item, i) => (
          <motion.div
            key={item.tip}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800"
          >
            <span className="text-xl mt-0.5">{item.icon}</span>
            <div>
              <div className="font-semibold text-white text-sm">{item.tip}</div>
              <div className="text-sm text-slate-400 mt-0.5">{item.detail}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
