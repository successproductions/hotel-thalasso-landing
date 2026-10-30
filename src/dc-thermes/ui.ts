// Les éléments partagés par plusieurs composants, en classes Tailwind.
// cx() assemble des classes en ignorant les valeurs vides : cx('a', on && 'b').
export const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ')

// Pastilles (boutons arrondis)
const pillBase =
  'inline-flex items-center justify-center gap-2 min-h-12 px-[26px] rounded-full border border-transparent font-sans text-[0.9375rem] leading-none tracking-[0.01em] no-underline cursor-pointer whitespace-nowrap select-none transition-[background-color,color,border-color,scale] duration-[400ms,400ms,400ms,200ms] ease-brand active:scale-[0.97]'
export const pillVariant = {
  dark: 'bg-ink text-white hover:bg-black',
  light: 'bg-white text-ink hover:bg-panel',
  outline: 'border-ink/30 text-ink hover:border-ink',
}
export const pill = (variant: keyof typeof pillVariant = 'dark', { small, block }: { small?: boolean; block?: boolean } = {}) =>
  cx(pillBase, pillVariant[variant], small && 'min-h-[38px] px-[18px] text-sm', block && 'w-full')

// Lien souligné, le trait se retire au survol
export const link =
  'w-fit pb-[3px] font-normal no-underline bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[position:0_100%] bg-[size:100%_1px] transition-[background-size] duration-500 ease-brand hover:bg-[size:0%_1px] hover:bg-[position:100%_100%]'

// Petite flèche en chevron (droite par défaut, gauche avec left)
export const arrow = (left?: boolean) =>
  cx('inline-block size-2 border-t-[1.5px] border-r-[1.5px] border-current transition-transform duration-[400ms] ease-brand', left ? '-rotate-[135deg]' : 'rotate-45')

// Logo : la hauteur se donne à chaque usage
export const logo = (light?: boolean) => cx('w-auto', light && '[filter:invert(1)_brightness(2)]')

// En-tête de section centré : titre, puis texte
export const blockHead =
  'max-w-[760px] mx-auto mb-[clamp(48px,6vw,80px)] grid justify-items-center gap-[22px] text-center max-md:mb-9 max-md:gap-4 [&_p]:text-muted [&_p]:max-w-[52ch]'
