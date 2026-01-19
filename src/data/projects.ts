/**
 * Projects Data
 * 
 * Centralized project information used across the site.
 * This data is shared between the projects grid on the homepage
 * and individual project detail pages.
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  // Extended description for detail page
  longDescription?: string;
  image: string;
  // Additional images for detail page gallery
  gallery?: string[];
  url: string;
  tags: string[];
  // Additional metadata for detail page
  features?: string[];
  techStack?: string[];
  status?: "live" | "development" | "archived";
  year?: string;
}

export const projects: Project[] = [
  {
    id: "midocu-crm",
    title: "Midocu CRM Platform",
    description: "Enterprise-grade CRM system for interior design businesses. Multi-tenant architecture with customer portal, admin dashboard, field agent mobile app, AI-powered design visualization, quote management, and real-time collaboration. Currently in active development.",
    longDescription: `Midocu CRM is a comprehensive enterprise solution designed specifically for the interior design industry. 
    
The platform features a sophisticated multi-tenant architecture that allows multiple businesses to operate independently while sharing the underlying infrastructure. Key components include a customer-facing portal for project tracking and communication, a powerful admin dashboard for business operations, and a mobile application for field agents to capture measurements and upload site photos.

One of the standout features is the AI-powered design visualization system that helps customers see potential designs in their spaces. The platform also includes advanced quote management with version control, real-time collaboration tools, and integrated payment processing.`,
    image: "/projects/midocu-crm-banner.png",
    url: "#",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "AI/ML", "Multi-tenant", "In Development"],
    features: [
      "Multi-tenant SaaS architecture",
      "Customer portal with project tracking",
      "Admin dashboard with analytics",
      "Field agent mobile application",
      "AI-powered design visualization",
      "Quote management system",
      "Real-time collaboration",
      "Integrated payment processing"
    ],
    techStack: ["Next.js 15", "FastAPI", "PostgreSQL", "Redis", "Docker", "AWS", "OpenAI API", "React Native"],
    status: "development",
    year: "2024-Present"
  },
  {
    id: "midocu-cli",
    title: "Midocu Deployment CLI",
    description: "Secure enterprise deployment tool for Midocu platform. Features RAM-only secrets storage, Argon2 password hashing, license validation, Docker orchestration, and GitHub releases integration with auto-updates. Currently in active development.",
    longDescription: `The Midocu CLI is a specialized deployment tool designed for secure enterprise installations of the Midocu platform.

Security is at the core of this tool - secrets are stored only in RAM during runtime and never written to disk. Password hashing uses Argon2, the winner of the Password Hashing Competition, ensuring maximum security for stored credentials.

The CLI handles complete Docker orchestration, managing the deployment of all Midocu services including the web application, API server, database, and cache layers. It integrates directly with GitHub Releases to provide seamless auto-updates, ensuring deployments always have the latest security patches and features.

License validation is built-in, allowing enterprise customers to activate their installations securely while preventing unauthorized usage.`,
    image: "/projects/midocu-cli-banner.png",
    url: "#",
    tags: ["Python", "Docker", "DevOps", "Security", "CLI", "In Development"],
    features: [
      "RAM-only secrets storage",
      "Argon2 password hashing",
      "License validation system",
      "Docker orchestration",
      "GitHub releases integration",
      "Auto-update mechanism",
      "Secure configuration management",
      "Multi-environment support"
    ],
    techStack: ["Python", "Click", "Docker SDK", "Argon2", "GitHub API", "SQLite (encrypted)"],
    status: "development",
    year: "2024-Present"
  },
  {
    id: "gamecup",
    title: "GameCup.io",
    description: "The ultimate Web3 platform for competitive gamers to join tournaments and win crypto rewards. Built with real-time tournament system and Solana blockchain integration.",
    longDescription: `GameCup.io is a cutting-edge Web3 gaming platform that bridges the gap between competitive gaming and cryptocurrency rewards.

The platform enables gamers to participate in tournaments across various games, competing for crypto prize pools powered by the Solana blockchain. The real-time tournament system handles bracket management, match reporting, and automatic prize distribution through smart contracts.

Players can connect their Solana wallets, join public tournaments or create private ones, and earn rewards based on their performance. The platform supports multiple game titles and tournament formats including single elimination, double elimination, and round robin.

Anti-cheat measures and dispute resolution systems ensure fair play, while the leaderboard system tracks player rankings across all tournaments.`,
    image: "/projects/gamecup.png",
    url: "https://app.gamecup.io/",
    tags: ["Web3", "Solana", "Gaming", "Tournaments", "Crypto Rewards", "Real-time"],
    features: [
      "Real-time tournament brackets",
      "Solana wallet integration",
      "Smart contract prize distribution",
      "Multiple tournament formats",
      "Global leaderboards",
      "Anti-cheat systems",
      "Multi-game support",
      "Player profiles and stats"
    ],
    techStack: ["Next.js", "Solana Web3.js", "Anchor", "PostgreSQL", "WebSocket", "Redis"],
    status: "live",
    year: "2023"
  },
  {
    id: "oxskyt",
    title: "OXS KYT",
    description: "Advanced crypto wallet risk assessment platform with real-time blockchain analysis. Provides detailed risk scoring for cryptocurrency wallets with multi-chain support.",
    longDescription: `OXS KYT (Know Your Transaction) is a sophisticated blockchain analytics platform designed for compliance and risk management in the cryptocurrency space.

The platform provides real-time risk assessment for cryptocurrency wallets across multiple blockchains. Using advanced algorithms and machine learning, it analyzes transaction patterns, wallet interactions, and on-chain behavior to generate comprehensive risk scores.

Financial institutions, exchanges, and businesses use OXS KYT to comply with AML (Anti-Money Laundering) regulations and identify potentially suspicious activity. The platform can trace fund flows, identify mixer usage, detect connections to sanctioned entities, and flag unusual transaction patterns.

The multi-chain support includes major networks like Bitcoin, Ethereum, Solana, and various EVM-compatible chains, providing a unified view of wallet risk across the crypto ecosystem.`,
    image: "/projects/oxskyt.png",
    url: "https://oxskyt.com/",
    tags: ["Web3", "Blockchain", "Risk Assessment", "Crypto Analytics", "Multi-chain", "Security"],
    features: [
      "Real-time risk scoring",
      "Multi-chain support",
      "Transaction tracing",
      "Mixer detection",
      "Sanctions screening",
      "AML compliance tools",
      "API integration",
      "Detailed reporting"
    ],
    techStack: ["React", "Node.js", "Python", "PostgreSQL", "Blockchain APIs", "Machine Learning"],
    status: "live",
    year: "2023"
  },
  {
    id: "oxs-games",
    title: "OXS Games Dashboard",
    description: "A feature-rich gaming dashboard with asset management and game analytics. Built with Next.js and integrated blockchain functionalities.",
    longDescription: `OXS Games Dashboard is a comprehensive gaming analytics and asset management platform for blockchain-based games.

The dashboard provides players with a unified view of their in-game assets across multiple blockchain games. Users can track NFT ownership, monitor token balances, and view detailed analytics about their gaming activity.

Key features include real-time price tracking for gaming assets, portfolio valuation, and historical performance charts. The platform also integrates with game APIs to show in-game statistics, achievements, and leaderboard positions.

For game developers, the dashboard offers tools to monitor player engagement, track token economics, and analyze user behavior patterns.`,
    image: "/projects/speedverse-dashboard-banner.png",
    url: "#",
    tags: ["Next.js", "Dashboard", "Blockchain", "Web3"],
    features: [
      "Multi-game asset tracking",
      "NFT portfolio management",
      "Real-time price feeds",
      "Gaming analytics",
      "Achievement tracking",
      "Leaderboard integration",
      "Token balance monitoring",
      "Historical data charts"
    ],
    techStack: ["Next.js", "TypeScript", "Ethers.js", "Chart.js", "PostgreSQL", "Redis"],
    status: "archived",
    year: "2022"
  },
  {
    id: "rudolph-ai",
    title: "Rudolph Web3 Game",
    description: "Interactive leaderboard system for a Web3 game, showcasing real-time data and user engagement. Built with React and integrated with Solana blockchain.",
    longDescription: `Rudolph is an engaging Web3 game built on the Solana blockchain, featuring an interactive leaderboard system that drives player competition and engagement.

The game combines fun gameplay mechanics with blockchain rewards, allowing players to earn tokens and NFTs based on their performance. The real-time leaderboard system tracks player scores across multiple game modes and time periods.

The frontend is built with React for a smooth, responsive user experience, while the backend integrates directly with Solana for verifiable score submissions and reward distribution. Smart contracts ensure fair play and transparent prize allocation.

Social features include player profiles, friend lists, and the ability to challenge other players directly. Seasonal events and tournaments keep the community engaged with special rewards and unique NFT drops.`,
    image: "/projects/rudolph-banner.png",
    url: "#",
    tags: ["React", "Web3", "Dashboard", "dApp", "Solana", "Blockchain"],
    features: [
      "Real-time leaderboards",
      "Solana wallet integration",
      "Play-to-earn mechanics",
      "NFT rewards",
      "Player profiles",
      "Social features",
      "Seasonal events",
      "Tournament system"
    ],
    techStack: ["React", "Solana Web3.js", "Anchor", "Node.js", "MongoDB", "WebSocket"],
    status: "archived",
    year: "2022"
  },
  {
    id: "mako-food",
    title: "Mako Food Trading",
    description: "Professional website for an international food distribution company with elegant animations and responsive design.",
    longDescription: `Mako Food Trading's website is a professional web presence for an international food distribution company, designed to showcase their products and services to potential business partners.

The site features elegant animations and micro-interactions that bring the brand to life while maintaining fast load times and accessibility. The responsive design ensures a perfect experience across all devices, from desktop workstations to mobile phones.

Key sections include a product catalog with detailed specifications, company information highlighting their global reach and certifications, and a contact system for business inquiries. The design emphasizes trust and professionalism, critical factors in the B2B food industry.

Multi-language support and SEO optimization help the company reach international markets effectively.`,
    image: "/projects/makofood-banner.png",
    url: "https://makofood.com/",
    tags: ["E-commerce", "Animation", "Responsive", "Business"],
    features: [
      "Elegant animations",
      "Responsive design",
      "Product catalog",
      "Multi-language support",
      "Contact system",
      "SEO optimized",
      "Fast performance",
      "Accessibility compliant"
    ],
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "Vercel"],
    status: "live",
    year: "2023"
  },
];

/**
 * Get a single project by its ID
 */
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

/**
 * Get all project IDs for static generation
 */
export function getAllProjectIds(): string[] {
  return projects.map(project => project.id);
}
