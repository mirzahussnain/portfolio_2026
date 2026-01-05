
// import { Project, Experience, Skill } from '../types';

// export const PROFESSION_TITLES: string[] = [
//   "Software Engineer",
//   "Full-Stack Developer",
//   "Tech Enthusiast",
//   "Open Source Contributor",
//   "Problem Solver",
//   "AI Innovator"
// ];
// export const INITIAL_PROJECTS: Project[] = [
//   {
//     id: '1',
//     title: 'Analytics Dashboard',
//     description: 'A real-time dashboard for tracking sales metrics and inventory, featuring D3.js data visualization, dark mode support, and role-based authentication.',
//     imageUrl: 'https://picsum.photos/seed/dashboard/800/450',
//     tags: ['React', 'Tailwind', 'D3.js'],
//     version: 'v2.0',
//     icon: 'bar_chart'
//   },
//   {
//     id: '2',
//     title: 'Neural Chat Interface',
//     description: 'A responsive conversational UI built for interacting with LLMs. Includes streaming responses, markdown rendering, and local history persistence.',
//     imageUrl: 'https://picsum.photos/seed/chat/800/450',
//     tags: ['Next.js', 'OpenAI', 'Firebase'],
//     icon: 'smart_toy'
//   },
//   {
//     id: '3',
//     title: 'Voyage Planner',
//     description: 'Interactive travel planning application utilizing Mapbox GL. Users can pin locations, calculate routes, and share itineraries with collaborative groups.',
//     imageUrl: 'https://picsum.photos/seed/travel/800/450',
//     tags: ['Vue 3', 'Mapbox', 'Node.js'],
//     icon: 'explore'
//   },
//   {
//     id: '4',
//     title: 'Crypto Folio',
//     description: 'A minimalist cryptocurrency portfolio tracker. Features WebSockets for live price updates and local storage for privacy-focused data persistence.',
//     imageUrl: 'https://picsum.photos/seed/crypto/800/450',
//     tags: ['Svelte', 'WebSockets', 'API'],
//     icon: 'currency_bitcoin'
//   },
//   {
//     id: '5',
//     title: 'Aurora UI Kit',
//     description: 'A comprehensive React component library focusing on accessibility and dark mode support. Documented with Storybook.',
//     imageUrl: 'https://picsum.photos/seed/ui/800/450',
//     tags: ['TypeScript', 'Storybook', 'Jest'],
//     icon: 'palette'
//   },
//   {
//     id: '6',
//     title: 'Focus Flow',
//     description: 'Productivity application combining the Pomodoro technique with Kanban boards. Includes offline support via PWA standards.',
//     imageUrl: 'https://picsum.photos/seed/focus/800/450',
//     tags: ['React Native', 'Redux', 'PWA'],
//     icon: 'check_circle'
//   }
// ];

export const INITIAL_EXPERIENCE = [
  {
    id: '1',
    role: 'Senior Software Engineer',
    company: 'TechFlow Systems',
    period: '2022 - Present',
    description: 'Leading a team of 8 developers in re-architecting legacy monoliths into scalable microservices. Improved system latency by 40%.',
    type: 'work',
    tags: ['React', 'Node.js', 'AWS', 'TypeScript'],
    icon: 'code'
  },
  {
    id: '2',
    role: 'Full Stack Developer',
    company: 'Creative Solutions Inc.',
    period: '2020 - 2022',
    description: 'Developed and maintained client-facing web applications. Collaborated with UX designers to implement responsive designs.',
    type: 'work',
    tags: ['Vue.js', 'Python', 'Docker', 'PostgreSQL'],
    icon: 'terminal'
  },
  {
    id: '3',
    role: 'Master of Science in CS',
    company: 'Stanford University',
    period: '2018 - 2020',
    description: 'Specialized in Artificial Intelligence and Distributed Systems. Graduated with Honors.',
    type: 'education',
    tags: ['AI/ML', 'Algorithms', 'Big Data'],
    icon: 'school'
  }
];

// export const INITIAL_SKILLS: Skill[] = [
//   { id: '1', name: 'React', category: 'frontend', level: 'Advanced', icon: 'data_object', colorClass: 'text-blue-400' },
//   { id: '2', name: 'TypeScript', category: 'frontend', level: 'Advanced', icon: 'integration_instructions', colorClass: 'text-blue-500' },
//   { id: '3', name: 'Tailwind CSS', category: 'frontend', level: 'Expert', icon: 'brush', colorClass: 'text-cyan-400' },
//   { id: '4', name: 'Node.js', category: 'backend', level: 'Advanced', icon: 'dns', colorClass: 'text-green-500' },
//   { id: '5', name: 'PostgreSQL', category: 'backend', level: 'Advanced', icon: 'database', colorClass: 'text-blue-400' },
//   { id: '6', name: 'AWS', category: 'cloud', level: 'Intermediate', icon: 'cloud', colorClass: 'text-orange-400' },
//   { id: '7', name: 'Docker', category: 'cloud', level: 'Advanced', icon: 'deployed_code', colorClass: 'text-blue-500' },
//   { id: '8', name: 'Figma', category: 'tools', level: 'Intermediate', icon: 'design_services', colorClass: 'text-purple-500' },
// ];
export const SKILL_CATEGORIES = ['programming', 'frontend', 'backend', 'fullstack', 'cloud', 'tools'];
export const SKILL_LEVELS = ['expert', 'advanced', 'intermediate', 'beginner'];

export const TAILWIND_COLORS = [
  // --- GRAYS ---
  { name: 'Slate 400', class: 'text-slate-400', hex: '#94a3b8' },
  { name: 'Slate 500', class: 'text-slate-500', hex: '#64748b' },
  { name: 'Slate 600', class: 'text-slate-600', hex: '#475569' },
  
  { name: 'Gray 400', class: 'text-gray-400', hex: '#9ca3af' },
  { name: 'Gray 500', class: 'text-gray-500', hex: '#6b7280' },
  { name: 'Gray 600', class: 'text-gray-600', hex: '#4b5563' },

  { name: 'Zinc 400', class: 'text-zinc-400', hex: '#a1a1aa' },
  { name: 'Zinc 500', class: 'text-zinc-500', hex: '#71717a' },
  { name: 'Zinc 600', class: 'text-zinc-600', hex: '#52525b' },

  { name: 'Neutral 400', class: 'text-neutral-400', hex: '#a3a3a3' },
  { name: 'Neutral 500', class: 'text-neutral-500', hex: '#737373' },
  { name: 'Neutral 600', class: 'text-neutral-600', hex: '#525252' },

  { name: 'Stone 400', class: 'text-stone-400', hex: '#a8a29e' },
  { name: 'Stone 500', class: 'text-stone-500', hex: '#78716c' },
  { name: 'Stone 600', class: 'text-stone-600', hex: '#57534e' },

  // --- REDS ---
  { name: 'Red 400', class: 'text-red-400', hex: '#f87171' },
  { name: 'Red 500', class: 'text-red-500', hex: '#ef4444' },
  { name: 'Red 600', class: 'text-red-600', hex: '#dc2626' },

  { name: 'Orange 400', class: 'text-orange-400', hex: '#fb923c' },
  { name: 'Orange 500', class: 'text-orange-500', hex: '#f97316' },
  { name: 'Orange 600', class: 'text-orange-600', hex: '#ea580c' },

  { name: 'Amber 400', class: 'text-amber-400', hex: '#fbbf24' },
  { name: 'Amber 500', class: 'text-amber-500', hex: '#f59e0b' },
  { name: 'Amber 600', class: 'text-amber-600', hex: '#d97706' },

  { name: 'Yellow 400', class: 'text-yellow-400', hex: '#facc15' },
  { name: 'Yellow 500', class: 'text-yellow-500', hex: '#eab308' },
  { name: 'Yellow 600', class: 'text-yellow-600', hex: '#ca8a04' },

  // --- GREENS ---
  { name: 'Lime 400', class: 'text-lime-400', hex: '#a3e635' },
  { name: 'Lime 500', class: 'text-lime-500', hex: '#84cc16' },
  { name: 'Lime 600', class: 'text-lime-600', hex: '#65a30d' },

  { name: 'Green 400', class: 'text-green-400', hex: '#4ade80' },
  { name: 'Green 500', class: 'text-green-500', hex: '#22c55e' },
  { name: 'Green 600', class: 'text-green-600', hex: '#16a34a' },

  { name: 'Emerald 400', class: 'text-emerald-400', hex: '#34d399' },
  { name: 'Emerald 500', class: 'text-emerald-500', hex: '#10b981' },
  { name: 'Emerald 600', class: 'text-emerald-600', hex: '#059669' },

  { name: 'Teal 400', class: 'text-teal-400', hex: '#2dd4bf' },
  { name: 'Teal 500', class: 'text-teal-500', hex: '#14b8a6' },
  { name: 'Teal 600', class: 'text-teal-600', hex: '#0d9488' },

  // --- BLUES ---
  { name: 'Cyan 400', class: 'text-cyan-400', hex: '#22d3ee' },
  { name: 'Cyan 500', class: 'text-cyan-500', hex: '#06b6d4' },
  { name: 'Cyan 600', class: 'text-cyan-600', hex: '#0891b2' },

  { name: 'Sky 400', class: 'text-sky-400', hex: '#38bdf8' },
  { name: 'Sky 500', class: 'text-sky-500', hex: '#0ea5e9' },
  { name: 'Sky 600', class: 'text-sky-600', hex: '#0284c7' },

  { name: 'Blue 400', class: 'text-blue-400', hex: '#60a5fa' },
  { name: 'Blue 500', class: 'text-blue-500', hex: '#3b82f6' },
  { name: 'Blue 600', class: 'text-blue-600', hex: '#2563eb' },

  { name: 'Indigo 400', class: 'text-indigo-400', hex: '#818cf8' },
  { name: 'Indigo 500', class: 'text-indigo-500', hex: '#6366f1' },
  { name: 'Indigo 600', class: 'text-indigo-600', hex: '#4f46e5' },

  { name: 'Violet 400', class: 'text-violet-400', hex: '#a78bfa' },
  { name: 'Violet 500', class: 'text-violet-500', hex: '#8b5cf6' },
  { name: 'Violet 600', class: 'text-violet-600', hex: '#7c3aed' },

  { name: 'Purple 400', class: 'text-purple-400', hex: '#c084fc' },
  { name: 'Purple 500', class: 'text-purple-500', hex: '#a855f7' },
  { name: 'Purple 600', class: 'text-purple-600', hex: '#9333ea' },

  { name: 'Fuchsia 400', class: 'text-fuchsia-400', hex: '#e879f9' },
  { name: 'Fuchsia 500', class: 'text-fuchsia-500', hex: '#d946ef' },
  { name: 'Fuchsia 600', class: 'text-fuchsia-600', hex: '#c026d3' },

  { name: 'Pink 400', class: 'text-pink-400', hex: '#f472b6' },
  { name: 'Pink 500', class: 'text-pink-500', hex: '#ec4899' },
  { name: 'Pink 600', class: 'text-pink-600', hex: '#db2777' },

  { name: 'Rose 400', class: 'text-rose-400', hex: '#fb7185' },
  { name: 'Rose 500', class: 'text-rose-500', hex: '#f43f5e' },
  { name: 'Rose 600', class: 'text-rose-600', hex: '#e11d48' },
];