import { EnvelopeIntro } from '@/components/envelope-intro'
import { Countdown } from '@/components/countdown'
import { MessageForm } from '@/components/message-form'
import { Reveal } from '@/components/reveal'

const LOCATION_URL = 'https://maps.app.goo.gl/e7Dfua7rtSPzHs8x9?g_st=ic'
const PHONE_URL = 'tel:+201062997722'
const TIKTOK_URL = 'https://www.tiktok.com/@lucy_mohamedd'

export default function Page() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: 'url(/images/paper-bg.jpeg)',
        backgroundSize: '600px',
        backgroundRepeat: 'repeat',
      }}
    >
      <EnvelopeIntro />

      <main className="mx-auto w-full max-w-md">
        {/* Save the Date */}
        <section>
          <img
            src="/images/save-the-date.jpeg"
            alt="Save the date — 04.08.26 — the future Mr. & Mrs."
            className="block w-full"
          />
        </section>

        {/* Meet us / live countdown */}
        <section id="meet" className="px-6 py-16 text-center">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Meet Us In</p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-5 font-script text-5xl text-ink sm:text-6xl">Moon Love, Maadi</h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mx-auto mt-6 max-w-xs text-base uppercase leading-relaxed tracking-[0.15em] text-muted-foreground">
              On Tuesday, 4 August 2026
              <br />
              At seven in the afternoon
            </p>
          </Reveal>

          <Reveal delay={450} className="mt-10">
            <Countdown />
          </Reveal>
<Reveal delay={550}>

  <img

    src="/images/1e20e63d-adaf-4993-bfbe-e409939"

    alt="Łucja & Mohamed"

    className="mx-auto mt-10 w-80 rounded-3xl shadow-2xl"

  />

</Reveal>
          <Reveal delay={200}>
            <img
              src="/images/monogram.jpeg"
              alt="M &amp; L monogram"
              className="mx-auto mt-12 h-24 w-auto opacity-70 mix-blend-multiply"
            />
          </Reveal>
        </section>

        {/* Dear guests — tap the invitation to leave a message */}
        <section className="relative">
          <img
            src="/images/dear-guests.jpeg"
            alt="Dear guests — something wonderful is about to happen. Leave a message for us."
            className="block w-full"
          />
          {/* Clickable GET STARTED region scrolls to the message form */}
          <a
            href="#message"
            aria-label="Get started — leave a message for us"
            className="absolute left-1/2 top-[85.5%] h-[5%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          />
        </section>

        {/* Message form */}
        <section id="message" className="scroll-mt-6 px-6 pb-16 pt-4 text-center">
          <Reveal>
            <p className="mx-auto max-w-sm text-base leading-relaxed text-muted-foreground">
              We would love to hear from you. Write us a little note below.
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-10">
            <MessageForm />
          </Reveal>
        </section>

        {/* Dresscode + gallery + footer with live contact links */}
        <section className="relative">
          <img
            src="/images/dresscode.jpeg"
            alt="Dresscode and our moments — plus location, phone, date and TikTok"
            className="block w-full"
          />
          {/* Overlay the footer icons with real links */}
          <a
            href={LOCATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open venue location on the map"
            className="absolute top-[89%] left-[17%] aspect-square w-[13%] -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          />
          <a
            href={PHONE_URL}
            aria-label="Call us"
            className="absolute top-[89%] left-[39.5%] aspect-square w-[13%] -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          />
          <a
            href="#meet"
            aria-label="View the date and countdown"
            className="absolute top-[89%] left-[61.5%] aspect-square w-[13%] -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          />
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our TikTok"
            className="absolute top-[89%] left-[84%] aspect-square w-[13%] -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          />
        </section>

        {/* Accessible text fallback for the contact links */}
        <nav aria-label="Contact and details" className="sr-only">
          <a href={LOCATION_URL}>Location</a>
          <a href={PHONE_URL}>Phone</a>
          <a href="#meet">Date and countdown</a>
          <a href={TIKTOK_URL}>TikTok</a>
        </nav>
      </main>
    </div>
  )
}
