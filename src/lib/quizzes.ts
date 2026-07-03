export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export const quizzes: Record<string, QuizQuestion[]> = {
  overview: [
    {
      question: "Context Window คืออะไร?",
      options: [
        "พื้นที่เก็บไฟล์ถาวรของ Claude",
        "หน่วยความจำระยะยาวที่จำได้ข้ามทุก session",
        "หน้าต่างที่ Claude มองเห็นข้อมูลทั้งหมดในครั้งนั้น",
        "ระบบจัดการ permission ของเครื่องมือ"
      ],
      correctIndex: 2
    },
    {
      question: "Claude รุ่นไหนที่สมดุลระหว่างความสามารถและความเร็ว?",
      options: ["Claude Opus", "Claude Sonnet", "Claude Haiku", "Claude Fable"],
      correctIndex: 1
    },
    {
      question: "Claude ไม่ได้อ่านทีละตัวอักษร แต่แบ่งข้อความเป็นอะไร?",
      options: ["Byte", "Token", "Pixel", "Frame"],
      correctIndex: 1
    },
    {
      question: "Claude Code เหมาะกับใครมากที่สุด?",
      options: [
        "ผู้ใช้ทั่วไปที่ต้องการแชท",
        "Developer ที่ต้องการทำงานกับ codebase โดยตรง",
        "นักออกแบบกราฟิก",
        "ทีมการตลาด"
      ],
      correctIndex: 1
    }
  ],
  prompt: [
    {
      question: "เทคนิค Chain-of-Thought คืออะไร?",
      options: [
        "ให้ตัวอย่าง input/output ก่อน",
        "ให้ Claude คิดเป็นขั้นตอนก่อนสรุปคำตอบ",
        "กำหนดบทบาทให้ Claude สวมใส่",
        "จำกัดความยาวคำตอบ"
      ],
      correctIndex: 1
    },
    {
      question: "Prompt ที่ดีประกอบด้วยกี่ส่วนหลัก?",
      options: ["2 ส่วน", "3 ส่วน", "4 ส่วน", "5 ส่วน"],
      correctIndex: 1
    },
    {
      question: "Role Prompting คือการทำอะไร?",
      options: [
        "ให้ตัวอย่าง 2-3 คู่ก่อนทำงานจริง",
        "ระบุบทบาท/ความเชี่ยวชาญให้ Claude สวมใส่",
        "จำกัด format คำตอบ",
        "ให้คิดทีละขั้น"
      ],
      correctIndex: 1
    },
    {
      question: "ข้อไหน \"ไม่ใช่\" เทคนิคเขียน prompt ที่ดี?",
      options: [
        "ระบุ format ที่ต้องการ",
        "บอก context และเป้าหมาย",
        "เขียนคำถามให้กำกวมที่สุด",
        "ให้ตัวอย่างผลลัพธ์ที่ต้องการ"
      ],
      correctIndex: 2
    }
  ],
  cowork: [
    {
      question: "Claude Cowork ต่างจาก Claude Code อย่างไร?",
      options: [
        "Cowork เป็น CLI สำหรับ developer เท่านั้น",
        "Cowork เป็นพื้นที่ทำงานบนเว็บสำหรับทุกตำแหน่งงาน",
        "Cowork ใช้แทน Claude.ai ไม่ได้",
        "Cowork ไม่รองรับการเชื่อม repo"
      ],
      correctIndex: 1
    },
    {
      question: "เมื่อเข้า Cowork ครั้งแรก ระบบจะให้ทำอะไร?",
      options: [
        "ติดตั้ง CLI ในเครื่อง",
        "เลือกบทบาท/ตำแหน่งงานแล้วรับ plugin ที่เหมาะสม",
        "สมัครบัตรเครดิต",
        "ดาวน์โหลดแอพมือถือ"
      ],
      correctIndex: 1
    },
    {
      question: "แผนก Legal ใช้ Cowork ทำอะไรได้บ้าง?",
      options: [
        "เขียนโค้ด React",
        "สรุปสัญญาและเปรียบเทียบ redline",
        "วิเคราะห์ CI log",
        "ออกแบบกราฟิก"
      ],
      correctIndex: 1
    },
    {
      question: "ข้อใดคือ best practice ของการใช้ Cowork เป็นทีม?",
      options: [
        "แชร์ API key ในแชทสาธารณะ",
        "Subscribe การแจ้งเตือนและตั้ง check-in อัตโนมัติ",
        "ปิดการแจ้งเตือนทั้งหมด",
        "เปิดใช้ทุก tool โดยไม่จำกัด repo scope"
      ],
      correctIndex: 1
    }
  ],
  "claude-code": [
    {
      question: "คำสั่งใดใช้ติดตั้ง Claude Code?",
      options: [
        "npm install claude",
        "npm install -g @anthropic-ai/claude-code",
        "pip install claude-code",
        "brew install claude"
      ],
      correctIndex: 1
    },
    {
      question: "ไฟล์ใดใน .claude/ ใช้เก็บ context ของโปรเจกต์?",
      options: ["settings.json", "CLAUDE.md", "package.json", ".env"],
      correctIndex: 1
    },
    {
      question: "เครื่องมือใดใช้ค้นหา pattern ในโค้ด?",
      options: ["Read", "Write", "Grep", "Bash"],
      correctIndex: 2
    },
    {
      question: "Workflow ไหนเหมาะกับการแก้ bug ที่ซ่อนอยู่ลึก?",
      options: ["Code Review", "Bug Fix", "Refactor", "Test Generation"],
      correctIndex: 1
    }
  ],
  mastery: [
    {
      question: "คำสั่งใดใช้ล้าง context ทั้งหมดใน session?",
      options: ["/compact", "/clear", "/reset-all", "/new"],
      correctIndex: 1
    },
    {
      question: "ข้อใด \"ไม่ควร\" ใส่ใน CLAUDE.md?",
      options: [
        "เทคโนโลยีหลักที่ใช้",
        "คำสั่งที่ใช้บ่อย",
        "Secrets และ API keys",
        "ข้อตกลงเรื่อง code style"
      ],
      correctIndex: 2
    },
    {
      question: "Extended Thinking เหมาะกับงานแบบไหน?",
      options: [
        "ถามข้อมูลง่ายๆ เช่น syntax",
        "โจทย์คณิตศาสตร์/ตรรกะหลายขั้นตอนที่ซับซ้อน",
        "แชทสนทนาทั่วไป",
        "งานที่ต้องการคำตอบเร็วที่สุด"
      ],
      correctIndex: 1
    },
    {
      question: "Claude อ่านอะไรได้บ้างนอกจากข้อความ?",
      options: [
        "เฉพาะไฟล์ .txt เท่านั้น",
        "รูปภาพ, screenshot, PDF",
        "ไฟล์เสียงเท่านั้น",
        "ไม่สามารถอ่านอะไรนอกจากข้อความ"
      ],
      correctIndex: 1
    }
  ],
  mcp: [
    {
      question: "MCP ย่อมาจากอะไร?",
      options: [
        "Model Context Protocol",
        "Machine Control Panel",
        "Multi Cloud Platform",
        "Model Compute Process"
      ],
      correctIndex: 0
    },
    {
      question: "MCP เปรียบเสมือนอะไร?",
      options: [
        "ปลั๊กมาตรฐานแบบ USB-C",
        "ฐานข้อมูลกลาง",
        "ระบบปฏิบัติการ",
        "ภาษาโปรแกรมมิ่งใหม่"
      ],
      correctIndex: 0
    },
    {
      question: "MCP Primitive ใดใช้สำหรับ function call ที่มีผลกระทบต่อโลกภายนอก?",
      options: ["Resources", "Tools", "Prompts", "Sessions"],
      correctIndex: 1
    },
    {
      question: "ข้อใดคือ MCP server ที่ใช้เชื่อมต่อ GitHub?",
      options: [
        "server-filesystem",
        "server-github",
        "server-brave-search",
        "server-postgres"
      ],
      correctIndex: 1
    }
  ],
  skills: [
    {
      question: "Skill ใน Claude Code เรียกใช้งานผ่านอะไร?",
      options: [
        "Environment variable",
        "Slash command (/skill-name)",
        "Config file เพียงอย่างเดียว",
        "Terminal alias"
      ],
      correctIndex: 1
    },
    {
      question: "ไฟล์ skill ควรเก็บไว้ที่โฟลเดอร์ใด?",
      options: [
        ".claude/commands/",
        "src/skills/",
        "node_modules/",
        ".github/skills/"
      ],
      correctIndex: 0
    },
    {
      question: "ตัวแปรใดใช้รับ argument ที่พิมพ์ตามหลัง slash command?",
      options: ["$INPUT", "$ARGUMENTS", "$PARAMS", "$TEXT"],
      correctIndex: 1
    },
    {
      question: "การใช้ @ syntax ใน skill.md ทำอะไร?",
      options: [
        "ลบไฟล์อัตโนมัติ",
        "อ้างอิงและอ่านไฟล์อื่นเข้ามาใน context",
        "เรียก API ภายนอก",
        "สร้าง comment ในโค้ด"
      ],
      correctIndex: 1
    }
  ]
};
