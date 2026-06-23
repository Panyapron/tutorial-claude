"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const servers = [
  { id: "github", name: "GitHub MCP", icon: "🐙", desc: "อ่าน/เขียน repos, PRs, Issues", color: "from-slate-600 to-slate-700" },
  { id: "fs", name: "Filesystem", icon: "📁", desc: "อ่าน/เขียน ไฟล์ในเครื่อง", color: "from-blue-600 to-blue-700" },
  { id: "web", name: "Web Fetch", icon: "🌐", desc: "ดึงข้อมูลจาก URL", color: "from-emerald-600 to-emerald-700" },
  { id: "custom", name: "Custom MCP", icon: "🔧", desc: "Server ที่สร้างเอง", color: "from-violet-600 to-violet-700" },
];

export default function MCPConcept() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        MCP (Model Context Protocol) คือ
        <strong className="text-white"> มาตรฐานเปิด</strong>ที่ช่วยให้ Claude
        เชื่อมต่อกับ tools, databases และ services ภายนอกได้อย่างเป็นระบบ
      </p>

      <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
        <h3 className="font-semibold text-amber-400 mb-2">🔌 อุปมา: USB-C</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          เหมือน USB-C ที่เป็น "ปลั๊กมาตรฐาน" สำหรับอุปกรณ์ต่างๆ
          MCP เป็น "โปรโตคอลมาตรฐาน" ที่ทำให้ Claude ต่อกับ tools ต่างๆ ได้
          โดยไม่ต้องเขียนโค้ดเชื่อมต่อใหม่ทุกครั้ง
        </p>
      </div>

      {/* Interactive diagram */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-6 text-center">MCP Architecture — คลิก Server เพื่อดู</h3>

        <div className="flex flex-col items-center gap-6">
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="px-6 py-4 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 text-center shadow-lg shadow-violet-500/20"
          >
            <div className="text-3xl mb-1">💻</div>
            <div className="font-bold text-white">Claude Code</div>
            <div className="text-xs text-violet-200">MCP Client</div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {servers.map((s, i) => (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <motion.div
                  animate={{ opacity: active === s.id ? 1 : [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  className={`w-px h-8 ${active === s.id ? "bg-violet-400" : "bg-slate-600"}`}
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActive(active === s.id ? null : s.id)}
                  className={`cursor-pointer w-28 p-3 rounded-xl bg-gradient-to-br ${s.color} text-center transition-all duration-300 ${
                    active === s.id ? "ring-2 ring-violet-400 shadow-lg" : ""
                  }`}
                >
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-xs font-medium text-white leading-tight">{s.name}</div>
                </motion.div>
              </div>
            ))}
          </div>

          {active && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full p-4 rounded-xl bg-slate-800 border border-violet-500/30"
            >
              {servers.filter((s) => s.id === active).map((s) => (
                <div key={s.id} className="flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <div className="font-medium text-white">{s.name}</div>
                    <div className="text-sm text-slate-400">{s.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* How it works steps */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">MCP ทำงานอย่างไร?</h3>
        <div className="space-y-3">
          {[
            { n: "1", title: "Claude ต้องการข้อมูล", desc: "เช่น ต้องการอ่านไฟล์หรือค้นหาข้อมูลบน GitHub" },
            { n: "2", title: "เรียก MCP Client", desc: "Claude Code ส่ง request ไปยัง MCP Client ที่ config ไว้" },
            { n: "3", title: "MCP Server ทำงาน", desc: "Server รับ request และทำงาน เช่น อ่านไฟล์, call API" },
            { n: "4", title: "ส่งผลลัพธ์กลับ", desc: "ข้อมูลถูกใส่เข้าไปใน context ของ Claude เพื่อใช้ตอบสนอง" },
          ].map((item, i) => (
            <motion.div
              key={item.n}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {item.n}
              </div>
              <div>
                <div className="font-medium text-white">{item.title}</div>
                <div className="text-sm text-slate-400">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
