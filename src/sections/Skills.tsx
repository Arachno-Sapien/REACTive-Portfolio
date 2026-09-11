import SplitText from '@/components/react-bits/SplitText/SplitText'
import LogoLoop from '@/components/react-bits/LogoLoop/LogoLoop'
import AnimatedContent from '@/components/react-bits/AnimatedContent/AnimatedContent'
import { skills } from '@/data/portfolio'

function getTechIcon(name: string) {
  const n = name.toLowerCase()
  if (n.includes('python')) {
    return (
      <svg className="mr-2 h-4 w-4 shrink-0 text-sky" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-3.3 0-5.5 1.5-5.5 4.2v2.5h5.8v.9H4.6C2 9.6.7 11.6.7 14.8c0 3.2 1.8 5.2 4.6 5.2h2.5v-2.5c0-2.5 2.1-4.4 4.6-4.4h5.7v-.9H12.4c-1 0-1.7-.8-1.7-1.7V6.8c0-2.7 2.1-4.4 5-4.4h3.2c1.8 0 3.1.9 3.7 2.2l-.9.5c-.5-1.1-1.5-1.7-2.9-1.7H15.6c-2 0-3.6 1.2-3.6 3.1v4h7.7c2.7 0 4.1 1.9 4.1 5.2 0 3.3-1.4 5.3-4.1 5.3h-2.2v-.9h2.2c1.9 0 3-1.3 3-4.2 0-2.8-1.1-4.2-3-4.2H12c-1.9 0-3.5 1.5-3.5 3.5v3.5H5.2c-2.1 0-3.5-1.4-3.5-4.2 0-2.7 1.1-4.2 3.5-4.2h8.2V4.2C13.4 2.2 14.9 1.2 17.6 1.2h.4L12 2z" />
      </svg>
    )
  }
  if (n.includes('react') || n.includes('next')) {
    return (
      <svg className="mr-2 h-4 w-4 shrink-0 text-sky" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    )
  }
  if (n.includes('sql') || n.includes('dbms') || n.includes('sqlite')) {
    return (
      <svg className="mr-2 h-4 w-4 shrink-0 text-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    )
  }
  if (n.includes('git')) {
    return (
      <svg className="mr-2 h-4 w-4 shrink-0 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M6 9v12" />
        <path d="M18 15a9 9 0 0 0-9-9" />
      </svg>
    )
  }
  if (n.includes('opencv') || n.includes('cv')) {
    return (
      <svg className="mr-2 h-4 w-4 shrink-0 text-sky" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="7" r="4" />
        <circle cx="7" cy="16" r="4" />
        <circle cx="17" cy="16" r="4" />
      </svg>
    )
  }
  if (n.includes('html') || n.includes('css') || n.includes('javascript')) {
    return (
      <svg className="mr-2 h-4 w-4 shrink-0 text-[#f7df1e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 3h16l-2 15-6 3-6-3L4 3z" />
      </svg>
    )
  }
  if (n.includes('java') || n.includes('django') || n.includes('php') || n.includes('c#') || n === 'c' || n.includes('api')) {
    return (
      <svg className="mr-2 h-4 w-4 shrink-0 text-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  }
  return <span className="mr-2 inline-block h-2 w-2 shrink-0 rounded-full bg-mint/70" />
}

function SkillPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-panel px-4 py-2 text-sm font-medium text-paper transition hover:border-mint/50">
      {getTechIcon(label)}
      <span>{label}</span>
    </span>
  )
}

export function Skills() {
  const loopItems = [
    ...skills.technical,
    ...skills.tools.slice(0, 4),
    ...skills.communication.slice(0, 4),
  ].map((label) => ({
    node: <SkillPill label={label} />,
    title: label,
  }))

  return (
    <section id="skills" className="section-shell overflow-hidden">
      <p className="section-kicker">Skills</p>
      <SplitText
        text="Technical · Tools · Communication"
        tag="h2"
        className="font-display mb-8 text-3xl font-semibold sm:text-4xl text-paper"
        delay={28}
        textAlign="left"
      />

      <div className="mb-10 rounded-3xl border border-line bg-panel/60 py-6">
        <LogoLoop logos={loopItems} speed={80} gap={18} logoHeight={42} fadeOut fadeOutColor="#0e1419" pauseOnHover />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {(
          [
            ['Technical', skills.technical],
            ['Tools & Strengths', skills.tools],
            ['Communication', skills.communication],
          ] as const
        ).map(([title, list], index) => (
          <AnimatedContent key={title} distance={36} delay={index * 0.08}>
            <div className="surface h-full rounded-3xl p-6">
              <h3 className="mb-4 font-display text-xl font-semibold text-mint">{title}</h3>
              <div className="flex flex-wrap gap-2">
                {list.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-ink/40 px-3 py-1.5 text-sm text-paper"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
