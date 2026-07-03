import type { ComponentType } from "react";

type LessonModule = { default: ComponentType };

export const lessonLoaders: Record<string, () => Promise<LessonModule>> = {
  "overview/what-is-claude": () => import("@/content/overview/what-is-claude"),
  "overview/how-it-works": () => import("@/content/overview/how-it-works"),
  "overview/use-cases": () => import("@/content/overview/use-cases"),

  "prompt/anatomy": () => import("@/content/prompt/anatomy"),
  "prompt/techniques": () => import("@/content/prompt/techniques"),
  "prompt/practice": () => import("@/content/prompt/practice"),

  "claude-code/setup": () => import("@/content/claude-code/setup"),
  "claude-code/features": () => import("@/content/claude-code/features"),
  "claude-code/workflows": () => import("@/content/claude-code/workflows"),

  "mastery/claude-md-context": () => import("@/content/mastery/claude-md-context"),
  "mastery/multimodal": () => import("@/content/mastery/multimodal"),
  "mastery/extended-thinking": () => import("@/content/mastery/extended-thinking"),

  "mcp/concept": () => import("@/content/mcp/concept"),
  "mcp/servers": () => import("@/content/mcp/servers"),
  "mcp/custom": () => import("@/content/mcp/custom"),

  "skills/what-are-skills": () => import("@/content/skills/what-are-skills"),
  "skills/create-skill": () => import("@/content/skills/create-skill"),
  "skills/advanced-skills": () => import("@/content/skills/advanced-skills"),

  "harness/overview": () => import("@/content/harness/overview"),
  "harness/hooks": () => import("@/content/harness/hooks"),
  "harness/permissions": () => import("@/content/harness/permissions"),
  "harness/engineer": () => import("@/content/harness/engineer"),

  "agents/what-are-subagents": () => import("@/content/agents/what-are-subagents"),
  "agents/orchestration-patterns": () => import("@/content/agents/orchestration-patterns"),
  "agents/agent-sdk": () => import("@/content/agents/agent-sdk"),

  "cowork/what-is-cowork": () => import("@/content/cowork/what-is-cowork"),
  "cowork/roles-and-plugins": () => import("@/content/cowork/roles-and-plugins"),
  "cowork/team-workflows": () => import("@/content/cowork/team-workflows"),

  "notes/what-is-networked-notes": () => import("@/content/notes/what-is-networked-notes"),
  "notes/connect-note-apps": () => import("@/content/notes/connect-note-apps"),
  "notes/ai-assisted-workflows": () => import("@/content/notes/ai-assisted-workflows"),
};
