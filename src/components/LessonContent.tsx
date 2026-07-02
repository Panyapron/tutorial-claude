"use client";
import { useEffect, useState } from "react";
import { lessonLoaders } from "@/lib/lesson-loaders";

interface Props {
  moduleId: string;
  lessonId: string;
}

export default function LessonContent({ moduleId, lessonId }: Props) {
  const [Content, setContent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    const loader = lessonLoaders[`${moduleId}/${lessonId}`];
    if (!loader) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    loader()
      .then((mod) => {
        setContent(() => mod.default);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [moduleId, lessonId]);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-slate-800 rounded w-3/4" />
        <div className="h-4 bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-800 rounded w-5/6" />
        <div className="h-32 bg-slate-800 rounded-xl mt-6" />
      </div>
    );
  }

  if (notFound || !Content) {
    return (
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center">
        <div className="text-5xl mb-4">🚧</div>
        <h3 className="text-xl font-semibold text-white mb-2">กำลังสร้างเนื้อหา</h3>
        <p className="text-slate-400">บทเรียนนี้กำลังอยู่ในระหว่างการจัดทำ โปรดติดตามในไม่ช้า</p>
      </div>
    );
  }

  return (
    <div className="lesson-content">
      <Content />
    </div>
  );
}
