'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { quizzes } from '@/lib/quizzes';

interface Props {
  moduleId: string;
}

export default function ModuleQuiz({ moduleId }: Props) {
  const questions = quizzes[moduleId] || [];
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const selectAnswer = (qIndex: number, optIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => prev.map((a, i) => (i === qIndex ? optIndex : a)));
  };

  const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0);
  const allAnswered = answers.every((a) => a !== null);

  const submit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `quiz-${moduleId}`,
        JSON.stringify({ score, total: questions.length, completedAt: Date.now() })
      );
    }
  };

  const retry = () => {
    setAnswers(questions.map(() => null));
    setSubmitted(false);
  };

  if (questions.length === 0) {
    return (
      <div className="apple-card-light p-6 text-center text-apple-gray">
        ยังไม่มีแบบทดสอบสำหรับโมดูลนี้
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="apple-card-light p-6 text-center"
        >
          <div className="text-4xl mb-2">
            {score === questions.length ? '🎉' : score >= questions.length / 2 ? '👍' : '📚'}
          </div>
          <h3 className="apple-headline text-2xl text-apple-ink mb-1">
            คุณได้ {score} จาก {questions.length} ข้อ
          </h3>
          <p className="text-apple-gray text-sm mb-4">
            {score === questions.length
              ? 'เยี่ยมมาก! เข้าใจเนื้อหาครบถ้วน'
              : score >= questions.length / 2
              ? 'ดีมาก ลองทบทวนข้อที่พลาดดูอีกครั้ง'
              : 'ลองกลับไปทบทวนบทเรียนแล้วมาทำใหม่นะ'}
          </p>
          <button
            onClick={retry}
            className="apple-pill bg-black text-white px-5 py-2.5 text-sm hover:bg-black/80 inline-flex items-center gap-2"
          >
            <RotateCcw size={14} /> ทำอีกครั้ง
          </button>
        </motion.div>
      )}

      {questions.map((q, qi) => (
        <div key={qi} className="apple-card-light p-5">
          <p className="font-medium text-apple-ink mb-3">
            {qi + 1}. {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              const isSelected = answers[qi] === oi;
              const isCorrect = oi === q.correctIndex;
              let style = 'border-black/10 hover:border-black/20';
              if (submitted) {
                if (isCorrect) style = 'border-emerald-500 bg-emerald-50';
                else if (isSelected && !isCorrect) style = 'border-rose-500 bg-rose-50';
              } else if (isSelected) {
                style = 'border-apple-blue bg-blue-50';
              }
              return (
                <button
                  key={oi}
                  onClick={() => selectAnswer(qi, oi)}
                  disabled={submitted}
                  className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all flex items-center justify-between gap-2 ${style}`}
                >
                  <span className="text-apple-ink">{opt}</span>
                  {submitted && isCorrect && <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />}
                  {submitted && isSelected && !isCorrect && <XCircle size={16} className="text-rose-500 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted && (
        <button
          onClick={submit}
          disabled={!allAnswered}
          className="apple-pill bg-black text-white px-6 py-3 text-base hover:bg-black/80 disabled:opacity-30 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          ส่งคำตอบ
        </button>
      )}
    </div>
  );
}
