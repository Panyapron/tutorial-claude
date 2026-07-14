'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ClipboardCheck } from 'lucide-react';

interface Props {
  moduleId: string;
  gradient: string;
}

interface QuizResult {
  score: number;
  total: number;
  completedAt: number;
}

export default function QuizStatus({ moduleId, gradient }: Props) {
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(`quiz-${moduleId}`);
    if (raw) {
      try {
        setResult(JSON.parse(raw));
      } catch {
        setResult(null);
      }
    }
  }, [moduleId]);

  return (
    <Link
      href={`/learn/${moduleId}/quiz`}
      className="apple-card-light group flex items-center gap-4 p-5"
    >
      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white flex-shrink-0 relative overflow-hidden`}>
        <span className="absolute inset-0 bg-black/25" />
        <ClipboardCheck size={18} className="relative" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-apple-ink group-hover:text-apple-blue transition-colors">
          แบบทดสอบท้ายโมดูล
        </h3>
        <p className="text-sm text-apple-gray">
          {result ? `ทำแล้ว ${result.score}/${result.total} ข้อ` : 'ทดสอบความเข้าใจของคุณ'}
        </p>
      </div>
      <span className="text-sm text-apple-gray group-hover:text-apple-blue group-hover:translate-x-0.5 transition-all">
        {result ? 'ทำอีกครั้ง ›' : 'เริ่มทำ ›'}
      </span>
    </Link>
  );
}
