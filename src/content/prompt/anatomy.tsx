"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const sections = [
  {
    id: "system",
    label: "System Prompt",
    icon: "⚙️",
    bgColor: "bg-violet-500/10 border-violet-500/30",
    textColor: "text-violet-400",
    desc: "คำสั่งเริ่มต้นที่กำหนดบุคลิกและขอบเขตของ Claude เหมือน 'กฎของร้าน'",
    example: "You are a helpful coding assistant.\nAlways respond in Thai.\nFocus on practical examples.",
  },
  {
    id: "context",
    label: "Context",
    icon: "📚",
    bgColor: "bg-blue-500/10 border-blue-500/30",
    textColor: "text-blue-400",
    desc: "ข้อมูลพื้นหลังที่ช่วยให้ Claude เข้าใจสถานการณ์ เช่น เอกสาร ประวัติบทสนทนา",
    example: "[Project context]\nWe are building a web scraper in Python.\nThe user is a beginner developer.",
  },
  {
    id: "user",
    label: "User Message",
    icon: "👤",
    bgColor: "bg-emerald-500/10 border-emerald-500/30",
    textColor: "text-emerald-400",
    desc: "สิ่งที่ผู้ใช้ถามหรือสั่ง เป็นส่วนที่ Claude ตอบสนองโดยตรง",
    example: "How do I handle pagination when scraping multiple pages?",
  },
];

export default function PromptAnatomy() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        Prompt ที่ดีไม่ได้มีแค่คำถามเดียว แต่ประกอบด้วย
        <strong className="text-white"> 3 ส่วนหลัก</strong>ที่ทำงานร่วมกัน
      </p>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-5 text-center">กายวิภาค Prompt — คลิกเพื่ออ่าน</h3>
        <div className="space-y-3">
          {sections.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActive(active === s.id ? null : s.id)}
              className={`cursor-pointer rounded-xl border p-4 transition-all duration-300 ${
                active === s.id ? s.bgColor : "bg-slate-800 border-slate-700 hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{s.icon}</span>
                <span className={`font-mono text-sm font-semibold ${
                  active === s.id ? s.textColor : "text-slate-300"
                }`}>{s.label}</span>
                <span className="ml-auto text-slate-500 text-xs">{active === s.id ? "▲" : "▼"}</span>
              </div>
              {active === s.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 space-y-3"
                >
                  <p className="text-slate-300 text-sm">{s.desc}</p>
                  <pre className="p-3 rounded-lg bg-slate-950 text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap">{s.example}</pre>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-4">ตัวอย่าง Prompt สมบูรณ์</h3>
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-xs text-slate-400">prompt.txt</span>
          </div>
          <div className="p-4 space-y-2">
            <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
              <div className="text-violet-400 text-xs mb-1">// System Prompt</div>
              <div className="text-slate-300 text-sm font-mono">You are a helpful Python expert.</div>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="text-blue-400 text-xs mb-1">// Context</div>
              <div className="text-slate-300 text-sm font-mono">User is building a web scraper for news articles.</div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="text-emerald-400 text-xs mb-1">// User Message</div>
              <div className="text-slate-300 text-sm font-mono">How do I handle pagination?</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-4">เทคนิคเขียน Prompt ที่ดี</h3>
        <div className="space-y-3">
          {[
            { icon: "🎯", tip: "ระบุชัดเจน", detail: "บอก Claude ว่าต้องการอะไร format ไหน ยาวแค่ไหน" },
            { icon: "🧩", tip: "ให้ context", detail: "อธิบายสถานการณ์ เป้าหมาย และข้อจำกัดที่เกี่ยวข้อง" },
            { icon: "🎭", tip: "กำหนด role", detail: '"Act as a senior developer with 10 years experience"' },
            { icon: "📝", tip: "ให้ตัวอย่าง", detail: "Few-shot prompting: ให้ตัวอย่าง input/output ที่ต้องการ" },
          ].map((item, i) => (
            <motion.div
              key={item.tip}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800"
            >
              <span className="text-xl mt-0.5">{item.icon}</span>
              <div>
                <div className="font-semibold text-white">{item.tip}</div>
                <div className="text-sm text-slate-400 mt-0.5">{item.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
