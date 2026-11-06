export type Memory = {
  id: number
  /** Canonical source supplied for the project. Never replaced or downloaded. */
  image: string
  /** Direct Google-hosted variant used only if the Drive viewer URL is blocked. */
  fallbackImage: string
  caption: string
  note: string
  dateLabel: string
}

const drive = (id: string) => `https://drive.google.com/uc?export=view&id=${id}`
const direct = (id: string) => `https://lh3.googleusercontent.com/d/${id}=w2000`

/**
 * The three original photographs. Keep these links centralized and use this
 * object everywhere on the site (gallery, friends, finale, lightbox).
 * Nothing is downloaded, copied or re-hosted.
 */
export const memories: Memory[] = [
  {
    id: 1,
    image: drive('1pQpi91ejDvrnrfB7cPGbbZElrmkUBjuH'),
    fallbackImage: direct('1pQpi91ejDvrnrfB7cPGbbZElrmkUBjuH'),
    caption: 'Nuestra gente.',
    note: 'Para guardar',
    dateLabel: 'Recuerdo 01',
  },
  {
    id: 2,
    image: drive('1clpq39tJOmdamIcfeGYbxhaeiVGDuF_9'),
    fallbackImage: direct('1clpq39tJOmdamIcfeGYbxhaeiVGDuF_9'),
    caption: 'Un momento, mil recuerdos.',
    note: 'Siempre',
    dateLabel: 'Recuerdo 02',
  },
  {
    id: 3,
    image: drive('1_nCsYtHqRndnBml5QLQDd0cVYBdKld0H'),
    fallbackImage: direct('1_nCsYtHqRndnBml5QLQDd0cVYBdKld0H'),
    caption: 'Pura vida, hermano.',
    note: 'La fiesta',
    dateLabel: 'Recuerdo 03',
  },
]

export const scenes = [
  { id: 'bienvenidos', number: '01', label: 'Bienvenidos' },
  { id: 'protagonista', number: '02', label: 'El Protagonista' },
  { id: 'recuerdos', number: '03', label: 'Nuestros Recuerdos' },
  { id: 'cocina', number: '04', label: 'La Cocina' },
  { id: 'pinata', number: '05', label: 'La Piñata' },
  { id: 'amigos', number: '06', label: 'Los Amigos' },
  { id: 'final', number: '07', label: 'El Gran Final' },
] as const
