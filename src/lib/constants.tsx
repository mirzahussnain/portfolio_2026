
import { Project, Experience, Skill } from '../types';

export const PROFESSION_TITLES: string[] = [
  "Software Engineer",
  "Full-Stack Developer",
  "Tech Enthusiast",
  "Open Source Contributor",
  "Problem Solver",
  "AI Innovator"
];
export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Analytics Dashboard',
    description: 'A real-time dashboard for tracking sales metrics and inventory, featuring D3.js data visualization, dark mode support, and role-based authentication.',
    imageUrl: 'https://picsum.photos/seed/dashboard/800/450',
    tags: ['React', 'Tailwind', 'D3.js'],
    version: 'v2.0',
    icon: 'bar_chart'
  },
  {
    id: '2',
    title: 'Neural Chat Interface',
    description: 'A responsive conversational UI built for interacting with LLMs. Includes streaming responses, markdown rendering, and local history persistence.',
    imageUrl: 'https://picsum.photos/seed/chat/800/450',
    tags: ['Next.js', 'OpenAI', 'Firebase'],
    icon: 'smart_toy'
  },
  {
    id: '3',
    title: 'Voyage Planner',
    description: 'Interactive travel planning application utilizing Mapbox GL. Users can pin locations, calculate routes, and share itineraries with collaborative groups.',
    imageUrl: 'https://picsum.photos/seed/travel/800/450',
    tags: ['Vue 3', 'Mapbox', 'Node.js'],
    icon: 'explore'
  },
  {
    id: '4',
    title: 'Crypto Folio',
    description: 'A minimalist cryptocurrency portfolio tracker. Features WebSockets for live price updates and local storage for privacy-focused data persistence.',
    imageUrl: 'https://picsum.photos/seed/crypto/800/450',
    tags: ['Svelte', 'WebSockets', 'API'],
    icon: 'currency_bitcoin'
  },
  {
    id: '5',
    title: 'Aurora UI Kit',
    description: 'A comprehensive React component library focusing on accessibility and dark mode support. Documented with Storybook.',
    imageUrl: 'https://picsum.photos/seed/ui/800/450',
    tags: ['TypeScript', 'Storybook', 'Jest'],
    icon: 'palette'
  },
  {
    id: '6',
    title: 'Focus Flow',
    description: 'Productivity application combining the Pomodoro technique with Kanban boards. Includes offline support via PWA standards.',
    imageUrl: 'https://picsum.photos/seed/focus/800/450',
    tags: ['React Native', 'Redux', 'PWA'],
    icon: 'check_circle'
  }
];

export const INITIAL_EXPERIENCE: Experience[] = [
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

export const INITIAL_SKILLS: Skill[] = [
  { id: '1', name: 'React', category: 'frontend', level: 'Advanced', icon: 'data_object', colorClass: 'text-blue-400' },
  { id: '2', name: 'TypeScript', category: 'frontend', level: 'Advanced', icon: 'integration_instructions', colorClass: 'text-blue-500' },
  { id: '3', name: 'Tailwind CSS', category: 'frontend', level: 'Expert', icon: 'brush', colorClass: 'text-cyan-400' },
  { id: '4', name: 'Node.js', category: 'backend', level: 'Advanced', icon: 'dns', colorClass: 'text-green-500' },
  { id: '5', name: 'PostgreSQL', category: 'backend', level: 'Advanced', icon: 'database', colorClass: 'text-blue-400' },
  { id: '6', name: 'AWS', category: 'cloud', level: 'Intermediate', icon: 'cloud', colorClass: 'text-orange-400' },
  { id: '7', name: 'Docker', category: 'cloud', level: 'Advanced', icon: 'deployed_code', colorClass: 'text-blue-500' },
  { id: '8', name: 'Figma', category: 'tools', level: 'Intermediate', icon: 'design_services', colorClass: 'text-purple-500' },
];
