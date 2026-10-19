/** Small canvas notes built from details provided for this portfolio. */
export type StickyTint = 'yellow' | 'pink' | 'blue' | 'green'

export interface DeskProp {
  id: string
  x: number
  y: number
  rotate?: number
  tint?: StickyTint
  lines?: readonly [string, string]
  glyph?: string
}

export const props: readonly DeskProp[] = [
  { id: 'note-focus', tint: 'yellow', x: -2700, y: 2150, rotate: -3, lines: ['current focus', 'learning AI and machine learning'] },
  { id: 'note-study', tint: 'blue', x: -3700, y: -2050, rotate: 2, lines: ['MSc Computer Science', 'University of East London'] },
  { id: 'note-project', tint: 'green', x: 280, y: -3400, rotate: 3, lines: ['machine vision project', '97% reported accuracy'] },
  { id: 'note-cloud', tint: 'pink', x: 3050, y: -1900, rotate: -2, lines: ['cloud computing project', 'AWS warehouse architecture'] },
] as const
