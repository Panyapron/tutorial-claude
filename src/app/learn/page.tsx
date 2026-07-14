"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { modules } from "@/lib/modules";

const difficultyColors = {
  beginner: "text-emerald-600 bg-emerald-50",
  intermediate: "text-amber-600 bg-amber-50",
  advanced: "text-rose-600 bg-rose-50",
};

const difficultyLabels = {
  beginner: "เริ่มต้น",
  intermediate: "กลาง",
  advanced: "สูง",
};

export default function LearnPage() {
  return (
    <main className="pt-24 pb-24 px-4 bg-apple-bg min-h-screen">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <p className="apple-eyebrow text-apple-gray mb-3">Curriculum</p>
          <h1 className="apple-headline text-3xl sm:text-5xl text-apple-ink mb-3">บทเรียนทั้งหมด</h1>
          <p className="text-apple-gray">เลือกหัวข้อที่ต้องการเรียนรู้ หรือเริ่มตามลำดับที่แนะนำ</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {modules.map((module, i) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={`/learn/${module.id}`}
                className="apple-card-light group block p-7 h-full"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${module.gradient} flex items-center justify-center text-3xl flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300`}
                  >
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h2 className="font-semibold text-apple-ink text-lg tracking-tight group-hover:text-apple-blue transition-colors">
                        {module.title}
                      </h2>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full ${difficultyColors[module.difficulty]}`}>
                        {difficultyLabels[module.difficulty]}
                      </span>
                    </div>
                    <p className="text-sm text-apple-gray mb-4 leading-relaxed">{module.description}</p>

                    <div className="space-y-1.5">
                      {module.lessons.map((lesson, j) => (
                        <div key={lesson.id} className="flex items-center gap-2 text-xs text-apple-gray">
                          <span className="w-4 h-4 rounded-full bg-black/5 flex items-center justify-center text-[10px] flex-shrink-0">
                            {j + 1}
                          </span>
                          <span className="flex-1 truncate">{lesson.title}</span>
                          <span>{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-apple-gray">
                  <span>รวม {module.estimatedTime}</span>
                  <span className="text-apple-blue group-hover:underline">เริ่มเรียน ›</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
