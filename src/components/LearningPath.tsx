"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { modules } from "@/lib/modules";

const difficultyBadge = {
  beginner: "text-emerald-600 bg-emerald-50",
  intermediate: "text-amber-600 bg-amber-50",
  advanced: "text-rose-600 bg-rose-50",
};

const difficultyLabel = {
  beginner: "เริ่มต้น",
  intermediate: "กลาง",
  advanced: "สูง",
};

export default function LearningPath() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {modules.map((module, i) => (
        <motion.div
          key={module.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <Link
            href={`/learn/${module.id}`}
            className="apple-card-light group flex items-start gap-4 p-6 h-full"
          >
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${module.gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-sm`}
            >
              {module.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-semibold text-apple-ink tracking-tight group-hover:text-apple-blue transition-colors">
                  {module.title}
                </h3>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${difficultyBadge[module.difficulty]}`}
                >
                  {difficultyLabel[module.difficulty]}
                </span>
              </div>
              <p className="text-sm text-apple-gray mb-2 leading-relaxed">{module.description}</p>
              <div className="flex items-center gap-4 text-xs text-apple-gray">
                <span>{module.estimatedTime}</span>
                <span>{module.lessons.length} บทเรียน</span>
              </div>
            </div>

            <div className="text-apple-gray group-hover:text-apple-blue group-hover:translate-x-0.5 transition-all text-lg flex-shrink-0">
              ›
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
