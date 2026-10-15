export type ProjectCategory = 'Full-Stack' | 'Next.js' | 'Enterprise Admin' | 'E-Commerce' | string;

export interface Project {
  id: string;
  title: string;
  type: string;
  category: ProjectCategory;
  image?: string;
  /** Optional muted preview clip (e.g. /assets/projects/videos/cartify.mp4) played when the card is hovered */
  video?: string;
  desc: string;
  fullDesc: string;
  architecture: string[];
  tech: string[];
  features: string[];
  links: { label: string; url: string; primary?: boolean }[];
  featured: boolean;
  metrics?: string;
  badge?: string;
}

export interface Experience {
  role: string;
  org: string;
  place: string;
  time: string;
  type: 'Full-time' | 'Internship' | 'Training';
  /** Optional line shown under the organisation, e.g. a program name */
  subtitle?: string;
  points: string[];
  technologies: string[];
  highlights?: string[];
}

export interface Education {
  deg: string;
  org: string;
  time: string;
  note: string;
  badge?: string;
  /** Short level label, e.g. "Undergraduate" */
  level?: string;
  /** Result shown in the animated score ring */
  score?: { value: number; max: number; label: string; suffix?: string };
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; iconName?: string; highlight?: boolean }[];
}

export const PORTFOLIO_DATA = {
  name: "Mohammad Kamil Akhtar",
  shortName: "Kamil",
  roles: [
    "Full Stack Developer",
    "MERN Stack Specialist",
    "Next.js & React Engineer",
    "Scalable Backend Architect",
    "REST & GraphQL API Builder"
  ],
  tagline: "Engineering high-performance, database-driven web applications with modern interfaces and resilient backends.",
  bio: [
    "I am a passionate Full Stack Developer who builds and ships end-to-end digital products: reactive Next.js & React user interfaces, robust Node.js/Express REST APIs, scalable MongoDB data models, and high-utility administrative systems.",
    "With experience delivering multi-sector ecosystem platforms, enterprise admin dashboards, and high-traffic commercial platforms, I prioritize sub-second load times, clean component architecture, and rock-solid business logic.",
    "Currently building products at Venturing Digitally Pvt. Ltd. in Jamshedpur, India. Open to high-impact remote engineering roles and relocation across India and globally."
  ],
  status: "Available for Full-time Roles & Projects",
  statusNote: "Open to Remote & Relocation Across India",
  email: "kamil.akhtar03@gmail.com",
  phone: "+91 9142836656",
  location: "Jamshedpur, Jharkhand, India",
  timezone: "Asia/Kolkata (IST)",
  social: {
    LinkedIn: "https://www.linkedin.com/in/mohammad-kamil-akhtar-9a844328a/",
    GitHub: "https://github.com/itskamil03",
    Email: "mailto:kamil.akhtar03@gmail.com",
    WhatsApp: "https://wa.me/919142836656?text=Hi%20Kamil,%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20connect!"
  },
  resumeUrl: "/assets/Mohammad_Kamil_Akhtar_Resume.pdf",
  profileImage: "/assets/projects/profile.jpeg",
  
  marquee: [
    "Next.js 15", "React.js", "Node.js", "Express.js", "MongoDB Atlas", 
    "TypeScript", "Tailwind CSS", "REST APIs", "JWT Auth", "Postman", 
    "Git & GitHub", "Mongoose", "System Design", "Agile Scrum", "Vercel"
  ],

  stats: [
    { value: 4, suffix: "+", label: "Production Apps Shipped", desc: "Live client & enterprise platforms" },
    { value: 20, suffix: "+", label: "Tech Stack Tools", desc: "Frameworks, databases & libraries" },
    { value: 100, suffix: "%", label: "Production Uptime Mindset", desc: "Clean architecture & error handling" },
    { value: 1, suffix: "+ yr", label: "Professional Experience", desc: "Full-time & intensive internship" },
  ],

  skillsData: [
    {
      category: "Frontend Engineering",
      color: "from-blue-500/20 to-cyan-500/20",
      border: "border-cyan-500/30",
      skills: [
        { name: "Next.js (App Router)", level: 92, highlight: true },
        { name: "React.js (Hooks & Context)", level: 95, highlight: true },
        { name: "TypeScript / JavaScript ES6+", level: 90, highlight: true },
        { name: "Tailwind CSS & Glassmorphism", level: 94 },
        { name: "HTML5 Semantic & Responsive CSS3", level: 98 },
        { name: "Bootstrap & Modern UI Kits", level: 88 }
      ]
    },
    {
      category: "Backend & Systems",
      color: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-500/30",
      skills: [
        { name: "Node.js Runtime", level: 92, highlight: true },
        { name: "Express.js Framework", level: 94, highlight: true },
        { name: "RESTful API Architecture", level: 95, highlight: true },
        { name: "JWT Auth & Role-Based Access", level: 92 },
        { name: "Server-Side Rendering & Caching", level: 86 },
        { name: "Java (Core & OOP)", level: 82 }
      ]
    },
    {
      category: "Databases & Cloud",
      color: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30",
      skills: [
        { name: "MongoDB & MongoDB Atlas", level: 94, highlight: true },
        { name: "Mongoose ODM & Aggregations", level: 92 },
        { name: "MySQL Relational Queries", level: 82 },
        { name: "Vercel & Cloud Deployment", level: 90 },
        { name: "Database Schema Optimization", level: 88 }
      ]
    },
    {
      category: "DevOps, Tools & Concepts",
      color: "from-amber-500/20 to-orange-500/20",
      border: "border-amber-500/30",
      skills: [
        { name: "Git Version Control & GitHub", level: 92 },
        { name: "Postman API Testing", level: 94 },
        { name: "Agile Scrum & Code Reviews", level: 90 },
        { name: "OOP & Clean Code Architecture", level: 92 },
        { name: "Web Performance & Core Web Vitals", level: 88 }
      ]
    }
  ],

  projects: [
    {
      id: "swarn-bharat-one",
      title: "Swarn Bharat One",
      type: "Multi-sector ecosystem platform",
      category: "Full-Stack",
      image: "/assets/projects/swarn-bharat.jpg",
      featured: true,
      badge: "Flagship Enterprise",
      desc: "A centralized multi-tenant digital ecosystem unifying Careers, Rewards, Foundation, Offers, and B2B services with a synchronized administrative control hub.",
      fullDesc: "Swarn Bharat One was designed as a unified enterprise-grade ecosystem supporting multiple industry verticals. The platform features an integrated user registry, hierarchical referral engines, automated reward redemption workflows, and a secure super-admin cockpit capable of monitoring thousands of user submissions and live transactions.",
      architecture: [
        "Modular Next.js & React frontend with responsive client-side routing",
        "Decoupled Express.js REST API with JWT-based session security",
        "Mongoose schemas with indexes for high-throughput query performance",
        "Role-based privilege middleware separating public, partner, and administrator views"
      ],
      tech: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      features: [
        "Unified multi-sector module switcher (Careers, Foundation, Offers)",
        "Referral generation and dynamic tier-based reward allocation",
        "Custom administrative portal for application vetting and user moderation",
        "Dynamic JSON content distribution for instant zero-redeploy updates"
      ],
      metrics: "Sub-500ms API response time with full centralized data governance",
      links: [
        { label: "Live Demo", url: "#", primary: true },
        { label: "Admin Panel", url: "#" }
      ]
    },
    {
      id: "khetan-admin-panel",
      title: "Khetan Business Admin Panel",
      type: "Business Management & Rewards ERP",
      category: "Enterprise Admin",
      image: "/assets/projects/khetan-admin.jpg",
      featured: true,
      badge: "Production Live",
      desc: "An enterprise administrative suite featuring role-based dashboards, catalog management, customer review moderation, and point redemption queues.",
      fullDesc: "Engineered to replace fragmented manual operations with a synchronized digital dashboard. Built with React and an Express backend connected to MongoDB, it provides real-time transaction auditing, stock catalog controls, review moderation pipelines, and instant approval workflows for user reward redemptions.",
      architecture: [
        "Reactive single-page application with optimistic UI state updates",
        "Granular token authentication with protected route navigation guards",
        "MongoDB Atlas aggregation pipelines for analytical summary widgets",
        "Exportable reporting data in CSV and structured JSON formats"
      ],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB Atlas", "REST APIs"],
      features: [
        "Role-Based Access Control (Super Admin, Moderator, Auditor)",
        "Dynamic Product & Inventory catalog manager with live status toggling",
        "Customer Review moderation queue with sentiment tagging",
        "Reward points redemption request verification and dispatch tracking"
      ],
      metrics: "Live at 187.77.142.79:3000 handling high-frequency business operations",
      links: [
        { label: "Live Production Site", url: "http://187.77.142.79:3000", primary: true }
      ]
    },
    {
      id: "bhagat-engineering",
      title: "Bhagat Engineering",
      type: "High-Performance Corporate Website",
      category: "Next.js",
      image: "/assets/projects/bhagat-engg.jpg",
      featured: true,
      badge: "Client Live",
      desc: "Modern industrial corporate platform engineered with Next.js, responsive Tailwind layout, interactive service portfolios, and 100/100 SEO & accessibility scores.",
      fullDesc: "Designed and engineered for an engineering firm requiring an ultra-sleek, credible online brand identity. Built using Next.js for server-side pre-rendering, custom interactive project showcases, client inquiry workflows, and high-performance image optimization.",
      architecture: [
        "Next.js App Router with Static Site Generation (SSG) for instant TTFB",
        "Semantic HTML5 structure ensuring 100/100 Lighthouse SEO audit ratings",
        "Automated responsive media pipelines for ultra-sharp industrial imagery",
        "Integrated client inquiry forms with instant validation"
      ],
      tech: ["Next.js", "React.js", "Tailwind CSS", "Vercel", "SEO Engine"],
      features: [
        "Dynamic services catalog with interactive visual breakdown",
        "High-definition project and facility gallery with lightbox view",
        "Mobile-first responsive architecture supporting all viewport dimensions",
        "Instant contact & quotation dispatch system"
      ],
      metrics: "98+ Google Lighthouse Performance & perfect SEO indexing",
      links: [
        { label: "Live Client Website", url: "https://bhagatengg.in", primary: true }
      ]
    },
    {
      id: "cartify-ecommerce",
      title: "Cartify E-Commerce Platform",
      type: "Full-Stack Online Store & Cart",
      category: "E-Commerce",
      image: "/assets/projects/cartify.jpg",
      featured: true,
      badge: "Full-Stack Project",
      desc: "An end-to-end e-commerce store with secure user authentication, faceted search, dynamic price filters, persistent cart state, and checkout integration.",
      fullDesc: "Developed during my tenure at Infotact Solutions to showcase full-lifecycle MERN stack engineering. Cartify includes catalog browsing, faceted multi-attribute filtering, persistent shopping cart storage, secure password hashing with bcrypt, and JWT-authenticated checkout sessions.",
      architecture: [
        "Full MERN stack with separation of concerns between API and Client",
        "JWT-secured authentication with bcrypt salt rounds for credentials",
        "Mongoose transactional schemas for order placement and inventory reduction",
        "Client-side state synchronization with localStorage persistence"
      ],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Bootstrap"],
      features: [
        "User registration and encrypted login sessions",
        "Instant search bar with category, brand, and price-range filters",
        "Dynamic cart calculator with coupon discount parsing",
        "Order history tracking and simulated payment authorization"
      ],
      metrics: "Deployed on Vercel with seamless responsive mobile checkout",
      links: [
        { label: "Live Vercel Demo", url: "https://cartify-frontend-sable.vercel.app", primary: true }
      ]
    }
  ],

  experience: [
    {
      role: "Full Stack Developer",
      org: "Venturing Digitally Pvt. Ltd.",
      place: "Jamshedpur, India",
      time: "Jul 2026 to Present",
      type: "Full-time",
      points: [
        "Architect and ship production-ready web applications using React.js, Next.js, Node.js, Express.js, and MongoDB.",
        "Engineer scalable RESTful APIs, implementing robust authentication, role-based authorization, and optimized MongoDB aggregation pipelines.",
        "Develop reusable, accessible UI component libraries and responsive admin dashboards for centralized operational visibility.",
        "Collaborate in fast-paced Agile Scrum sprints, handling end-to-end SDLC including technical design, testing, code reviews, and CI/CD deployments."
      ],
      technologies: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB Atlas", "Tailwind CSS", "REST APIs"],
      highlights: ["Spearheaded multi-module enterprise platforms", "Reduced API query latency through index optimizations"]
    },
    {
      role: "Full Stack Development Trainee",
      org: "KodNest",
      subtitle: "Six-Month Full Stack Development Program",
      place: "",
      time: "Jan 2026 to Jun 2026",
      type: "Training",
      points: [
        "Completed an intensive six-month full stack training program covering Java & Python programming, competitive programming, web development, SQL, and software testing.",
        "Built and tested full-stack applications and database-driven modules as part of hands-on, project-based coursework."
      ],
      technologies: ["Java", "Python", "SQL", "Web Development", "Testing"],
      highlights: ["Six-month intensive full stack program", "Hands-on, project-based coursework"]
    },
    {
      role: "Full Stack Developer Intern",
      org: "Infotact Solutions",
      place: "Bengaluru, India",
      time: "May 2025 to Jul 2025",
      type: "Internship",
      points: [
        "Engineered 'Cartify', a comprehensive full-stack e-commerce solution featuring JWT authentication, product catalog filters, cart synchronization, and checkout.",
        "Developed clean, documented REST APIs in Node.js/Express.js with MongoDB and Mongoose validation schemas.",
        "Crafted mobile-responsive React interfaces, achieving fluid interactive states and client-side form validation."
      ],
      technologies: ["React.js", "JavaScript", "Node.js", "Express.js", "MongoDB", "Postman", "Bootstrap"],
      highlights: ["Delivered complete MVP 2 weeks ahead of scheduled sprint", "Recognized for clean code structure and API documentation"]
    }
  ],

  education: [
    {
      deg: "Bachelor of Technology in Computer Science & Engineering",
      org: "RVS College of Engineering & Technology",
      time: "Jul 2022 — Jul 2026",
      note: "Graduated with 7.2 / 10 CGPA. Core focus in Data Structures, Algorithms, Database Management Systems, and Web Engineering.",
      badge: "B.Tech CSE",
      level: "Undergraduate",
      score: { value: 7.2, max: 10, label: "CGPA" }
    },
    {
      deg: "Intermediate (ISC / Senior Secondary)",
      org: "Andhra Association English School, Jamshedpur",
      time: "Mar 2020 — Mar 2022",
      note: "Scored 84.0% with strong foundations in Mathematics, Computer Science, and Physics.",
      badge: "84.0% ISC",
      level: "Senior Secondary",
      score: { value: 84, max: 100, label: "Score", suffix: "%" }
    }
  ],

  terminalCommands: [
    { cmd: "help", desc: "List all available interactive terminal commands" },
    { cmd: "skills", desc: "Display core technical skills, frameworks, and backend toolsets" },
    { cmd: "projects", desc: "List all production web applications and live deployment links" },
    { cmd: "experience", desc: "View professional work experience and engineering roles" },
    { cmd: "education", desc: "Show academic background, degrees, and institutions" },
    { cmd: "whoami", desc: "Print current developer bio, focus areas, and mindset" },
    { cmd: "contact", desc: "Print direct contact coordinates (Email, Phone, LinkedIn, WhatsApp)" },
    { cmd: "hire", desc: "Quick direct inquiry prompt to hire Kamil" },
    { cmd: "download-resume", desc: "Directly trigger resume PDF download" },
    { cmd: "clear", desc: "Clear terminal console buffer" },
  ]
};
