'use client'

import { useState, type FormEvent } from 'react'
import { Send, Check } from 'lucide-react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function MessageForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    if (!name.trim() || !message.trim()) {
      setStatus('error')
      setErrorMsg('Please add your name and a message.')
      return
    }

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Could not send your message.')
      setStatus('sent')
      setName('')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-gold/30 bg-card/60 px-8 py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-primary-foreground">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-6 font-script text-4xl text-ink">Thank you</h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Your message has been delivered. It means the world to us.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-xs uppercase tracking-[0.3em] text-gold underline-offset-4 hover:underline"
        >
          Write another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 text-left">
          <label htmlFor="name" className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Your name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Write your name"
            className="w-full rounded-xl border border-border bg-card/70 px-4 py-3 text-lg text-ink outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold"
          />
        </div>

        <div className="flex flex-col gap-2 text-left">
          <label htmlFor="message" className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Your message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Leave a message for us..."
            className="w-full resize-none rounded-xl border border-border bg-card/70 px-4 py-3 text-lg leading-relaxed text-ink outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold"
          />
        </div>

        {status === 'error' && (
          <p className="text-sm text-destructive" role="alert">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-1 inline-flex items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-sm uppercase tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  )
}
