import { modules } from "@/lib/modules";
import { notFound } from "next/navigation";
import Link from "next/link";
import QuizStatus from "@/components/QuizStatus";

interface Props {
  params: Promise<{ module: string }>;
}

export default async function ModulePage({ params }: Props) {
  const { module: moduleId } = await params;
  const module = modules.find((m) => m.id === moduleId);
  if (!module) notFound();

  return (
    <main className="pt-24 pb-24 px-4 bg-apple-bg min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-apple-gray mb-8">
          <Link href="/learn" className="hover:text-apple-ink transition-colors">บทเรียน</Link>
          <span>/</span>
          <span className="text-apple-ink">{module.title}</span>
        </div>

        {/* Module Header */}
        <div className={`p-10 rounded-[32px] bg-gradient-to-br ${module.gradient} mb-10 relative overflow-hidden text-white`}>
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="text-5xl mb-4 relative drop-shadow-md">{module.icon}</div>
          <h1 className="apple-headline text-3xl sm:text-4xl mb-2 relative drop-shadow-md">{module.title}</h1>
          <p className="text-white/90 relative">{module.description}</p>
          <div className="flex items-center gap-4 mt-4 text-white/70 text-sm relative">
            <span>{module.estimatedTime}</span>
            <span>{module.lessons.length} บทเรียน</span>
          </div>
        </div>

        {/* Lessons */}
        <div className="space-y-3">
          {module.lessons.map((lesson, i) => (
            <Link
              key={lesson.id}
              href={`/learn/${module.id}/${lesson.id}`}
              className="apple-card-light group flex items-center gap-4 p-5"
            >
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${module.gradient} flex items-center justify-center text-white font-bold flex-shrink-0 relative overflow-hidden`}
              >
                <span className="absolute inset-0 bg-black/25" />
                <span className="relative">{i + 1}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-apple-ink group-hover:text-apple-blue transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-apple-gray">{lesson.description}</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-apple-gray">
                <span>{lesson.duration}</span>
                <span className="group-hover:text-apple-blue group-hover:translate-x-0.5 transition-all">›</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Quiz CTA */}
        <div className="mt-6">
          <p className="apple-eyebrow text-apple-gray mb-3">ทดสอบความเข้าใจ</p>
          <QuizStatus moduleId={module.id} gradient={module.gradient} />
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return modules.map((m) => ({ module: m.id }));
}
