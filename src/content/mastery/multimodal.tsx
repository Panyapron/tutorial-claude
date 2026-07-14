'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bug, Layout, FileSearch, BarChart3 } from 'lucide-react';

const useCases = [
  {
    id: 'error',
    icon: Bug,
    title: 'แปะ Screenshot ข้อผิดพลาด',
    color: 'rose',
    desc: 'ถ่ายหน้าจอ error แล้ววางให้ Claude ดู เร็วกว่าพิมพ์ error message เองทั้งหมด',
    prompt: 'นี่คือ error ที่เจอตอน build ช่วยดูหน่อยว่าเกิดจากอะไร',
  },
  {
    id: 'mockup',
    icon: Layout,
    title: 'อ่าน Mockup → เขียนโค้ด',
    color: 'violet',
    desc: 'ส่งภาพดีไซน์ UI จาก Figma หรือสก็ตช์ที่วาดมือ ให้ Claude แปลงเป็น component จริง',
    prompt: 'สร้าง React component ตามดีไซน์นี้ ใช้ Tailwind CSS',
  },
  {
    id: 'pdf',
    icon: FileSearch,
    title: 'อ่าน PDF / เอกสารสแกน',
    color: 'blue',
    desc: 'ให้ Claude สรุปสัญญา, รายงาน, หรือเอกสารสแกนที่ไม่มีตัวอักษร (image-based)',
    prompt: 'สรุปสัญญาฉบับนี้เป็น bullet 5 ข้อ',
  },
  {
    id: 'chart',
    icon: BarChart3,
    title: 'วิเคราะห์กราฟ/แผนภาพ',
    color: 'emerald',
    desc: 'ส่งภาพกราฟหรือแผนภาพสถาปัตยกรรม ให้ Claude อธิบายหรือหาความสัมพันธ์',
    prompt: 'กราฟนี้แสดงแนวโน้มอะไร มีจุดผิดปกติตรงไหนบ้าง',
  },
];

const tips = [
  'ใช้รูปที่คมชัด ความละเอียดสูงพอ ตัวหนังสืออ่านออก',
  'ส่งหลายภาพพร้อมกันได้ เช่น before/after หรือหลายหน้าของ PDF',
  'บอกบริบทชัดเจนว่าอยากให้ทำอะไรกับภาพ (อธิบาย / แปลงเป็นโค้ด / เปรียบเทียบ)',
  'ใน Claude Code ลากไฟล์ภาพวาง terminal หรือระบุ path ไฟล์ภาพได้เลย',
];

const colorMap: Record<string, string> = {
  rose: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
};

export default function MultimodalLesson() {
  const [active, setActive] = useState('error');
  const uc = useCases.find(u => u.id === active)!;
  const Icon = uc.icon;

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        Claude ไม่ได้อ่านแค่ตัวหนังสือ แต่สามารถ
        <strong className="text-white"> ดูรูปภาพ สกรีนช็อต และเอกสารได้ด้วย</strong> — แค่ลากหรือวางไฟล์แล้วถามได้เลย
      </p>

      <div className="flex gap-2 flex-wrap">
        {useCases.map(u => {
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
        <div className="flex items-center gap-2 mb-3">
          <Icon size={18} className={colorMap[uc.color].split(' ')[2]} />
          <h3 className="font-semibold text-white">{uc.title}</h3>
        </div>
        <p className="text-slate-300 text-sm mb-3">{uc.desc}</p>
        <div className="bg-slate-900 rounded-lg px-3 py-2 font-mono text-sm">
          <span className="text-slate-500">ตัวอย่าง prompt: </span>
          <span className="text-emerald-300">{uc.prompt}</span>
        </div>
      </motion.div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-4">เคล็ดลับการส่งรูปให้ได้ผลดี</h3>
        <div className="space-y-2">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-lime-400 mt-0.5 flex-shrink-0">✓</span>
              <span className="text-slate-300 text-sm">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-lime-500/5 border border-lime-500/20">
        <p className="text-sm text-slate-300 leading-relaxed">
          💡 <strong className="text-lime-400">ใน Claude Code:</strong> ลากไฟล์ภาพวางใน terminal ได้โดยตรง (หรือ paste จาก clipboard) หรือพิมพ์ path ของไฟล์ภาพใน prompt
          เช่น "ดูภาพ ./screenshot.png แล้วบอกว่าเกิดอะไรขึ้น"
        </p>
      </div>
    </div>
  );
}
