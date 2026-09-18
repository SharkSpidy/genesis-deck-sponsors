import { Fragment, useMemo, useState } from 'react'
import { Clapperboard, IndianRupee, Trophy } from 'lucide-react'
import {
  BUDGET_CATEGORIES,
  PRIZE_GROUPS,
  TOTAL_BUDGET,
  formatINR,
  formatLakhs,
  percentOfTotal,
  type BudgetCategory,
} from '../data/budget'

interface MetricCard {
  icon: typeof IndianRupee
  label: string
  value: string
  sub: string
  accent: string
}

const METRICS: MetricCard[] = [
  {
    icon: IndianRupee,
    label: 'Total Event Budget',
    value: formatLakhs(TOTAL_BUDGET),
    sub: formatINR(TOTAL_BUDGET),
    accent: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
  },
  {
    icon: Trophy,
    label: 'Prize Pool',
    value: formatLakhs(BUDGET_CATEGORIES.find((c) => c.id === 'prize-pool')!.amount),
    sub: 'Across 8 competition tracks',
    accent: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
  },
  {
    icon: Clapperboard,
    label: 'Event Production',
    value: formatLakhs(BUDGET_CATEGORIES.find((c) => c.id === 'stage-production')!.amount),
    sub: 'Stage, sound, lighting & rigging',
    accent: 'text-orange-300 border-orange-500/30 bg-orange-500/10',
  },
]

/** Builds a CSS conic-gradient string from budget categories, in the order given. */
function buildConicGradient(categories: BudgetCategory[]): string {
  let cumulative = 0
  const stops = categories.map((c) => {
    const start = cumulative
    cumulative += (c.amount / TOTAL_BUDGET) * 100
    return `${c.color} ${start}% ${cumulative}%`
  })
  return `conic-gradient(${stops.join(', ')})`
}

export default function Slide11Ask() {
  const gradient = useMemo(() => buildConicGradient(BUDGET_CATEGORIES), [])
  const [openId, setOpenId] = useState<string>('prize-pool')

  return (
    <section className="slide bg-zinc-950 text-zinc-100" id="slide-11">
      <div className="slide-head">
        <p className="text-sm uppercase tracking-widest text-cyan-400">The financial ask</p>
        <h2 className="mt-2 font-display text-4xl font-bold text-white md:text-5xl">
          Event Budget Proposal
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
          A complete, line-itemed breakdown of the {formatLakhs(TOTAL_BUDGET)} budget — prize
          pools, production, broadcast, and operations.
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3">
        {METRICS.map((m) => (
          <div
            key={m.label}
            className={`rounded-xl border p-5 backdrop-blur-md ${m.accent}`}
          >
            <m.icon size={18} />
            <p className="mt-3 text-xs uppercase tracking-wide text-zinc-400">{m.label}</p>
            <p className="mt-1 font-display text-3xl font-black text-white">{m.value}</p>
            <p className="mt-1 text-xs text-zinc-400">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart + detailed table */}
      <div className="mt-7 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        {/* Donut chart + legend */}
        <div className="flex flex-col items-center gap-5 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 backdrop-blur-md lg:items-start">
          <div className="relative mx-auto h-48 w-48 shrink-0 rounded-full" style={{ background: gradient }}>
            <div className="absolute inset-[14px] flex flex-col items-center justify-center rounded-full bg-zinc-950 text-center">
              <span className="text-[10px] uppercase tracking-wide text-zinc-500">Total</span>
              <span className="font-display text-xl font-black text-white">
                {formatLakhs(TOTAL_BUDGET)}
              </span>
            </div>
          </div>
          <ul className="w-full space-y-2">
            {BUDGET_CATEGORIES.map((c) => (
              <li key={c.id} className="flex items-center gap-2 text-xs">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: c.color }}
                  aria-hidden="true"
                />
                <span className="flex-1 truncate text-zinc-300">{c.label}</span>
                <span className="shrink-0 font-medium text-zinc-500">
                  {percentOfTotal(c.amount)}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Detailed budget table */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
          <div className="max-h-[360px] overflow-y-auto p-2">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-md">
                <tr className="text-left text-[11px] uppercase tracking-wide text-zinc-500">
                  <th className="px-3 py-2 font-medium">Category</th>
                  <th className="px-3 py-2 font-medium">Description</th>
                  <th className="px-3 py-2 text-right font-medium">Amount</th>
                  <th className="px-3 py-2 text-right font-medium">Share</th>
                </tr>
              </thead>
              <tbody>
                {BUDGET_CATEGORIES.map((c) => {
                  const expandable = c.id === 'prize-pool'
                  const isOpen = openId === c.id
                  return (
                    <Fragment key={c.id}>
                      <tr
                        onClick={() => expandable && setOpenId(isOpen ? '' : c.id)}
                        className={`border-t border-zinc-800/80 ${expandable ? 'cursor-pointer hover:bg-zinc-800/40' : ''}`}
                      >
                        <td className="px-3 py-3">
                          <span className="flex items-center gap-2 font-medium text-white">
                            <span
                              className="h-2 w-2 shrink-0 rounded-full"
                              style={{ backgroundColor: c.color }}
                              aria-hidden="true"
                            />
                            {c.label}
                            {expandable && (
                              <span className="text-[10px] text-cyan-400">
                                {isOpen ? '▾' : '▸'}
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-xs text-zinc-500">{c.description}</td>
                        <td className="px-3 py-3 text-right font-display font-semibold text-zinc-200">
                          {formatINR(c.amount)}
                        </td>
                        <td className="px-3 py-3 text-right text-xs text-zinc-500">
                          {percentOfTotal(c.amount)}%
                        </td>
                      </tr>
                      {expandable &&
                        isOpen &&
                        PRIZE_GROUPS.map((g) => (
                          <tr key={g.id} className="border-t border-zinc-800/40 bg-zinc-950/40">
                            <td className="px-3 py-2 pl-8 text-xs text-zinc-400">{g.title}</td>
                            <td className="px-3 py-2 text-xs text-zinc-600">
                              {g.items ? g.items.map((i) => i.label).join(' · ') : '—'}
                            </td>
                            <td className="px-3 py-2 text-right text-xs font-medium text-zinc-300">
                              {formatINR(g.amount)}
                            </td>
                            <td className="px-3 py-2 text-right text-[11px] text-zinc-600">
                              {percentOfTotal(g.amount)}%
                            </td>
                          </tr>
                        ))}
                    </Fragment>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-zinc-700">
                  <td className="px-3 py-3 font-display font-bold text-white" colSpan={2}>
                    Total
                  </td>
                  <td className="px-3 py-3 text-right font-display text-lg font-black text-cyan-300">
                    {formatINR(TOTAL_BUDGET)}
                  </td>
                  <td className="px-3 py-3 text-right text-xs text-zinc-500">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
