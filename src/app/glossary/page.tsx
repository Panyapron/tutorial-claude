'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const terms = [
  { term: 'Token', category: 'โมเดล', desc: 'หน่วยย่อยของข้อความที่ Claude ใช้ประมวลผล อาจเป็นคำ ส่วนของคำ หรืออักขระ', link: '/learn/overview/how-it-works' },
  { term: 'Context Window', category: 'โมเดล', desc: "'หน้าต่าง' ที่ Claude มองเห็นข้อมูลทั้งหมดในครั้งนั้น รวมทุกอย่างที่ส่งเข้าไปในบทสนทนา", link: '/learn/overview/how-it-works' },
  { term: 'Extended Thinking', category: 'โมเดล', desc: 'โหมดที่ Claude ใช้เวลาคิดหลายขั้นตอนก่อนตอบ เหมาะกับโจทย์ซับซ้อน', link: '/learn/mastery/extended-thinking' },
  { term: 'System Prompt', category: 'Prompt', desc: 'คำสั่งเริ่มต้นที่กำหนดบุคลิกและขอบเขตของ Claude ก่อนเริ่มบทสนทนา', link: '/learn/prompt/anatomy' },
  { term: 'Chain-of-Thought', category: 'Prompt', desc: 'เทคนิคให้ Claude คิดเป็นขั้นตอนก่อนสรุปคำตอบ ช่วยเพิ่มความแม่นยำในโจทย์ซับซ้อน', link: '/learn/prompt/techniques' },
  { term: 'Few-shot Prompting', category: 'Prompt', desc: 'ให้ตัวอย่าง input/output ก่อนให้ Claude ทำงานจริง เพื่อกำหนดรูปแบบที่ต้องการ', link: '/learn/prompt/techniques' },
  { term: 'CLAUDE.md', category: 'Claude Code', desc: 'ไฟล์ context ที่ Claude Code อ่านทุกครั้งที่เริ่ม session เก็บข้อมูลเกี่ยวกับโปรเจกต์', link: '/learn/mastery/claude-md-context' },
  { term: 'MCP', category: 'MCP', desc: 'Model Context Protocol — มาตรฐานเปิดที่ช่วยให้ Claude เชื่อมต่อกับ tools และข้อมูลภายนอก', link: '/learn/mcp/concept' },
  { term: 'MCP Server', category: 'MCP', desc: 'โปรแกรมที่ให้บริการ tools/resources ตามมาตรฐาน MCP เช่น GitHub, Filesystem', link: '/learn/mcp/servers' },
  { term: 'Skill (skill.md)', category: 'Skills', desc: 'ไฟล์ Markdown ที่กำหนด instructions ให้ Claude ทำงานผ่าน slash command', link: '/learn/skills/what-are-skills' },
  { term: 'Slash Command', category: 'Skills', desc: 'คำสั่งรูปแบบ /command-name ที่เรียกใช้ skill ที่กำหนดไว้', link: '/learn/skills/what-are-skills' },
  { term: 'Hook', category: 'Harness', desc: 'โปรแกรม shell ที่ Harness เรียกอัตโนมัติตามจุดสำคัญใน session เช่น PreToolUse, PostToolUse', link: '/learn/harness/hooks' },
  { term: 'Permission', category: 'Harness', desc: 'การกำหนดว่า Claude ใช้ tool ใดได้บ้างโดยไม่ต้องขออนุญาตทุกครั้ง', link: '/learn/harness/permissions' },
  { term: 'Harness', category: 'Harness', desc: 'ระบบที่ห่อหุ้ม Claude Code ควบคุมพฤติกรรมการทำงานตั้งแต่ hooks ถึง permissions', link: '/learn/harness/overview' },
  { term: 'Subagent', category: 'Agents', desc: 'Claude อีกตัวที่ถูก spawn ขึ้นมาเฉพาะงาน มี context window แยกจากตัวหลัก', link: '/learn/agents/what-are-subagents' },
  { term: 'Task Tool', category: 'Agents', desc: 'เครื่องมือที่ Main Agent ใช้เรียกเพื่อมอบหมายงานให้ subagent', link: '/learn/agents/what-are-subagents' },
  { term: 'Claude Agent SDK', category: 'Agents', desc: 'ชุดเครื่องมือสำหรับสร้าง AI agent ของตัวเองด้วยโค้ด นอกเหนือจาก Claude Code', link: '/learn/agents/agent-sdk' },
  { term: 'Cowork', category: 'Cowork', desc: 'พื้นที่ทำงานบนเว็บที่เปิดให้ทุกตำแหน่งงานใช้ Claude ได้ ไม่ใช่แค่ developer', link: '/learn/cowork/what-is-cowork' },
  { term: 'Plugin', category: 'Cowork', desc: 'ชุดเครื่องมือ/เทมเพลตที่ติดตั้งอัตโนมัติตามบทบาทที่เลือกใน Cowork', link: '/learn/cowork/roles-and-plugins' },
  { term: 'Backlink', category: 'Notes', desc: 'เส้นทางย้อนกลับที่บอกว่าโนตหนึ่งถูกอ้างถึงจากโนตไหนบ้าง หัวใจของ networked note-taking', link: '/learn/notes/what-is-networked-notes' },
  { term: 'Zettelkasten', category: 'Notes', desc: 'ระเบียบวิธีจดบันทึกแบบเครือข่าย เน้นโนตอะตอมมิกที่เชื่อมโยงกันอิสระ', link: '/learn/notes/what-is-networked-notes' },
];

const categories = ['ทั้งหมด', 'โมเดล', 'Prompt', 'Claude Code', 'MCP', 'Skills', 'Harness', 'Agents', 'Cowork', 'Notes'];

export default function GlossaryPage() {
  const [filter, setFilter] = useState('ทั้งหมด');
  const filtered = filter === 'ทั้งหมด' ? terms : terms.filter((t) => t.category === filter);

  return (
    <main className="pt-24 pb-24 px-4 bg-apple-bg min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <p className="apple-eyebrow text-apple-gray mb-3">Glossary</p>
          <h1 className="apple-headline text-3xl sm:text-5xl text-apple-ink mb-3">อภิธานศัพท์</h1>
          <p className="text-apple-gray">คำศัพท์สำคัญที่ใช้ตลอดคอร์สนี้ พร้อมลิงก์ไปบทเรียนที่เกี่ยวข้อง</p>
        </div>

        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === c ? 'bg-black text-white' : 'bg-white text-apple-gray border border-black/10 hover:border-black/20'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((t, i) => (
            <motion.div
              key={t.term}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="apple-card-light p-5"
            >
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="font-semibold text-apple-ink">{t.term}</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/5 text-apple-gray">{t.category}</span>
              </div>
              <p className="text-sm text-apple-gray mb-3 leading-relaxed">{t.desc}</p>
              <Link href={t.link} className="text-sm text-apple-blue hover:underline">
                ไปบทเรียนที่เกี่ยวข้อง ›
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
