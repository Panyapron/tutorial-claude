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
    <main className="pt-24 pb-24 px-4 bg-apple-bg min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <p className="apple-eyebrow text-apple-gray mb-3">Workshop</p>
          <h1 className="apple-headline text-3xl sm:text-5xl text-apple-ink mb-3">Prompt Playground</h1>
          <p className="text-apple-gray text-sm sm:text-base">สร้างและทดสอบ prompt เรียนรู้โครงสร้างของ prompt ที่ดี</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Builder — dark panels */}
          <div className="lg:col-span-2 space-y-4">
            {/* System Prompt */}
            <div className="apple-card-dark">
              <button
                onClick={() => setShowSystem(!showSystem)}
                className="w-full flex items-center justify-between p-4 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                  System Prompt
                  <span className="text-xs text-white/40 font-normal hidden sm:inline">(กำหนดบุคลิกของ Claude)</span>
                </span>
                <span className="text-white/40">{showSystem ? "▲" : "▼"}</span>
              </button>
              {showSystem && (
                <div className="px-4 pb-4">
                  <textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="w-full h-24 p-3 rounded-xl bg-black/30 border border-white/10 text-white/90 text-sm font-mono resize-none focus:outline-none focus:border-violet-400/50 transition-colors"
                  />
                </div>
              )}
            </div>

            {/* User Message */}
            <div className="apple-card-dark p-4">
              <div className="flex items-center gap-2 mb-3 text-sm font-medium text-white/80">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                User Message
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-44 p-3 rounded-xl bg-black/30 border border-white/10 text-white text-sm resize-none focus:outline-none focus:border-violet-400/50 transition-colors"
                placeholder="พิมพ์ prompt ของคุณที่นี่..."
              />
              <div className="flex items-center justify-between mt-2 text-xs text-white/40">
                <span>{charCount} characters</span>
                <span>≈ {tokenEstimate} tokens</span>
              </div>
            </div>

            {/* Analysis */}
            {prompt.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="apple-card-dark p-5"
              >
                <h3 className="font-semibold text-white mb-4">การวิเคราะห์ Prompt</h3>
                <div className="space-y-3">
                  {scores.map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/50">{item.label}</span>
                        <span className="text-white/80">{Math.round(item.score)}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
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
                  <p className="mt-4 text-xs text-amber-300 bg-amber-400/10 border border-amber-400/20 rounded-lg p-3">
                    💡 เพิ่ม context และรายละเอียดเพื่อให้ Claude ตอบได้แม่นยำขึ้น
                  </p>
                )}
              </motion.div>
            )}
          </div>

          {/* Right: Tips & Examples — light */}
          <div className="space-y-4">
            <div className="apple-card-light p-5">
              <h3 className="font-semibold text-apple-ink mb-4">ตัวอย่าง Prompt</h3>
              <div className="space-y-2">
                {examples.map((ex) => (
                  <button
                    key={ex.label}
                    onClick={() => setPrompt(ex.prompt)}
                    className="w-full text-left p-3 rounded-xl bg-black/[0.03] hover:bg-black/[0.06] text-sm transition-colors border border-black/5"
                  >
                    <span className="block font-medium text-apple-blue mb-1">{ex.label}</span>
                    <span className="text-xs text-apple-gray line-clamp-2">{ex.prompt}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="apple-card-light p-5">
              <h3 className="font-semibold text-apple-ink mb-4">เทคนิค Prompt ที่ดี</h3>
              <ul className="space-y-2">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-apple-gray">
                    <span className="text-apple-blue mt-0.5 flex-shrink-0">✓</span>
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
