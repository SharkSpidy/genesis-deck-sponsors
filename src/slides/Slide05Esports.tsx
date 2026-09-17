import { Cpu, Gamepad2, Headset, Monitor, Radio, Trophy, Users, Wifi } from 'lucide-react'
import { PRIZE_GROUPS, formatINR, formatLakhs } from '../data/budget'

/** The Gaming prize group carries the four esports title payouts (Valorant, COD, PUBG, PES). */
const GAMING = PRIZE_GROUPS.find((g) => g.id === 'gaming')!

interface RigSpec {
  icon: typeof Cpu
  label: string
  value: string
}

const RIG_SPECS: RigSpec[] = [
  { icon: Cpu, label: 'GPU', value: 'RTX 4080 / 4090' },
  { icon: Monitor, label: 'Display', value: '240Hz – 360Hz' },
  { icon: Gamepad2, label: 'Peripherals', value: 'Pro-grade mice, keyboards & pads' },
  { icon: Headset, label: 'Seating', value: 'Ergonomic gaming chairs' },
]

interface Arena {
  id: string
  title: string
  format: string
  copy: string
}

const ARENAS: Arena[] = [
  {
    id: 'valorant',
    title: 'Arena A — Valorant',
    format: '5v5 tactical shooter, top-8 bracket',
    copy: 'Dedicated LAN segment, isolated from Arena B traffic to guarantee tick-rate stability during simultaneous matches.',
  },
  {
    id: 'cod',
    title: 'Arena B — Call of Duty',
    format: '5v5 tactical shooter, top-8 bracket',
    copy: 'Runs in parallel on its own switch fabric, so Valorant and COD finals can air back-to-back with zero setup downtime.',
  },
]

interface WorkflowStep {
  icon: typeof Radio
  step: string
  title: string
  copy: string
}

const WORKFLOW: WorkflowStep[] = [
  {
    icon: Monitor,
    step: '01',
    title: 'Capture',
    copy: 'In-game spectator feeds and caster-desk cameras captured in parallel across both arenas.',
  },
  {
    icon: Radio,
    step: '02',
    title: 'Switch & Mix',
    copy: 'Live production desk switches between arenas, overlays, and caster commentary in real time.',
  },
  {
    icon: Wifi,
    step: '03',
    title: 'Encode & Push',
    copy: 'Dedicated streaming rig encodes the program feed and pushes it out on a redundant uplink.',
  },
  {
    icon: Users,
    step: '04',
    title: 'YouTube Broadcast',
    copy: 'Public YouTube livestream with live chat, VOD archiving, and highlight clipping for socials.',
  },
]

export default function Slide05Esports() {
  return (
    <section className="slide bg-zinc-950 text-zinc-100" id="slide-5">
      <div className="slide-head">
        <p className="flex items-center gap-2 font-body text-sm uppercase tracking-widest text-cyan-400">
          <Gamepad2 size={16} className="text-cyan-400" />
          Competitive gaming
        </p>
        <h2 className="mt-2 font-display text-4xl font-bold text-white md:text-5xl">
          The Esports Arena
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
          Ten top-tier battle stations, split across two live arenas, so Valorant and Call of Duty
          can run concurrent brackets — broadcast to a single YouTube program feed.
        </p>
      </div>

      {/* Battle station spec strip */}
      <div className="grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
        {RIG_SPECS.map((spec) => (
          <div
            key={spec.label}
            className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur-md"
          >
            <spec.icon size={18} className="text-emerald-400" />
            <p className="mt-3 text-[11px] uppercase tracking-wider text-zinc-500">{spec.label}</p>
            <p className="mt-1 font-display text-sm font-semibold text-white">{spec.value}</p>
          </div>
        ))}
        <div className="col-span-2 flex items-center gap-3 rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-4 backdrop-blur-md md:col-span-4">
          <Users size={18} className="shrink-0 text-cyan-300" />
          <p className="text-sm text-cyan-100">
            <span className="font-display font-bold text-cyan-300">10 rigs</span> deployed across
            two arenas — 5 per side — plus a LAN switch fabric built for concurrent, latency-safe
            matches.
          </p>
        </div>
      </div>

      {/* Dual-arena layout */}
      <div className="mt-7 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
        {ARENAS.map((arena) => (
          <div
            key={arena.id}
            className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-5 backdrop-blur-md"
          >
            <h3 className="font-display text-lg font-bold text-white">{arena.title}</h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-emerald-400">
              {arena.format}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{arena.copy}</p>
          </div>
        ))}
      </div>

      {/* Broadcast workflow */}
      <div className="mt-8 max-w-5xl">
        <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500">
          <Radio size={14} className="text-cyan-400" />
          Caster desks &amp; YouTube broadcast workflow
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {WORKFLOW.map((w) => (
            <div
              key={w.step}
              className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <w.icon size={16} className="text-emerald-400" />
                <span className="font-display text-[11px] text-zinc-600">{w.step}</span>
              </div>
              <p className="mt-3 font-display text-sm font-semibold text-white">{w.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{w.copy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gaming prize breakdown */}
      <div className="mt-8 max-w-5xl rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 backdrop-blur-md">
        <div className="mb-4 flex items-center gap-2">
          <Trophy size={16} className="text-cyan-300" />
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-zinc-300">
            Gaming prize pool by title
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {GAMING.items!.map((item) => (
            <div key={item.id} className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-3">
              <p className="text-xs text-zinc-500">{item.label}</p>
              <p className="mt-1 font-display text-lg font-bold text-emerald-400">
                {formatINR(item.amount)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-t border-zinc-800 pt-4">
          <span className="text-sm text-zinc-400">Total gaming prize pool</span>
          <span className="font-display text-2xl font-black text-cyan-300">
            {formatLakhs(GAMING.amount)}
          </span>
        </div>
      </div>
    </section>
  )
}
