import { modules } from "@/lib/modules";
import { notFound } from "next/navigation";
import Link from "next/link";
import ModuleQuiz from "@/components/ModuleQuiz";

interface Props {
  params: Promise<{ module: string }>;
}

export default async function QuizPage({ params }: Props) {
  const { module: moduleId } = await params;
  const module = modules.find((m) => m.id === moduleId);
  if (!module) notFound();

  return (
    <main className="pt-24 pb-24 px-4 bg-apple-bg min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-apple-gray mb-8 flex-wrap">
          <Link href="/learn" className="hover:text-apple-ink transition-colors">บทเรียน</Link>
          <span>/</span>
          <Link href={`/learn/${module.id}`} className="hover:text-apple-ink transition-colors">{module.title}</Link>
          <span>/</span>
          <span className="text-apple-ink">แบบทดสอบ</span>
        </div>

        <div className="mb-8">
          <p className="apple-eyebrow text-apple-gray mb-3">Quiz</p>
          <h1 className="apple-headline text-3xl sm:text-4xl text-apple-ink mb-2">
            แบบทดสอบ: {module.title}
          </h1>
          <p className="text-apple-gray">ตอบให้ครบทุกข้อแล้วกดส่งคำตอบเพื่อดูผล</p>
        </div>

        <ModuleQuiz moduleId={module.id} />

        <div className="mt-8">
          <Link href={`/learn/${module.id}`} className="text-sm text-apple-gray hover:text-apple-ink transition-colors">
            ‹ กลับไปที่โมดูล
          </Link>
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return modules.map((m) => ({ module: m.id }));
}
