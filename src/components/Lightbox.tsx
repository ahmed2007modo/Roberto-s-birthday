import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react'
import { memories } from '../data/memories'
import { MemoryPhoto } from './MemoryPhoto'

type Props = {
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ index, onClose, onNavigate }: Props) {
  const open = index !== null
  const memory = open ? memories[index] : null

  const go = useCallback(
    (dir: number) => {
      if (index === null) return
      onNavigate((index + dir + memories.length) % memories.length)
    },
    [index, onNavigate],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, go])

  return createPortal(
    <AnimatePresence>
      {open && memory && (
        <motion.div
          className="fixed inset-0 z-[9500] flex flex-col items-center justify-center bg-night/95 px-4 py-6 backdrop-blur-md sm:px-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${memory.dateLabel} — enlarged photograph`}
          onClick={onClose}
        >
          <div className="pointer-events-none absolute inset-0 bg-grain bg-repeat opacity-[0.045]" />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:rotate-90 hover:border-amarillo hover:text-amarillo sm:right-8 sm:top-8"
            aria-label="Close photo"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.figure
            key={memory.id}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-full w-full max-w-6xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative border-[10px] border-[#fbf3e1] bg-[#fbf3e1] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] sm:border-[14px]">
              <MemoryPhoto
                memory={memory}
                priority
                alt={`${memory.dateLabel} — photograph shared for Roberto's birthday`}
                className="inline-block max-h-[70vh] max-w-[min(86vw,1000px)] align-middle"
                imgClassName="!h-auto !w-auto max-h-[70vh] max-w-[min(86vw,1000px)] !object-contain"
                objectPosition="50% 50%"
              />
            </div>

            <figcaption className="mt-5 flex w-full max-w-3xl flex-col items-center gap-2 text-center">
              <p className="font-script text-2xl text-amarillo sm:text-3xl">{memory.caption}</p>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.24em] text-cream/55">
                <span>{memory.dateLabel}</span>
                <span className="hidden h-1 w-1 rounded-full bg-cream/40 sm:block" />
                <a
                  href={memory.image}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-cream/70 underline decoration-cream/30 underline-offset-4 transition hover:text-amarillo"
                >
                  Original on Google Drive <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </figcaption>

            <div className="mt-5 flex items-center gap-5">
              <button
                type="button"
                onClick={() => go(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:border-amarillo hover:text-amarillo"
                aria-label="Previous photo"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <span className="font-script text-lg text-cream/60">
                {(index ?? 0) + 1} / {memories.length}
              </span>
              <button
                type="button"
                onClick={() => go(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:border-amarillo hover:text-amarillo"
                aria-label="Next photo"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
