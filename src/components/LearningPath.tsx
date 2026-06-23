"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { modules } from "@/lib/modules";

const difficultyBadge = {
  beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  advanced: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const difficultyLabel = {
  beginner: "เริ่มต้น",
  intermediate: "กลาง",
  advanced: "สูง",
};

export default function LearningPath() {
  return (
    <div className="space-y-4">
      {modules.map((module, i) => (
        <motion.div
          key={module.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
        >
          <Link
            href={`/learn/${module.id}`}
            className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-violet-500/30 card-glow transition-all duration-300"
          >
            {/* Step number */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${module.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}
              >
                {i + 1}
              </div>
              {i < modules.length - 1 && (
                <div className="w-px h-4 bg-gradient-to-b from-slate-700 to-transparent" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xl">{module.icon}</span>
                <h3 className="font-semibold text-white group-hover:text-violet-300 transition-colors">
                  {module.title}
                </h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${difficultyBadge[module.difficulty]}`}
                >
                  {difficultyLabel[module.difficulty]}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-2">{module.description}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>⏱ {module.estimatedTime}</span>
                <span>📚 {module.lessons.length} บทเรียน</span>
              </div>
            </div>

            <div className="text-slate-600 group-hover:text-violet-400 transition-colors text-lg flex-shrink-0">
              →
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
