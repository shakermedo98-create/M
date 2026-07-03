'use client'

import { useEffect, useState } from 'react'

// Tuesday, 4 August 2026 at 7:00 PM, Egypt time (UTC+3).
const TARGET = new Date('2026-08-04T19:00:00+03:00').getTime()

type Parts = { days: number; hours: number; minutes: number; seconds: number }

function getParts(): Parts {
  const diff = Math.max(0, TARGET - Date.now())
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  const seconds = Math.floor((diff % 60_000) / 1000)
  return { days, hours, minutes, seconds }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function Countdown() {
  const [parts, setParts] = useState<Parts | null>(null)

  useEffect(() => {
    setParts(getParts())
    const id = setInterval(() => setParts(getParts()), 1000)
    return () => clearInterval(id)
  }, [])

  const items: { label: string; value: string }[] = [
    { label: 'Days', value: parts ? String(parts.days) : '--' },
    { label: 'Hours', value: parts ? pad(parts.hours) : '--' },
    { label: 'Minutes', value: parts ? pad(parts.minutes) : '--' },
    { label: 'Seconds', value: parts ? pad(parts.seconds) : '--' },
  ]

  return (
    <div className="flex items-start justify-center gap-3 sm:gap-6">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-start gap-3 sm:gap-6">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-light tabular-nums text-ink sm:text-5xl">
              {item.value}
            </span>
            <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:text-xs">
              {item.label}
            </span>
          </div>
          {i < items.length - 1 && (
            <span className="text-3xl font-light text-gold/60 sm:text-4xl" aria-hidden="true">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
