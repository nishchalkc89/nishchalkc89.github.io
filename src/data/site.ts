export const site = {
  name: 'Nishchal KC',
  email: 'nishchalkc370@gmail.com',
  location: 'Nepal',
  timeZone: 'Asia/Kathmandu',
  timeLabel: 'NPT',
  github: 'https://github.com/nishchalkc89',
  linkedin: 'https://www.linkedin.com/in/nishchalkc/',
  x: 'https://x.com/nishchalkc89',
};

export const services = [
  {
    title: 'Blockchain development',
    body: 'Solidity smart contracts, dApps and wallet integrations, built with security in mind and tested before they touch mainnet.',
    items: ['Smart contracts', 'dApps & Web3', 'IPFS storage', 'Contract testing'],
  },
  {
    title: 'Full-stack web',
    body: 'Complete products from database to deploy: fast React front-ends and reliable APIs.',
    items: ['React & TypeScript', 'Node.js & Python', 'SQL & Supabase', 'Docker & deploy'],
  },
  {
    title: 'Design & front-end',
    body: 'Interfaces that look considered and load quickly. I design the screens and build them, so nothing is lost in hand-off.',
    items: ['UI design', 'Landing pages', 'Responsive builds', 'Motion & detail'],
  },
];

export const process = [
  { t: 'Discover', d: 'We talk through the goal, users and budget.' },
  { t: 'Design', d: 'Wireframes and a visual direction you approve.' },
  { t: 'Build', d: 'Clean, tested code with regular check-ins.' },
  { t: 'Launch', d: 'Deploy, hand over, and stay around for fixes.' },
];

export type Project = {
  title: string;
  kind: 'Blockchain' | 'Full-stack' | 'Web & design';
  blurb: string;
  stack: string[];
  /** real screenshot, if there is one */
  image?: string;
  /** generated artwork (1-4) used when there is no screenshot */
  cover?: number;
  github?: string;
  live?: string;
  highlight?: string;
};

export const projects: Project[] = [
  {
    title: 'Delight Shopping Mart',
    kind: 'Full-stack',
    blurb:
      'An online supermarket for Tulsipur and Ghorahi, Dang. Customers browse groceries, snacks, beauty, baby care, kitchen and stationery, choose a store and get home delivery.',
    stack: ['E-commerce', 'Multi-store', 'Home delivery', 'PWA'],
    image: '/projects/delight-mart.webp',
    live: 'https://www.delightshoppingmart.com.np/',
    highlight: 'Latest · main project',
  },
  {
    title: 'NextOwner',
    kind: 'Full-stack',
    blurb: 'A campus marketplace where students buy, sell and swap with each other, with zero listing fees and verified sellers.',
    stack: ['PWA', 'JavaScript', 'Vercel'],
    image: '/projects/next-owner.jpg',
    live: 'https://next-owner-two.vercel.app',
    github: 'https://github.com/nishchalkc89/NextOwner',
    highlight: 'Live product',
  },
  {
    title: 'PrintCloud',
    kind: 'Full-stack',
    blurb:
      'Scan a QR code at any print shop, upload your documents, pay with eSewa and get your prints automatically. Built for Nepal.',
    stack: ['TypeScript', 'eSewa', 'Vercel'],
    image: '/projects/printcloud.jpg',
    live: 'https://print-shop-three.vercel.app',
    github: 'https://github.com/nishchalkc89/print_shop',
    highlight: 'Live product',
  },
  {
    title: 'RushIT',
    kind: 'Web & design',
    blurb: 'Website for a cybersecurity and IT consulting company, presenting its services, differentiators and federal resources to business and government clients.',
    stack: ['Client website', 'Responsive', 'Netlify'],
    image: '/projects/rushit.jpg',
    live: 'https://itrush.netlify.app/',
    highlight: 'Client project',
  },
  {
    title: 'Uttarakhand Seva Nidhi',
    kind: 'Web & design',
    blurb: 'Website for a public charitable trust working on environmental education and women’s leadership in the hills of Uttarakhand, with its programmes, events and publications.',
    stack: ['Client website', 'Responsive'],
    image: '/projects/seva-nidhi.jpg',
    live: 'https://www.seva-nidhi.org/',
    highlight: 'Client project',
  },
  {
    title: 'TW Trainz',
    kind: 'Web & design',
    blurb: 'Website for a sales-training company that builds tailored, learner-centric programs, with pages for its services, federal resources and experience.',
    stack: ['Client website', 'Responsive', 'Netlify'],
    image: '/projects/tw-trainz.jpg',
    live: 'https://twtrainz.netlify.app/',
    highlight: 'Client project',
  },
  {
    title: 'Blockchain Exam System',
    kind: 'Blockchain',
    blurb:
      'Tamper-proof online examinations. Question papers live on IPFS, results are anchored on-chain, and the whole system runs in Docker so it scales.',
    stack: ['Solidity', 'IPFS', 'Pinata', 'Docker'],
    cover: 1,
    highlight: 'Final-year project',
  },
  {
    title: 'Blockchain E-Voting',
    kind: 'Blockchain',
    blurb:
      'Transparent online voting with one vote per verified user, MetaMask sign-in and a Solidity contract that makes the tally auditable.',
    stack: ['Solidity', 'Ethereum', 'MetaMask', 'MySQL'],
    cover: 2,
  },
  {
    title: 'PhishGuard',
    kind: 'Full-stack',
    blurb:
      'Real-time phishing URL detection with behavioural analysis and zero-day checks, designed to work alongside a browser extension.',
    stack: ['React', 'TypeScript', 'Supabase', 'ML'],
    cover: 3,
  },
  {
    title: 'Doctor Appointment Booking',
    kind: 'Full-stack',
    blurb:
      'A booking platform for patients and doctors, with both the front-end and back-end delivered during my internship at Verastix.',
    stack: ['React', 'Node.js', 'Database'],
    cover: 4,
  },
  {
    title: 'The Mist',
    kind: 'Web & design',
    blurb: 'Restaurant website with online ordering and table booking, designed around how guests actually decide what to eat.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/the-mist.jpg',
    github: 'https://github.com/nishchalkc89/THE_MIST',
    live: 'https://nishchalkc89.github.io/THE_MIST/',
  },
  {
    title: 'Rani Cake',
    kind: 'Web & design',
    blurb: 'A cake shop storefront with warm product displays and gentle motion. Small brand, careful details.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/rani-cake.jpg',
    github: 'https://github.com/nishchalkc89/Rani_cake',
    live: 'https://nishchalkc89.github.io/Rani_cake/',
  },
  {
    title: 'Divya Kunj Academy',
    kind: 'Web & design',
    blurb: 'Institute website that puts announcements, academics and contact details a single tap away on any device.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/divya-kunj.jpg',
    github: 'https://github.com/nishchalkc89/divy_kunj_academy',
    live: 'https://nishchalkc89.github.io/divy_kunj_academy/',
  },
];

export const stack = [
  { group: 'Blockchain', items: ['Solidity', 'Ethereum', 'Hardhat', 'Truffle', 'MetaMask', 'IPFS', 'Web3.js'] },
  { group: 'Front-end', items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'HTML5', 'CSS3'] },
  { group: 'Back-end', items: ['Node.js', 'Python', 'Go', 'MySQL', 'Supabase'] },
  { group: 'Tooling', items: ['Git', 'GitHub', 'Docker', 'Vercel', 'Netlify', 'Figma'] },
];

/** logos shown in the sliding strip */
export const marquee = [
  'Solidity', 'Ethereum', 'React', 'TypeScript', 'Node.js', 'Python', 'Docker', 'Supabase',
  'Tailwind CSS', 'IPFS', 'Web3.js', 'Figma', 'Vercel', 'GitHub',
];

export const work = [
  {
    period: '2025 — Now',
    role: 'Freelance Developer & Designer',
    place: 'Independent · Nepal',
    body: 'Working with clients on websites, full-stack products and blockchain builds, handling design, development and launch.',
  },
  {
    period: 'Jun — Jul 2025',
    role: 'Full Stack Developer Intern',
    place: 'Verastix Technology Pvt. Ltd., Nepal',
    body: 'Built a Doctor Appointment Booking System across front-end and back-end, with a focus on dependable data handling and usability.',
  },
  {
    period: 'Jun — Aug 2024',
    role: 'Data Analyst Intern',
    place: 'Sapivi Enterprise Pvt. Ltd., India',
    body: 'Wrote Python scripts to collect and clean large datasets, and used SQL and Excel to keep the data accurate and ready for analysis.',
  },
];

export const education = [
  {
    period: '2022 — 2026',
    role: 'B.Tech, Computer Science & Engineering',
    place: 'Sharda University, Greater Noida, India',
    body: 'Completed my degree with a focus on blockchain, security and full-stack development.',
  },
  {
    period: 'Completed',
    role: 'Higher Secondary (+2), Science',
    place: 'Gorkha Secondary School, Tulsipur, Dang, Nepal',
    body: 'Science and mathematics, the base for moving into computer science.',
  },
  {
    period: 'Completed',
    role: 'Secondary Education (SEE)',
    place: 'Mid West Point Academy, Nepal',
    body: 'Completed the secondary education examination with a strong grounding in the sciences.',
  },
];

/** Photos from college time (B.Tech, 2022 to 2026). Exact dates are not recorded, so the period is shown. */
export const collegePeriod = '2022 – 2026';

export type Photo = {
  file: string;
  w: number;
  h: number;
  title: string;
  caption: string;
  alt: string;
};

export const gallery: Photo[] = [
  {
    file: 'nishchal-kc-volleyball-trophy-sharda-university.webp',
    w: 960, h: 1280,
    title: 'Volleyball trophy',
    caption: 'Holding the volleyball trophy and medal at Sharda University.',
    alt: 'Nishchal KC holding a volleyball trophy and a medal in front of a hedge wall at Sharda University',
  },
  {
    file: 'nishchal-kc-nepali-freshers-celebration-sharda-university.webp',
    w: 960, h: 1280,
    title: 'Nepali freshers’ celebration',
    caption: 'Speaking at the Nepali freshers’ celebration at Sharda University.',
    alt: 'Nishchal KC in a Dhaka topi speaking at a podium at the Nepali freshers celebration, Sharda University',
  },
  {
    file: 'nishchal-kc-dtc-festival-trophy-sharda-university.webp',
    w: 900, h: 1600,
    title: 'DTC festival',
    caption: 'Receiving a trophy at the DTC festival, Sharda University.',
    alt: 'Nishchal KC receiving a trophy and certificate on stage at the DTC festival, Sharda University',
  },
  {
    file: 'nishchal-kc-evening-sports-field-college.webp',
    w: 960, h: 1280,
    title: 'On the field',
    caption: 'An evening on the sports field during my college years.',
    alt: 'Nishchal KC seen from behind in a white jersey with Khatri 28 on a sports field in the evening',
  },
  {
    file: 'nishchal-kc-global-village-sharda-university.webp',
    w: 960, h: 1280,
    title: 'Global Village',
    caption: 'At Global Village, Sharda University, in traditional Nepali dress.',
    alt: 'Nishchal KC in a black Nepali topi and suit at the Global Village event, Sharda University',
  },
  {
    file: 'nishchal-kc-dashain-celebration-sharda-university.webp',
    w: 960, h: 1280,
    title: 'Dashain',
    caption: 'Celebrating Dashain with a tika at Sharda University.',
    alt: 'Nishchal KC smiling with a red Dashain tika on his forehead at Sharda University',
  },
  {
    file: 'nishchal-kc-interview-portrait.webp',
    w: 960, h: 1280,
    title: 'Interview day',
    caption: 'A formal photo taken for an interview.',
    alt: 'Nishchal KC in a white shirt and black trousers standing outside a brick university building, photographed for an interview',
  },
];
