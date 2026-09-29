export const MOCK_CANDIDATES = [
  {
    id: 'SS-4892',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@example.com',
    phone: '+91 98201 44821',
    role: 'Senior Frontend Developer',
    appliedFor: 'Frontend Developer',
    experience: '3 Years Experience',
    experienceYears: 3,
    location: 'Mumbai, India',
    locationDetail: 'Mumbai, India (Open to Remote / Hybrid)',
    status: 'Shortlisted',
    readyToInterview: true,
    initials: 'AM',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
    aiScore: 87,
    aiLabel: '94% Elite Match',
    aiTier: 'Elite',
    github: 'github.com/aaravmehta',
    linkedin: 'LinkedIn Profile',
    portfolio: 'aaravcodes.dev',
    experienceHistory: [
      {
        role: 'Frontend Developer',
        company: 'TechVentures',
        location: 'Mumbai, India',
        period: '2022 — Present (2 yrs)',
        bullets: 'Led the comprehensive frontend migration of core customer-facing applications to Next.js and Tailwind CSS, reducing JavaScript bundle sizes by 35% and improving Core Web Vitals LCP score from 2.8s to 1.1s. Architected and documented an internal multi-package reusable design token component system adopted by 14 cross-functional engineers.',
        tags: ['Next.js', 'Tailwind CSS', 'Redux Toolkit', 'Performance Audit']
      },
      {
        role: 'Junior Web Developer',
        company: 'PixelCraft Studios',
        location: 'Pune, India',
        period: '2021 — 2022 (1 yr)',
        bullets: 'Developed robust, responsive client portals in React and TypeScript. Integrated multiple third-party REST APIs with fault-tolerant error boundaries and implemented automated unit/integration test suites using Jest and React Testing Library, achieving 84% branch test coverage.',
        tags: ['React', 'TypeScript', 'Jest', 'REST APIs']
      }
    ],
    skills: [
      'React', 'JavaScript (ES6+)', 'TypeScript', 'Next.js', 'Redux Toolkit', 
      'Tailwind CSS', 'HTML5 / CSS3', 'Git / GitHub', 'REST APIs', 'Jest & RTL'
    ],
    projects: [
      {
        name: 'FinFlow Analytics',
        badge: '★ 450+',
        description: 'Algorithmic trading monitoring dashboard built with React, WebSockets real-time feeds, and responsive Tailwind layouts.',
        tech: 'React • WebSockets',
        link: 'https://github.com'
      },
      {
        name: 'DevPulse UI Kit',
        badge: 'npm',
        description: 'Accessible WAI-ARIA compliant design token component system published to npm with automated Storybook visual regression testing.',
        tech: 'TypeScript • WAI-ARIA',
        link: 'https://npmjs.com'
      }
    ],
    education: {
      degree: 'Bachelor of Technology in Computer Science',
      period: '2017 — 2021',
      institution: 'University of Mumbai • Mumbai, India',
      cgpa: 'CGPA 8.8 / 10'
    },
    aiBreakdown: {
      weightedFit: 87,
      confidence: [
        { skill: 'React Core Architecture', percentage: 95, color: 'bg-emerald-500' },
        { skill: 'JavaScript / TypeScript', percentage: 92, color: 'bg-emerald-500' },
        { skill: 'Node.js', percentage: 85, color: 'bg-indigo-600' },
        { skill: 'Docker / Cloud Deployment', percentage: 30, color: 'bg-rose-500', flag: true }
      ],
      matchedSkills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'REST APIs'],
      identifiedGaps: ['Docker', 'Cloud Deployment'],
      advisoryNote: 'Strong frontend fit with good React and JavaScript experience. The candidate demonstrates relevant project experience but has limited evidence of Docker and cloud deployment. Consider evaluating deployment experience during the interview.'
    }
  },
  {
    id: 'SS-4893',
    name: 'Riya Shah',
    email: 'riya.shah@example.com',
    phone: '+91 98334 11209',
    role: 'React Developer',
    appliedFor: 'React Developer',
    experience: '2 Years Experience',
    experienceYears: 2,
    location: 'Mumbai, India',
    status: 'Under Review',
    readyToInterview: false,
    initials: 'RS',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop',
    aiScore: 87,
    aiLabel: '87% High Fit',
    aiTier: 'High Fit'
  },
  {
    id: 'SS-4894',
    name: 'Karan Patel',
    email: 'karan.p@example.com',
    phone: '+91 98112 33455',
    role: 'Backend Developer',
    appliedFor: 'Backend Developer',
    experience: '4 Years Experience',
    experienceYears: 4,
    location: 'Mumbai, India',
    status: 'Interview',
    readyToInterview: true,
    initials: 'KP',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop',
    aiScore: 84,
    aiLabel: '84% Strong Match',
    aiTier: 'Strong Match'
  },
  {
    id: 'SS-4895',
    name: 'Neha Joshi',
    email: 'neha.j@example.com',
    phone: '+91 97665 44321',
    role: 'Full Stack Developer',
    appliedFor: 'Full Stack Developer',
    experience: '3 Years Experience',
    experienceYears: 3,
    location: 'Bengaluru, India',
    status: 'Under Review',
    readyToInterview: false,
    initials: 'NJ',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop',
    aiScore: 78,
    aiLabel: '78% Moderate Fit',
    aiTier: 'Moderate Fit'
  }
];

export const MOCK_INTERVIEWS = [
  {
    id: 'INT-1',
    candidateName: 'Aarav Mehta',
    role: 'Frontend Developer',
    time: 'Today, 2:00 PM',
    isToday: true,
    interviewer: 'Sarah Jenkins (Recruiter)',
    platform: 'Google Meet',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    status: 'Scheduled'
  },
  {
    id: 'INT-2',
    candidateName: 'Karan Patel',
    role: 'Backend Developer',
    time: 'Today, 4:30 PM',
    isToday: true,
    interviewer: 'Alex Rivera (Tech Lead)',
    platform: 'Google Meet',
    meetLink: 'https://meet.google.com/xyz-uvwx-rst',
    status: 'Scheduled'
  },
  {
    id: 'INT-3',
    candidateName: 'Riya Shah',
    role: 'React Developer',
    time: 'Tomorrow, 11:00 AM',
    isToday: false,
    interviewer: 'David Chen (VP Eng)',
    stage: 'Round 2 Technical',
    status: 'Scheduled'
  }
];
