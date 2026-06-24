'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Link2, FolderOpen, ChevronDown } from 'lucide-react';

const topics = [
  {
    id: 'dynamic-args',
    icon: Zap,
    title: 'Dynamic Arguments',
    color: 'violet',
    desc: 'รับ argument แบบยืดหยุ่น',
    content: (
      <div className="space-y-3">
        <p className="text-slate-300">$ARGUMENTS รับสิ่งที่พิมพ์ตามหลัง /command ทั้งหมด สามารถใช้ได้หลายแบบ:</p>
        <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
          <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 text-xs text-slate-400">deploy.md</div>
          <pre className="p-4 text-sm font-mono text-slate-300 whitespace-pre">{`Deploy the application to $ARGUMENTS environment.

Steps:
1. Run tests first
2. Build the project
3. Deploy to $ARGUMENTS
4. Run smoke tests
5. Notify the team`}</pre>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {[
            { cmd: '/deploy staging', result: 'ติดตั้งไปยัง staging environment' },
            { cmd: '/deploy production', result: 'ติดตั้งไปยัง production environment' },
          ].map((ex, i) => (
            <div key={i} className="flex items-center gap-3 bg-slate-900 rounded-lg px-3 py-2 border border-slate-700">
              <span className="text-violet-300 font-mono text-sm">{ex.cmd}</span>
              <span className="text-slate-500">→</span>
              <span className="text-slate-400 text-sm">{ex.result}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'file-reading',
    icon: FolderOpen,
    title: 'File Reading in Skills',
    color: 'blue',
    desc: 'ให้ Claude อ่านไฟล์ประกอบ',
    content: (
      <div className="space-y-3">
        <p className="text-slate-300">ใช้ @ syntax ใน skill.md เพื่ออ้างอิงไฟล์ในโปรเจกต์:</p>
        <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
          <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 text-xs text-slate-400">security-audit.md</div>
          <pre className="p-4 text-sm font-mono text-slate-300 whitespace-pre">{`Perform a security audit on: $ARGUMENTS

Our security standards are defined in:
@docs/security-standards.md

OWASP checklist reference:
@docs/owasp-checklist.md

Check against all items above.`}</pre>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
          <p className="text-blue-300 text-sm">คือเวลา Claude รัน skill จะอ่านไฟล์ที่ระบุด้วย @ อัตโนมัติแล้วเพิ่มเข้าใน context</p>
        </div>
      </div>
    ),
  },
  {
    id: 'chaining',
    icon: Link2,
    title: 'Skill Chaining',
    color: 'emerald',
    desc: 'ใช้ skill ต่อเนื่องกัน',
    content: (
      <div className="space-y-3">
        <p className="text-slate-300">สร้าง workflow ส่งต่อโดยบอกใน skillว่าให้ใช้ skill อื่นต่อ:</p>
        <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
          <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 text-xs text-slate-400">ship.md</div>
          <pre className="p-4 text-sm font-mono text-slate-300 whitespace-pre">{`Prepare $ARGUMENTS for release:

1. First run /review $ARGUMENTS
2. Fix any critical issues found
3. Then run /test $ARGUMENTS  
4. Update CHANGELOG.md
5. Create release tag: v$ARGUMENTS`}</pre>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
          <p className="text-emerald-300 text-sm">รันด้วย <span className="font-mono bg-slate-700 px-1 rounded">/ship 2.1.0</span> — Claude จะ review, test และ release ให้เอง</p>
        </div>
      </div>
    ),
  },
];

const realSkills = [
  { name: '/commit', desc: 'สร้าง commit message อัตโนมัติจาก staged changes', color: 'violet' },
  { name: '/docs', desc: 'สร้าง documentation จากโค้ดที่เลือก', color: 'blue' },
  { name: '/explain', desc: 'อธิบายโค้ดสำหรับคนใหม่ในทีม', color: 'emerald' },
  { name: '/optimize', desc: 'วิเคราะห์และเสนอความเร็วที่ดีขึ้น', color: 'amber' },
  { name: '/translate', desc: 'แปล comment/docs เป็นภาษาที่ระบุ', color: 'orange' },
  { name: '/pr', desc: 'สร้าง PR description พร้อม test plan', color: 'pink' },
];

const colorMap: Record<string, string> = {
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  amber: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  orange: 'border-orange-500/40 bg-orange-500/10 text-orange-400',
  pink: 'border-pink-500/40 bg-pink-500/10 text-pink-400',
};

export default function AdvancedSkillsLesson() {
  const [openTopic, setOpenTopic] = useState<string | null>('dynamic-args');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Advanced Skills</h2>
        <p className="text-slate-400">เทคนิคขั้นสูงเพื่อสร้าง skills ที่ยืดหยุ่นและส่งผลได้จริง</p>
      </div>

      <div className="space-y-2">
        {topics.map(topic => {
          const Icon = topic.icon;
          const isOpen = openTopic === topic.id;
          return (
            <div key={topic.id} className={`rounded-xl border overflow-hidden ${isOpen ? colorMap[topic.color].split(' ').slice(0,2).join(' ') : 'border-slate-700 bg-slate-800/50'}`}>
              <button
                onClick={() => setOpenTopic(isOpen ? null : topic.id)}
                className="w-full flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={isOpen ? colorMap[topic.color].split(' ')[2] : 'text-slate-400'} />
                  <span className="font-semibold text-white">{topic.title}</span>
                  <span className="text-slate-400 text-sm hidden md:inline">— {topic.desc}</span>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-5"
                  >
                    {topic.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div>
        <h3 className="text-white font-semibold mb-3">ตัวอย่าง Skills ที่มีประโยชน์</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {realSkills.map((skill, i) => (
            <div key={i} className={`flex items-start gap-3 rounded-lg border p-3 ${colorMap[skill.color].split(' ').slice(0,2).join(' ')}`}>
              <span className={`font-mono text-sm font-bold ${colorMap[skill.color].split(' ')[2]}`}>{skill.name}</span>
              <p className="text-slate-300 text-sm">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
        <h3 className="text-white font-semibold mb-3">💡 เคล็ด: ใช้ CLAUDE.md + Skills ร่วมกัน</h3>
        <p className="text-slate-400 text-sm mb-2">ใส่ context ใน <code className="bg-slate-700 px-1 rounded">CLAUDE.md</code> เช่น coding standards แล้ว skills จะ reference ได้ทันที โดยไม่ต้องพิมพ์ซ้ำ:</p>
        <div className="bg-slate-900 rounded-lg border border-slate-700 p-3 font-mono text-sm">
          <p className="text-slate-500"># CLAUDE.md</p>
          <p className="text-slate-300">We use TypeScript strict mode.</p>
          <p className="text-slate-300">Tests must cover edge cases.</p>
          <p className="text-slate-300">PRs need a test plan.</p>
          <p className="text-violet-300 mt-2"># skills/review.md จะรู้ standards เหล่านี้อัตโนมัติ</p>
        </div>
      </div>
    </div>
  );
}
