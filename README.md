# ¡Que Viva Roberto!

An immersive, scroll-driven birthday site for Roberto — seven cinematic scenes, built with React, TypeScript, Vite, Tailwind, GSAP ScrollTrigger, Framer Motion and Lenis.

## Run it

```bash
npm install
npm run dev
```

Open the printed URL (the project is configured for `http://127.0.0.1:5178/`).

Production build:

```bash
npm run build
npm run preview
```

## The seven scenes

1. **Bienvenidos** — wooden doors open into the hero invitation.
2. **El Protagonista** — three traits (funny, calm, great cook), pinned and scrubbed.
3. **Nuestros Recuerdos** — pinned polaroid gallery with a keyboard-accessible lightbox.
4. **La Cocina** — scroll-cooked dish, ingredient animation and an interactive menu.
5. **La Piñata** — eight-hit piñata mini-game with paper bursts and confetti.
6. **Los Amigos** — birthday wishes and a sealed letter.
7. **El Gran Final** — night sky, fireworks, photo strip and replay.

## Personalize

- **Photos** live in `src/data/memories.ts` as a single `memories` array. Keep the three Google Drive URLs centralized there. If a Drive image fails, `MemoryPhoto` retries through `lh3.googleusercontent.com/d/{id}=w2000`.
- **Scene names / navigation labels** are also defined in `src/data/memories.ts`.
- **Copy** for each scene lives in its component under `src/scenes/`.
- **Colors, type and texture** are defined in `tailwind.config.js` and `src/index.css`.

## Behavior notes

- Sound is **off by default**. Music and effects start only after the explicit sound toggle, using the Web Audio API (no audio files).
- Motion respects `prefers-reduced-motion`: pinning, parallax and fireworks are skipped, while all content stays visible.
- The site always opens at the top, with scrolling locked until the doors are opened.
- Photos are lazy-loaded below the fold.
- Replay remounts the experience cleanly and returns to the doors.

## QA

Type-check and build:

```bash
npx tsc -b
npm run build
```

Verified at 1440×900, 834×1112 and 390×844, plus reduced-motion mode: no horizontal overflow, no clipped text, all three photos load, and the doors, lightbox, kitchen menu, piñata, letter, replay and audio toggle all work without console errors.
