/**
 * Single source of truth for the Event Budget Proposal figures.
 * Consumed by Slide05Esports.tsx (esports/prize detail) and
 * Slide11Ask.tsx (executive financial dashboard).
 *
 * All amounts are stored in raw rupees (not lakhs) so downstream
 * math (percentages, chart segments, totals) never has to guess
 * at units. Formatting to the ₹X,XX,XXX / ₹X.XXL Indian numbering
 * convention happens in `formatINR` / `formatLakhs` below.
 */

/** One line item inside the detailed prize-pool breakdown. */
export interface PrizeLineItem {
  id: string
  label: string
  amount: number
  /** Optional sub-note, e.g. per-title or per-head detail. */
  note?: string
}

/** A titled group of prize line items (e.g. "Gaming", "Hackathon"). */
export interface PrizeGroup {
  id: string
  title: string
  amount: number
  items?: PrizeLineItem[]
}

/** One row of the top-level, non-prize budget breakdown. */
export interface BudgetCategory {
  id: string
  label: string
  amount: number
  description: string
  /** Tailwind color token used consistently across the pie chart, legend, and accents. */
  color: string
}

export const TOTAL_BUDGET = 5_258_000 // ₹52,58,000

/** Detailed prize pool — ₹14,08,000 total, broken out by competition track. */
export const PRIZE_GROUPS: PrizeGroup[] = [
  {
    id: 'gaming',
    title: 'Gaming (Esports)',
    amount: 668_000,
    items: [
      { id: 'valorant', label: 'Valorant', amount: 200_000 },
      { id: 'cod', label: 'Call of Duty', amount: 200_000 },
      { id: 'pubg', label: 'PUBG', amount: 228_000 },
      { id: 'pes', label: 'PES', amount: 40_000 },
    ],
  },
  { id: 'band', title: 'Band Competition', amount: 230_000 },
  { id: 'hackathon', title: 'Hackathon', amount: 180_000 },
  { id: 'film-reels', title: 'Film & Reels', amount: 210_000 },
  { id: 'art', title: 'Digital & Physical Art', amount: 120_000 },
]

export const PRIZE_POOL_TOTAL = PRIZE_GROUPS.reduce((sum, g) => sum + g.amount, 0) // 1,408,000

/** Top-level Event Budget Proposal — 10 categories, ₹52,58,000 total. */
export const BUDGET_CATEGORIES: BudgetCategory[] = [
  {
    id: 'prize-pool',
    label: 'Prize Pool',
    amount: PRIZE_POOL_TOTAL,
    description: 'Gaming, band, hackathon, film & reels, and art competitions',
    color: '#22d3ee', // cyan-400
  },
  {
    id: 'esports-rigs',
    label: 'Esports Battle Stations',
    amount: 325_000,
    description: '10× RTX 4080/4090 rigs, 240Hz–360Hz displays, LAN infrastructure',
    color: '#34d399', // emerald-400
  },
  {
    id: 'celebrity',
    label: 'Celebrity & VIP Buffer',
    amount: 1_000_000,
    description: 'Appearance fees, hospitality, and travel contingency',
    color: '#a78bfa', // violet-400
  },
  {
    id: 'stage-production',
    label: 'Stage & Production Logistics',
    amount: 1_100_000,
    description: 'Staging, sound, lighting, rigging, and crew logistics',
    color: '#fb923c', // orange-400
  },
  {
    id: 'broadcast',
    label: 'YouTube Broadcast & Streaming Rig',
    amount: 225_000,
    description: 'Multi-cam capture, switcher, encoders, and caster desks',
    color: '#f472b6', // pink-400
  },
  {
    id: 'marketing',
    label: 'Marketing & Digital Campaigns',
    amount: 350_000,
    description: 'Paid social, creator partnerships, and on-ground promo',
    color: '#facc15', // yellow-400
  },
  {
    id: 'tech-exhibits',
    label: 'Tech Exhibits & Media Production',
    amount: 300_000,
    description: 'Showcase builds, media walls, and content production',
    color: '#60a5fa', // blue-400
  },
  {
    id: 'crew',
    label: 'Crew Honorarium',
    amount: 200_000,
    description: '100 crew × ₹2,000/head',
    color: '#4ade80', // green-400
  },
  {
    id: 'ticketing',
    label: 'Ticketing, RFID & Gate Security',
    amount: 150_000,
    description: 'Access control, RFID wristbands, and gate staffing',
    color: '#f87171', // red-400
  },
  {
    id: 'contingency',
    label: 'Contingency Buffer',
    amount: 200_000,
    description: 'Unallocated reserve for cost overruns',
    color: '#94a3b8', // slate-400
  },
]

export const BUDGET_CATEGORIES_TOTAL = BUDGET_CATEGORIES.reduce((sum, c) => sum + c.amount, 0)

/** Formats a raw rupee amount using the Indian digit-grouping convention, e.g. 5258000 -> "₹52,58,000". */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

/** Formats a raw rupee amount in lakhs, e.g. 1408000 -> "₹14.08L". */
export function formatLakhs(amount: number, digits = 2): string {
  return `₹${(amount / 100_000).toFixed(digits)}L`
}

/** Percentage share of a category against the total budget, rounded to 1 decimal. */
export function percentOfTotal(amount: number, total: number = TOTAL_BUDGET): number {
  return Math.round((amount / total) * 1000) / 10
}
