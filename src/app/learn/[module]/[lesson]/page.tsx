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
    <main className="pt-24 pb-24 px-4 bg-apple-bg min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-apple-gray mb-6 flex-wrap">
          <Link href="/learn" className="hover:text-apple-ink transition-colors">บทเรียน</Link>
          <span>/</span>
          <Link href={`/learn/${moduleId}`} className="hover:text-apple-ink transition-colors">
            {module.title}
          </Link>
          <span>/</span>
          <span className="text-apple-ink">{lesson.title}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div
            className={`inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br ${module.gradient} items-center justify-center text-2xl mb-4`}
          >
            {module.icon}
          </div>
          <h1 className="apple-headline text-3xl sm:text-4xl text-apple-ink mb-2">{lesson.title}</h1>
          <div className="flex items-center gap-4 text-sm text-apple-gray">
            <span>{lesson.duration}</span>
            <span>บทที่ {lessonIndex + 1} / {module.lessons.length}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-black/5 rounded-full mb-10 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${module.gradient} rounded-full transition-all duration-700`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content — dark deep-dive panel */}
        <div className="apple-card-dark p-6 sm:p-8 text-white">
          <LessonContent moduleId={moduleId} lessonId={lessonId} />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-black/5">
          {prevLesson ? (
            <Link
              href={`/learn/${moduleId}/${prevLesson.id}`}
              className="flex items-center gap-2 text-sm text-apple-gray hover:text-apple-ink transition-colors"
            >
              ‹ {prevLesson.title}
            </Link>
          ) : (
            <Link
              href={`/learn/${moduleId}`}
              className="flex items-center gap-2 text-sm text-apple-gray hover:text-apple-ink transition-colors"
            >
              ‹ กลับไปที่โมดูล
            </Link>
          )}

          {nextLesson ? (
            <Link
              href={`/learn/${moduleId}/${nextLesson.id}`}
              className="apple-pill bg-black text-white px-5 py-2.5 text-sm hover:bg-black/80"
            >
              {nextLesson.title} ›
            </Link>
          ) : (
            <Link
              href="/learn"
              className="apple-pill bg-black text-white px-5 py-2.5 text-sm hover:bg-black/80"
            >
              หัวข้อถัดไป ›
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
