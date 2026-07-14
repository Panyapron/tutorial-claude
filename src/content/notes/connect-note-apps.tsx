'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileStack, FolderOpen } from 'lucide-react';

const apps = [
  {
    id: 'obsidian',
    icon: BookOpen,
    name: 'Obsidian',
    color: 'violet',
    desc: 'แอพโน้ตที่เก็บไฟล์เป็น Markdown มี backlink graph ในตัว',
    config: '{\n  "mcpServers": {\n    "obsidian": {\n      "command": "npx",\n      "args": ["-y", "mcp-obsidian"],\n      "env": {\n        "VAULT_PATH": "/Users/you/ObsidianVault"\n      }\n    }\n  }\n}',
    tools: ['search_notes', 'read_note', 'get_backlinks', 'create_note'],
  },
  {
    id: 'notion',
    icon: FileStack,
    name: 'Notion',
    color: 'slate',
    desc: 'เวิร์กสเปซที่นิยมสำหรับทีม มี API เปิดให้เชื่อมต่อได้',
    config: '{\n  "mcpServers": {\n    "notion": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-notion"],\n      "env": {\n        "NOTION_API_KEY": "secret_..."\n      }\n    }\n  }\n}',
    tools: ['query_database', 'get_page', 'search', 'create_page'],
  },
  {
    id: 'markdown',
    icon: FolderOpen,
    name: 'Markdown Vault',
    color: 'blue',
    desc: 'โฟลเดอร์ .md ธรรมดา เชื่อมด้วย Filesystem MCP โดยไม่ต้องใช้แอพเฉพาะ',
    config: '{\n  "mcpServers": {\n    "filesystem": {\n      "command": "npx",\n      "args": [\n        "@modelcontextprotocol/server-filesystem",\n        "/Users/you/notes"\n      ]\n    }\n  }\n}',
    tools: ['read_file', 'write_file', 'search_files', 'list_directory'],
  },
];

const colorMap: Record<string, string> = {
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  slate: 'border-slate-500/40 bg-slate-500/10 text-slate-300',
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
};

export default function ConnectNoteApps() {
  const [active, setActive] = useState('obsidian');
  const app = apps.find(a => a.id === active)!;
  const Icon = app.icon;

  return (
    <div className="space-y-8">
      <p className="text-slate-300 text-lg leading-relaxed">
        เมื่อเข้าใจแนวคิด networked note-taking แล้ว ขั้นตอนต่อไปคือ
        <strong className="text-white"> เชื่อม Claude เข้ากับแอพโน้ตของคุณผ่าน MCP</strong> เพื่อให้ Claude อ่านและเขียนโนตจริงได้
      </p>

      <div>
        <h3 className="text-xl font-semibold text-white mb-4">เลือกแอพโน้ตของคุณ</h3>
        <div className="flex gap-2 flex-wrap mb-4">
          {apps.map(a => {
            const AIcon = a.icon;
            const isActive = active === a.id;
            return (
              <button
                key={a.id}
                onClick={() => setActive(a.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  isActive ? colorMap[a.color].split(' ').slice(0, 2).join(' ') + ' text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
              >
                <AIcon size={14} />
                {a.name}
              </button>
            );
          })}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className={`min-w-0 rounded-xl border p-4 ${colorMap[app.color].split(' ').slice(0, 2).join(' ')}`}>
            <div className="flex items-center gap-2 mb-2">
              <Icon size={18} className={colorMap[app.color].split(' ')[2]} />
              <span className="font-semibold text-white">{app.name}</span>
            </div>
            <p className="text-slate-300 text-sm mb-4">{app.desc}</p>
            <p className="text-xs text-slate-500 font-semibold mb-1">AVAILABLE TOOLS</p>
            <div className="flex flex-wrap gap-1">
              {app.tools.map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300 font-mono">{t}</span>
              ))}
            </div>
          </div>
          <div className="min-w-0 rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
            <div className="px-4 py-2 bg-slate-800 border-b border-slate-700">
              <span className="text-xs text-slate-400">settings.json</span>
            </div>
            <pre className="p-4 text-xs text-slate-300 font-mono overflow-x-auto whitespace-pre">{app.config}</pre>
          </div>
        </motion.div>
      </div>

      <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
        <h3 className="text-white font-semibold mb-2">หลังเชื่อมแล้วทำอะไรได้บ้าง</h3>
        <div className="space-y-2">
          {[
            'ถามคำถามข้ามหลายโนต โดยไม่ต้องเปิดทีละไฟล์เอง',
            'ให้ Claude สร้างโนตใหม่แล้วเชื่อม backlink ให้อัตโนมัติ',
            'ค้นหาโนตที่เกี่ยวข้องกันแต่ยังไม่ได้ลิงก์',
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400 flex-shrink-0"></span>
              <span className="text-slate-300">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
