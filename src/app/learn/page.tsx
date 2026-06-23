"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { modules } from "@/lib/modules";

const difficultyColors = {
  beginner: "text-emerald-400 bg-emerald-400/10",
  intermediate: "text-yellow-400 bg-yellow-400/10",
  advanced: "text-rose-400 bg-rose-400/10",
};

const difficultyLabels = {
  beginner: "เริ่มต้น",
  intermediate: "กลาง",
  advanced: "สูง",
};

export default function LearnPage() {
  return (
    <main className="pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">บทเรียนทั้งหมด</h1>
          <p className="text-slate-400">เลือกหัวข้อที่ต้องการเรียนรู้ หรือเริ่มตามลำดับที่แนะนำ</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {modules.map((module, i) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                href={`/learn/${module.id}`}
                className="group block p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-violet-500/30 card-glow transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.gradient} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h2 className="font-semibold text-white text-lg group-hover:text-violet-300 transition-colors">
                        {module.title}
                      </h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[module.difficulty]}`}>
                        {difficultyLabels[module.difficulty]}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-4">{module.description}</p>

                    <div className="space-y-1.5">
                      {module.lessons.map((lesson, j) => (
                        <div key={lesson.id} className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px] flex-shrink-0">
                            {j + 1}
                          </span>
                          <span className="flex-1 truncate">{lesson.title}</span>
                          <span>{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span>⏱ รวม {module.estimatedTime}</span>
                  <span className="text-violet-400 group-hover:text-violet-300 transition-colors">เริ่มเรียน →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
