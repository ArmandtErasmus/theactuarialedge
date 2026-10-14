import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { addDays, today } from '../state/progress'
import { IconButton } from './ui'

const HEAT = ['var(--gm-deep)', 'var(--gm-grape-edge)', 'var(--gm-grape)', 'var(--gm-grape-hi)', 'var(--gm-lime)']
const level = (n: number) => (n === 0 ? 0 : n < 3 ? 1 : n < 6 ? 2 : n < 12 ? 3 : 4)

/** Year heatmap (GitHub style), 53 weeks ending this week. */
export function Heatmap({ activity }: { activity: Record<string, number> }) {
  const { weeks, months, total, activeDays } = useMemo(() => {
    const end = today()
    const endDate = new Date(end + 'T12:00:00')
    const start = addDays(end, -(52 * 7 + endDate.getDay()))
    const weeks: { day: string; count: number; future: boolean }[][] = []
    const months: { label: string; col: number }[] = []
    let cursor = start
    let total = 0
    let activeDays = 0
    for (let w = 0; w < 53; w++) {
      const week = []
      for (let d = 0; d < 7; d++) {
        const count = activity[cursor] ?? 0
        if (cursor <= end) {
          total += count
          if (count) activeDays++
        }
        week.push({ day: cursor, count, future: cursor > end })
        if (d === 0 && cursor.slice(8) <= '07') {
          months.push({ label: new Date(cursor + 'T12:00:00').toLocaleString('en', { month: 'short' }), col: w })
        }
        cursor = addDays(cursor, 1)
      }
      weeks.push(week)
    }
    return { weeks, months, total, activeDays }
  }, [activity])

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 text-sm">
        <span>
          <span className="font-semibold tabular">{total}</span> <span className="text-gm-ink-soft">attempts in the past year</span>
        </span>
        <span className="text-gm-ink-soft">
          Active days: <span className="font-medium text-gm-ink tabular">{activeDays}</span>
        </span>
      </div>
      <div className="overflow-x-auto pb-1">
        <div className="relative inline-block min-w-full" role="img" aria-label={`Activity heatmap: ${total} attempts on ${activeDays} days in the past year`}>
          <div className="relative mb-1 h-4 text-[10px] text-gm-ink-dim">
            {months.map(m => (
              <span key={m.col} className="absolute" style={{ left: m.col * 13 }}>
                {m.label}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {weeks.map((w, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {w.map(c => (
                  <div
                    key={c.day}
                    title={c.future ? undefined : `${c.count} attempt${c.count === 1 ? '' : 's'} on ${c.day}`}
                    className={clsx('size-[10px] rounded-[2px]', c.future && 'opacity-0')}
                    style={{ background: HEAT[level(c.count)] }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-gm-ink-dim" aria-hidden="true">
        Less
        {[0, 1, 2, 3, 4].map(l => (
          <span key={l} className="size-[10px] rounded-[2px]" style={{ background: HEAT[l] }} />
        ))}
        More
      </div>
    </div>
  )
}

/** Month calendar with active days highlighted (LeetCode sidebar style). */
export function MonthCalendar({ activity }: { activity: Record<string, number> }) {
  const [offset, setOffset] = useState(0)
  const now = new Date()
  const first = new Date(now.getFullYear(), now.getMonth() + offset, 1)
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  const todayIso = today()
  const cells: (string | null)[] = [...Array(first.getDay()).fill(null)]
  for (let d = 1; d <= daysInMonth; d++) cells.push(today(new Date(first.getFullYear(), first.getMonth(), d, 12)))

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium">{first.toLocaleString('en', { month: 'long', year: 'numeric' })}</span>
        <div className="flex">
          <IconButton label="Previous month" className="size-7" onClick={() => setOffset(o => o - 1)}>
            <ChevronLeft className="size-4" />
          </IconButton>
          <IconButton label="Next month" className="size-7" disabled={offset >= 0} onClick={() => setOffset(o => o + 1)}>
            <ChevronRight className="size-4" />
          </IconButton>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={i} className="pb-1 text-gm-ink-dim" aria-hidden="true">
            {d}
          </span>
        ))}
        {cells.map((day, i) =>
          day ? (
            <span
              key={day}
              title={activity[day] ? `${activity[day]} attempts` : undefined}
              className={clsx(
                'flex aspect-square items-center justify-center rounded-full tabular',
                activity[day] ? 'bg-gm-lime/12 font-semibold text-gm-lime' : day > todayIso ? 'text-gm-ink-dim/50' : 'text-gm-ink-soft',
                day === todayIso && 'ring-1 ring-gm-grape-hi',
              )}
            >
              {Number(day.slice(8))}
            </span>
          ) : (
            <span key={`e${i}`} />
          ),
        )}
      </div>
    </div>
  )
}
