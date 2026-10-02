/**
 * Shared prop-value unions reused across components so that "size" and
 * "theme" mean the same thing everywhere. Components with a genuinely
 * different valid range (Badge's two-value `size`, Avatar's five-value
 * `size`, Modal/Drawer's dialog sizes) keep their own local union instead
 * of forcing an artificial one-size-fits-all type.
 */

export type Size = 'sm' | 'md' | 'lg'

export type Theme = 'default' | 'success' | 'warning' | 'danger' | 'info'

export type StatusColor = 'green' | 'yellow' | 'red' | 'gray'
