'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Wrench, BookOpen, Layers } from 'lucide-react';

const primitives = [
  {
    icon: Package,
    name: 'Resources',
    color: 'blue',
    desc: 'ข้อมูลที่ Claude อ่านได้ (เหมือน file/URL)',
    example: 'company://policies/leave\ndb://users/schema',
    detail: 'Resources คือ URI-based data ที่ Claude สามารถ request เพื่ออ่านข้อมูล เช่น เอกสาร, โครงสร้าง DB หรือข้อมูล static',
  },
  {
    icon: Wrench,
    name: 'Tools',
    color: 'violet',
    desc: 'ฟังก์ชันที่ Claude เรียกใช้ได้',
    example: 'send_email(to, subject, body)\nquery_database(sql)',
    detail: 'Tools คือ function call ที่ Claude เลือกใช้ตามความเหมาะสม ใช้ทำสิ่งที่มีผลต่อโลกภายนอก เช่น ส่งอีเมล, query DB',
  },
  {
    icon: BookOpen,
    name: 'Prompts',
    color: 'emerald',
    desc: 'เทมเพลต prompt ที่ใช้ซ้ำได้',
    example: 'summarize_report(data)\ndraft_email(context)',
    detail: 'Prompts คือ reusable prompt template ที่ expose ให้ user ใช้ได้ เช่น slash command หรือ quick action',
  },
];

const serverCode = `import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'my-company-server',
  version: '1.0.0',
});

// Tool: สอบถามสต็อกสินค้า
server.tool(
  'check_inventory',
  { product_id: z.string() },
  async ({ product_id }) => {
    const stock = await db.query(
      'SELECT qty FROM inventory WHERE id = ?',
      [product_id]
    );
    return { content: [{ type: 'text', text: JSON.stringify(stock) }] };
  }
);

// เริ่ม server
const transport = new StdioServerTransport();
await server.connect(transport);`;

const steps = [
  'ติดตั้ง SDK: npm install @modelcontextprotocol/sdk zod',
  'สร้าง McpServer instance',
  'เพิ่ม tools/resources/prompts',
  'เชื่อม StdioServerTransport',
  'ประกาศใน settings.json ของ Claude Code',
];

const colorMap: Record<string, string> = {
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
};

export default function CustomMcpLesson() {
  const [activePrimitive, setActivePrimitive] = useState(0);
  const prim = primitives[activePrimitive];
  const PrimIcon = prim.icon;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">สร้าง MCP Server เอง</h2>
        <p className="text-slate-400">เรียนรู้ MCP primitives และสร้าง server ให้ตรงกับความต้องการ</p>
      </div>

      <div>
        <h3 className="text-white font-semibold mb-3">MCP Primitives (สิ่งที่สามารถ expose)</h3>
        <div className="flex gap-2 mb-4">
          {primitives.map((p, i) => {
            const PI = p.icon;
            return (
              <button
                key={i}
                onClick={() => setActivePrimitive(i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  activePrimitive === i
                    ? colorMap[p.color].split(' ').slice(0,2).join(' ') + ' text-white'
                    : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
              >
                <PI size={14} />
                {p.name}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activePrimitive}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl border p-4 ${colorMap[prim.color].split(' ').slice(0,2).join(' ')}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <PrimIcon size={18} className={colorMap[prim.color].split(' ')[2]} />
            <h4 className="text-white font-semibold">{prim.name}</h4>
            <span className="text-slate-400 text-sm">— {prim.desc}</span>
          </div>
          <p className="text-slate-300 text-sm mb-3">{prim.detail}</p>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-slate-300">
            <p className="text-slate-500 mb-1">ตัวอย่าง URI / signature:</p>
            <pre>{prim.example}</pre>
          </div>
        </motion.div>
      </div>

      <div>
        <h3 className="text-white font-semibold mb-3">ตัวอย่าง: Company Inventory Server</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {steps.map((s, i) => (
            <div key={i} className="bg-slate-800/60 rounded-lg border border-slate-700 p-3 flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center font-bold">{i + 1}</span>
              <p className="text-slate-300 text-sm">{s}</p>
            </div>
          ))}
        </div>
        <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
          <div className="flex items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
            <Layers size={12} className="text-slate-400 mr-2" />
            <span className="text-xs text-slate-400 font-mono">server.ts</span>
          </div>
          <pre className="p-4 text-xs text-slate-300 font-mono overflow-x-auto whitespace-pre">{serverCode}</pre>
        </div>
      </div>
    </div>
  );
}
