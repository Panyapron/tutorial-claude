"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { modules } from "@/lib/modules";
import LearningPath from "@/components/LearningPath";

export default function Home() {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <main>
      {/* Hero — black, full screen */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-fuchsia-600/20 via-violet-600/20 to-blue-600/20 rounded-full blur-[120px]" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="apple-eyebrow text-white/50 mb-6 relative text-center"
        >
          Learn Claude · เรียนรู้แบบเข้าใจง่าย
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="apple-headline text-center text-[2.75rem] sm:text-7xl md:text-8xl relative"
        >
          เรียนรู้ <span className="gradient-text">Claude</span>
          <br />
          แบบเข้าใจง่าย
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg sm:text-2xl text-white/60 text-center max-w-2xl relative px-2"
        >
          จาก Prompt พื้นฐาน ไปจนถึง MCP, Skills, Claude Code, Harness และ Agent Orchestration
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex items-center gap-6 flex-wrap justify-center relative"
        >
          <Link href="/learn" className="apple-pill bg-white text-black px-6 py-3 text-base hover:bg-white/90">
            เริ่มเรียนเลย
          </Link>
          <Link href="/learn/overview/what-is-claude" className="text-base text-blue-400 hover:underline flex items-center gap-1">
            Claude คืออะไร? <span>›</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 text-white/30 text-2xl"
        >
          ⌄
        </motion.div>
      </section>

      {/* Stats strip — light */}
      <section className="bg-apple-bg py-20 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: modules.length, label: "หัวข้อ" },
            { value: totalLessons, label: "บทเรียน" },
            { value: "100%", label: "ฟรี" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="apple-headline text-4xl sm:text-6xl text-apple-ink">{s.value}</div>
              <div className="mt-2 text-sm text-apple-gray">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Learning path — light */}
      <section className="bg-apple-bg pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="apple-eyebrow text-apple-gray mb-3">เส้นทางการเรียนรู้</p>
            <h2 className="apple-headline text-3xl sm:text-5xl text-apple-ink">เรียงลำดับจากง่ายไปยาก</h2>
          </motion.div>
          <LearningPath />
        </div>
      </section>

      {/* Features — dark */}
      <section className="bg-black text-white py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="apple-headline text-3xl sm:text-5xl">ทำไมต้องเรียนรู้ Claude?</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
                className="text-center"
              >
                <div className="text-4xl mb-5">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2 tracking-tight">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — light */}
      <section className="bg-apple-bg py-24 px-4 text-center">
        <h2 className="apple-headline text-2xl sm:text-4xl text-apple-ink mb-6">พร้อมเริ่มต้นหรือยัง?</h2>
        <Link href="/learn" className="apple-pill bg-black text-white px-7 py-3 text-base hover:bg-black/80 inline-flex">
          สำรวจบทเรียนทั้งหมด
        </Link>
      </section>
    </main>
  );
}
