import { useEffect, useRef, useState } from 'react'
import { ImageOff, Loader2 } from 'lucide-react'
import type { Memory } from '../data/memories'

type Props = {
  memory: Memory
  alt?: string
  className?: string
  imgClassName?: string
  priority?: boolean
  onClick?: () => void
  objectPosition?: string
}

/**
 * Displays one of the three original photographs. The supplied Drive URL is
 * always the primary source. If Drive's viewer endpoint refuses to render in a
 * given browser, we retry once with Google's direct content host rather than
 * substituting another image.
 */
export function MemoryPhoto({
  memory,
  alt = 'A photograph from Roberto’s memories',
  className = '',
  imgClassName = '',
  priority = false,
  onClick,
  objectPosition = '50% 42%',
}: Props) {
  const [src, setSrc] = useState(memory.image)
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)
  const retryRef = useRef(0)

  useEffect(() => {
    setSrc(memory.image)
    setStatus('loading')
    retryRef.current = 0
    setAttempt(0)
  }, [memory.image])

  const handleError = () => {
    if (retryRef.current === 0) {
      retryRef.current = 1
      setSrc(memory.fallbackImage)
      setAttempt((a) => a + 1)
    } else {
      setStatus('error')
    }
  }

  const content = (
    <>
      {status !== 'loaded' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#e4cfae] text-ink/50">
          {status === 'loading' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              <span className="font-script text-base">revelando recuerdo…</span>
            </>
          ) : (
            <>
              <ImageOff className="h-6 w-6" aria-hidden="true" />
              <span className="px-4 text-center font-script text-base leading-tight">
                This photo could not load here.
              </span>
              <a
                href={memory.image}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] font-medium uppercase tracking-[0.18em] underline underline-offset-4 hover:text-ink"
              >
                Open on Google Drive
              </a>
            </>
          )}
        </div>
      )}
      {status !== 'error' && (
        <img
          key={attempt}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          draggable={false}
          className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          style={{ objectPosition }}
          onLoad={() => setStatus('loaded')}
          onError={handleError}
        />
      )}
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`group/photo relative block cursor-zoom-in overflow-hidden text-left ${className}`}
        aria-label={`Open ${memory.dateLabel} in a larger view`}
      >
        {content}
        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10 transition group-hover/photo:ring-2 group-hover/photo:ring-amarillo" />
      </button>
    )
  }

  return <div className={`relative overflow-hidden ${className}`}>{content}</div>
}
