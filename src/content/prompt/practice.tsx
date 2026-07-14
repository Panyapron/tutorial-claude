'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Sparkles } from 'lucide-react';

interface Criterion {
  label: string;
  test: (text: string) => boolean;
}

interface Scenario {
  id: string;
  title: string;
  color: string;
  task: string;
  criteria: Criterion[];
}

const scenarios: Scenario[] = [
  {
    id: 'email',
    title: 'เขียนอีเมลขอเลื่อนกำหนดส่งงาน',
    color: 'blue',
    task: 'ลองเขียน prompt เพื่อให้ Claude ช่วยร่างอีเมลขอเลื่อนกำหนดส่งงานไป 3 วัน โดยระบุ tone, ความยาว และเหตุผลให้ชัดเจน',
    criteria: [
      { label: 'ระบุสิ่งที่ต้องการ (ขอเลื่อนกำหนดส่ง)', test: t => /ขอเลื่อน|เลื่อนกำหนด|deadline|extend/i.test(t) },
      { label: 'ระบุระยะเวลา (3 วัน)', test: t => /3\s*วัน|three days|3\s*days/i.test(t) },
      { label: 'กำหนด tone หรือน้ำเสียง', test: t => /tone|สุภาพ|เป็นทางการ|professional|formal|polite/i.test(t) },
      { label: 'ให้เหตุผลประกอบ', test: t => /เหตุผล|เนื่องจาก|reason|because/i.test(t) },
    ],
  },
  {
    id: 'summary',
    title: 'สรุปบทความยาว',
    color: 'violet',
    task: 'ลองเขียน prompt เพื่อให้ Claude สรุปบทความข่าวยาวๆ ให้อยู่ในรูปแบบ bullet point และจำกัดจำนวนคำ',
    criteria: [
      { label: 'ระบุรูปแบบออกเป็น bullet point', test: t => /bullet|หัวข้อ/i.test(t) },
      { label: 'กำหนดจำนวนข้อหรือจำนวนคำชัดเจน', test: t => /\d+\s*(ข้อ|points?|words?|คำ)/i.test(t) },
      { label: 'ระบุว่าเนื้อหาคือข่าว', test: t => /ข่าว|article|news/i.test(t) },
      { label: 'ขอภาษาที่เข้าใจง่าย/ไม่ใช้ศัพท์เทคนิค', test: t => /ง่าย|plain|simple|jargon/i.test(t) },
    ],
  },
  {
    id: 'review',
    title: 'Code Review Prompt',
    color: 'emerald',
    task: 'ลองเขียน prompt เพื่อให้ Claude ช่วย review โค้ด API endpoint โดยเน้น security และกำหนดบทบาทให้ชัด',
    criteria: [
      { label: 'กำหนดบทบาท (role prompting)', test: t => /you are|คุณคือ|senior|engineer|expert/i.test(t) },
      { label: 'ระบุโฟกัส security', test: t => /security|ความปลอดภัย|vulnerabilit/i.test(t) },
      { label: 'ระบุขอบเขต (API endpoint)', test: t => /api|endpoint/i.test(t) },
      { label: 'ขอตัวอย่างประกอบ (ความเฉพาะเจาะจง)', test: t => /example|ตัวอย่าง|specific|เช่น/i.test(t) },
    ],
  },
];

const colorMap: Record<string, string> = {
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
};

export default function PracticeLesson() {
  const [activeId, setActiveId] = useState('email');
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const scenario = scenarios.find(s => s.id === activeId)!;
  const text = drafts[activeId] || '';

  const passed = useMemo(
    () => scenario.criteria.map(c => c.test(text)),
    [text, scenario]
  );
  const score = passed.filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Workshop: ฝึกเขียน Prompt</h2>
        <p className="text-slate-400">ลองเขียน prompt ของคุณเองตามโจทย์ที่กำหนด ระบบจะเช็คเกณฑ์สำคัญให้แบบ real-time</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {scenarios.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
              activeId === s.id ? colorMap[s.color].split(' ').slice(0, 2).join(' ') + ' text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      <motion.div
        key={activeId}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl border p-5 ${colorMap[scenario.color].split(' ').slice(0, 2).join(' ')}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={18} className={colorMap[scenario.color].split(' ')[2]} />
          <h3 className="text-lg font-semibold text-white">{scenario.title}</h3>
        </div>
        <p className="text-slate-300 text-sm mb-4">{scenario.task}</p>

        <textarea
          value={text}
          onChange={e => setDrafts(d => ({ ...d, [activeId]: e.target.value }))}
          placeholder="เขียน prompt ของคุณที่นี่..."
          rows={5}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 text-sm font-mono focus:outline-none focus:border-violet-500 resize-none"
        />

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">เกณฑ์การประเมิน</span>
            <span className="text-sm font-semibold text-white">{score} / {scenario.criteria.length}</span>
          </div>
          <div className="space-y-1.5">
            {scenario.criteria.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                {passed[i] ? (
                  <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                ) : (
                  <Circle size={16} className="text-slate-600 flex-shrink-0" />
                )}
                <span className={`text-sm ${passed[i] ? 'text-slate-200' : 'text-slate-500'}`}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {score === scenario.criteria.length && text.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-3"
          >
            <p className="text-green-300 text-sm font-medium">เยี่ยม! prompt ของคุณครบทุกเกณฑ์ที่สำคัญแล้ว</p>
          </motion.div>
        )}
      </motion.div>

      <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
        <p className="text-slate-400 text-sm">💡 เกณฑ์ที่เช็คเป็นการตรวจคำสำคัญแบบง่ายๆ เพื่อสอน concept เท่านั้น ไม่ได้ส่ง prompt ไปหา Claude จริง ลองนำ prompt ที่เขียนไปทดกับ Claude จริงใน Playground ดูผลลัพธ์ได้เลย!</p>
      </div>
    </div>
  );
}
