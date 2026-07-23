const paths = {
  frontend: 'M8 4 3 9l5 5M16 4l5 5-5 5M13 3l-2 18',
  backend: 'M4 4h16v5H4zM4 10h16v5H4zM4 16h16v5H4zM7 6.5h.01M7 12.5h.01M7 18.5h.01',
  database: 'M4 5c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2zM4 5v14c0 1.1 3.6 2 8 2s8-.9 8-2V5M4 12c0 1.1 3.6 2 8 2s8-.9 8-2',
  ai: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18',
  enterprise: 'M4 21V7l8-4 8 4v14M4 21h16M9 21v-6h6v6M9 11h.01M14 11h.01M9 15h.01M14 15h.01',
  tools: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2z',
  engineering: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1',
}

export default function SkillIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || paths.engineering} />
    </svg>
  )
}