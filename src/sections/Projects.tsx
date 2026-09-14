import { useLazyMount } from '@/hooks/useLazyMount'
import SpotlightCard from '@/components/react-bits/SpotlightCard/SpotlightCard'
import GlareHover from '@/components/react-bits/GlareHover/GlareHover'
import AnimatedContent from '@/components/react-bits/AnimatedContent/AnimatedContent'
import TiltedCard from '@/components/react-bits/TiltedCard/TiltedCard'
import SplitText from '@/components/react-bits/SplitText/SplitText'
import { projects } from '@/data/portfolio'

export function Projects() {
  const { containerRef, mounted } = useLazyMount('350px')
  const [featured, ...rest] = projects

  return (
    <section
      id="projects"
      ref={containerRef}
      className="section-shell"
      style={{ minHeight: mounted ? undefined : '520px' }}
    >
      {!mounted ? null : (
        <>
          <p className="section-kicker">Projects</p>
      <SplitText
        text="Selected builds"
        tag="h2"
        className="font-display mb-10 text-3xl font-semibold sm:text-4xl text-paper"
        delay={28}
        textAlign="left"
      />

      {featured && (
        <AnimatedContent className="mb-8" distance={40}>
          <GlareHover
            width="100%"
            height="auto"
            background="transparent"
            borderRadius="1.5rem"
            borderColor="rgba(232,238,242,0.12)"
            glareColor="#3dffa8"
            glareOpacity={0.35}
            className="overflow-hidden"
          >
            <a
              href={featured.url}
              target="_blank"
              rel="noreferrer"
              className="surface group block rounded-3xl p-8 transition hover:border-mint/50"
            >
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold tracking-[0.16em] text-coral uppercase">
                      Featured
                    </p>
                    <span className="flex items-center gap-1 text-xs text-mint opacity-80 group-hover:opacity-100">
                      GitHub
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold sm:text-3xl transition group-hover:text-mint">{featured.name}</h3>
                  <p className="mt-3 max-w-2xl text-fog leading-relaxed">{featured.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-3 py-1 text-xs text-paper transition-colors hover:border-mint/60 hover:text-mint"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">
                  <TiltedCard
                    imageSrc={featured.image || '/assets/project-1.webp'}
                    altText={featured.name}
                    captionText={featured.name}
                    containerHeight="240px"
                    containerWidth="240px"
                    imageHeight="240px"
                    imageWidth="240px"
                    rotateAmplitude={10}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    displayOverlayContent
                    overlayContent={
                      <p className="rounded-full bg-ink/70 px-3 py-1 text-xs text-mint">
                        Open on GitHub
                      </p>
                    }
                  />
                </div>
              </div>
            </a>
          </GlareHover>
        </AnimatedContent>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rest.map((project, index) => (
          <AnimatedContent key={project.name} distance={32} delay={index * 0.05}>
            <SpotlightCard
              className="surface group h-full rounded-3xl p-6 transition duration-300 hover:border-mint/50"
              spotlightColor="rgba(61, 255, 168, 0.16)"
            >
              <a href={project.url} target="_blank" rel="noreferrer" className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold transition group-hover:text-mint">{project.name}</h3>
                  <svg className="h-4 w-4 shrink-0 text-fog transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fog">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-2.5 py-1 text-xs text-fog transition-colors hover:border-mint/50 hover:text-paper"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </SpotlightCard>
          </AnimatedContent>
        ))}
      </div>
        </>
      )}
    </section>
  )
}
