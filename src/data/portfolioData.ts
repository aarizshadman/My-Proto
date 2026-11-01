import { PortfolioData } from '../types';

/**
 * ========================================================================
 * AARIZ SHADMAN - PORTFOLIO DATA
 * ========================================================================
 * Edit this file to update any personal information, projects, essays,
 * reading lists, or timeline milestones. Everything is centralized here.
 */

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Aariz Shadman',
    pronouns: 'he/him',
    title: 'Student & Software Builder',
    location: 'New Delhi , India',
    university: 'Undergraduate in Computer Science',
    degree: 'B.Tech in Computer Science & Engineering',
    expectedGraduation: '2026',
    bioIntro:
      "I'm an undergraduate student obsessed with understanding how software works from the silicon up, and building small, useful tools for curious people.",
    bioExpanded: [
      "I spend most of my free time reading technical papers, experimenting with distributed primitives, and crafting fast interfaces with minimal dependencies.",
      "Rather than chasing every framework trend, I try to cultivate first-principles curiosity: how does a database manage concurrent writes without corrupting disk state? What makes a user interface feel tactile rather than sluggish? What happens in the network stack between typing an address and receiving a byte?",
      "This website is my personal corner of the internet — an honest notebook of things I've built, questions I haven't answered yet, and books that changed how I think."
    ],
    email: 'aarizshadman1@gmail.com',
    github: 'https://github.com/aarizshadman',
    twitter: 'https://x.com/aarizshadman',
    linkedin: 'https://www.linkedin.com/in/aariz-shadman-bb2a9443a/',
    rssUrl: '/rss.xml',
  },

  currently: {
    statusBadge: 'Building & Exploring',
    focus: 'Storage engines, low-latency web tools, and compiler basics',
    readingBook: {
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      status: 'Chapter 7: Transactions & isolation levels',
    },
    tinkeringWith: 'A zero-dependency toy parser for a subset of Markdown in TypeScript',
    currentInquiries: [
      {
        question: 'What makes software feel genuinely tactile?',
        context:
          'Investigating sub-50ms interaction loops, optimistic updates, and keyboard-first design in everyday software tools.',
        status: 'Prototyping',
      },
      {
        question: 'How simple can an educational storage engine be?',
        context:
          'Dissecting log-structured merge trees (LSM) vs B+ trees to understand where read and write amplification actually hurts.',
        status: 'Pondering',
      },
      {
        question: 'Can we build local-first tools that respect student attention?',
        context:
          'Exploring offline-first note synchronization using CRDTs without requiring heavy cloud backends.',
        status: 'Reading',
      },
    ],
  },

  projects: [
    {
      id: 'loom-kv',
      title: 'LoomKV',
      tagline: 'A lightweight persistent key-value store with write-ahead logging (WAL) and memtable caching.',
      year: '2025',
      category: 'Systems',
      status: 'Active',
      problem:
        'Most introductory database tutorials stop at in-memory hash maps. I wanted to understand how crash recovery, atomic write logging, and persistent disk flushes operate without relying on external libraries.',
      architecture:
        'Written in Go. Implements an append-only Write-Ahead Log (WAL) with CRC32 checksums, an in-memory skiplist memtable, and periodic compaction into immutable SSTable segments with binary search indexing.',
      learnings:
        'Working directly with binary file offsets, fsync trade-offs, and disk I/O bottlenecks gave me immense respect for real-world storage engines like LevelDB and RocksDB.',
      technologies: ['Go', 'File I/O', 'Binary Serialization', 'Crash Recovery Primitives'],
      metrics: 'Sub-millisecond writes with guaranteed crash durability across simulated power cuts',
      githubUrl: 'https://github.com/aarizshadman/loom-kv',
      liveUrl: 'https://github.com/aarizshadman/loom-kv#benchmarks',
      featured: true,
    },
    {
      id: 'marginalia',
      title: 'Marginalia',
      tagline: 'A privacy-first research companion that lets you annotate and connect web articles locally.',
      year: '2025',
      category: 'Web Experiments',
      status: 'Complete',
      problem:
        'While researching university papers, I was frustrated by bloated browser extensions that require logins, leak reading history to third-party analytics, and slow down web pages.',
      architecture:
        'Zero external runtime dependencies. Built using vanilla Web APIs, IndexedDB for client-side storage, and a lightweight semantic search index running entirely inside Web Workers.',
      learnings:
        'Building for low-spec student laptops showed me how much CPU time typical browser extensions waste. Keeping the memory footprint under 12MB was a rewarding engineering constraint.',
      technologies: ['TypeScript', 'Web Extensions API', 'IndexedDB', 'Web Workers'],
      metrics: 'Over 400 active student users across campus; zero external network requests',
      githubUrl: 'https://github.com/aarizshadman/marginalia',
      liveUrl: 'https://github.com/aarizshadman/marginalia',
      featured: true,
    },
    {
      id: 'synapse-vis',
      title: 'SynapseVis',
      tagline: 'An interactive pedagogical visualizer for gradient propagation through neural networks.',
      year: '2024',
      category: 'AI & Tools',
      status: 'Complete',
      problem:
        'Mathematical formulas for backpropagation often obscure the geometric intuition of how error signals flow backwards through activation layers.',
      architecture:
        'Engineered with HTML5 Canvas and pure TypeScript. Users can tweak weights, toggle non-linearities (ReLU, Sigmoid, GELU), and observe vanishing or exploding gradients in real time at 60 FPS.',
      learnings:
        'Canvas animation performance requires careful memory pooling to avoid GC pauses during interactive scrubbing. Translating calculus proofs into smooth visual mechanics deepened my grasp of deep learning fundamentals.',
      technologies: ['TypeScript', 'HTML5 Canvas', 'Mathematics', 'Zero-dependency'],
      metrics: 'Used as a visual companion in our campus AI student study circle',
      githubUrl: 'https://github.com/aarizshadman/synapse-vis',
      liveUrl: 'https://github.com/aarizshadman/synapse-vis',
      featured: true,
    },
    {
      id: 'campus-pulse',
      title: 'CampusPulse',
      tagline: 'A fast, offline-capable schedule and resource guide built for 2,000+ university peers.',
      year: '2024',
      category: 'Campus Tools',
      status: 'Complete',
      problem:
        'Our university portal was notoriously slow on mobile devices, taking over 15 seconds to load room allocations and lab timetables during spot check-ins.',
      architecture:
        'A single-page PWA prioritizing extreme load speed (under 300ms on 3G connections). Caches timetable diffs locally and uses service workers for bulletproof offline support.',
      learnings:
        'Real-world user feedback from fellow students is humbling. Designing for spotty campus Wi-Fi taught me that reliability and instant UI beat fancy visual gimmicks every single time.',
      technologies: ['React', 'TypeScript', 'Service Workers', 'PWA', 'Local Storage'],
      metrics: 'Adopted across 6 engineering departments; reduced daily schedule lookup time by 90%',
      githubUrl: 'https://github.com/aarizshadman/campus-pulse',
      liveUrl: 'https://github.com/aarizshadman/campus-pulse',
      featured: true,
    },
    {
      id: 'trace-craft',
      title: 'TraceCraft',
      tagline: 'A terminal-based network latency and packet route visualizer written in Rust.',
      year: '2025',
      category: 'Systems',
      status: 'Prototype',
      problem:
        'Standard traceroute output is static and difficult to parse when debugging intermittent routing hops or packet loss spikes during dorm network slowdowns.',
      architecture:
        'Raw socket crafting via Rust. Spawns asynchronous ICMP probes, aggregates hop round-trip times into rolling ASCII histograms, and highlights jitter in terminal real time.',
      learnings:
        'Handling unprivileged socket permissions on POSIX systems, parsing raw IP headers byte-by-byte, and managing Tokio concurrency cleanly.',
      technologies: ['Rust', 'Tokio', 'Raw Sockets', 'Terminal UI'],
      githubUrl: 'https://github.com/aarizshadman/trace-craft',
      featured: false,
    },
  ],

  essays: [
    {
      id: 'on-building-small-tools',
      title: 'On Building Small Tools That Stick',
      subtitle: 'Why focused software with clear boundaries outlasts ambitious monoliths.',
      date: 'January 2025',
      readTime: '4 min read',
      tags: ['Design', 'Philosophy', 'Craft'],
      summary:
        'Observations on how small personal utilities often deliver ten times the daily utility of complex venture-backed tools, and why restraint is the hardest design muscle.',
      content: [
        "In my first two years of university, I had a bad habit: whenever I had an idea for a project, I would immediately start sketching a full-fledged platform. I would worry about authentication providers, distributed microservices, multi-tenant billing, and database sharding before writing a single line of domain logic.",
        "Almost all of those grand projects died in a repository graveyard after a couple of weeks. They were weighed down by their own imaginary obligations.",
        "The shift happened when I built a tiny 80-line shell script to notify me when our university library had study carrels available. It didn't have an authentication layer. It had no database. It just pinged an open endpoint and printed colored output to my terminal. Two years later, that script is still running every morning.",
        "Small tools endure because their problem surface is sharp and honest. When a piece of software does one thing well, its maintenance cost is nearly zero, its mental model is transparent, and its utility is self-evident.",
        "Today, whenever I feel the urge to architect something elaborate, I ask myself: 'What is the absolute smallest version of this that would genuinely solve someone’s headache this afternoon?' That constraint usually saves me hundreds of wasted hours."
      ],
    },
    {
      id: 'learning-in-public-vs-caves',
      title: 'Learning in Public vs. Building in Caves',
      subtitle: 'Navigating the tension between showing unfinished work and deep solitary focus.',
      date: 'November 2024',
      readTime: '5 min read',
      tags: ['Learning', 'Studentship', 'Writing'],
      summary:
        'Finding a healthy balance between broadcasting progress on social media and cultivating the quiet, sustained focus needed to tackle hard technical concepts.',
      content: [
        "The prevailing advice on tech Twitter and developer communities is to 'learn in public.' Tweet your daily commits, write a blog post every Sunday, stream your coding sessions, and build a personal brand while you're still figuring out binary search.",
        "There is undeniable value in sharing. Explaining a concept forces you to confront the gaps in your understanding. It creates surface area for serendipity and connects you with mentors you would never otherwise meet.",
        "But there is a subtle trap: performative learning can easily replace actual understanding. It is very easy to spend three hours polishing a Twitter thread about a paper you skimmed for twenty minutes.",
        "Some of the deepest breakthroughs I've had as a student—like finally wrapping my head around concurrent locks or understanding how the Linux page cache interacts with memory maps—happened during weeks when I closed all social tabs, put my phone in another room, and sat with paper and pencil.",
        "My current compromise is simple: build and study in the cave, but publish the field notes once the dust settles. Not to impress an algorithm, but to leave breadcrumbs for future me and any fellow student wrestling with the same roadblock."
      ],
    },
    {
      id: 'what-makes-software-tactile',
      title: 'What Makes Software Feel Tactile?',
      subtitle: 'Notes on 60fps latency, micro-feedback, and human-computer ergonomics.',
      date: 'September 2024',
      readTime: '4 min read',
      tags: ['HCI', 'Performance', 'Web'],
      summary:
        'Why modern web apps often feel detached from human touch, and how sub-50ms latency and intentional kinetic response restore physical satisfaction.',
      content: [
        "When you flip a physical light switch, there is no loading spinner. There is an audible click, a mechanical resistance, and an instantaneous change in light. The feedback loop is immediate and physical.",
        "Much of modern web software has lost this tactile quality. We have become accustomed to clicking a button, waiting 400 milliseconds for a network roundtrip, watching an asynchronous spinner wobble, and having the layout shift under our cursor.",
        "Software feels 'tactile' when three conditions are met:",
        "1. Zero perceived input latency: Keypresses and hover states should react within a single animation frame (16ms). Any lag between intention and response breaks the illusion of direct manipulation.",
        "2. Predictable spatial continuity: Elements shouldn't appear out of nowhere or abruptly snap. Smooth, spring-like transitions help our spatial memory track where things came from and where they went.",
        "3. Honest state representation: If an operation is local, make it instant. If an operation requires the network, provide immediate optimistic feedback with graceful failure recovery rather than blocking the UI.",
        "Building software that respects these principles doesn't require complex graphics engines. It requires care, restraint, and an unwillingness to tolerate unnecessary lag."
      ],
    },
    {
      id: 'first-thousand-lines-of-rust',
      title: 'My First 1,000 Lines of Rust',
      subtitle: 'An honest reflection on fighting the borrow checker and rethinking memory models.',
      date: 'July 2024',
      readTime: '3 min read',
      tags: ['Rust', 'Systems', 'Reflection'],
      summary:
        'Coming from high-level languages, learning Rust felt like having a strict professor examine every variable allocation. Here is what clicked.',
      content: [
        "Coming from Python and TypeScript, my mental model of computers was sheltered. Garbage collectors were invisible caretakers that swept up my sloppy allocations. Pointers were abstract references that never went stale.",
        "Writing my first non-trivial tool in Rust—TraceCraft—was a humbling experience. For the first two weeks, I felt like the compiler was personally offended by my code. Simple patterns I took for granted, like sharing a reference between two structs, triggered cascades of lifetime and ownership errors.",
        "What I gradually realized is that Rust's compiler isn't being pedantic for sport. It is forcing you to make explicit decisions that you were previously making implicitly (and often incorrectly).",
        "Who owns this buffer? How long must it outlive the current scope? Could another thread mutate it while this loop reads it? In Go or JavaScript, these questions only surface at 2 AM when a race condition corrupts production memory.",
        "Once I stopped fighting the borrow checker and started using it as a collaborative architectural guide, my code in every other language improved. It changed how I think about memory, mutability, and program lifetime."
      ],
    },
  ],

  readingShelf: [
    {
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      type: 'Book',
      takeaway:
        'The clearest masterclass on distributed systems, data models, and the unavoidable physics of networks and disks.',
    },
    {
      title: 'Crafting Interpreters',
      author: 'Robert Nystrom',
      type: 'Book',
      takeaway:
        'Incredible craftsmanship in technical writing and pedagogy. Demystifies tokenizers, ASTs, and bytecode VMs step by step.',
    },
    {
      title: 'The Humane Interface',
      author: 'Jef Raskin',
      type: 'Book',
      takeaway:
        'Challenged all my assumptions about graphical user interfaces, modal traps, and human cognitive bandwidth.',
    },
    {
      title: 'Structure and Interpretation of Computer Programs',
      author: 'Harold Abelson & Gerald Jay Sussman',
      type: 'Book',
      takeaway:
        'Taught me that computation is about managing human intellectual complexity, not just giving instructions to silicon.',
    },
    {
      title: 'You and Your Research',
      author: 'Richard Hamming',
      type: 'Essay',
      takeaway:
        'A sobering and inspiring lecture on courage, choosing important problems, and doing work that outlives you.',
    },
    {
      title: 'Out of the Tar Pit',
      author: 'Ben Moseley & Peter Marks',
      type: 'Paper',
      takeaway:
        'A seminal critique of accidental complexity and why mutable state is the single largest cause of software defects.',
    },
  ],

  timeline: [
    {
      year: '2025 – Present',
      period: 'Year 3',
      title: 'Systems & Storage Engine Deep Dive',
      roleOrContext: 'Independent Study & Projects',
      description:
        'Focusing on database internals, storage engines, and low-latency network tooling. Building LoomKV in Go and exploring Rust systems programming.',
      highlights: [
        'Implemented Write-Ahead Logging (WAL) and SSTable compaction from scratch',
        'Organized peer study groups reviewing classical systems and database papers',
      ],
    },
    {
      year: '2024',
      period: 'Year 2',
      title: 'Campus Tools & Applied Machine Learning',
      roleOrContext: 'Student Builder',
      description:
        'Designed CampusPulse to solve daily transit and timetable issues for fellow students, and built SynapseVis to visualize neural network gradients.',
      highlights: [
        'CampusPulse reached over 2,000 peer users across 6 engineering departments',
        'Contributed documentation and bug fixes to open-source developer tooling',
      ],
    },
    {
      year: '2023',
      period: 'Year 1',
      title: 'Foundations & Exploration',
      roleOrContext: 'Computer Science Undergraduate',
      description:
        'Started formal CS coursework: data structures, algorithms, discrete mathematics, and computer architecture. Built small command-line utilities and web tools.',
      highlights: [
        'Wrote dozens of small CLI utilities in Go and Python to automate daily workflows',
        'Joined campus coding club and mentored junior peers in Git and terminal basics',
      ],
    },
  ],

  colophon: {
    builtWith: ['React 19', 'TypeScript', 'Vite', 'Pure CSS Variables', 'Semantic HTML5'],
    typography: 'Newsreader (Serif) & Plus Jakarta Sans, with JetBrains Mono for metadata',
    lastUpdated: 'October 2026',
    designInspiration:
      'Inspired by the intellectual rigor, quiet craftsmanship, and storytelling of South Park Commons.',
  },
};
