"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { modules } from "@/lib/modules";
import LearningPath from "@/components/LearningPath";

export default function Home() {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute top-60 -left-40 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              สำหรับมือใหม่ ไม่ต้องมีพื้นฐาน
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight"
          >
            เรียนรู้{" "}
            <span className="gradient-text">Claude</span>
            <br />
            แบบเข้าใจง่าย
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            จาก Prompt พื้นฐาน ไปจนถึง MCP, Skills, Claude Code และ Harness
            ด้วยภาพ visualize และตัวอย่างที่จับต้องได้
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link
              href="/learn"
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-violet-500/25"
            >
              เริ่มเรียนเลย →
            </Link>
            <Link
              href="/learn/overview/what-is-claude"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-medium transition-all duration-200 border border-slate-700"
            >
              Claude คืออะไร?
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-8 mt-14 text-sm text-slate-500"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl font-bold text-white">{modules.length}</span>
              <span>หัวข้อ</span>
            </div>
            <div className="w-px h-10 bg-slate-800" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl font-bold text-white">{totalLessons}</span>
              <span>บทเรียน</span>
            </div>
            <div className="w-px h-10 bg-slate-800" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl font-bold text-white">100%</span>
              <span>ฟรี</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-3">เส้นทางการเรียนรู้</h2>
            <p className="text-slate-400">เรียงลำดับจากง่ายไปยาก สร้างความเข้าใจที่แน่น</p>
          </motion.div>
          <LearningPath />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-3">ทำไมต้องเรียนรู้ Claude?</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "Visual & Interactive", desc: "ทุกแนวคิดมาพร้อม diagram และ animation ที่เข้าใจได้ทันที" },
              { icon: "🚀", title: "ปฏิบัติได้จริง", desc: "ตัวอย่างและ workshop ที่นำไปใช้ได้จริง ไม่ใช่แค่ทฤษฎี" },
              { icon: "📈", title: "เรียนตามลำดับ", desc: "เส้นทางที่ออกแบบมาดี จากพื้นฐานไปจนถึงขั้นสูง" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 card-glow"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
