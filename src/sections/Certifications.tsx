import { useState, useMemo, useEffect } from 'react'
import { useLazyMount } from '@/hooks/useLazyMount'
import Stack from '@/components/react-bits/Stack/Stack'
import FadeContent from '@/components/react-bits/FadeContent/FadeContent'
import SplitText from '@/components/react-bits/SplitText/SplitText'
import { certificates, courses, hackathons } from '@/data/portfolio'

export function Certifications() {
  const { containerRef, mounted } = useLazyMount('350px')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null)

  // Pass all certificates to stack with lazy loading
  const stackCards = useMemo(
    () =>
      certificates.map((cert) => (
        <img
          key={cert.title}
          src={cert.image}
          alt={cert.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full rounded-2xl object-cover shadow-xl border border-line select-none pointer-events-none"
        />
      )),
    [],
  )

  const currentCert = certificates[activeIndex] || certificates[0]

  // Filter certificates for the gallery modal
  const filteredCerts = useMemo(() => {
    if (!searchQuery.trim()) return certificates
    const q = searchQuery.toLowerCase()
    return certificates.filter((c) => c.title.toLowerCase().includes(q))
  }, [searchQuery])

  // Lock body scroll when gallery or lightbox is open
  useEffect(() => {
    if (isGalleryOpen || selectedCertIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isGalleryOpen, selectedCertIndex])

  // Handle escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedCertIndex !== null) {
          setSelectedCertIndex(null)
        } else if (isGalleryOpen) {
          setIsGalleryOpen(false)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isGalleryOpen, selectedCertIndex])

  const handlePrevLightBox = () => {
    if (selectedCertIndex === null) return
    setSelectedCertIndex((selectedCertIndex - 1 + certificates.length) % certificates.length)
  }

  const handleNextLightBox = () => {
    if (selectedCertIndex === null) return
    setSelectedCertIndex((selectedCertIndex + 1) % certificates.length)
  }

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="section-shell"
      style={{ minHeight: mounted ? undefined : '520px' }}
    >
      {!mounted ? null : (
        <>
          <p className="section-kicker">Certifications</p>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <SplitText
            text="Proof of practice"
            tag="h2"
            className="font-display text-3xl font-semibold sm:text-4xl text-paper"
            delay={28}
            textAlign="left"
          />
          <p className="mt-2 text-sm text-fog">
            29 verified credentials across AI, software engineering, IoT, and systems
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsGalleryOpen(true)}
          className="inline-flex cursor-pointer items-center gap-2 self-start sm:self-auto rounded-xl border border-line bg-panel-2 px-4 py-2 text-xs font-semibold text-paper transition hover:border-mint/60 hover:text-mint focus-visible:outline-none"
        >
          <svg className="h-4 w-4 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>View All Certificates (29)</span>
        </button>
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="mx-auto w-full max-w-[340px]">
          {/* Active Card Meta */}
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <span className="truncate text-xs font-semibold tracking-wide text-mint uppercase">
              {currentCert?.title}
            </span>
            <span className="shrink-0 rounded-full border border-line bg-panel-2/90 px-2.5 py-0.5 text-xs font-semibold text-fog">
              {activeIndex + 1} / {certificates.length}
            </span>
          </div>

          <FadeContent className="h-[330px] w-full sm:h-[370px]">
            <Stack
              cards={stackCards}
              randomRotation
              sendToBackOnClick
              autoplay
              autoplayDelay={3200}
              pauseOnHover
              onTopCardChange={setActiveIndex}
            />
          </FadeContent>

          <div className="mt-4 flex items-center justify-between px-1 text-xs text-fog">
            <span className="flex items-center gap-1.5">
              <span>Tap or drag card to flip</span>
            </span>
            <button
              type="button"
              onClick={() => setIsGalleryOpen(true)}
              className="font-medium text-mint hover:underline cursor-pointer"
            >
              Browse all 29 →
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="surface rounded-3xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-mint">Courses & Training</h3>
              <span className="rounded-full bg-mint/10 px-2 py-0.5 text-xs font-semibold text-mint">
                {courses.length}
              </span>
            </div>
            <ul className="max-h-80 space-y-2.5 overflow-y-auto pr-1 text-sm text-fog scrollbar-thin">
              {courses.map((item) => (
                <li key={item} className="border-b border-line/50 pb-2.5 last:border-0 last:pb-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="surface rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-sky">Hackathons & Events</h3>
                <span className="rounded-full bg-sky/10 px-2 py-0.5 text-xs font-semibold text-sky">
                  {hackathons.length}
                </span>
              </div>
              <ul className="space-y-3 text-sm text-fog">
                {hackathons.map((item) => (
                  <li key={item} className="border-b border-line/50 pb-2.5 last:border-0 last:pb-0 flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-panel-2/60 p-4">
              <p className="text-xs font-semibold text-paper">Want to review verified credentials?</p>
              <p className="mt-1 text-xs text-fog">Explore the complete archive of certificates and coursework completion proof.</p>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(true)}
                className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-mint px-3 py-2 text-xs font-semibold text-ink transition hover:shadow-lg hover:shadow-mint/20"
              >
                <span>Open Full Certificate Gallery</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Certificate Gallery Modal */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 bg-ink/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="All Certificates Gallery"
        >
          <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col rounded-3xl border border-line bg-panel shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex flex-col gap-4 border-b border-line/80 p-5 sm:flex-row sm:items-center sm:justify-between bg-panel-2/50">
              <div>
                <h3 className="font-display text-xl font-bold text-paper sm:text-2xl">
                  Certificates & Credentials
                </h3>
                <p className="text-xs text-fog sm:text-sm">
                  Showing {filteredCerts.length} of {certificates.length} certificates
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search certificates..."
                    className="w-full rounded-xl border border-line bg-ink/60 px-3.5 py-2 pl-9 text-xs text-paper placeholder-fog focus:border-mint focus:outline-none"
                    autoFocus
                  />
                  <svg className="absolute left-3 top-2.5 h-4 w-4 text-fog" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2 text-xs text-fog hover:text-paper"
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsGalleryOpen(false)}
                  className="rounded-xl border border-line p-2 text-fog transition hover:border-line/80 hover:bg-panel-2 hover:text-paper focus-visible:outline-none cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Grid Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {filteredCerts.length === 0 ? (
                <div className="py-16 text-center text-fog">
                  <p className="text-base font-semibold">No certificates match "{searchQuery}"</p>
                  <p className="mt-1 text-xs">Try searching for keywords like "AI", "Python", "C", "IoT", or "SQL".</p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-4 rounded-xl border border-mint/40 bg-mint/10 px-4 py-2 text-xs font-semibold text-mint"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCerts.map((cert) => {
                    const originalIndex = certificates.findIndex((c) => c.title === cert.title)
                    return (
                      <div
                        key={cert.title}
                        data-cert-card="true"
                        onClick={() => setSelectedCertIndex(originalIndex)}
                        className="surface group flex flex-col justify-between overflow-hidden rounded-2xl border border-line transition duration-200 hover:border-mint/50 hover:shadow-lg cursor-pointer"
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                          <img
                            src={cert.image}
                            alt={cert.title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-ink/40 opacity-0 transition duration-200 group-hover:opacity-100 flex items-center justify-center">
                            <span className="rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold text-mint border border-mint/40 flex items-center gap-1.5">
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View Full Size
                            </span>
                          </div>
                        </div>
                        <div className="p-3.5">
                          <p className="font-display text-sm font-semibold text-paper group-hover:text-mint transition line-clamp-2">
                            {cert.title}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-line/80 px-5 py-3 text-xs text-fog bg-panel-2/40">
              <span>Press <kbd className="rounded border border-line bg-ink px-1.5 py-0.5 font-mono text-[10px] text-paper">Esc</kbd> to close</span>
              <span>All 29 credentials verified</span>
            </div>
          </div>
        </div>
      )}

      {/* High-Resolution Lightbox Viewer */}
      {selectedCertIndex !== null && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={certificates[selectedCertIndex].title}
          onClick={() => setSelectedCertIndex(null)}
        >
          <div
            className="relative flex max-h-[95vh] max-w-4xl flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Controls Header */}
            <div className="mb-3 flex w-full items-center justify-between px-2 text-paper">
              <div>
                <p className="font-display text-base font-semibold text-paper sm:text-lg">
                  {certificates[selectedCertIndex].title}
                </p>
                <p className="text-xs text-fog">
                  Certificate {selectedCertIndex + 1} of {certificates.length}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={certificates[selectedCertIndex].image}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-line bg-panel-2 px-3 py-1.5 text-xs font-semibold text-paper transition hover:border-mint/60 hover:text-mint"
                >
                  Open Original
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedCertIndex(null)}
                  className="rounded-xl border border-line bg-panel-2 p-2 text-fog transition hover:border-line hover:text-paper cursor-pointer"
                  aria-label="Close preview"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Lightbox Image with Prev/Next Navigation */}
            <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl">
              <img
                src={certificates[selectedCertIndex].image}
                alt={certificates[selectedCertIndex].title}
                decoding="async"
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />

              <button
                type="button"
                onClick={handlePrevLightBox}
                className="absolute left-2 sm:left-4 rounded-full border border-line bg-ink/70 p-2.5 text-paper backdrop-blur-md transition hover:border-mint hover:bg-ink hover:text-mint cursor-pointer"
                aria-label="Previous certificate"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNextLightBox}
                className="absolute right-2 sm:right-4 rounded-full border border-line bg-ink/70 p-2.5 text-paper backdrop-blur-md transition hover:border-mint hover:bg-ink hover:text-mint cursor-pointer"
                aria-label="Next certificate"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </section>
  )
}

