/**
 * Small, dependency-free fiesta band synthesised with the Web Audio API.
 * Nothing autoplays: the AudioContext is only created from a user gesture.
 */

type Chord = { bass: number; notes: number[] }

const CHORDS: Chord[] = [
  { bass: 73.42, notes: [146.83, 185.0, 220.0, 293.66] }, // D
  { bass: 98.0, notes: [196.0, 246.94, 293.66, 392.0] }, // G
  { bass: 110.0, notes: [220.0, 277.18, 329.63, 440.0] }, // A
  { bass: 73.42, notes: [146.83, 220.0, 293.66, 369.99] }, // D
]

class FiestaAudio {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private musicBus: GainNode | null = null
  private sfxBus: GainNode | null = null
  private timer: number | null = null
  private nextNoteTime = 0
  private step = 0
  private bar = 0
  private musicOn = false
  private enabled = false
  private noiseBuffer: AudioBuffer | null = null

  get isEnabled() {
    return this.enabled
  }

  get isMusicOn() {
    return this.musicOn
  }

  private ensure() {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!Ctor) return null
      this.ctx = new Ctor()
      this.master = this.ctx.createGain()
      this.master.gain.value = 0
      this.master.connect(this.ctx.destination)

      this.musicBus = this.ctx.createGain()
      this.musicBus.gain.value = 0.3
      this.musicBus.connect(this.master)

      this.sfxBus = this.ctx.createGain()
      this.sfxBus.gain.value = 0.85
      this.sfxBus.connect(this.master)

      const length = Math.floor(this.ctx.sampleRate * 0.6)
      this.noiseBuffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate)
      const data = this.noiseBuffer.getChannelData(0)
      for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume()
    return this.ctx
  }

  setEnabled(on: boolean) {
    this.enabled = on
    const ctx = this.ensure()
    if (!ctx || !this.master) return
    const now = ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setTargetAtTime(on ? 0.55 : 0, now, 0.08)
    if (on) {
      if (this.musicOn) this.startMusicLoop()
    } else {
      this.stopMusicLoop()
    }
  }

  toggleMusic() {
    const ctx = this.ensure()
    if (!ctx) return false
    this.musicOn = !this.musicOn
    if (this.musicOn) {
      if (!this.enabled) this.setEnabled(true)
      this.startMusicLoop()
    } else {
      this.stopMusicLoop()
    }
    return this.musicOn
  }

  private startMusicLoop() {
    const ctx = this.ensure()
    if (!ctx || !this.musicOn || this.timer !== null) return
    this.nextNoteTime = ctx.currentTime + 0.08
    this.step = 0
    this.bar = 0
    this.timer = window.setInterval(() => this.scheduler(), 120)
    this.scheduler()
  }

  private stopMusicLoop() {
    if (this.timer !== null) {
      window.clearInterval(this.timer)
      this.timer = null
    }
  }

  private scheduler() {
    const ctx = this.ctx
    if (!ctx || !this.musicBus) return
    const spb = 0.135 // ~111 bpm, eighth notes
    while (this.nextNoteTime < ctx.currentTime + 0.45) {
      const chord = CHORDS[this.bar % CHORDS.length]
      const step = this.step % 8
      const t = this.nextNoteTime

      // Guitarrón-style bass on 1 and 4.
      if (step === 0 || step === 4) {
        this.pluck(chord.bass, t, 0.5, 0.28, 'triangle', 420)
      }
      if (step === 6) {
        this.pluck(chord.bass * 1.5, t, 0.3, 0.16, 'triangle', 600)
      }

      // Nylon guitar arpeggio.
      if (step !== 3 || this.bar % 2 === 0) {
        const note = chord.notes[(step + this.bar) % chord.notes.length] * 2
        this.pluck(note, t, 0.28, 0.085, 'sawtooth', 1700)
      }
      if (step === 2 || step === 7) {
        const note = chord.notes[(step + 2) % chord.notes.length]
        this.pluck(note, t, 0.34, 0.06, 'triangle', 1300)
      }

      // Guiro / shaker texture on the off-beats.
      if (step % 2 === 1) this.shaker(t, step === 5 ? 0.05 : 0.032)

      this.step += 1
      if (this.step % 8 === 0) this.bar += 1
      this.nextNoteTime += spb
    }
  }

  private pluck(freq: number, at: number, dur: number, volume: number, type: OscillatorType, cutoff: number) {
    const ctx = this.ctx
    if (!ctx || !this.musicBus) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(cutoff * 2.2, at)
    filter.frequency.exponentialRampToValueAtTime(Math.max(180, cutoff * 0.7), at + dur)
    osc.type = type
    osc.frequency.setValueAtTime(freq, at)
    gain.gain.setValueAtTime(0.0001, at)
    gain.gain.exponentialRampToValueAtTime(volume, at + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur)
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.musicBus)
    osc.start(at)
    osc.stop(at + dur + 0.05)
  }

  private shaker(at: number, volume: number) {
    const ctx = this.ctx
    if (!ctx || !this.musicBus || !this.noiseBuffer) return
    const src = ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 5200
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(volume, at)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.075)
    src.connect(filter)
    filter.connect(gain)
    gain.connect(this.musicBus)
    src.start(at)
    src.stop(at + 0.1)
  }

  /* ------------------------------- effects ------------------------------- */

  private noiseBurst(at: number, dur: number, volume: number, type: BiquadFilterType, freq: number) {
    const ctx = this.ctx
    if (!ctx || !this.sfxBus || !this.noiseBuffer) return
    const src = ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    const filter = ctx.createBiquadFilter()
    filter.type = type
    filter.frequency.setValueAtTime(freq, at)
    filter.frequency.exponentialRampToValueAtTime(Math.max(120, freq * 0.35), at + dur)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(volume, at)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur)
    src.connect(filter)
    filter.connect(gain)
    gain.connect(this.sfxBus)
    src.start(at)
    src.stop(at + dur + 0.05)
  }

  private tone(freq: number, at: number, dur: number, volume: number, type: OscillatorType) {
    const ctx = this.ctx
    if (!ctx || !this.sfxBus) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, at)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.92, at + dur)
    gain.gain.setValueAtTime(0.0001, at)
    gain.gain.exponentialRampToValueAtTime(volume, at + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur)
    osc.connect(gain)
    gain.connect(this.sfxBus)
    osc.start(at)
    osc.stop(at + dur + 0.05)
  }

  hit() {
    const ctx = this.ensure()
    if (!this.enabled || !ctx) return
    const t = ctx.currentTime
    this.noiseBurst(t, 0.14, 0.32, 'bandpass', 900)
    this.tone(120 + Math.random() * 30, t, 0.16, 0.22, 'sine')
    this.tone(260, t + 0.01, 0.09, 0.09, 'triangle')
  }

  crack() {
    const ctx = this.ensure()
    if (!this.enabled || !ctx) return
    const t = ctx.currentTime
    this.noiseBurst(t, 0.4, 0.4, 'lowpass', 1400)
  }

  pop() {
    const ctx = this.ensure()
    if (!this.enabled || !ctx) return
    const t = ctx.currentTime
    this.noiseBurst(t, 0.7, 0.5, 'lowpass', 2400)
    this.tone(180, t, 0.35, 0.3, 'sine')
    this.fanfare()
  }

  fanfare() {
    const ctx = this.ensure()
    if (!this.enabled || !ctx) return
    const t = ctx.currentTime + 0.06
    const melody = [587.33, 659.25, 739.99, 880.0, 739.99, 880.0, 987.77, 1174.66]
    melody.forEach((freq, i) => {
      this.tone(freq, t + i * 0.105, i === melody.length - 1 ? 0.75 : 0.18, 0.2, 'triangle')
      this.tone(freq * 2, t + i * 0.105, 0.12, 0.05, 'sine')
    })
  }

  unlock() {
    const ctx = this.ensure()
    if (!ctx) return
    if (this.enabled) this.master?.gain.setTargetAtTime(0.55, ctx.currentTime, 0.1)
  }
}

export const fiestaAudio = new FiestaAudio()
