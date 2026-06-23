"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function HowItWorks() {
  const [tokens, setTokens] = useState<string[]>([]);
  const [inputText, setInputText] = useState("สวัสดี Claude!");

  const tokenize = () => {
    const parts = inputText.match(/[฀-๿]+|[a-zA-Z]+|\d+|[^\s]/g) || [];
    setTokens(parts);
  };

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        เข้าใจว่า Claude "มองเห็น" อะไรเมื่อคุณส่งข้อความ
        และ Context Window ทำงานอย่างไร
      </p>

      {/* Context Window Visual */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-2 text-center">Context Window</h3>
        <p className="text-center text-sm text-slate-400 mb-5">"หน้าต่าง" ที่ Claude มองเห็นข้อมูลทั้งหมดในครั้งนั้น</p>

        <div className="border-2 border-dashed border-violet-500/30 rounded-xl p-4 bg-violet-500/3">
          <div className="text-xs text-violet-400 font-mono text-center mb-3 uppercase tracking-wider">
            Context Window (200,000 tokens)
          </div>
          <div className="space-y-2">
            {[
              { label: "System Prompt", content: "You are a helpful assistant...", color: "border-violet-500/30 bg-violet-500/10", text: "text-violet-300" },
              { label: "Previous Messages", content: "User: สวัสดี\nClaude: สวัสดีครับ...", color: "border-blue-500/30 bg-blue-500/10", text: "text-blue-300" },
              { label: "Current Message", content: "User: อธิบาย token ให้หน่อยได้ไหม?", color: "border-emerald-500/30 bg-emerald-500/10", text: "text-emerald-300" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className={`p-3 rounded-lg border ${item.color}`}
              >
                <div className={`text-xs font-medium mb-1 ${item.text}`}>{item.label}</div>
                <div className="text-xs text-slate-400 font-mono whitespace-pre-line">{item.content}</div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10"
            >
              <div className="text-xs font-medium mb-1 text-amber-300">กำลังสร้าง Response</div>
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xs text-slate-400 font-mono"
              >
                Token คือหน่วยย่อยของข้อความ ที่ Claude ใช้ในการประมวลผล... ▌
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Token demo */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-3">Token คืออะไร?</h3>
        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
          Claude ไม่ได้อ่านทีละตัวอักษร แต่แบ่งข้อความเป็น
          <strong className="text-white"> Token</strong> ซึ่งอาจเป็นคำ ส่วนของคำ หรืออักขระ ลองดูด้วยตัวเอง:
        </p>
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-violet-500/50"
            />
            <button
              onClick={tokenize}
              className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
            >
              Tokenize
            </button>
          </div>
          {tokens.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {tokens.map((t, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="px-2 py-1 rounded bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-mono"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
              <p className="text-xs text-slate-500">≈ {tokens.length} tokens (ค่าจริงอาจต่างกันเล็กน้อย)</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Key insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { icon: "📏", title: "Window ใหญ่ = จำได้นานขึ้น", desc: "200K tokens คือประมาณ 150 หน้าหนังสือที่ Claude รับได้" },
          { icon: "💰", title: "Token = หน่วยค่าใช้จ่าย", desc: "API ของ Claude คิดราคาตาม token ทั้ง input และ output" },
          { icon: "🧩", title: "ไม่มีหน่วยความจำถาวร", desc: "เมื่อจบ session Claude ลืมทุกอย่าง ต้องให้ข้อมูลใหม่ในครั้งถัดไป" },
          { icon: "📍", title: "ลำดับสำคัญ", desc: "ข้อมูลต้น context มักถูกจำได้ดีกว่าตรงกลาง" },
        ].map((item, i) => (
          <div key={item.title} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-semibold text-white text-sm mb-1">{item.title}</div>
            <div className="text-slate-400 text-xs">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
