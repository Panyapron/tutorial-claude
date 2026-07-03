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
  ]
};
