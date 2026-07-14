"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const hookDefs = [
  {
    name: "SessionStart",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/30",
    dot: "bg-emerald-400",
    when: "ทุกครั้งที่เริ่ม session ใหม่",
    why: "เตรียม environment ก่อนเริ่มทำงาน",
    examples: [
      { label: "npm install", desc: "ติดตั้ง dependencies อัตโนมัติ" },
      { label: "docker compose up", desc: "เริ่ม services ที่จำเป็น" },
      { label: "echo \"Session started at $(date)\"", desc: "บันทึกเวลาเริ่ม" },
    ],
    config: `{
  "SessionStart": [{
    "hooks": [{
      "type": "command",
      "command": "npm install"
    }]
  }]
}`,
  },
  {
    name: "PreToolUse",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/30",
    dot: "bg-blue-400",
    when: "ก่อน Claude จะเรียกใช้ tool ใดๆ",
    why: "gate-keep, log, หรือ block tool call",
    examples: [
      { label: "ตรวจ bash command อันตราย", desc: "exit 1 ถ้าคำสั่งต้องห้าม" },
      { label: "log tool call", desc: "บันทึกทุกครั้งที่ Claude เรียก tool" },
      { label: "validate parameters", desc: "ตรวจ params ก่อนส่ง" },
    ],
    config: `{
  "PreToolUse": [{
    "matcher": "Bash",
    "hooks": [{
      "type": "command",
      "command": "echo \'Tool: $TOOL_NAME\'" 
    }]
  }]
}`,
  },
  {
    name: "PostToolUse",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/30",
    dot: "bg-violet-400",
    when: "หลัง Claude ใช้ tool เสร็จแล้ว",
    why: "ประมวลผล post-processing, trigger side-effects",
    examples: [
      { label: "run tests after edit", desc: "auto-run test หลังแก้ไขไฟล์" },
      { label: "format code", desc: "prettier --write หลัง Claude เขียนโค้ด" },
      { label: "send notification", desc: "แจ้งเมื่อ tool ทำงานเสร็จ" },
    ],
    config: `{
  "PostToolUse": [{
    "matcher": "Write",
    "hooks": [{
      "type": "command",
      "command": "npm run lint --fix"
    }]
  }]
}`,
  },
  {
    name: "Stop",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/30",
    dot: "bg-orange-400",
    when: "Claude หยุดการตอบสนอง",
    why: "แจ้งเตือน, cleanup, สรุปผลงาน",
    examples: [
      { label: "say 'Done'", desc: "เสียงแจ้งเมื่อ Claude เสร็จ" },
      { label: "notify Slack", desc: "ส่ง webhook ไป Slack" },
      { label: "git status", desc: "แสดงสถานะ repo หลังเสร็จ" },
    ],
    config: `{
  "Stop": [{
    "hooks": [{
      "type": "command",
      "command": "say 'Claude has finished'"
    }]
  }]
}`,
  },
];

const lifecycleSteps = [
  { label: "Session Start", icon: "🌟", color: "bg-emerald-500", hook: "SessionStart" },
  { label: "Claude คิด", icon: "🧠", color: "bg-violet-500", hook: null },
  { label: "Pre Tool Use", icon: "⏮️", color: "bg-blue-500", hook: "PreToolUse" },
  { label: "Tool ทำงาน", icon: "⚙️", color: "bg-slate-500", hook: null },
  { label: "Post Tool Use", icon: "⏭️", color: "bg-violet-500", hook: "PostToolUse" },
  { label: "Claude สรุป", icon: "✅", color: "bg-orange-500", hook: "Stop" },
];

export default function HarnessHooks() {
  const [activeHook, setActiveHook] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);

  const runAnimation = () => {
    setAnimating(true);
    setCurrentStep(0);
    lifecycleSteps.forEach((_, i) => {
      setTimeout(() => {
        setCurrentStep(i);
        if (i === lifecycleSteps.length - 1) {
          setTimeout(() => {
            setAnimating(false);
            setCurrentStep(null);
          }, 800);
        }
      }, i * 700);
    });
  };

  const active = hookDefs.find((h) => h.name === activeHook);

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        Hooks คือโปรแกรม shell ที่
        <strong className="text-white"> Claude Harness เรียกอัตโนมัติ</strong>
        ตามจุดสำคัญใน session — ทำให้คุณสร้าง automation ได้โดยไม่ต้องเขียนโค้ดเพิ่ม
      </p>

      {/* Lifecycle Animation */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-white">Session Lifecycle</h3>
          <button
            onClick={runAnimation}
            disabled={animating}
            className="px-4 py-1.5 text-xs rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-medium transition-colors"
          >
            {animating ? "▶ กำลังเล่น..." : "▶ เล่น animation"}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-center">
          {lifecycleSteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: currentStep === i ? 1.15 : 1,
                  opacity: currentStep !== null && currentStep < i ? 0.3 : 1,
                }}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-300 ${
                  step.hook
                    ? "bg-slate-800 border-slate-700 cursor-pointer hover:border-slate-500"
                    : "bg-slate-900 border-slate-800"
                } ${currentStep === i ? "ring-2 ring-violet-400 border-violet-400/50" : ""}`}
                onClick={() => step.hook && setActiveHook(activeHook === step.hook ? null : step.hook)}
              >
                <div className={`w-8 h-8 rounded-full ${step.color} flex items-center justify-center text-base`}>
                  {step.icon}
                </div>
                <span className="text-xs text-slate-300 text-center leading-tight w-16">{step.label}</span>
                {step.hook && (
                  <span className="text-[10px] text-violet-400 font-mono">{step.hook}</span>
                )}
              </motion.div>
              {i < lifecycleSteps.length - 1 && (
                <motion.div
                  animate={{ opacity: currentStep !== null && currentStep >= i ? 1 : 0.2 }}
                  className="text-slate-600 text-sm hidden sm:block"
                >
                  →
                </motion.div>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-500 mt-4">คลิกที่กล่องสีเข้ม = Hook ดู config</p>
      </div>

      {/* Hook cards */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">4 Hook Types</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {hookDefs.map((hook, i) => (
            <motion.div
              key={hook.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActiveHook(activeHook === hook.name ? null : hook.name)}
              className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                activeHook === hook.name ? hook.bg : "bg-slate-900 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${hook.dot}`} />
                <div>
                  <code className={`text-sm font-mono font-bold ${hook.color}`}>{hook.name}</code>
                  <p className="text-xs text-slate-400 mt-0.5">{hook.when}</p>
                  <p className="text-xs text-slate-500 mt-0.5">ใช้: {hook.why}</p>
                </div>
                <span className="ml-auto text-slate-600 text-xs">{activeHook === hook.name ? "▲" : "▼"}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden"
          >
            <div className={`px-5 py-3 border-b border-slate-800 flex items-center gap-2 ${active.bg}`}>
              <span className={`text-sm font-mono font-bold ${active.color}`}>{active.name}</span>
              <span className="text-xs text-slate-400">— {active.when}</span>
            </div>

            <div className="p-5 space-y-4">
              {/* Examples */}
              <div>
                <p className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">ตัวอย่างการใช้งาน</p>
                <div className="space-y-2">
                  {active.examples.map((ex) => (
                    <div key={ex.label} className="flex items-start gap-3">
                      <code className="text-xs text-emerald-400 bg-slate-800 px-2 py-1 rounded font-mono flex-shrink-0">{ex.label}</code>
                      <span className="text-xs text-slate-400 pt-1">{ex.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Config */}
              <div>
                <p className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">settings.json</p>
                <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-slate-300 overflow-x-auto">{active.config}</pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Env vars */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <h3 className="font-semibold text-white mb-3">Environment Variables ที่ Hook รับได้</h3>
        <div className="space-y-2">
          {[
            { name: "CLAUDE_TOOL_NAME", desc: "ชื่อ tool ที่กำลังถูกเรียกใช้ (PreToolUse, PostToolUse)" },
            { name: "CLAUDE_TOOL_INPUT", desc: "JSON ของ input ที่ส่งให้ tool" },
            { name: "CLAUDE_TOOL_OUTPUT", desc: "ผลลัพธ์จาก tool (PostToolUse เท่านั้น)" },
            { name: "CLAUDE_SESSION_ID", desc: "ID ของ session ปัจจุบัน" },
          ].map((v) => (
            <div key={v.name} className="flex items-start gap-3">
              <code className="text-xs text-violet-400 font-mono bg-violet-500/10 px-2 py-0.5 rounded flex-shrink-0">{v.name}</code>
              <span className="text-xs text-slate-400">{v.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Real example */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">ตัวอย่างจริง: Auto-test on Save</h3>
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
      "hooks": [{ "type": "command", "command": "npm install" }]
    }],
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "npm test --passWithNoTests 2>&1 | tail -5"
      }]
    }],
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "say 'Claude finished. Check the results!'"
      }]
    }]
  }
}`}</pre>
        </div>
        <p className="mt-3 text-sm text-slate-400">
          ตัวอย่างนี้: ติดตั้ง deps เพลาเริ่ม → รัน test อัตโนมัติทุกครั้งที่เขียนไฟล์ → แจ้งเมื่อเสร็จ
        </p>
      </div>
    </div>
  );
}
