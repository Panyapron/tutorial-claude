export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  lessons: Lesson[];
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export const modules: Module[] = [
  {
    id: "overview",
    title: "Claude คืออะไร?",
    description: "ทำความรู้จัก Claude AI ว่าทำงานอย่างไร มีความสามารถอะไร และจะใช้งานได้ในรูปแบบใดบ้าง",
    icon: "🤖",
    gradient: "from-violet-500 to-purple-600",
    estimatedTime: "15 นาที",
    difficulty: "beginner",
    lessons: [
      { id: "what-is-claude", title: "Claude คืออะไร?", duration: "5 นาที", description: "ภาพรวมของ Claude AI" },
      { id: "how-it-works", title: "Claude ทำงานอย่างไร?", duration: "5 นาที", description: "Context window และ token" },
      { id: "use-cases", title: "ใช้งาน Claude ได้อย่างไร?", duration: "5 นาที", description: "API, Claude.ai, Claude Code" },
    ],
  },
  {
    id: "prompt",
    title: "Prompt Engineering",
    description: "เรียนรู้วิธีสื่อสารกับ Claude อย่างมีประสิทธิภาพ ตั้งแต่พื้นฐานจนถึงเทคนิคขั้นสูง",
    icon: "✍️",
    gradient: "from-blue-500 to-cyan-600",
    estimatedTime: "25 นาที",
    difficulty: "beginner",
    lessons: [
      { id: "anatomy", title: "กายวิภาค Prompt", duration: "8 นาที", description: "System prompt, User prompt, Context" },
      { id: "techniques", title: "เทคนิคการเขียน Prompt", duration: "10 นาที", description: "Chain-of-thought, Few-shot, Role prompting" },
      { id: "practice", title: "ฝึกเขียน Prompt", duration: "7 นาที", description: "Workshop ลองเขียนจริง" },
    ],
  },
  {
    id: "cowork",
    title: "Claude Cowork",
    description: "พื้นที่ทำงานร่วมกับ Claude บนเว็บ สำหรับทุกตำแหน่งงาน ไม่ใช่แค่ developer",
    icon: "🧑‍💼",
    gradient: "from-sky-500 to-indigo-600",
    estimatedTime: "20 นาที",
    difficulty: "beginner",
    lessons: [
      { id: "what-is-cowork", title: "Cowork คืออะไร?", duration: "6 นาที", description: "ต่างจาก Claude.ai และ Claude Code อย่างไร" },
      { id: "roles-and-plugins", title: "Role & Plugin Marketplace", duration: "7 นาที", description: "เลือกบทบาทแล้วรับ plugin ที่เหมาะสม" },
      { id: "team-workflows", title: "ใช้งานเป็นทีม", duration: "7 นาที", description: "Use case ตามแผนก และ best practices" },
    ],
  },
  {
    id: "claude-code",
    title: "Claude Code",
    description: "CLI tool สำหรับ developer ที่ช่วยให้ Claude ทำงานร่วมกับ codebase โดยตรง",
    icon: "💻",
    gradient: "from-emerald-500 to-teal-600",
    estimatedTime: "20 นาที",
    difficulty: "intermediate",
    lessons: [
      { id: "setup", title: "ติดตั้งและเริ่มใช้งาน", duration: "7 นาที", description: "Installation, Configuration" },
      { id: "features", title: "Features ของ Claude Code", duration: "8 นาที", description: "File editing, Bash, Git integration" },
      { id: "workflows", title: "Workflow ที่นิยมใช้", duration: "5 นาที", description: "Code review, Bug fix, Refactor" },
    ],
  },
  {
    id: "mcp",
    title: "MCP (Model Context Protocol)",
    description: "โปรโตคอลที่ช่วยให้ Claude เชื่อมต่อกับ tools และ data sources ภายนอกได้",
    icon: "🔌",
    gradient: "from-orange-500 to-amber-600",
    estimatedTime: "30 นาที",
    difficulty: "intermediate",
    lessons: [
      { id: "concept", title: "MCP คืออะไร?", duration: "8 นาที", description: "แนวคิดและ Architecture" },
      { id: "servers", title: "MCP Servers ยอดนิยม", duration: "10 นาที", description: "GitHub, Filesystem, Brave Search และอื่นๆ" },
      { id: "custom", title: "สร้าง MCP Server เอง", duration: "12 นาที", description: "ขั้นตอนการสร้าง custom server" },
    ],
  },
  {
    id: "skills",
    title: "Skills & skill.md",
    description: "วิธีสร้าง slash commands และ instructions แบบกำหนดเองใน Claude Code",
    icon: "⚡",
    gradient: "from-yellow-500 to-orange-500",
    estimatedTime: "20 นาที",
    difficulty: "intermediate",
    lessons: [
      { id: "what-are-skills", title: "Skills คืออะไร?", duration: "5 นาที", description: "Slash commands และ skill.md" },
      { id: "create-skill", title: "สร้าง Skill แรก", duration: "8 นาที", description: "โครงสร้างไฟล์และ trigger" },
      { id: "advanced-skills", title: "Skills ขั้นสูง", duration: "7 นาที", description: "Arguments, Context, Chaining" },
    ],
  },
  {
    id: "notes",
    title: "Claude x Networked Note-taking",
    description: "ปูพื้นฐาน Networked Note-taking และใช้ Claude ช่วยสร้าง เชื่อมโยง และค้นหาความรู้ในระบบโน้ตของคุณ",
    icon: "🕸️",
    gradient: "from-fuchsia-500 to-rose-500",
    estimatedTime: "20 นาที",
    difficulty: "intermediate",
    lessons: [
      { id: "what-is-networked-notes", title: "Networked Note-taking คืออะไร?", duration: "7 นาที", description: "แนวคิด Zettelkasten, backlink และทำไมสำคัญ" },
      { id: "connect-note-apps", title: "เชื่อม Claude กับแอพโน้ต", duration: "7 นาที", description: "MCP กับ Obsidian, Notion, Markdown vault" },
      { id: "ai-assisted-workflows", title: "Workflow เสริมด้วย AI", duration: "6 นาที", description: "หาความเชื่อมโยง สร้าง backlink อัตโนมัติ" },
    ],
  },
  {
    id: "harness",
    title: "Claude Harness",
    description: "ระบบที่ควบคุมการทำงานของ Claude Code ตั้งแต่ hooks, permissions จนถึง settings",
    icon: "⚙️",
    gradient: "from-pink-500 to-rose-600",
    estimatedTime: "35 นาที",
    difficulty: "advanced",
    lessons: [
      { id: "overview", title: "Harness คืออะไร?", duration: "7 นาที", description: "Lifecycle และ components" },
      { id: "hooks", title: "Hooks System", duration: "10 นาที", description: "PreToolUse, PostToolUse, SessionStart" },
      { id: "permissions", title: "Permissions & Settings", duration: "8 นาที", description: "การกำหนดสิทธิ์และ configuration" },
      { id: "engineer", title: "Harness Engineering", duration: "10 นาที", description: "Production patterns, team config, CI/CD" },
    ],
  },
  {
    id: "agents",
    title: "Agent Orchestration",
    description: "มอบหมายงานให้ subagent ทำงานแบบขนานหรือแยกส่วน และสร้าง custom agent ด้วย Claude Agent SDK",
    icon: "🤝",
    gradient: "from-cyan-500 to-blue-600",
    estimatedTime: "30 นาที",
    difficulty: "advanced",
    lessons: [
      { id: "what-are-subagents", title: "Subagents คืออะไร?", duration: "8 นาที", description: "Task tool และการมอบหมายงาน" },
      { id: "orchestration-patterns", title: "รูปแบบการทำงานร่วมกัน", duration: "10 นาที", description: "Sequential, Parallel, Isolated worktree" },
      { id: "agent-sdk", title: "Claude Agent SDK", duration: "12 นาที", description: "สร้าง custom agent ด้วยโค้ดของคุณเอง" },
    ],
  },
];

export function getModule(id: string) {
  return modules.find((m) => m.id === id);
}

export function getLesson(moduleId: string, lessonId: string) {
  const module = getModule(moduleId);
  return module?.lessons.find((l) => l.id === lessonId);
}
