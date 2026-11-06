import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { fiestaAudio } from '../lib/audio'

export function AudioController() {
  const [on, setOn] = useState(false)

  const toggle = () => {
    const next = !on
    setOn(next)
    if (next) {
      fiestaAudio.setEnabled(true)
      if (!fiestaAudio.isMusicOn) fiestaAudio.toggleMusic()
    } else {
      if (fiestaAudio.isMusicOn) fiestaAudio.toggleMusic()
      fiestaAudio.setEnabled(false)
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-[620] flex items-center gap-2 rounded-full border border-ink/10 bg-cream/90 p-1.5 pr-2 shadow-[0_14px_34px_-12px_rgba(42,23,16,0.5)] backdrop-blur-md sm:bottom-5 sm:left-5 sm:pr-4">
      <button
        type="button"
        onClick={toggle}
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
          on ? 'bg-vino text-amarillo' : 'bg-ink/5 text-ink/60 hover:bg-ink/10 hover:text-ink'
        }`}
        aria-label={on ? 'Turn music and sound off' : 'Turn music and sound on'}
        aria-pressed={on}
        title={on ? 'Music & sound: on' : 'Music & sound: off'}
      >
        {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>

      <div className="hidden min-w-[62px] sm:block">
        <p className="text-[7.5px] font-semibold uppercase leading-none tracking-[0.2em] text-ink/40">
          {on ? 'Fiesta on' : 'Fiesta off'}
        </p>
        <div className="mt-1.5 flex h-3 items-end gap-[2px]" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="w-[3px] rounded-sm"
              style={{
                height: on ? `${5 + ((i * 7) % 9)}px` : '3px',
                background: on ? (i % 2 === 0 ? '#8E1F2B' : '#F2B63C') : 'rgba(42,23,16,0.18)',
                animation: on ? `equalize ${0.65 + i * 0.09}s ease-in-out ${-i * 0.12}s infinite alternate` : undefined,
                transformOrigin: 'bottom',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
