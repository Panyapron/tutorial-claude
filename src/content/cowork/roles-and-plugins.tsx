'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Megaphone, Headphones, Code, Search } from 'lucide-react';

const roles = [
  { id: 'legal', icon: Scale, name: 'Legal', color: 'violet', plugin: 'Contract review, redline summarizer, clause lookup' },
  { id: 'marketing', icon: Megaphone, name: 'Marketing', color: 'amber', plugin: 'Content drafts, campaign brief templates, brand voice checker' },
  { id: 'support', icon: Headphones, name: 'Support', color: 'emerald', plugin: 'Ticket triage, macro suggestions, sentiment tagging' },
  { id: 'engineering', icon: Code, name: 'Engineering', color: 'blue', plugin: 'GitHub tools, code review helpers, CI log analysis' },
];

const colorMap: Record<string, string> = {
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  amber: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
};

export default function RolesAndPlugins() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        เมื่อเข้า Cowork ครั้งแรก ระบบจะให้
        <strong className="text-white"> เลือกบทบาท/ตำแหน่งงาน</strong> แล้วติดตั้ง plugin ที่เหมาะกับงานนั้นให้อัตโนมัติ
      </p>

      {/* Role picker demo */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-5 text-center">ลองเลือกบทบาทของคุณ</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {roles.map(r => {
            const RIcon = r.icon;
            const isActive = active === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActive(isActive ? null : r.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-sm transition-all ${
                  isActive ? colorMap[r.color].split(' ').slice(0, 2).join(' ') + ' text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
              >
                <RIcon size={20} className={isActive ? colorMap[r.color].split(' ')[2] : ''} />
                <span className="font-medium text-xs">{r.name}</span>
              </button>
            );
          })}
        </div>

        {active ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border p-4 ${colorMap[roles.find(r => r.id === active)!.color].split(' ').slice(0, 2).join(' ')}`}
          >
            <p className="text-xs text-slate-500 mb-1">Plugin ที่ติดตั้งให้อัตโนมัติ:</p>
            <p className="text-white text-sm font-medium">{roles.find(r => r.id === active)!.plugin}</p>
          </motion.div>
        ) : (
          <p className="text-center text-xs text-slate-500">คลิกเลือกบทบาทเพื่อดูว่าจะได้ plugin อะไรบ้าง</p>
        )}
      </div>

      {/* Free-form search */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Search size={16} className="text-slate-400" />
          <h3 className="font-semibold text-white text-sm">ไม่มีบทบาทที่ตรงกัน? พิมพ์ค้นเองได้</h3>
        </div>
        <p className="text-slate-400 text-sm mb-3">
          ถ้าบทบาทของคุณไม่อยู่ในรายการหลัก สามารถพิมพ์ชื่อตำแหน่งแบบ free-form
          ระบบจะค้นหาใน plugin marketplace ให้โดยอัตโนมัติ
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="เช่น Product Manager, HR, Finance..."
            className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-sky-500/50"
            disabled
          />
          <button className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium opacity-70 cursor-not-allowed" disabled>
            ค้นหา
          </button>
        </div>
      </div>

      <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
        <h3 className="text-white font-semibold mb-2">เคล็ดลับ</h3>
        <p className="text-slate-400 text-sm">เลือกบทบาทที่ตรงกับงานจริงของคุณมากที่สุด เพราะ plugin จะหมายความว่าคุณจะสนทนากับ Claude ด้วย tools/templates ที่เกี่ยวข้องกับงานนั้นโดยตรง เปลี่ยนบทบาทซ้ำได้หากงานเปลี่ยนไป</p>
      </div>
    </div>
  );
}
