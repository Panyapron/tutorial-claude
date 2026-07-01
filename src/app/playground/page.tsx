"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const examples = [
  {
    label: "💬 สอบถาม",
    prompt: "อธิบาย MCP (Model Context Protocol) ให้เข้าใจง่าย โดยใช้อุปมาที่คนทั่วไปเข้าใจได้",
  },
  {
    label: "💻 เขียนโค้ด",
    prompt: "เขียนฟังก์ชัน Python สำหรับดึงข้อมูลจาก API และ handle errors อย่างเหมาะสม",
  },
  {
    label: "🔍 วิเคราะห์",
    prompt: "วิเคราะห์ข้อดีและข้อเสียของการใช้ microservices เทียบกับ monolith architecture",
  },
  {
    label: "✍️ สร้าง Prompt",
    prompt: "ช่วยสร้าง system prompt สำหรับ AI assistant ที่จะช่วยสอนภาษาไทยให้ผู้เรียนต่างชาติ",
  },
];

const tips = [
  "ระบุ format ที่ต้องการ (bullet points, ตาราง, โค้ด)",
  "บอก context และเป้าหมายของงาน",
  "ระบุระดับความละเอียดที่ต้องการ",
  "ให้ตัวอย่างถ้าต้องการผลลัพธ์ในรูปแบบเฉพาะ",
];

export default function Playground() {
  const [prompt, setPrompt] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful assistant.");
  const [showSystem, setShowSystem] = useState(false);

  const charCount = prompt.length;
  const tokenEstimate = Math.ceil(charCount / 4);

  const scores = [
    { label: "ความชัดเจน", score: Math.min(100, (charCount / 80) * 100), color: "bg-emerald-500" },
    { label: "Context", score: Math.min(100, (prompt.split(" ").length / 15) * 100), color: "bg-blue-500" },
    { label: "ความเฉพาะเจาะจง", score: Math.min(100, (charCount / 60) * 80), color: "bg-violet-500" },
  ];

  return (
    <main className="pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Prompt Playground</h1>
          <p className="text-slate-400 text-sm sm:text-base">สร้างและทดสอบ prompt เรียนรู้โครงสร้างของ prompt ที่ดี</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Builder */}
          <div className="lg:col-span-2 space-y-4">
            {/* System Prompt */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setShowSystem(!showSystem)}
                className="w-full flex items-center justify-between p-4 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />
                  System Prompt
                  <span className="text-xs text-slate-500 font-normal hidden sm:inline">(กำหนดบุคลิกของ Claude)</span>
                </span>
                <span className="text-slate-500">{showSystem ? "▲" : "▼"}</span>
              </button>
              {showSystem && (
                <div className="px-4 pb-4">
                  <textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="w-full h-24 p-3 rounded-xl bg-slate-800 border border-violet-500/20 text-slate-300 text-sm font-mono resize-none focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
              )}
            </div>

            {/* User Message */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
              <div className="flex items-center gap-2 mb-3 text-sm font-medium text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                User Message
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-44 p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-sm resize-none focus:outline-none focus:border-violet-500/50 transition-colors"
                placeholder="พิมพ์ prompt ของคุณที่นี่..."
              />
              <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                <span>{charCount} characters</span>
                <span>≈ {tokenEstimate} tokens</span>
              </div>
            </div>

            {/* Analysis */}
            {prompt.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-slate-900 border border-slate-800 p-5"
              >
                <h3 className="font-semibold text-white mb-4">การวิเคราะห์ Prompt</h3>
                <div className="space-y-3">
                  {scores.map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">{item.label}</span>
                        <span className="text-slate-300">{Math.round(item.score)}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.score}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className={`h-full ${item.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {charCount < 40 && (
                  <p className="mt-4 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg p-3">
                    💡 เพิ่ม context และรายละเอียดเพื่อให้ Claude ตอบได้แม่นยำขึ้น
                  </p>
                )}
              </motion.div>
            )}
          </div>

          {/* Right: Tips & Examples */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
              <h3 className="font-semibold text-white mb-4">ตัวอย่าง Prompt</h3>
              <div className="space-y-2">
                {examples.map((ex) => (
                  <button
                    key={ex.label}
                    onClick={() => setPrompt(ex.prompt)}
                    className="w-full text-left p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm transition-colors border border-slate-700 hover:border-slate-600"
                  >
                    <span className="block font-medium text-violet-400 mb-1">{ex.label}</span>
                    <span className="text-xs text-slate-500 line-clamp-2">{ex.prompt}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
              <h3 className="font-semibold text-white mb-4">เทคนิค Prompt ที่ดี</h3>
              <ul className="space-y-2">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="text-violet-400 mt-0.5 flex-shrink-0">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
