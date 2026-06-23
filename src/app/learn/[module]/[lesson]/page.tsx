import { modules } from "@/lib/modules";
import { notFound } from "next/navigation";
import Link from "next/link";
import LessonContent from "@/components/LessonContent";

interface Props {
  params: Promise<{ module: string; lesson: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { module: moduleId, lesson: lessonId } = await params;
  const module = modules.find((m) => m.id === moduleId);
  const lesson = module?.lessons.find((l) => l.id === lessonId);
  if (!module || !lesson) notFound();

  const lessonIndex = module.lessons.findIndex((l) => l.id === lessonId);
  const nextLesson = module.lessons[lessonIndex + 1];
  const prevLesson = module.lessons[lessonIndex - 1];
  const progress = ((lessonIndex + 1) / module.lessons.length) * 100;

  return (
    <main className="pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
          <Link href="/learn" className="hover:text-white transition-colors">บทเรียน</Link>
          <span>/</span>
          <Link href={`/learn/${moduleId}`} className="hover:text-white transition-colors">
            {module.title}
          </Link>
          <span>/</span>
          <span className="text-slate-300">{lesson.title}</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <div
            className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${module.gradient} items-center justify-center text-2xl mb-3`}
          >
            {module.icon}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>⏱ {lesson.duration}</span>
            <span>บทที่ {lessonIndex + 1} / {module.lessons.length}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-slate-800 rounded-full mb-8 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${module.gradient} rounded-full transition-all duration-700`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <LessonContent moduleId={moduleId} lessonId={lessonId} />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-800">
          {prevLesson ? (
            <Link
              href={`/learn/${moduleId}/${prevLesson.id}`}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              ← {prevLesson.title}
            </Link>
          ) : (
            <Link
              href={`/learn/${moduleId}`}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              ← กลับไปที่โมดูล
            </Link>
          )}

          {nextLesson ? (
            <Link
              href={`/learn/${moduleId}/${nextLesson.id}`}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${module.gradient} text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md`}
            >
              {nextLesson.title} →
            </Link>
          ) : (
            <Link
              href="/learn"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${module.gradient} text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md`}
            >
              หัวข้อถัดไป →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return modules.flatMap((m) =>
    m.lessons.map((l) => ({ module: m.id, lesson: l.id }))
  );
}
