'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export function EnvelopeIntro() {
  const [opened, setOpened] = useState(false)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Lock scrolling while the envelope overlay is showing.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  const handleOpen = () => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.75
      audio.play().catch(() => {
        // Autoplay may be blocked until further interaction — the toggle can retry.
      })
    }
    setOpened(true)
    window.scrollTo({ top: 0 })
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => {})
      setMuted(false)
      return
    }
    audio.muted = !audio.muted
    setMuted(audio.muted)
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/organatory.mp3" loop preload="auto" />

      {/* Opening overlay — full-screen envelope */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Open the invitation"
        className={`group fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-[1200ms] ease-in-out focus:outline-none ${
          opened ? 'pointer-events-none scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Envelope fills the entire screen */}
        <img
          src="/images/envelope.jpeg"
          alt="Sealed invitation envelope with lace edge and a pearl"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Soft overlay so the prompt stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

        <div className="relative z-10 h-full w-full">
  <p className="absolute left-1/2 top-[15%] -translate-x-1/2 font-script text-4xl text-background drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] sm:text-5xl">
    You&apos;re Invited
  </p>

  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full border border-background/70 bg-background/20 px-7 py-3 text-xs uppercase tracking-[0.35em] text-background backdrop-blur-sm transition-colors group-hover:bg-background group-hover:text-ink">
    Tap to open
  </span>

  <p className="absolute bottom-[12%] left-1/2 -translate-x-1/2 text-center text-sm uppercase tracking-[0.4em] text-background/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
    Ł &amp; M
  </p>
</div>
      </button>

      {/* Music toggle, available after opening */}
      {opened && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-background/80 text-gold shadow-md backdrop-blur-sm transition-colors hover:bg-gold hover:text-primary-foreground"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}
    </>
  )
}
