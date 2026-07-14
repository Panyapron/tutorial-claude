'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, PenLine, Repeat2, MessageSquareText, Copy, Check } from 'lucide-react';

function PromptBox({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative bg-slate-900 rounded-xl border border-slate-700 p-4">
      <button
        onClick={copy}
        className="absolute top-3 right-3 flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-800 px-2 py-1 rounded-lg"
      >
        {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
        {copied ? 'คัดลอกแล้ว' : 'คัดลอก'}
      </button>
      <p className="text-slate-200 text-sm font-mono whitespace-pre-wrap pr-20 leading-relaxed">{text}</p>
    </div>
  );
}

const useCases = [
  {
    id: 'idea',
    icon: Lightbulb,
    title: 'คิดไอเดียคอนเทนต์',
    color: 'amber',
    desc: 'ตันไอเดีย? ให้ Claude ช่วยระดมความคิดหัวข้อโพสต์หรือสคริปต์วิดีโอ',
    prompt: `ช่วยคิดไอเดียโพสต์โซเชียลมีเดีย 10 หัวข้อ สำหรับแบรนด์ [ชื่อแบรนด์]
ที่ขาย [สินค้า/บริการ] กลุ่มเป้าหมายคือ [อายุ/ความสนใจของลูกค้า]
โทนของแบรนด์คือ [สนุกสนาน/เป็นทางการ/อบอุ่น]
ให้แต่ละไอเดียมี hook (ประโยคเปิด) ที่ดึงดูดคนดูใน 3 วินาทีแรกด้วย`,
    why: 'ยิ่งบอกรายละเอียดแบรนด์ กลุ่มเป้าหมาย และโทนชัดเจนเท่าไหร่ Claude ยิ่งคิดไอเดียที่ตรงกับแบรนด์คุณมากขึ้น',
  },
  {
    id: 'copy',
    icon: PenLine,
    title: 'เขียนแคปชั่น/โฆษณา',
    color: 'rose',
    desc: 'ให้ Claude ช่วยร่างแคปชั่น โฆษณา หรือคำอธิบายสินค้า',
    prompt: `เขียนแคปชั่น Instagram สำหรับโพสต์ขาย [ชื่อสินค้า]
จุดเด่นของสินค้า: [ใส่จุดเด่น 2-3 ข้อ]
ความยาว: ไม่เกิน 100 คำ
ใส่ emoji พอประมาณ และปิดท้ายด้วย call-to-action ให้คนกดลิงก์ในไบโอ
ขอ 3 เวอร์ชันที่โทนต่างกัน: สนุกกวนๆ / มืออาชีพน่าเชื่อถือ / อบอุ่นเป็นกันเอง`,
    why: 'การขอหลาย version พร้อมกันช่วยให้คุณเทียบและเลือกโทนที่เข้ากับแบรนด์ได้เร็วขึ้น แทนที่จะขอทีละรอบ',
  },
  {
    id: 'repurpose',
    icon: Repeat2,
    title: 'แปลงคอนเทนต์ 1 ชิ้น เป็นหลายแพลตฟอร์ม',
    color: 'violet',
    desc: 'มีบทความหรือบล็อกอยู่แล้ว? ให้ Claude ช่วยแตกเป็นโพสต์สำหรับแพลตฟอร์มอื่น',
    prompt: `นี่คือบทความของฉัน:
[วางเนื้อหาบทความตรงนี้]

ช่วยแปลงเป็น:
1. Twitter/X thread 5 ทวีต
2. โพสต์ LinkedIn ความยาว 1 ย่อหน้า โทนมืออาชีพ
3. แคปชั่น Instagram สั้นๆ พร้อม 5 แฮชแทกที่เกี่ยวข้อง`,
    why: 'ใส่เนื้อหาต้นฉบับให้ Claude อ่านครบ แล้วบอกรูปแบบผลลัพธ์ที่ต้องการทีละแพลตฟอร์ม จะได้ผลลัพธ์ตรงจุดกว่าขอทีละอย่าง',
  },
  {
    id: 'feedback',
    icon: MessageSquareText,
    title: 'สรุปความเห็นลูกค้า',
    color: 'emerald',
    desc: 'มีคอมเมนต์หรือรีวิวเยอะ? ให้ Claude ช่วยจับประเด็นสำคัญ',
    prompt: `นี่คือความคิดเห็นลูกค้าจากโพสต์ล่าสุด:
[วางคอมเมนต์/รีวิวตรงนี้]

ช่วยสรุปให้เป็น:
- ประเด็นที่ลูกค้าชอบ 3 ข้อ
- ประเด็นที่ลูกค้ากังวลหรือติ 3 ข้อ
- คำแนะนำว่าควรตอบกลับลูกค้ากลุ่มที่กังวลอย่างไร`,
    why: 'เหมาะกับตอนมีคอมเมนต์เยอะเกินจะอ่านเองทีละอัน ให้ Claude ช่วยจับประเด็นให้เร็วขึ้น',
  },
];

const colorMap: Record<string, string> = {
  amber: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  rose: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
};

export default function MarketingPrompts() {
  const [active, setActive] = useState('idea');
  const uc = useCases.find((u) => u.id === active)!;
  const Icon = uc.icon;

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        ไม่ต้องเป็นโปรแกรมเมอร์ก็ใช้ Claude ได้! หน้านี้รวม
        <strong className="text-white"> prompt สำเร็จรูปสำหรับงาน Marketing และ Content Creator</strong> คัดลอกไปแก้รายละเอียดแล้วใช้ได้เลย ไม่ต้องเขียนโค้ดเป็น
      </p>

      <div className="flex gap-2 flex-wrap">
        {useCases.map((u) => {
          const UIcon = u.icon;
          const isActive = active === u.id;
          return (
            <button
              key={u.id}
              onClick={() => setActive(u.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                isActive ? colorMap[u.color].split(' ').slice(0, 2).join(' ') + ' text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              <UIcon size={14} />
              {u.title}
            </button>
          );
        })}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl border p-5 ${colorMap[uc.color].split(' ').slice(0, 2).join(' ')}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Icon size={18} className={colorMap[uc.color].split(' ')[2]} />
          <h3 className="font-semibold text-white">{uc.title}</h3>
        </div>
        <p className="text-slate-300 text-sm mb-4">{uc.desc}</p>
        <PromptBox text={uc.prompt} />
        <div className="mt-3 bg-slate-900/60 rounded-lg p-3 border border-slate-700">
          <p className="text-xs text-slate-500 mb-1">ทำไม prompt นี้ถึงได้ผลดี:</p>
          <p className="text-slate-300 text-sm">{uc.why}</p>
        </div>
      </motion.div>

      <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
        <h3 className="text-white font-semibold mb-2">เคล็ดลับสำหรับสาย Marketing</h3>
        <ul className="space-y-2">
          {[
            'ยิ่งบอกรายละเอียดแบรนด์ (โทน, กลุ่มเป้าหมาย, จุดขาย) ชัดเจนเท่าไหร่ ยิ่งได้ผลลัพธ์ตรงใจมากขึ้น',
            'ขอหลาย version พร้อมกันแล้วเลือกเอา ดีกว่าขอทีละรอบ',
            'ถ้าผลลัพธ์ยังไม่ใช่ บอก Claude ตรงๆ ว่าอยากปรับตรงไหน เช่น "สั้นลงอีก" หรือ "โทนเป็นทางการขึ้น"',
            'เก็บ prompt ที่ใช้ได้ผลดีไว้ใช้ซ้ำ จะได้ไม่ต้องเขียนใหม่ทุกครั้ง',
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-violet-400 mt-0.5">✓</span>{tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
