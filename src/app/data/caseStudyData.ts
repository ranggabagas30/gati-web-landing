export interface CaseStudyStat {
  lbl: string;
  val: string;
}

export interface CaseStudyFeature {
  name: string;
  desc: string;
  stat: string;
}

export interface CaseStudyTech {
  cat: string;
  name: string;
  desc: string;
}

export interface CaseStudyResult {
  num: string;
  lbl: string;
}

export interface CaseStudyDownload {
  title: string;
  sub?: string;
  playUrl?: string;
  appleUrl?: string;
  phoneImg?: string;
}

export interface EcosystemNode {
  role: string;
  name: string;
  desc: string;
  cms?: boolean;
}

export interface AdminLevel {
  lv: 'lv1' | 'lv2' | 'lv3' | 'lv4';
  tag: string;
  name: string;
  desc: string;
}

export interface MarketStat {
  val: string;
  lbl: string;
}

export interface MechanicRule {
  label: string;
  value: string;
}

export interface Differentiator {
  name: string;
  desc: string;
}

export interface BaseCaseStudy {
  slug: string;
  label: string;
  title: string;
  subtitle: string;
  tagline: string;
  heroImg: string;
  stats: CaseStudyStat[];
  problem: { heading: string; body: string };
  features: CaseStudyFeature[];
  tech: CaseStudyTech[];
  results: CaseStudyResult[];
  download: CaseStudyDownload;
}

export interface CuanXCaseStudyData extends BaseCaseStudy {
  timeline: { body: string };
  wireframes: { body: string };
  location: { body: string; nodes: EcosystemNode[] };
  cms: { body: string; adminLevels: AdminLevel[] };
}

export interface FootballMoneyCaseStudyData extends BaseCaseStudy {
  market: { heading: string; stats: MarketStat[]; body: string };
  mechanics: { heading: string; body: string; rules: MechanicRule[] };
  timeline: { body: string };
  differentiators: Differentiator[];
}

export type FlutterIptvCaseStudyData = BaseCaseStudy;

export const CUANX_DATA: CuanXCaseStudyData = {
  slug: 'cuanx',
  label: 'CuanX — Super App',
  title: 'CuanX',
  subtitle: "Indonesia's Integrated Super-App",
  tagline:
    'How we delivered a production super-app serving 100K+ users with real-time ride-hailing, payments, and integrated services — all within one year.',
  heroImg: '/images/portfolio/cuanx_phone.png',
  stats: [
    { lbl: 'Timeline', val: '1 Year' },
    { lbl: 'Users', val: '100K+' },
    { lbl: 'Rating', val: '4.5 ★' },
    { lbl: 'Uptime', val: '>99%' },
  ],
  problem: {
    heading: 'The Problem',
    body: 'Indonesians were opening 40+ apps to do what should take one. Ride-hailing on one. Bills on another. Hotels on a third. Entertainment on a fourth. The friction is massive. The opportunity is massive too. CuanX needed to unify this. Real-time location. Reliable payments. Multiple services. All in one app. All working flawlessly at scale.',
  },
  timeline: {
    body: 'Before a single line of code, we mapped the entire product — every screen, every flow, every edge case. The roadmap ran from December 2025 through January 2026, spanning UI/UX, mobile, authentication, e-wallet, PPOB services, ride-hailing, and CMS — all tracked and delivered on schedule.',
  },
  wireframes: {
    body: 'Over 200 screens wireframed before design began. Login, KYC, QR payments, transfers, top-up, PDAM, PULSA, ride motor, ride mobil, food delivery, chat, support — every user-facing flow was mapped and reviewed before a single pixel was pushed to production.',
  },
  features: [
    {
      name: 'KYC + E-Wallet',
      desc: 'Full identity verification (KYC) integrated into onboarding. Users unlock wallet features — top-up, balance, transfers — after verification. Multiple bank transfer options via VA (BCA, BNI, Mandiri, CIMB, Permata, BSS).',
      stat: 'Full KYC + multi-bank wallet',
    },
    {
      name: 'Real-Time Location',
      desc: 'Driver position updates, routing, ETA calculations — all happening simultaneously for thousands of users across the Customer, Driver, and Merchant apps. Each side sees what they need, nothing more.',
      stat: '60% Maps API cost reduction',
    },
    {
      name: 'PPOB + Travel Services',
      desc: 'Pulsa, data, PDAM, Token PLN, BPJS — all manageable in-app. Post-MVP we expanded to hotel, airplane, train, and Pelni bookings. One app for every daily financial need.',
      stat: 'Phone, utilities, travel — all live',
    },
  ],
  location: {
    body: 'CuanX is a four-sided ecosystem: three apps operating simultaneously, coordinated by one dashboard. Every transaction touches all four — and all four need to be in sync, in real-time, at scale.',
    nodes: [
      { role: 'App 01', name: 'Customer App', desc: 'Books rides, pays bills, tops up wallet, tracks drivers live, chats or calls the driver. All services in one place.' },
      { role: 'App 02', name: 'Driver App', desc: 'Receives trip requests, gets navigation, sees passenger details, communicates via chat or call, tracks earnings in real-time.' },
      { role: 'App 03', name: 'Merchant App', desc: 'Receives orders, updates availability, chats with customers, and monitors sales — all from a dedicated merchant-side interface.' },
      { role: 'Dashboard', name: 'CMS + Admin', desc: 'Full-platform visibility. Track every ride, user, and transaction. Configure PPOB services, manage driver and merchant status, adjust platform settings.', cms: true },
    ],
  },
  cms: {
    body: 'The CMS is its own product. Four levels of admin access — each with customisable permissions set by the Super Admin — means the right people see the right things and nothing more.',
    adminLevels: [
      { lv: 'lv1', tag: 'Super Admin', name: 'Full Control', desc: 'Creates all other admins. Sets exactly what each level can access. Adjusts profit-sharing percentages. Can clone its own permissions downward. The single source of authority.' },
      { lv: 'lv2', tag: 'Admin LV 2', name: 'Delegated Control', desc: 'Access defined by Super Admin. Typically manages operations: driver approvals, user management, transaction monitoring, and PPOB configuration.' },
      { lv: 'lv3', tag: 'Admin LV 3', name: 'Operational Access', desc: 'Day-to-day management. Can handle support tickets, flag issues, and view reporting within their permitted scope.' },
      { lv: 'lv4', tag: 'Admin LV 4', name: 'Limited View', desc: 'Read-only or scoped write access. Regional staff, support agents, or partners who need visibility without the ability to change platform config.' },
    ],
  },
  tech: [
    { cat: 'Mobile', name: 'React Native + Jetpack Compose', desc: 'One codebase for iOS and Android. Native performance where it counts. Speed.' },
    { cat: 'Backend', name: 'Go (Gin)', desc: 'Concurrency built-in. Single binary deployment. No complex infrastructure just to run the code.' },
    { cat: 'Database', name: 'PostgreSQL + Amazon Aurora', desc: 'Scales horizontally as users grow. Auto-failover means zero downtime.' },
    { cat: 'Real-Time', name: 'WebSocket (Gorilla)', desc: 'Low-latency location updates. Instant notifications. No polling overhead.' },
  ],
  results: [
    { num: '100K+', lbl: 'Active Users' },
    { num: '4.5 ★', lbl: 'App Store Rating' },
    { num: '>99%', lbl: 'Uptime' },
  ],
  download: {
    title: 'Download CuanX App',
    playUrl: 'https://play.google.com/store',
    appleUrl: 'https://apps.apple.com',
    phoneImg: '/images/portfolio/cuanx_phone.png',
  },
};

export const FOOTBALL_MONEY_DATA: FootballMoneyCaseStudyData = {
  slug: 'football-money',
  label: 'Football Money — Game Platform',
  title: 'Football Money',
  subtitle: 'Trade European Footballers Like Stocks',
  tagline:
    'We designed and built a fantasy sports trading platform where player prices move in real-time based on performance — and skill actually wins. End-to-end: brand, UX, engineering, and App Store launch.',
  heroImg: '/images/portfolio/football_money_phone.png',
  stats: [
    { lbl: 'Timeline', val: '6 Months' },
    { lbl: 'Status', val: 'Public Beta' },
    { lbl: 'Platforms', val: 'iOS + Android' },
    { lbl: 'Focus', val: 'Game Design' },
  ],
  market: {
    heading: 'The Fantasy Sports Revolution.',
    stats: [
      { val: '$48.6B', lbl: 'Global market by 2027 (up from $18.6B in 2020)' },
      { val: '50.4M', lbl: 'USA customers in 2024' },
      { val: '12%', lbl: 'Compound annual growth rate' },
      { val: '3–4', lbl: 'Apps globally focused on football stocks' },
    ],
    body: 'North America leads — followed closely by Europe, where football reigns supreme. The niche of real football-stock trading? Barely touched. $32B global market size in 2024, with 610 businesses in North America and only a handful doing what Football Money does.',
  },
  problem: {
    heading: 'The market is rigged. We fixed it.',
    body: 'Traditional fantasy football is passive — pick a lineup, wait a week, collect points. Sports betting is worse: systems engineered to ensure the house always wins. Opaque pricing. Artificial hype. Hidden mechanics that punish the average fan. Football Money took the opposite approach. Player prices fluctuate based purely on real-world performance and ownership. No house edge. No hidden algorithm. A transparent, merit-based market where the best football mind wins — not the biggest wallet. The build challenge: make stock-market mechanics feel intuitive to sports fans, sync live prices to match data in sub-second latency, and craft a UI that makes something inherently complex feel like second nature.',
  },
  mechanics: {
    heading: 'Zero-sum. Skill wins.',
    body: 'Total match value stays constant across all players. One scores? His price rises — and every other player in the pool drops proportionally to balance it out. The math is public, the rules are simple, and the edge goes to the person who knows football best.',
    rules: [
      { label: 'Max portfolio', value: '15 stocks' },
      { label: 'Same club limit', value: '3 stocks' },
      { label: 'Max ownership', value: '1% per player' },
      { label: 'Price floor', value: '−20% max drop' },
      { label: 'Price ceiling', value: '+100% max cap' },
      { label: 'Season end', value: 'Full buyback' },
    ],
  },
  timeline: {
    body: 'Our scope was end-to-end. We started with the logo and brand identity, then moved into intensive UX research and persona work — interviewing football fans and traders to understand what feels natural versus what feels like homework. Every interaction was wireframed in Figma, tested with real users, and refined before a single line of production code was written. From there: React Native for both platforms, real-time WebSocket price engine, P2P trade order matching, leaderboards, and league mechanics. We handled every build submission — App Store and Google Play — and owned QA, animations, and edge-case bug fixing through to public beta.',
  },
  features: [
    { name: 'Issue Player Stocks', desc: 'The Football Money Bank issues stocks for real European players. Every tradeable player has a fixed number of shares in the market — creating genuine scarcity and real demand.', stat: 'Real players, real stakes' },
    { name: 'Dynamic Price Changes', desc: 'Prices fluctuate based on ownership concentration, live match performance, and market demand. No artificial manipulation — purely merit-driven, updated in real-time during every match.', stat: 'Live price updates every second' },
    { name: 'Buy, Sell & Trade', desc: 'Purchase up to 15 stocks. Trade on the global marketplace or send P2P trade orders directly to friends. Bid orders, ask orders, and instant market matching.', stat: 'One-tap buy & sell' },
    { name: 'League Competition', desc: "Create private leagues, compete on leaderboards, prove you're the best talent-spotter in your circle. The person who spots a future star early — and buys before the price spikes — wins.", stat: 'Private leagues + global ranking' },
    { name: 'Season-End Buyback', desc: 'At the end of every season, the Football Money Bank buys back all outstanding stocks at current price — locking in profits for every active trader. Clean slate, new season, same fair rules.', stat: 'Guaranteed season close' },
    { name: 'One Unified Currency', desc: 'A single centralised in-app currency powers every transaction seamlessly. No hidden conversion fees, no currency confusion — just clean, transparent economics across the whole platform.', stat: 'Transparent economics' },
  ],
  differentiators: [
    { name: 'Unique Price Change Mechanism', desc: 'Prices fluctuate based only on player ownership concentration and real match performance — no opaque algorithm, no house edge, no artificial hype.' },
    { name: 'No Gimmicks', desc: 'No NFTs, no options trading, no artificial price manipulations. Just football knowledge and transparent market economics.' },
    { name: 'Seasonal Resets', desc: 'Yearly price resets ensure a fair, dynamic market every season. No runaway stocks. No entrenched whales. Equal footing every September.' },
    { name: 'Full Transparency', desc: 'Price updates are published after every match — every user sees the same data. No information asymmetry, no insider advantage.' },
    { name: 'Built by Football Fans', desc: "Designed for people who actually watch the matches, track the form, and know why that striker is going to explode next month. Passion-built, performance-proven." },
  ],
  tech: [
    { cat: 'Mobile', name: 'React Native (Expo)', desc: 'iOS and Android from one codebase. React Native Reanimated for 60fps animations that feel native — critical for a fast-paced trading UI.' },
    { cat: 'State', name: 'Redux Toolkit', desc: 'Complex game state — live portfolios, price ticks, match events, trade orders. Redux keeps it predictable, debuggable, and testable under load.' },
    { cat: 'Real-Time', name: 'WebSocket', desc: 'Price updates, match events, and player stats push to every client in under one second. Essential for live trading — polling would kill the experience.' },
    { cat: 'Backend', name: 'Node.js + GraphQL', desc: 'Flexible trading API with real-time subscriptions. GraphQL eliminates over-fetching — important for a data-heavy app on mobile networks.' },
  ],
  results: [
    { num: '6 mo', lbl: 'Concept to public beta' },
    { num: '<1s', lbl: 'Live price update latency' },
    { num: '2 stores', lbl: 'iOS + Android simultaneously' },
    { num: '$32B', lbl: 'Total addressable market' },
  ],
  download: {
    title: 'Football Money is live.',
    sub: 'Available on the App Store and Google Play.',
    playUrl: 'https://play.google.com/store',
    appleUrl: 'https://apps.apple.com',
    phoneImg: '/images/portfolio/football_money_phone.png',
  },
};

export const FLUTTER_IPTV_DATA: FlutterIptvCaseStudyData = {
  slug: 'flutter-iptv',
  label: 'Flutter IPTV — Set-Top Box App',
  title: 'Flutter IPTV',
  subtitle: 'TV That Actually Loads',
  tagline:
    'Rebuilding an IPTV client that went from 15-second load times and 400MB RAM to instant-on performance on constrained STB hardware.',
  heroImg: '/images/portfolio/iptv1.webp',
  stats: [
    { lbl: 'Timeline', val: '4 Months' },
    { lbl: 'Status', val: 'Beta Live' },
    { lbl: 'Platform', val: 'STB Devices' },
    { lbl: 'Load Time', val: '<2s' },
  ],
  problem: {
    heading: 'The Problem',
    body: '15 seconds to load. 400MB RAM on a device with 512MB total. The previous app crashed on channel change. We rewrote it in Flutter — single codebase across every STB manufacturer, native performance, instant channel switching.',
  },
  features: [
    { name: 'Instant Channel Switch', desc: 'Prefetching and smart buffering cuts channel-change time from 8 seconds to under 1.', stat: '<1s channel switch' },
    { name: 'Low-Memory Mode', desc: 'Runs comfortably in 180MB RAM on constrained hardware with no crashes.', stat: '55% RAM reduction' },
    { name: 'Universal Remote UI', desc: 'D-pad navigation designed for every remote layout. No touchscreen required.', stat: 'Works on 20+ STB models' },
  ],
  tech: [
    { cat: 'Framework', name: 'Flutter', desc: 'Single codebase across all STB manufacturers. Compiled to native ARM.' },
    { cat: 'Player', name: 'VLC + ExoPlayer', desc: 'Hardware-accelerated video decoding. Supports HLS, RTMP, and multicast.' },
    { cat: 'State', name: 'Riverpod', desc: 'Predictable state management that keeps memory usage flat over time.' },
    { cat: 'Protocol', name: 'M3U + EPG', desc: 'Full playlist and electronic programme guide support with live schedule updates.' },
  ],
  results: [
    { num: '<2s', lbl: 'App Load Time' },
    { num: '−55%', lbl: 'RAM Usage' },
    { num: '20+', lbl: 'STB Models Supported' },
  ],
  download: {
    title: 'Flutter IPTV is in beta.',
    sub: 'Running live on set-top boxes across Southeast Asia.',
  },
};

export type CaseStudySlug = 'cuanx' | 'football-money' | 'flutter-iptv';

const CASE_STUDIES: Record<CaseStudySlug, BaseCaseStudy> = {
  cuanx: CUANX_DATA,
  'football-money': FOOTBALL_MONEY_DATA,
  'flutter-iptv': FLUTTER_IPTV_DATA,
};

export function getCaseStudyBySlug(slug: string): BaseCaseStudy | undefined {
  return CASE_STUDIES[slug as CaseStudySlug];
}

export function isCaseStudySlug(slug: string): slug is CaseStudySlug {
  return slug === 'cuanx' || slug === 'football-money' || slug === 'flutter-iptv';
}
