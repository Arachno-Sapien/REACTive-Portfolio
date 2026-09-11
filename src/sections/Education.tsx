import CardSwap, { Card } from '@/components/react-bits/CardSwap/CardSwap'
import SplitText from '@/components/react-bits/SplitText/SplitText'
import FadeContent from '@/components/react-bits/FadeContent/FadeContent'
import { education } from '@/data/portfolio'

export function Education() {
  return (
    <section id="education" className="section-shell">
      <p className="section-kicker">Education</p>
      <SplitText
        text="Path through classrooms & labs"
        tag="h2"
        className="font-display mb-10 text-3xl font-semibold sm:text-4xl text-paper"
        delay={28}
        textAlign="left"
      />

      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <FadeContent blur duration={0.9} className="space-y-4 text-fog">
          <p className="text-lg leading-relaxed">
            Three milestones — from ICSE foundations to PU science to Information Science
            Engineering at DSATM.
          </p>
          <p className="leading-relaxed">
            Building strong analytical fundamentals, core computer science concepts, and practical engineering skills through coursework and applied projects.
          </p>
        </FadeContent>

        <div className="relative mx-auto h-[420px] w-full max-w-lg">
          <CardSwap width="100%" height={380} cardDistance={48} verticalDistance={55} delay={4200}>
            {education.map((item) => (
              <Card
                key={item.school}
                className="surface flex flex-col justify-between rounded-3xl p-6 text-paper"
              >
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-mint uppercase">
                    {item.period}
                  </p>
                  <h3 className="font-display text-xl font-semibold leading-snug">{item.school}</h3>
                  <p className="mt-2 text-fog">{item.detail}</p>
                </div>
                <div className="mt-6 flex items-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-sky/30 bg-sky/10 px-3 py-1 text-xs font-semibold text-sky">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky" />
                    {item.result}
                  </span>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  )
}
