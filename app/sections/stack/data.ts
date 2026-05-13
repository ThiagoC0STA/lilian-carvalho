import {
  Target,
  Search,
  LineChart,
  Code2,
  PieChart,
  MousePointerClick,
  Database,
  Server,
  Terminal,
  FileSpreadsheet,
  Bot,
  MessageSquare,
  Workflow,
  Zap,
  LayoutTemplate,
  Frame,
  Box,
  Fingerprint,
  Table,
  BookOpen
} from "lucide-react";

export interface StackItem {
  name: string;
  icon: any;
  color: string;
}

export const stackRowOne: StackItem[] = [
  { name: "Meta Ads", icon: Target, color: "text-violet-500" },
  { name: "Google Ads", icon: Search, color: "text-amber-400" },
  { name: "GA4", icon: LineChart, color: "text-purple-500" },
  { name: "Google Tag Manager", icon: Code2, color: "text-violet-400" },
  { name: "Looker Studio", icon: PieChart, color: "text-amber-500" },
  { name: "Hotjar", icon: MousePointerClick, color: "text-purple-400" },
  { name: "SQL", icon: Database, color: "text-violet-500" },
  { name: "BigQuery", icon: Server, color: "text-amber-400" },
  { name: "Python", icon: Terminal, color: "text-purple-500" },
  { name: "Pandas", icon: FileSpreadsheet, color: "text-violet-400" },
];

export const stackRowTwo: StackItem[] = [
  { name: "ChatGPT", icon: Bot, color: "text-amber-400" },
  { name: "Claude", icon: MessageSquare, color: "text-purple-500" },
  { name: "n8n", icon: Workflow, color: "text-violet-500" },
  { name: "Zapier", icon: Zap, color: "text-amber-500" },
  { name: "Webflow", icon: LayoutTemplate, color: "text-purple-400" },
  { name: "Framer", icon: Frame, color: "text-violet-400" },
  { name: "Next.js", icon: Box, color: "text-amber-300" },
  { name: "Stape", icon: Fingerprint, color: "text-purple-500" },
  { name: "Sheets", icon: Table, color: "text-violet-500" },
  { name: "Notion", icon: BookOpen, color: "text-neutral-200" },
];
