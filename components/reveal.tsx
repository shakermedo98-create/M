'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Delay in ms before the element animates in once visible. */
  delay?: number
  /** Direction the element eases in from. */
  from?: 'up' | 'down' | 'none'
  as?: 'div' | 'section' | 'li'
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  from = 'up',
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const translate =
    from === 'up' ? 'translate-y-8' : from === 'down' ? '-translate-y-8' : 'translate-y-0'

  const Tag = as as any

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible ? 'translate-y-0 opacity-100' : `${translate} opacity-0`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
