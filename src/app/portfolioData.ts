export type DetailVisual =
  | {
      kind: 'placeholder';
      label: string;
      description: string;
    }
  | {
      kind: 'image';
      label: string;
      src: string;
      alt: string;
    }
  | {
      kind: 'image-row';
      label: string;
      items: Array<{
        src: string;
        alt: string;
      }>;
    };

export interface DetailSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  visual: DetailVisual;
  reverse?: boolean;
}

export interface DetailFeature {
  title: string;
  description: string;
  visual: DetailVisual;
  reverse?: boolean;
}

export interface DetailTechItem {
  layer: string;
  name: string;
  reason: string;
}

export interface DetailStat {
  number: string;
  label: string;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  users: string;
  labels: string[];
  description: string;
  boldDescription: string;
  descriptionAfterBold: string;
  liveUrl: string;
  playStoreUrl: string;
  appStoreUrl: string;
  images: string[];
  detail: {
    heroTitle: string;
    heroSubtitle: string;
    meta: Array<{ label: string; value: string }>;
    sections: DetailSection[];
    whatWeBuiltTitle: string;
    whatWeBuiltIntro: string;
    features: DetailFeature[];
    techTitle: string;
    tech: DetailTechItem[];
    stats: DetailStat[];
    resultsEmbedTitle: string;
    resultsEmbedNote: string;
    ctaTitle: string;
    ctaText: string;
  };
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'cuanx',
    title: 'CuanX',
    users: '100,000+',
    labels: ['Super-app', 'PPOB', 'Realtime', 'Chat', 'Payment', 'Mobile App'],
    description: 'MVP for CuanX, a ',
    boldDescription: 'Super-App',
    descriptionAfterBold:
      ' designed for everyday convenience. Integrates transportation services and digital purchases into a single, user-friendly platform-focused on clarity, usability, and scalability.',
    liveUrl: 'https://cuanx.co.id/',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=co.id.cuanx.customer',
    appStoreUrl: 'https://apps.apple.com/us/app/cuanx/id6754905079',
    images: ['/images/portfolio/cuanx1.webp', '/images/portfolio/cuanx2.webp', '/images/portfolio/cuanx4.webp'],
    detail: {
      heroTitle: "CuanX: Indonesia's Integrated Super-App",
      heroSubtitle:
        'How we delivered a production super-app serving 100K+ users with real-time ride-hailing, payments, and integrated services-all within one year.',
      meta: [
        { label: 'Timeline', value: '1 Year' },
        { label: 'Users', value: '100K+' },
        { label: 'Rating', value: '4.5★' },
        { label: 'Uptime', value: '>99%' },
      ],
      sections: [
        {
          title: 'The Problem',
          paragraphs: [
            'Indonesians open 40+ apps to do what should take one. Ride-hailing on one app. Bills on another. Hotels on a third. Entertainment on a fourth.',
            'The friction is massive. The opportunity is massive too.',
            'CuanX needed to unify this. Real-time location. Reliable payments. Multiple services. All in one app. All working flawlessly at scale.',
          ],
          bullets: [
            'Real-time location tracking for thousands of drivers simultaneously',
            'Payment processing that never fails, even under load',
            '100K+ users in the first months after launch',
            'Every infrastructure choice had to prove its worth',
          ],
          visual: {
            kind: 'image',
            label: 'App Interface',
            src: '/images/portfolio/cuanx_sanded.png',
            alt: 'CuanX Phone Mockup',
          },
        },
        {
          title: 'Our Approach',
          paragraphs: [
            "We didn't rush into code. We mapped the entire ecosystem first. Where would bottlenecks emerge? Which decisions would matter most? Which could we defer?",
            'This clarity-before a single line of code-shaped everything that came next.',
          ],
          visual: {
            kind: 'image',
            label: 'Development Roadmap',
            src: '/images/portfolio/cuanx_jira.png',
            alt: 'Jira Roadmap',
          },
          reverse: true,
        },
        {
          title: 'The Architecture',
          paragraphs: [
            'The client needed to choose: go monolithic or build microservices?',
            'We presented both options. The decision was clear: a monolithic backend with modular mobile clients.',
            'Go for the backend (fast, handles concurrency, deploys as a single binary) and React Native for mobile (one codebase for iOS and Android).',
            "This wasn't trendy architecture. It was the right architecture-moving fast without painting ourselves into a corner later.",
          ],
          visual: {
            kind: 'placeholder',
            label: 'Prototype Screens',
            description: 'Authentication, wallet, transactions',
          },
        },
      ],
      whatWeBuiltTitle: 'What We Actually Built',
      whatWeBuiltIntro:
        'Not promises. Not mockups. A production app handling millions in daily transactions, working flawlessly under load, and keeping users coming back.',
      features: [
        {
          title: 'Real-Time Location',
          description:
            'Driver position updates, routing, ETA calculations-all happening simultaneously for thousands of users. Google Maps API optimization reduced costs by 60% while keeping latency under one second.',
          visual: {
            kind: 'image-row',
            label: 'Location & Tracking',
            items: [
              {
                src: '/images/portfolio/cuanx_light.png',
                alt: 'CuanX light map tracking view',
              },
              {
                src: '/images/portfolio/cuanx_dark_map.png',
                alt: 'CuanX dark map tracking view',
              },
            ],
          },
        },
        {
          title: 'Multi-Gateway Payments',
          description:
            'Wallet integration with Paylabs and Mutasi Rekening bank transfers. Multiple payment routes mean if one fails, users never notice. The transaction still completes.',
          visual: {
            kind: 'placeholder',
            label: 'Payment Processing',
            description: 'REPLACE: Payment processing visual',
          },
          reverse: true,
        },
        {
          title: 'Referral System',
          description:
            'Every user earns commission from their network. Drivers earn from ride referrals. Passengers earn from friend signups. This creates exponential growth without paid acquisition.',
          visual: {
            kind: 'placeholder',
            label: 'Growth Engine',
            description: 'REPLACE: Referral system visual',
          },
        },
      ],
      techTitle: 'Tech Stack (Why Each Choice Mattered)',
      tech: [
        {
          layer: 'Mobile',
          name: 'React Native + Jetpack Compose',
          reason: 'One codebase for iOS and Android. Native performance where it counts. Speed.',
        },
        {
          layer: 'Backend',
          name: 'Go (Gin)',
          reason: 'Concurrency built-in. Single binary deployment. No complex infrastructure just to run the code.',
        },
        {
          layer: 'Database',
          name: 'PostgreSQL + Amazon Aurora',
          reason: 'Scales horizontally as users grow. Auto-failover means zero downtime.',
        },
        {
          layer: 'Real-Time',
          name: 'WebSocket (Gorilla)',
          reason: 'Low-latency location updates. Instant notifications. No polling overhead.',
        },
      ],
      stats: [
        { number: '100K+', label: 'Users' },
        { number: '4.5★', label: 'Rating' },
        { number: '>99%', label: 'Uptime' },
      ],
      resultsEmbedTitle: 'Google Play Store Embed',
      resultsEmbedNote: '(Replace with actual Google Play embedded app)',
      ctaTitle: 'Building the next big thing?',
      ctaText:
        "We've navigated real-time systems, scale, payment complexity, and growth. Let's talk about what you're building.",
    },
  },
  {
    slug: 'football-money',
    title: 'Football Money',
    users: '10,000+',
    labels: ['Fantasy Sport', 'Game', 'Stocks', 'Mobile App'],
    description: '',
    boldDescription: 'iOS and Android app ',
    descriptionAfterBold:
      'for Football Money, a strategy-driven fantasy sports platform. Evolved from web into a native mobile experience, simplifying complex systems to improve engagement and retention.',
    liveUrl: 'https://www.instagram.com/footballmoney_/',
    playStoreUrl: '',
    appStoreUrl: 'https://apps.apple.com/id/app/football-money/id6605934587',
    images: [
      '/images/portfolio/footballmoney1.webp',
      '/images/portfolio/footballmoney2.webp',
      '/images/portfolio/footballmoney3.webp',
    ],
    detail: {
      heroTitle: 'Football Money: Trading Real Players Like Stocks',
      heroSubtitle:
        'How we built a fantasy sports game where players are tradeable assets, price moves in real-time, and skill actually matters. From concept to public beta in 6 months.',
      meta: [
        { label: 'Timeline', value: '6 Months' },
        { label: 'Status', value: 'Public Beta' },
        { label: 'Platforms', value: 'iOS + Android' },
        { label: 'Focus', value: 'Game Design' },
      ],
      sections: [
        {
          title: 'The Problem',
          paragraphs: [
            'Fantasy football is boring. You pick a lineup on Monday. Then you wait seven days. On Sunday you check the score. You either win or lose.',
            "That's it. No interaction. No strategy. No reward for spotting talent early.",
            'Football Money asked: What if players were tradeable? What if prices moved based on real performance? What if you could buy low, sell high, actually execute on your football knowledge?',
          ],
          bullets: [
            'Make stock trading feel natural to sports fans (two different domains)',
            'Real-time price updates tied to live match data',
            'Intuitive UI for something inherently complex',
            'Engage users who expect a game, not a spreadsheet',
          ],
          visual: {
            kind: 'placeholder',
            label: 'Game Interface',
            description: 'REPLACE: Football Money App Screens',
          },
        },
        {
          title: 'Design First',
          paragraphs: [
            "We didn't build mechanics and then try to make them pretty. We started with the user. What feels natural? What's intuitive? What gets people excited?",
            'We ran persona research. We tested wireframes with football fans and traders. We ran FigJam sessions to find the right metaphors.',
          ],
          visual: {
            kind: 'placeholder',
            label: 'Design Process',
            description: 'Wireframes and user testing',
          },
          reverse: true,
        },
        {
          title: 'MVP to Beta',
          paragraphs: [
            '1 month to build a working prototype. Test core mechanics: Can users understand stock trading? Does the game loop feel rewarding? Is live match integration working?',
            'Google Play internal testing first. Then TestFlight for iOS. Real users. Real feedback. Fast iteration.',
            '6 months later: Public beta on both stores. Thousands of active users trading, competing, building portfolios.',
          ],
          visual: {
            kind: 'placeholder',
            label: 'Live Gameplay',
            description: 'Real-time trading during matches',
          },
        },
      ],
      whatWeBuiltTitle: 'What We Actually Built',
      whatWeBuiltIntro:
        'Not a spreadsheet dressed as a game. A real game where strategy, timing, and skill determine winners. Where casual fans and serious traders coexist.',
      features: [
        {
          title: 'Live Market Updates',
          description:
            'Player prices update in real-time during matches. A player performs well? Price goes up. Gets injured? Price crashes. Users see this happen instantly, creating urgency and opportunity.',
          visual: {
            kind: 'placeholder',
            label: 'Real-Time Market',
            description: 'REPLACE: Real-Time Market visual',
          },
        },
        {
          title: 'League Competition',
          description:
            'Users create private leagues with friends. Compete on performance metrics. Leaderboards show who\'s best at spotting talent. Social pressure + competition = engagement.',
          visual: {
            kind: 'placeholder',
            label: 'League System',
            description: 'REPLACE: League system visual',
          },
          reverse: true,
        },
        {
          title: 'Intuitive Trading',
          description:
            'Trading does not feel like spreadsheets. Beautiful UI shows player cards, live stats, price trends. One tap to buy. One tap to sell. Complex mechanics feel effortless.',
          visual: {
            kind: 'placeholder',
            label: 'Trading Interface',
            description: 'REPLACE: Trading interface visual',
          },
        },
      ],
      techTitle: 'Tech Stack (Why Each Choice Mattered)',
      tech: [
        {
          layer: 'Mobile',
          name: 'React Native (Expo)',
          reason:
            'iOS and Android from one codebase. Fast iteration. React Native Reanimated for smooth animations that feel native.',
        },
        {
          layer: 'State Management',
          name: 'Redux',
          reason: 'Complex game state (portfolios, prices, matches, trades). Redux keeps it predictable and testable.',
        },
        {
          layer: 'Real-Time Data',
          name: 'WebSocket',
          reason: 'Price updates, match data, player stats all push to users instantly. WebSocket beats polling.',
        },
        {
          layer: 'Backend',
          name: 'Node.js + GraphQL',
          reason:
            'Flexible API for trading mechanics. Real-time subscriptions for price updates. GraphQL cuts data transfer.',
        },
      ],
      stats: [
        { number: 'Public', label: 'Beta Live' },
        { number: '100K+', label: 'Downloads' },
        { number: '8K+', label: 'Active Users' },
      ],
      resultsEmbedTitle: 'Download on App Stores',
      resultsEmbedNote: '(Replace with Google Play + Apple App Store embed badges)',
      ctaTitle: 'Building a game that actually engages users?',
      ctaText:
        "We've designed for mobile, built real-time features, and scaled to thousands of concurrent users. Let's talk about what you're building.",
    },
  },
  {
    slug: 'iptv',
    title: 'Flutter IPTV For Hotel',
    users: '100+',
    labels: ['IPTV', 'Live Streaming', 'Mobile App'],
    description: '',
    boldDescription: 'Flutter-based IPTV app ',
    descriptionAfterBold:
      'for hotel environments, built for STB devices. Streams live TV from IPTV providers with a focus on stability, performance, and seamless guest experience.',
    liveUrl: 'https://crt.id/expertise',
    playStoreUrl: '',
    appStoreUrl: '',
    images: ['/images/portfolio/iptv1.webp', '/images/portfolio/iptv2.webp', '/images/portfolio/iptv3.webp'],
    detail: {
      heroTitle: 'IPTV: Hotel Entertainment Reimagined',
      heroSubtitle:
        'How we transformed a bloated, slow hotel IPTV app into a fast, reliable experience on 7-year-old hardware. From 15 seconds to 3 seconds startup. From 400MB to 180MB RAM.',
      meta: [
        { label: 'Timeline', value: '3 Months' },
        { label: 'Deployment', value: 'Beta Live' },
        { label: 'Focus', value: 'Optimization' },
        { label: 'Impact', value: '5x Faster' },
      ],
      sections: [
        {
          title: 'The Problem',
          paragraphs: [
            'Every night, thousands of hotel guests turn on their in-room TV. They see a clunky app from 2015.',
            'It takes 15 seconds to load. Menu navigation is slow. Videos stutter. Some features crash. Guests give up and switch to cable.',
            'The app was bloated. 87MB. 400MB RAM. Built with old tooling on old devices. It was time to rebuild it right.',
          ],
          bullets: [
            'Make the app run on ancient Set-Top Boxes (512MB RAM)',
            'Reduce startup time from 15 seconds to under 3 seconds',
            'Cut app size while keeping all features',
            'Smooth video playback on constrained hardware',
          ],
          visual: {
            kind: 'placeholder',
            label: 'Old vs New Interface',
            description: 'REPLACE: Before/after UI screenshots',
          },
        },
        {
          title: 'The Diagnosis',
          paragraphs: [
            'We did not guess. We profiled everything.',
            'Memory leaks. Inefficient image loading. Bloated video codec settings. Unnecessary UI renders. Each of these little problems added up to one slow app.',
            'We mapped where every MB was going. Where every second was being wasted. Then we cut ruthlessly.',
          ],
          visual: {
            kind: 'placeholder',
            label: 'Performance Metrics',
            description: 'Before/after memory and startup times',
          },
          reverse: true,
        },
        {
          title: 'The Optimization',
          paragraphs: [
            'Video codec settings mattered most. We moved to FFMPEG H.264 baseline profile at 2Mbps. Dropped video quality minimally but crushed startup time.',
            'Image loading was killing performance. We implemented LRU caching instead of loading everything into memory.',
            'UI rendering was expensive. We switched to ExoPlayer for video playback (uses hardware decoder) and lazy-loaded screens.',
            'The result: 87MB -> 68MB app size. 15 second -> 3 second startup. 400MB -> 180MB RAM consumption.',
          ],
          visual: {
            kind: 'placeholder',
            label: 'Optimization Stack',
            description: 'FFMPEG, ExoPlayer, LRU cache architecture',
          },
        },
      ],
      whatWeBuiltTitle: 'What We Actually Built',
      whatWeBuiltIntro:
        'Not just a faster app. A premium guest experience. When guests turn on the TV now, the app is already there waiting.',
      features: [
        {
          title: 'Instant Startup',
          description:
            '3 seconds instead of 15. Guests do not get frustrated. The app feels premium, responsive. They actually use it instead of defaulting to cable.',
          visual: {
            kind: 'placeholder',
            label: 'Lightning Fast',
            description: 'REPLACE: Instant startup visual',
          },
        },
        {
          title: 'Smooth Playback',
          description:
            'Video streams without stutter. Buffering is invisible. Hardware video decoding means the CPU is not maxed out. Guest experience is flawless.',
          visual: {
            kind: 'placeholder',
            label: 'Zero Stutter',
            description: 'REPLACE: Smooth playback visual',
          },
          reverse: true,
        },
        {
          title: 'Works Everywhere',
          description:
            'Runs on 7-year-old hardware. Runs on new hardware. Lightweight on memory-constrained devices. Hotels do not have to upgrade their Set-Top Boxes.',
          visual: {
            kind: 'placeholder',
            label: 'Universal',
            description: 'REPLACE: Device compatibility visual',
          },
        },
      ],
      techTitle: 'Tech Stack (The Optimization Tools)',
      tech: [
        {
          layer: 'Frontend',
          name: 'Flutter',
          reason: 'Cross-platform, lightweight, compiles to efficient native code. No bloat.',
        },
        {
          layer: 'Video Encoding',
          name: 'FFMPEG H.264',
          reason: 'Baseline profile, 2Mbps. Maximum compression without visible quality loss.',
        },
        {
          layer: 'Video Playback',
          name: 'ExoPlayer',
          reason: 'Hardware-accelerated decoding. Offloads work from CPU to dedicated video chip.',
        },
        {
          layer: 'Backend',
          name: 'Node.js',
          reason: 'Lightweight server. Streams data efficiently. No unnecessary overhead.',
        },
      ],
      stats: [
        { number: '5x', label: 'Faster startup' },
        { number: '55%', label: 'Less memory' },
        { number: '22%', label: 'Smaller size' },
      ],
      resultsEmbedTitle: 'Deployed at Select Hotels',
      resultsEmbedNote: '(Replace with deployment info or hotel partner logos)',
      ctaTitle: 'Got a slow app that needs optimization?',
      ctaText:
        "We've profiled, optimized, and deployed on constrained hardware. We know how to make things fast. Let's talk about what you're building.",
    },
  },
];

export function getPortfolioProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.slug === slug);
}
