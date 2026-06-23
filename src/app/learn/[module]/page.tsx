import { modules } from "@/lib/modules";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ module: string }>;
}

export default async function ModulePage({ params }: Props) {
  const { module: moduleId } = await params;
  const module = modules.find((m) => m.id === moduleId);
  if (!module) notFound();

  return (
    <main className="pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/learn" className="hover:text-white transition-colors">บทเรียน</Link>
          <span>/</span>
          <span className="text-slate-300">{module.title}</span>
        </div>

        {/* Module Header */}
        <div className={`p-8 rounded-2xl bg-gradient-to-br ${module.gradient} mb-8 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="text-5xl mb-4 relative">{module.icon}</div>
          <h1 className="text-3xl font-bold text-white mb-2 relative">{module.title}</h1>
          <p className="text-white/80 relative">{module.description}</p>
          <div className="flex items-center gap-4 mt-4 text-white/60 text-sm relative">
            <span>⏱ {module.estimatedTime}</span>
            <span>📚 {module.lessons.length} บทเรียน</span>
          </div>
        </div>

        {/* Lessons */}
        <div className="space-y-3">
          {module.lessons.map((lesson, i) => (
            <Link
              key={lesson.id}
              href={`/learn/${module.id}/${lesson.id}`}
              className="group flex items-center gap-4 p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500/30 transition-all duration-300 card-glow"
            >
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${module.gradient} flex items-center justify-center text-white font-bold flex-shrink-0`}
              >
                {i + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white group-hover:text-violet-300 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-slate-400">{lesson.description}</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span>{lesson.duration}</span>
                <span className="text-slate-600 group-hover:text-violet-400 transition-colors">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return modules.map((m) => ({ module: m.id }));
}
