"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const useCases = [
  {
    icon: "🌐",
    title: "Claude.ai",
    desc: "เว็บไซต์สำหรับชาวบ้าน คุยเหมือน ChatGPT",
    examples: ["ถามตอบ", "เขียนบทความ", "วิเคราะห์เอกสาร"],
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: "🔑",
    title: "Claude API",
    desc: "สำหรับ developer สร้าง app ด้วย Claude",
    examples: ["สร้าง chatbot", "วิเคราะห์อัตโนมัติ", "content generation"],
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: "💻",
    title: "Claude Code",
    desc: "CLI tool สำหรับ developer ต่อชนกับ codebase",
    examples: ["เขียนโค้ด", "review PR", "debug ปัญหา"],
    color: "from-emerald-500 to-teal-600",
    highlight: true,
  },
  {
    icon: "🤝",
    title: "Claude ผ่าน Partner Apps",
    desc: "Apps ได้ integrate Claude ไว้แล้ว",
    examples: ["Cursor", "Notion AI", "GitHub Copilot"],
    color: "from-orange-500 to-amber-600",
  },
];

export default function UseCases() {
  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        Claude เข้าถึงได้หลายรูปแบบ
        คอร์สนี้จะเน้นที่
        <strong className="text-white"> Claude Code</strong> เป็นหลัก
        ซึ่งเป็นเครื่องมือสำหรับ developer โดยเฉพาะ
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {useCases.map((uc, i) => (
          <motion.div
            key={uc.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-5 rounded-2xl border transition-all duration-300 ${
              uc.highlight
                ? "bg-slate-900 border-violet-500/30 ring-1 ring-violet-500/20"
                : "bg-slate-900 border-slate-800"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${uc.color} flex items-center justify-center text-2xl mb-3 shadow-md`}>
              {uc.icon}
            </div>
            <h3 className="font-semibold text-white mb-1">
              {uc.title}
              {uc.highlight && (
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400">เรียนในคอร์สนี้</span>
              )}
            </h3>
            <p className="text-sm text-slate-400 mb-3">{uc.desc}</p>
            <div className="flex flex-wrap gap-1">
              {uc.examples.map((ex) => (
                <span key={ex} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {ex}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
        <h3 className="font-semibold text-emerald-400 mb-2">🎉 เริ่มต้นใช้งานได้เลย!</h3>
        <p className="text-sm text-slate-300">
          คุณเรียนรู้ Claude ครบทุกด้านแล้ว บทถัดไปจะเริ่มเข้าสู่เรื่องที่สำคัญที่สุด:
          <strong className="text-white"> Prompt Engineering</strong> — วิธีสื่อสารกับ Claude ให้ได้ผลดีที่สุด
        </p>
        <Link
          href="/learn/prompt"
          className="inline-flex items-center gap-2 mt-3 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          ไปเรียน Prompt Engineering →
        </Link>
      </div>
    </div>
  );
}
