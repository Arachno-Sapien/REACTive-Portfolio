import Aurora from '@/components/react-bits/Aurora/Aurora'
import SplitText from '@/components/react-bits/SplitText/SplitText'
import TextType from '@/components/react-bits/TextType/TextType'
import ShinyText from '@/components/react-bits/ShinyText/ShinyText'
import Magnet from '@/components/react-bits/Magnet/Magnet'
import ProfileCard from '@/components/react-bits/ProfileCard/ProfileCard'
import { identity } from '@/data/portfolio'

export function Hero() {
  return (
    <section id="profile" className="relative min-h-screen overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <Aurora
          colorStops={['#1faa72', '#3dffa8', '#7ec8ff']}
          amplitude={0.85}
          blend={0.55}
          speed={0.7}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/55 to-ink" />

      <div className="section-shell relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="section-kicker">Hello, I&apos;m</p>
          <SplitText
            text={identity.name}
            tag="h1"
            className="font-display text-4xl font-bold tracking-tight text-paper sm:text-5xl lg:text-6xl"
            delay={35}
            duration={0.7}
            splitType="chars"
            textAlign="left"
          />
          <TextType
            text={[identity.title, identity.tagline, 'Web · Python · CV · IoT · Sustainable tech']}
            typingSpeed={42}
            deletingSpeed={24}
            pauseDuration={1800}
            className="block min-h-[2rem] text-lg text-fog sm:text-xl"
            cursorClassName="text-mint"
            startOnVisible
          />
          <ShinyText
            text="Engineering student · Open-source enthusiast · Based in Bengaluru"
            className="text-sm text-fog"
            speed={3}
          />

          <div className="flex flex-wrap gap-3 pt-2">
            <Magnet padding={40} magnetStrength={3}>
              <a
                href={identity.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-2xl bg-coral px-5 py-3 font-semibold text-ink transition hover:brightness-110"
              >
                View Resume
              </a>
            </Magnet>
            <Magnet padding={40} magnetStrength={3}>
              <a
                href="#contact"
                className="inline-flex rounded-2xl border border-mint/40 bg-panel px-5 py-3 font-semibold text-mint transition hover:bg-mint/15 hover:border-mint"
              >
                Contact Me
              </a>
            </Magnet>
          </div>
        </div>

        <div className="mx-auto flex justify-center w-full max-w-md">
          <ProfileCard
            avatarUrl={identity.avatar}
            miniAvatarUrl={identity.avatar}
            iconUrl=""
            grainUrl=""
            name={identity.name}
            title={identity.title}
            handle={identity.handle}
            status={identity.status}
            contactText="Say hello"
            behindGlowEnabled
            behindGlowColor="rgba(61, 255, 168, 0.35)"
            innerGradient="linear-gradient(145deg, rgba(61,255,168,0.25) 0%, rgba(126,200,255,0.18) 100%)"
            onContactClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          />
        </div>
      </div>
    </section>
  )
}
