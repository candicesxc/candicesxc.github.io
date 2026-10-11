// All copy, links and photo lists live here so the story is editable in one place.
import { COUNTRY_COUNT } from './data/visited'

export const PROFILE = {
  first: 'Candice',
  last: 'Shen',
  // TODO(candice): confirm preferred contact email
  email: 'candice.shen@yale.edu',
  linkedin: 'https://www.linkedin.com/in/candiceshen/',
  github: 'https://github.com/candicesxc',
}

export const STAGES = [
  {
    id: 'awareness',
    n: '01',
    name: 'Awareness',
    // **double asterisks** mark the key facts shown in red; [text](url) makes a link
    lines: [
      'I grew up in **Shanghai** as the cherished **only daughter** of a loving family.',
      "I wasn't the straight A kiddo but was **dramatic** enough to light the room up.",
      'I moved to **New York City** to pursue my dream in media at **NYU**.',
    ],
    // Ordered youngest (1) to most recent (9); regenerate with scripts/chapter-photos.py
    photos: Array.from({ length: 9 }, (_, i) => `/photos/ch1/${i + 1}.webp`),
    bar: ['Herstory', 'Now'],
    color: '#669bbc',
  },
  {
    id: 'consideration',
    n: '02',
    name: 'Consideration',
    lines: [
      'I started my career at [Attentive Mobile](https://www.attentive.com/), moved into **data SaaS**, and most recently at **Microsoft**.',
      'Along the way I became marketing’s **Swiss Army knife**: product marketing, account-based marketing, web, and paid. Whatever the team needed, I picked it up.',
      'It’s been a ride. Some of it **flopped**, and I wouldn’t trade those lessons for anything.',
    ],
    // Pieces of past work, oldest first; regenerate with scripts/work-samples.py
    photos: [
      {
        src: '/photos/ch2/1.webp',
        ratio: 1.09,
        alt: 'Attentive gifting email',
        full: '/photos/ch2/full-attentive.webp',
      },
      { src: '/photos/ch2/2.webp', ratio: 0.95, alt: 'Starburst LinkedIn carousel ad' },
      { src: '/photos/ch2/3.webp', ratio: 1.914, alt: 'Materialize customer story graphic featuring Ramp' },
      {
        src: '/photos/ch2/4.webp',
        ratio: 1.775,
        alt: 'Microsoft Security audience research deck',
        full: '/photos/ch2/full-microsoft.webp',
      },
    ],
    bar: ['Attentive', 'Microsoft'],
    // Smaller strip than the photo stages, leaving more open room around the work samples
    barMax: 290,
    // Few enough pieces to show side by side on desktop, so no slider there
    fitDesktop: true,
    // Click a sample to enlarge it; `full` swaps in the whole piece
    zoom: true,
    color: '#f4a261',
  },
  {
    id: 'decision',
    n: '03',
    name: 'Decision',
    lines: [
      'I went to **Yale SOM** because an MBA sounded cool and I figured I was due for an **“adult” job**.',
      'Nope. The suit never fit. **Zero regrets**, though.',
      'I left with my **best friends**, the funniest house parties, coffee chats without coffee, and an **AI automation** for everything. (Business? Maybe 1%.)',
    ],
    // Same-sized pair; regenerate with scripts/flip-photos.py
    flip: {
      front: { src: '/photos/ch3/front.webp', alt: 'Candice in her graduation gown, looking composed' },
      back: { src: '/photos/ch3/back.webp', alt: 'Candice in her graduation gown, laughing with her cap flying off' },
    },
    color: '#a9cbe0',
  },
  {
    id: 'converted',
    n: '04',
    name: 'Converted',
    lines: [
      'Now I’m the **queen of Ramp’s marketing website**. In practice that means growth product manager, web developer, designer, data scientist, behavioral researcher, copywriter...',
      'There’s **no “typical day”**, which is the fun part. The only constant is that I work with **AI agents** as much as with humans.',
      'We’re making our website so **WOW** that you and your AI both feel like you’re missing out if you don’t drop your email.',
    ],
    // A small browser window beside the copy. ramp.com refuses to load inside other sites,
    // so the window shows a faded snapshot of the homepage and links out to the real thing.
    browser: {
      title: 'Ramp',
      icon: '/logos/ramp.svg',
      address: 'ramp.com',
      href: 'https://ramp.com',
      shot: '/photos/ch4/ramp-home.webp',
    },
    color: '#c1121f',
    text: '#fdf0d5',
  },
  {
    id: 'retention',
    n: '05',
    name: 'Retention',
    lines: [
      `Outside of work, I **travel the world**. I have been to **${COUNTRY_COUNT} countries** and counting.`,
      'I spent months living in **Seoul** and **Prague** and left my fondest memories there.',
    ],
    // World map of everywhere visited; the list lives in src/data/visited.js
    map: true,
    color: '#f7c59f',
  },
]

// The whole funnel as shown in the progress rail and the particle colours: the five
// story stages above, then the last two screens (side projects, say hi).
export const FUNNEL = [
  ...STAGES,
  { id: 'projects', n: '06', name: 'Expansion', color: '#4f7892', text: '#fdf0d5' },
  { id: 'contact', n: '07', name: 'Advocacy', color: '#780000', text: '#fdf0d5' },
]

export const LOGOS = [
  { name: 'NYU', src: '/logos/nyu.png' },
  { name: 'Attentive', src: '/logos/attentive.png' },
  { name: 'Starburst', src: '/logos/starburst.png' },
  { name: 'Materialize', src: '/logos/materialize.jpeg' },
  { name: 'Microsoft', src: '/logos/microsoft.png' },
  { name: 'Yale SOM', src: '/logos/yalesom.svg' },
  { name: 'Ramp', src: '/logos/ramp.svg' },
]

// `line` shows on the card; `details`, `tags`, `team` and `award` show in the pop-up
// that opens when the card itself (not its buttons) is clicked.
export const PROJECTS = [
  {
    title: 'Listen, You Are Loved',
    line: 'An AI that writes affirmations just for you, then speaks them aloud over music. All in your browser.',
    details: [
      'I built this full-stack app to move beyond generic wellness content and deliver custom, spoken-word affirmations on demand. It orchestrates a multimodal AI pipeline: GPT-4o Mini writes a script tailored to a specific persona, and OpenAI TTS brings it to life in multiple languages.',
      'To keep the experience seamless, I engineered a browser-based audio engine with the Web Audio API that mixes the speech with background music on the fly. You can customize it, loop it, and export the final affirmation as a WAV file without leaving the page.',
    ],
    tags: ['React', 'Node.js', 'OpenAI API', 'Web Audio API', 'Multimodal AI'],
    image: '/images/listen-you-are-loved.png',
    live: 'https://candiceshen.com/listen-you-are-loved/',
    repo: 'https://github.com/candicesxc/listen-you-are-loved',
  },
  {
    title: 'Competitive Battlecard AI',
    line: 'Paste any company URL. Get a sales-ready battlecard on its toughest rivals in minutes, not days.',
    details: [
      'Built for product marketers and GTM teams, this tool removes the manual grind of competitor research. Enter a company website and it finds the top rivals on its own, scores them for relevance, and generates structured battlecards covering pricing, “How to Win” plays, and “Potential Landmines.”',
      'A neural search layer uncovers niche competitors that ordinary search engines miss. A custom jsPDF integration turns the insights into board-ready PDF reports, and local storage lets you save and reload your research mid-workflow. It turns raw web data into strategy a sales team can close with.',
    ],
    tags: ['Market Intelligence', 'Product Marketing', 'Neural Search', 'GTM Strategy', 'Tailwind CSS'],
    image: '/images/competitive-battlecard-ai-dark.webp',
    // The screenshot is wider than the card, so show all of it on a matching backdrop.
    imageBg: '#161d2f',
    contain: 'p-0',
    live: 'https://candiceshen.com/competitive-battlecard-ai/',
    repo: 'https://github.com/candicesxc/competitive-battlecard-ai',
  },
  {
    title: 'Pocket Pitch Legends',
    line: 'A Pokémon Go-style football game for the 2026 World Cup that turns your own city into the pitch.',
    details: [
      'Pocket Pitch Legends transforms real-world geography into a live football arena. Players explore their city on an interactive map, discover rival squads at real landmarks, and challenge them to geo-anchored PvP matches. Every zone has a leaderboard, a live match feed, and a roster of challengers, so even a walk across campus feels like match day.',
      'AI-powered mini-games sharpen your skills between battles. In the Passing Triangle drill, Google Gemini tracks your defender movement in real time and narrates your performance like a broadcast commentator. Under the hood: React 18, Leaflet for live mapping, and Supabase for real-time match data and leaderboards, designed mobile-first and deployed on Vercel.',
    ],
    tags: ['React 18', 'TypeScript', 'Leaflet', 'Supabase', 'Google Gemini', 'Location-based'],
    team: 'Candice Shen · Daniel Yang · Yiqi Song · Helen Deng',
    award: 'Highest Grade · Generative AI & Social Media',
    image: '/images/pocket-pitch-legends-logo.png',
    imageBg: '#1a2a1a',
    contain: 'p-6',
    screenshots: ['/images/ppl1.png', '/images/ppl2.png', '/images/ppl3.png'],
    live: 'https://pixel-perfect-capture-nine.vercel.app/',
    repo: 'https://github.com/gliderhover/pixel-perfect-capture',
  },
]
