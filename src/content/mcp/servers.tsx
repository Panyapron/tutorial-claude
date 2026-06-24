'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, HardDrive, Globe, Database, ChevronRight } from 'lucide-react';

const servers = [
  {
    id: 'github',
    icon: Github,
    name: 'GitHub MCP',
    color: 'violet',
    desc: 'จัดการ repos, issues, PRs โดยตรงจาก Claude',
    install: 'npx @modelcontextprotocol/server-github',
    config: '{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["@modelcontextprotocol/server-github"],\n      "env": {\n        "GITHUB_TOKEN": "ghp_your_token"\n      }\n    }\n  }\n}',
    tools: ['list_repos', 'get_file_contents', 'create_issue', 'list_pull_requests', 'push_files'],
    example: 'สร้าง issue ใน GitHub ด้วย Claude Code ได้เลย',
  },
  {
    id: 'filesystem',
    icon: HardDrive,
    name: 'Filesystem MCP',
    color: 'blue',
    desc: 'เข้าถึงไฟล์นอกโปรเจกต์',
    install: 'npx @modelcontextprotocol/server-filesystem',
    config: '{\n  "mcpServers": {\n    "filesystem": {\n      "command": "npx",\n      "args": [\n        "@modelcontextprotocol/server-filesystem",\n        "/Users/you/Documents"\n      ]\n    }\n  }\n}',
    tools: ['read_file', 'write_file', 'list_directory', 'move_file', 'search_files'],
    example: 'อ่านและแก้ไขไฟล์นอก project directory ได้',
  },
  {
    id: 'brave',
    icon: Globe,
    name: 'Brave Search MCP',
    color: 'orange',
    desc: 'ค้นหาข้อมูลบนเว็บ',
    install: 'npx @modelcontextprotocol/server-brave-search',
    config: '{\n  "mcpServers": {\n    "brave-search": {\n      "command": "npx",\n      "args": ["@modelcontextprotocol/server-brave-search"],\n      "env": {\n        "BRAVE_API_KEY": "your_api_key"\n      }\n    }\n  }\n}',
    tools: ['brave_web_search', 'brave_local_search'],
    example: 'Claude ค้นหาข้อมูล library ล่าสุดก่อนแนะนำ',
  },
  {
    id: 'postgres',
    icon: Database,
    name: 'PostgreSQL MCP',
    color: 'emerald',
    desc: 'สอบถามข้อมูล DB ได้โดยตรง',
    install: 'npx @modelcontextprotocol/server-postgres',
    config: '{\n  "mcpServers": {\n    "postgres": {\n      "command": "npx",\n      "args": ["@modelcontextprotocol/server-postgres"],\n      "env": {\n        "POSTGRES_URL": "postgresql://localhost/mydb"\n      }\n    }\n  }\n}',
    tools: ['query', 'list_tables', 'describe_table'],
    example: 'ถามว่า "ยอดขายเดือนนี้เท่าไหร่" Claude query DB เองได้เลย',
  },
];

const colorMap: Record<string, string> = {
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  orange: 'border-orange-500/40 bg-orange-500/10 text-orange-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
};

export default function ServersLesson() {
  const [active, setActive] = useState('github');
  const server = servers.find(s => s.id === active)!;
  const Icon = server.icon;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">MCP Servers ยอดนิยม</h2>
        <p className="text-slate-400">ติดตั้ง MCP server สำเร็จรูป เพิ่มความสามารถให้ Claude Code จัดการงานภายนอกได้</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {servers.map(s => {
          const SIcon = s.icon;
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-sm transition-all ${
                isActive ? colorMap[s.color].split(' ').slice(0, 2).join(' ') + ' text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              <SIcon size={20} className={isActive ? colorMap[s.color].split(' ')[2] : ''} />
              <span className="font-medium text-xs text-center">{s.name}</span>
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
        <div className={`rounded-xl border p-4 ${colorMap[server.color].split(' ').slice(0,2).join(' ')}`}>
          <div className="flex items-center gap-3 mb-3">
            <Icon size={20} className={colorMap[server.color].split(' ')[2]} />
            <h3 className="text-lg font-semibold text-white">{server.name}</h3>
          </div>
          <p className="text-slate-300 text-sm mb-4">{server.desc}</p>

          <p className="text-xs text-slate-500 font-semibold mb-1">AVAILABLE TOOLS</p>
          <div className="flex flex-wrap gap-1 mb-4">
            {server.tools.map(t => (
              <span key={t} className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300 font-mono">{t}</span>
            ))}
          </div>

          <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700">
            <p className="text-xs text-slate-500 mb-1">Use case:</p>
            <p className="text-emerald-300 text-sm">{server.example}</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
            <span className="text-xs text-slate-400">settings.json</span>
            <ChevronRight size={12} className="text-slate-600" />
          </div>
          <pre className="p-4 text-xs text-slate-300 font-mono overflow-x-auto whitespace-pre">{server.config}</pre>
        </div>
      </motion.div>

      <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
        <h3 className="text-white font-semibold mb-2">วิธีติดตั้ง (Global Config)</h3>
        <p className="text-slate-400 text-sm mb-2">เพิ่ม config ใน <code className="bg-slate-700 px-1 rounded">~/.claude/settings.json</code> สำหรับใช้ทุกโปรเจกต์ หรือใน <code className="bg-slate-700 px-1 rounded">.claude/settings.json</code> สำหรับโปรเจกต์เดียว</p>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          <span className="text-slate-300">หลังเพิ่ม config รัน <code className="bg-slate-700 px-1 rounded font-mono">claude</code> ใหม่ MCP server จะอยู่ใน available tools ทันที</span>
        </div>
      </div>
    </div>
  );
}
