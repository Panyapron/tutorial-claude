"use client";
import { motion } from "framer-motion";

const hookTypes = [
  { name: "SessionStart", trigger: "เมื่อเริ่ม session ใหม่", example: "ติดตั้ง dependencies, setup environment", color: "text-emerald-400" },
  { name: "PreToolUse", trigger: "ก่อน Claude ใช้ tool", example: "ตรวจสอบ, log, หรือบล็อค tool call", color: "text-blue-400" },
  { name: "PostToolUse", trigger: "หลัง Claude ใช้ tool", example: "บันทึกผลลัพธ์, trigger action อื่น", color: "text-violet-400" },
  { name: "Stop", trigger: "เมื่อ Claude หยุดทำงาน", example: "แจ้งเตือน, cleanup", color: "text-orange-400" },
];

const harnessComponents = [
  { name: "Hooks", icon: "🪝", desc: "ทำงานอัตโนมัติตาม events", color: "from-pink-500 to-rose-600" },
  { name: "Permissions", icon: "🔐", desc: "ควบคุมว่า Claude ทำอะไรได้บ้าง", color: "from-rose-500 to-red-600" },
  { name: "Settings", icon: "⚙️", desc: "model, theme, MCP servers", color: "from-pink-600 to-rose-700" },
  { name: "Skills", icon: "⚡", desc: "Slash commands สร้างเอง", color: "from-rose-600 to-red-700" },
];

export default function HarnessOverview() {
  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        Claude Harness คือ
        <strong className="text-white"> ระบบที่ห่อหุ้ม Claude Code</strong>ทำให้คุณควบคุมพฤติกรรมได้
        ตั้งแต่การอนุมัติ tools อัตโนมัติ ไปจนถึง hooks ที่ทำงานตาม events
      </p>

      {/* Architecture visual */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-5 text-center">Harness Architecture</h3>
        <div className="relative border-2 border-dashed border-pink-500/30 rounded-2xl p-5">
          <span className="absolute -top-3 left-4 text-xs bg-slate-900 px-2 text-pink-400 font-medium">Claude Harness</span>
          <div className="relative border-2 border-dashed border-violet-500/30 rounded-xl p-5 mb-4">
            <span className="absolute -top-3 left-4 text-xs bg-slate-900 px-2 text-violet-400 font-medium">Claude Code (CLI)</span>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-28 mx-auto p-3 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 text-center"
            >
              <div className="text-2xl">🧠</div>
              <div className="text-xs font-bold text-white mt-1">Claude Model</div>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {harnessComponents.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`p-3 rounded-xl bg-gradient-to-br ${c.color} text-center`}
              >
                <div className="text-lg">{c.icon}</div>
                <div className="text-xs font-semibold text-white mt-1">{c.name}</div>
                <div className="text-xs text-white/60 mt-0.5">{c.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hook types */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Hook Types</h3>
        <div className="space-y-3">
          {hookTypes.map((hook, i) => (
            <motion.div
              key={hook.name}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800"
            >
              <code className={`text-sm font-mono font-bold ${hook.color}`}>{hook.name}</code>
              <div className="mt-2 text-sm text-slate-400">
                <span className="text-slate-500">Trigger:</span> {hook.trigger}
              </div>
              <div className="text-sm text-slate-400">
                <span className="text-slate-500">ตัวอย่าง:</span> {hook.example}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Example config */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">ตัวอย่าง Hook Configuration</h3>
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="text-xs text-slate-400 ml-2">.claude/settings.json</span>
          </div>
          <pre className="p-4 text-sm font-mono text-slate-300 overflow-x-auto">{`{
  "hooks": {
    "SessionStart": [{
      "hooks": [{
        "type": "command",
        "command": "npm install"
      }]
    }],
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "say 'Claude finished'"
      }]
    }]
  }
}`}</pre>
        </div>
      </div>
    </div>
  );
}
