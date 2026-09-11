import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import PillNav from '@/components/react-bits/PillNav/PillNav'
import ClickSpark from '@/components/react-bits/ClickSpark/ClickSpark'
import { identity, navItems } from '@/data/portfolio'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Education } from '@/sections/Education'
import { Skills } from '@/sections/Skills'
import { Certifications } from '@/sections/Certifications'
import { Projects } from '@/sections/Projects'
import { Leadership } from '@/sections/Leadership'
import { Contact } from '@/sections/Contact'

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(`#${ids[0] ?? 'profile'}`)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActive(`#${visible[0].target.id}`)
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.15, 0.35, 0.6] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

export default function App() {
  const activeHref = useActiveSection([
    'profile',
    'about',
    'education',
    'skills',
    'certifications',
    'projects',
    'leadership',
    'contact',
  ])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const handleHashClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a')
      const href = target?.getAttribute('href')
      if (href?.startsWith('#') && href.length > 1 && /^#[a-zA-Z][\w-]*$/.test(href)) {
        try {
          const el = document.querySelector(href)
          if (el) {
            e.preventDefault()
            lenis.scrollTo(el as HTMLElement, { offset: -70 })
          }
        } catch {
          // Ignore selector syntax error
        }
      }
    }

    document.addEventListener('click', handleHashClick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', handleHashClick)
      lenis.destroy()
    }
  }, [])

  return (
    <ClickSpark sparkColor="#3dffa8" sparkCount={10} sparkRadius={22} duration={480}>
      <div className="relative min-h-screen overflow-x-hidden bg-ink text-paper">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-mint focus:px-4 focus:py-2.5 focus:font-semibold focus:text-ink focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_#152028_0%,_#05070a_55%)]" />

        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-3">
          <PillNav
            logo={identity.logo}
            logoAlt={identity.brand}
            items={navItems}
            activeHref={activeHref === '#profile' ? '#about' : activeHref}
            baseColor="rgba(14, 20, 25, 0.85)"
            pillColor="transparent"
            hoverBgColor="#3dffa8"
            hoveredPillTextColor="#05070a"
            pillTextColor="#94a3b8"
            activePillColor="#3dffa8"
            activePillTextColor="#05070a"
            className="w-full max-w-5xl"
          />
        </div>

        <main id="main-content">
          <Hero />
          <About />
          <Education />
          <Skills />
          <Certifications />
          <Projects />
          <Leadership />
          <Contact />
        </main>

        <footer className="border-t border-line/60 bg-panel/30 px-6 py-10">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <img src={identity.logo} alt={identity.brand} className="h-8 w-8 rounded-full object-cover" />
              <div>
                <p className="font-display font-semibold text-paper">{identity.name}</p>
                <p className="text-xs text-fog">{identity.tagline}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-fog">
              <a
                href={identity.resume}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-mint"
              >
                Resume (PDF)
              </a>
              <a
                href={identity.github}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-mint"
              >
                GitHub Profile
              </a>
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-mint"
              >
                LinkedIn
              </a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-semibold text-mint transition hover:bg-mint/10 hover:border-mint cursor-pointer"
                aria-label="Back to top"
              >
                ↑ Top
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-fog/70">
            Copyright © {new Date().getFullYear()} {identity.brand}. All Rights Reserved.
          </div>
        </footer>
      </div>
    </ClickSpark>
  )
}
