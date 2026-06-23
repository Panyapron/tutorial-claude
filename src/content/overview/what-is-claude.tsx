"use client";
import { motion } from "framer-motion";

export default function WhatIsClaude() {
  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        Claude คือ AI Assistant ที่พัฒนาโดย Anthropic ซึ่งสามารถ
        <strong className="text-white"> เข้าใจและสร้างข้อความภาษาธรรมชาติ</strong> ได้อย่างเป็นธรรมชาติคุยได้เหมือนคุยกับคนจริงๆ
        แต่มีความรู้กว้างขวางและทำงานได้รวดเร็ว
      </p>

      {/* How Claude works diagram */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-6 text-center">Claude ทำงานอย่างไร?</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {[
            { icon: "📝", label: "Input", sub: "ข้อความ / คำถาม", delay: 0 },
            { icon: "→", label: "", sub: "", delay: 0.15, arrow: true },
            { icon: "🧠", label: "Claude", sub: "Language Model", delay: 0.3, highlight: true },
            { icon: "→", label: "", sub: "", delay: 0.45, arrow: true },
            { icon: "✨", label: "Output", sub: "คำตอบ / ผลลัพธ์", delay: 0.6 },
          ].map((item, i) =>
            item.arrow ? (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: item.delay }}
                className="text-violet-400 text-2xl hidden sm:block"
              >
                {item.icon}
              </motion.div>
            ) : (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay }}
                className={`p-4 rounded-xl text-center w-36 ${
                  item.highlight
                    ? "bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg shadow-violet-500/20"
                    : "bg-slate-800 border border-slate-700"
                }`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-white">{item.label}</div>
                <div className={`text-xs mt-1 ${item.highlight ? "text-violet-200" : "text-slate-400"}`}>
                  {item.sub}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>

      {/* Capabilities */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Claude ทำอะไรได้บ้าง?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: "💬", title: "สนทนา", desc: "ตอบคำถาม ให้คำแนะนำ อธิบายแนวคิด" },
            { icon: "✍️", title: "เขียน", desc: "บทความ โค้ด อีเมล รายงาน" },
            { icon: "🔍", title: "วิเคราะห์", desc: "ข้อมูล เอกสาร โค้ด รูปภาพ" },
            { icon: "🛠️", title: "เขียนโค้ด", desc: "หลายภาษา debug refactor test" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-medium text-white">{item.title}</div>
                <div className="text-sm text-slate-400">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Models */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Claude มีหลายรุ่น</h3>
        <div className="space-y-3">
          {[
            { name: "Claude Opus", desc: "รุ่นที่ฉลาดที่สุด เหมาะกับงานซับซ้อน", badge: "Most Capable", color: "bg-violet-500/20 text-violet-300" },
            { name: "Claude Sonnet", desc: "สมดุลระหว่างความสามารถและความเร็ว", badge: "Recommended", color: "bg-emerald-500/20 text-emerald-300" },
            { name: "Claude Haiku", desc: "เร็วที่สุดและราคาประหยัด", badge: "Fastest", color: "bg-blue-500/20 text-blue-300" },
          ].map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white">
                🤖
              </div>
              <div className="flex-1">
                <div className="font-medium text-white">{model.name}</div>
                <div className="text-sm text-slate-400">{model.desc}</div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${model.color}`}>{model.badge}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-violet-500/5 border border-violet-500/20">
        <p className="text-sm text-slate-300 leading-relaxed">
          💡 <strong className="text-violet-400">Key Insight:</strong> Claude ไม่ได้"จำ"สิ่งต่างๆ เหมือนมนุษย์ แต่ทำงานผ่าน
          <strong className="text-white"> Context Window</strong> ซึ่งคือเหมือน"หน้าต่าง"ที่ใส่ข้อมูลทั้งหมด เราจะเรียนเรื่องนี้ในบทถัดไป
        </p>
      </div>
    </div>
  );
}
