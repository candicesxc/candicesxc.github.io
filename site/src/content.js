// All copy, links and photo lists live here so the story is editable in one place.
import { COUNTRY_COUNT } from './data/visited'

export const PROFILE = {
  first: 'Candice',
  last: 'Shen',
  email: 'candicesxc17@gmail.com',
  linkedin: 'https://www.linkedin.com/in/candiceshen/',
  github: 'https://github.com/candicesxc',
}

export const STAGES = [
  {
    id: 'awareness',
    n: '01',
    name: 'Awareness',
    // **double asterisks** mark a key fact in red (one per sentence at most, so red keeps
    // its meaning); [text](url) makes a link
    lines: [
      'I grew up in **Shanghai** as the cherished only daughter of a loving family.',
      "I wasn't the straight A kiddo but was **dramatic** enough to light the room up.",
      'I moved to New York City to pursue my dream in media at **NYU**.',
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
      'I started my career at [Attentive Mobile](https://www.attentive.com/), moved into data SaaS, and most recently at Microsoft.',
      'Along the way I became marketing’s **Swiss Army knife**: product marketing, account-based marketing, web, and paid. Whatever the team needed, I picked it up.',
      'It’s been a ride. Some of it **flopped**, and I wouldn’t trade those lessons for anything.',
    ],
    // Pieces of past work, oldest first; regenerate with scripts/work-samples.py
    // `caption` shows on the card, the rest beside the enlarged piece. `fit: 'contain'` keeps
    // a wide piece whole on a matching `matte`; otherwise the frame crops from `focus`.
    // Stories only: no resume metrics, budgets or counts on this site.
    photos: [
      {
        src: '/photos/ch2/1.webp',
        alt: 'Attentive gifting email',
        full: '/photos/ch2/full-attentive.webp',
        focus: 'center top',
        company: 'Attentive',
        title: 'Re-engagement gift email',
        caption: 'I led the re-engagement campaigns',
        what: 'Accounts that had gone quiet got to pick a gift, with fresh SMS research as a reason to pick the conversation back up.',
        did: 'I led mid-funnel re-engagement across email, direct mail and paid ads, so the gift, the research and the seller’s follow-up all told one story.',
        resultLabel: 'what i learned',
        result: 'The first send flopped. The delivery data showed why: the subject line got cut off on phones, and it landed before the West Coast was awake. A shorter subject that mentioned gift cards and an afternoon send turned it around. Keep the idea, fix the execution.',
      },
      {
        src: '/photos/ch2/2.webp',
        alt: 'Starburst LinkedIn carousel ad',
        focus: 'center 30%',
        company: 'Starburst',
        title: 'LinkedIn carousel ad',
        caption: 'I made the ads in-house and tested them',
        what: 'A promoted carousel starring Commander Bun Bun, the Trino mascot, pitching Starburst as the power of Trino without the overhead.',
        did: 'Our static brand ads were blending into the feed, and there was no agency budget. So I designed and animated the ads myself, sending Commander Bun Bun off in a rocket, then A/B tested them against the static ones.',
        resultLabel: 'what i learned',
        result: 'The moving formats won clearly. Sometimes having no budget for an agency is the creative brief.',
      },
      {
        src: '/photos/ch2/3.webp',
        alt: 'Materialize customer story graphic featuring Ramp',
        fit: 'contain',
        matte: '#1b1430',
        company: 'Materialize',
        title: 'Customer story graphic',
        caption: 'I designed it: we had no designer yet',
        what: 'A customer story promo quoting a staff engineer at Ramp. Yes, that Ramp. Foreshadowing.',
        did: 'We didn’t have a designer at the time, so I designed this myself. As the first ABM hire at a cloud data startup, I built the marketing infrastructure from scratch, including paid media and the first nurture email program.',
        resultLabel: 'what changed',
        result: 'A/B testing and tighter targeting turned cold audiences into a steady source of pipeline.',
      },
      {
        src: '/photos/ch2/4.webp',
        alt: 'Microsoft Security audience research deck',
        fit: 'contain',
        matte: '#ffffff',
        company: 'Microsoft Security',
        title: 'Protect Cloud & AI audience research',
        caption: 'I led the research as a PMM intern',
        what: 'My final presentation on who really decides cloud and AI security purchases, and what they need to hear.',
        did: 'I led the research design and partnered with an outside agency on one-on-one executive interviews. I ran a survey through a customer community, then turned both into go-to-market recommendations and presented them to executive stakeholders.',
        resultLabel: 'what changed',
        result: 'The big idea: stop leading with technical features and talk about enterprise risk. The positioning frameworks fed into the product roadmap, and product, marketing and sales all bought in.',
      },
    ],
    bar: ['Attentive', 'Microsoft'],
    // Cards with captions, side by side on desktop (no slider there). Click to enlarge;
    // `full` swaps in the whole piece.
    samples: true,
    color: '#f4a261',
  },
  {
    id: 'decision',
    n: '03',
    name: 'Decision',
    lines: [
      'I went to **Yale SOM** because an MBA sounded cool and I figured I was due for an “adult” job.',
      'Nope. The suit never fit. **Zero regrets**, though.',
      'I left with my best friends, the funniest house parties, coffee chats without coffee, and an **AI automation** for everything. (Business? Maybe 1%.)',
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
      'There’s no “typical day”, which is the fun part. The only constant is that I work with **AI agents** as much as with humans.',
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
    // One expandable work example under the copy. Stays hidden until it is filled in, with
    // real facts only: { title, problem, did, decision, result, resultLabel }.
    work: null,
    color: '#c1121f',
    text: '#fdf0d5',
  },
  {
    id: 'retention',
    n: '05',
    name: 'Retention',
    lines: [
      `Outside of work, I travel the world. I have been to **${COUNTRY_COUNT} countries** and counting.`,
      'I spent months living in Seoul and Prague and left my fondest memories there.',
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
  { id: 'projects', n: '06', name: 'Expansion', color: '#456d87', text: '#fdf0d5' },
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

// `line` shows on the card; the rest shows in the pop-up that opens from "read more".
export const PROJECTS = [
  {
    title: 'Listen, You Are Loved',
    line: 'Pick who it should sound like and the mood you need. It writes an affirmation just for you, reads it aloud, and sets it to music.',
    idea: 'Most wellness content is written for everyone, so it never quite lands. I built this full-stack app to write for one person at a time, in the voice and tone they pick.',
    how: [
      'You choose a persona and a tone, like cheerful, calm, lullaby or motivational, and GPT writes the script in that voice.',
      'OpenAI text-to-speech reads it aloud in the voice you pick.',
      'An audio engine I built on the Web Audio API mixes the speech with background music right in the browser, ready to download.',
      'All the AI calls stay on the server, so the API key never reaches your browser. The interface also speaks Chinese and Korean.',
    ],
    tags: ['React', 'Node.js', 'OpenAI API', 'Web Audio API', 'Multimodal AI'],
    image: '/images/listen-you-are-loved.webp',
    focus: 'center top',
    live: 'https://candiceshen.com/listen-you-are-loved/',
    repo: 'https://github.com/candicesxc/listen-you-are-loved',
  },
  {
    title: 'Competitive Battlecard AI',
    line: 'Paste any company URL. Get sales-ready battlecards on its toughest rivals in minutes, not days.',
    idea: 'Competitor research is the homework every product marketer owes and nobody has time for. I had done it by hand in my own product marketing work, so I automated it.',
    how: [
      'Give it a company URL. Exa’s neural search finds the rivals, including niche ones ordinary search misses, and scores them for relevance.',
      'A team of CrewAI agents researches, analyzes and summarizes, then writes a card per competitor: products, pricing, strengths, weaknesses, how we win, and potential landmines.',
      'A sales playbook generator adds objection handling, talk tracks by deal stage, and competitive narratives by buyer persona.',
      'Save your research in the browser, or export it as a PDF or a native PowerPoint deck.',
    ],
    tags: ['FastAPI', 'CrewAI', 'OpenAI API', 'Exa', 'Tailwind CSS', 'jsPDF'],
    image: '/images/competitive-battlecard-ai-dark.webp',
    imageBg: '#161d2f',
    live: 'https://candiceshen.com/competitive-battlecard-ai/',
    repo: 'https://github.com/candicesxc/competitive-battlecard-ai',
  },
  {
    title: 'Pocket Pitch Legends',
    line: 'Pokémon Go for the 2026 World Cup: explore your own city, recruit football legends, and train them over chat.',
    idea: 'What if the World Cup came to your neighborhood? I led the team that built this app for our Generative AI and Social Media class, built part of the app myself, and did the UI/UX.',
    how: [
      'A live map turns your city into football zones. Tap a player marker to challenge them.',
      'Win a swipe-to-dive penalty duel and the player joins your squad.',
      'Google Gemini powers in-character chat, so Mbappé sounds like Mbappé, and every conversation shifts your player’s confidence, form, morale and fan bond.',
      'Challenge rival managers, react to a live match feed, and climb the leaderboard. It installs on your phone and runs like a native app.',
    ],
    tags: ['React 18', 'TypeScript', 'Leaflet', 'Supabase', 'Google Gemini', 'Vercel'],
    team: 'Candice Shen · Daniel Yang · Yiqi Song · Helen Deng',
    award: 'Highest Grade · Generative AI & Social Media',
    image: '/images/pocket-pitch-legends-logo.webp',
    imageBg: '#1a2a1a',
    contain: 'p-5',
    screenshots: ['/images/ppl1.webp', '/images/ppl2.webp', '/images/ppl3.webp'],
    live: 'https://pixel-perfect-capture-nine.vercel.app/',
    repo: 'https://github.com/gliderhover/pixel-perfect-capture',
  },
]
