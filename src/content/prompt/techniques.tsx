'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, ListTree, UserCog, Ruler, ThumbsDown, ThumbsUp } from 'lucide-react';

const techniques = [
  {
    id: 'cot',
    icon: Brain,
    name: 'Chain-of-Thought',
    color: 'violet',
    tagline: 'ให้ Claude คิดเป็นขั้นตอนก่อนตอบ',
    explain: 'บอกให้ Claude แสดงเหตุผลทีละขั้นก่อนสรุปคำตอบ ช่วยให้แม่นยำขึ้นมากในโจทย์ที่ต้องคำนวณหรือใช้ตรรกะหลายขั้น',
    bad: 'What is 15% of 340 minus 12?',
    good: 'Solve step by step, showing your reasoning:\nWhat is 15% of 340 minus 12?',
    badResult: 'อาจได้คำตอบผิดถ้าโจทย์ซับซ้อน เพราะ Claude รีบตอบทันที',
    goodResult: 'Claude จะคำนวณ 15% ของ 340 ก่อน แล้วค่อยลบ 12 ทีละขั้น ลดโอกาสผิดพลาด',
  },
  {
    id: 'fewshot',
    icon: ListTree,
    name: 'Few-shot Examples',
    color: 'blue',
    tagline: 'ให้ตัวอย่างก่อนให้ทำงานจริง',
    explain: 'แสดงตัวอย่าง input/output 2-3 คู่ ก่อนให้ Claude ทำงานกับข้อมูลจริง ช่วยกำหนดรูปแบบและโทนที่ต้องการได้ชัดเจน',
    bad: 'Classify the sentiment of this review: "The food was cold and service was slow."',
    good: 'Classify sentiment as Positive/Negative/Neutral.\n\nReview: "Amazing experience!" -> Positive\nReview: "It was okay, nothing special." -> Neutral\nReview: "The food was cold and service was slow." -> ?',
    badResult: 'Claude เดารูปแบบคำตอบเอง อาจไม่ตรงกับที่ระบบต้องการ',
    goodResult: 'Claude เห็นรูปแบบชัดเจนจากตัวอย่าง แล้วตอบในรูปแบบเดียวกันทันที: Negative',
  },
  {
    id: 'role',
    icon: UserCog,
    name: 'Role Prompting',
    color: 'emerald',
    tagline: 'กำหนดบทบาทให้ Claude สวมใส่',
    explain: 'ระบุบทบาท/ความเชี่ยวชาญให้ Claude เพื่อปรับโทนและมุมมองการตอบ เช่น senior engineer, นักการตลาด, ครูสอนเด็ก',
    bad: 'Review this code.',
    good: 'You are a senior security engineer reviewing code for a fintech company. Review this code with a focus on vulnerabilities and compliance risks.',
    badResult: 'ได้ review ทั่วไป ไม่มีมุมมองเฉพาะทาง',
    goodResult: 'Claude โฟกัสไปที่ security และ compliance ตามบทบาทที่กำหนด ได้ feedback ที่ตรงจุดกว่า',
  },
  {
    id: 'constraints',
    icon: Ruler,
    name: 'Explicit Constraints',
    color: 'amber',
    tagline: 'กำหนดขอบเขตคำตอบให้ชัด',
    explain: 'ระบุ format, ความยาว, หรือข้อจำกัดอื่นๆ อย่างชัดเจน แทนที่จะปล่อยให้ Claude ตัดสินใจเอง',
    bad: 'Summarize this article.',
    good: 'Summarize this article in exactly 3 bullet points, each under 15 words. Use plain language, no jargon.',
    badResult: 'ความยาวและ format ไม่แน่นอน อาจยาวหรือสั้นเกินไป',
    goodResult: 'ได้ผลลัพธ์ที่คาดเดาได้ตรงตามที่ระบุทุกครั้ง',
  },
];

const colorMap: Record<string, string> = {
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  amber: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
};

export default function TechniquesLesson() {
  const [active, setActive] = useState('cot');
  const tech = techniques.find(t => t.id === active)!;
  const Icon = tech.icon;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">เทคนิคการเขียน Prompt</h2>
        <p className="text-slate-400">เทคนิคที่ช่วยให้ Claude ตอบได้แม่นยำและตรงความต้องการมากขึ้น</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {techniques.map(t => {
          const TIcon = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                isActive ? colorMap[t.color].split(' ').slice(0, 2).join(' ') + ' text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              <TIcon size={14} />
              {t.name}
            </button>
          );
        })}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl border p-5 ${colorMap[tech.color].split(' ').slice(0, 2).join(' ')}`}
      >
        <div className="flex items-center gap-3 mb-2">
          <Icon size={20} className={colorMap[tech.color].split(' ')[2]} />
          <div>
            <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
            <p className="text-slate-400 text-sm">{tech.tagline}</p>
          </div>
        </div>
        <p className="text-slate-300 text-sm mb-4">{tech.explain}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="min-w-0 bg-slate-900 rounded-lg border border-red-500/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsDown size={14} className="text-red-400" />
              <span className="text-red-300 text-xs font-semibold">ไม่ดี</span>
            </div>
            <pre className="text-slate-300 text-sm font-mono whitespace-pre-wrap break-words mb-2">{tech.bad}</pre>
            <p className="text-slate-500 text-xs">{tech.badResult}</p>
          </div>
          <div className="min-w-0 bg-slate-900 rounded-lg border border-green-500/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp size={14} className="text-green-400" />
              <span className="text-green-300 text-xs font-semibold">ดีกว่า</span>
            </div>
            <pre className="text-slate-300 text-sm font-mono whitespace-pre-wrap break-words mb-2">{tech.good}</pre>
            <p className="text-slate-500 text-xs">{tech.goodResult}</p>
          </div>
        </div>
      </motion.div>

      <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
        <h3 className="text-white font-semibold mb-2">เคล็ดลับ: ผสมเทคนิคเข้าด้วยกัน</h3>
        <p className="text-slate-400 text-sm">เทคนิคเหล่านี้ใช้ร่วมกันได้ เช่น ให้ role + constraints + few-shot ในพร้อมท์เดียว ยิ่งชัดเจนหลายมิติ Claude ยิ่งตอบตรงเป้ามากขึ้น</p>
      </div>
    </div>
  );
}
