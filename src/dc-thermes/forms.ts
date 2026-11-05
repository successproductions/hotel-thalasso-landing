// Les éléments de formulaire partagés par le composeur (Planner), la réservation (Booking)
// et la page « Offrir » (Gift), en classes Tailwind.
// inGroup : l'élément est posé dans une carte blanche (bk__group) et prend alors le fond de page.
import { cx } from './ui'
// Chaque classe est écrite en entier : Tailwind ne lit pas les noms assemblés.

const hoverLine = 'hover:border-[rgb(38_40_43/0.4)]'
const ease = 'duration-300 ease-brand'

// Champ : libellé au-dessus, contrôle dessous
export const pf = 'grid gap-3 border-0 p-0 m-0 min-w-0'
// Deux champs côte à côte (une colonne en dessous de 600px)
export const pfRow = 'grid gap-gap grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-sm:grid-cols-[minmax(0,1fr)]'
export const pfLabel = 'p-0 text-[0.8125rem] tracking-[0.16em] uppercase text-muted'
// « facultatif » à côté d'un libellé
export const pfOptional = 'ml-[6px] not-italic normal-case tracking-[0] text-soft'

export const pfInput = ({ inGroup, area }: { inGroup?: boolean; area?: boolean } = {}) =>
  cx(
    'w-full border border-line rounded-[12px] text-ink font-sans font-normal text-[1rem] tracking-normal focus:outline-none focus:border-ink',
    area ? 'h-auto py-[14px] px-[18px] leading-[1.5] resize-y' : 'h-[60px] px-[18px] leading-[normal]',
    inGroup ? 'bg-page' : 'bg-white',
  )

// Cartes à choix unique (radio caché par-dessus toute la carte)
export const choice = (cols = 2) =>
  cx('grid gap-[10px]', cols === 3 ? 'grid-cols-[repeat(3,minmax(0,1fr))]' : 'grid-cols-[repeat(2,minmax(0,1fr))]', 'max-sm:grid-cols-[minmax(0,1fr)]')
export const choiceItem = ({ on, inGroup }: { on?: boolean; inGroup?: boolean } = {}) =>
  cx(
    'relative grid gap-1 py-[18px] px-5 border rounded-[12px] cursor-pointer transition-[border-color,box-shadow]',
    ease,
    on ? 'border-ink shadow-[inset_0_0_0_1px_var(--color-ink)]' : cx('border-line', hoverLine),
    inGroup && !on ? 'bg-page' : 'bg-white',
    'has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-ink has-[input:focus-visible]:outline-offset-2',
  )
export const hiddenInput = 'absolute inset-0 m-0 opacity-0 cursor-pointer'
export const choiceTitle = 'text-[1.125rem] font-normal'
export const choiceMeta = 'text-[0.875rem] text-muted'

// Compteur − / +
export const stepper = (inGroup?: boolean) =>
  cx('grid grid-cols-[60px_1fr_60px] h-[60px] border border-line rounded-[12px] overflow-hidden', inGroup ? 'bg-page' : 'bg-white')
export const stepperBtn = cx(
  'border-0 bg-none font-sans font-light text-[1.5rem] leading-none tracking-normal transition-[background-color]',
  ease,
  'enabled:hover:bg-page disabled:text-line disabled:cursor-default',
)
export const stepperOut = 'grid place-items-center font-normal'

// Option à cocher (case dessinée, coche en ::after)
export const addon = ({ on, inGroup }: { on?: boolean; inGroup?: boolean } = {}) =>
  cx(
    'relative flex gap-4 items-start p-5 border rounded-[12px] cursor-pointer transition-[border-color]',
    ease,
    on ? 'border-ink' : 'border-line',
    inGroup ? 'bg-page' : 'bg-white',
    'has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-ink has-[input:focus-visible]:outline-offset-2',
  )
export const addonBox = (on?: boolean) =>
  cx(
    'relative flex-none size-[22px] mt-[2px] border border-ink rounded-[6px] transition-[background-color]',
    ease,
    on &&
      "bg-ink after:content-[''] after:absolute after:left-[7px] after:top-[3px] after:w-[6px] after:h-[11px] after:border-solid after:border-white after:border-t-0 after:border-l-0 after:border-r-2 after:border-b-2 after:rotate-45",
  )
export const addonTitle = 'block font-normal'
export const addonMeta = 'block mt-[2px] text-[0.875rem] text-muted'

// Récapitulatif (ticket)
export const ticketTitle = 'font-sans font-normal text-[1.75rem] leading-[1.1] tracking-[0.08em] uppercase'
export const ticketSub = '-mt-3 text-[0.875rem] text-muted'
export const ticketRows = 'grid gap-[10px] pt-[18px] border-t border-line'
// Une ligne du ticket. money : montants (chiffres tabulaires) ; due : « à régler aujourd'hui »
export const ticketRow = ({ money, due }: { money?: boolean; due?: boolean } = {}) =>
  cx(
    'flex justify-between items-baseline gap-4 [&>dt]:text-[0.875rem] [&>dd]:text-right',
    due ? 'pt-2 [&>dt]:text-ink' : '[&>dt]:text-muted',
    due
      ? '[&>dd]:font-serif [&>dd]:italic [&>dd]:font-normal [&>dd]:text-[2rem] [&>dd]:leading-none'
      : '[&>dd]:text-[0.9375rem]',
    money ? '[&>dd]:whitespace-nowrap' : '[&>dd]:first-letter:uppercase',
    money && !due && '[&>dd]:tabular-nums',
  )
export const ticketRoom = 'text-[0.875rem] underline underline-offset-3'

// Pages réservation et cadeau
export const bkMain = cx(
  'max-w-[1240px] mx-auto pt-[clamp(40px,5vw,72px)] px-m pb-24 grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-y-6 gap-x-[clamp(32px,4vw,64px)] items-start max-lg:grid-cols-[minmax(0,1fr)]',
)
export const bkPage = 'min-h-screen bg-page'
export const bkHeader =
  'grid grid-cols-[1fr_auto_1fr] items-center gap-4 pt-[calc(env(safe-area-inset-top,0px)+18px)] px-m pb-[18px] border-b border-line bg-page max-sm:grid-cols-[auto_1fr_auto]'
export const bkBack = 'inline-flex items-center gap-[10px] w-fit text-[0.9375rem] no-underline max-sm:justify-self-end max-sm:text-[0.875rem]'
export const bkBackArrow = 'size-[7px]!'
export const bkLogoLink = 'max-sm:-order-1'
export const bkLogo = 'h-[46px] max-sm:h-[38px]'
// Icône WhatsApp de l'en-tête (WhatsAppHelp.tsx), aussi sur téléphone
export const bkHelp =
  'justify-self-end inline-flex items-center justify-center gap-[10px] min-h-11 text-[0.9375rem] no-underline hover:[&>span]:no-underline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-4 max-sm:min-h-10 max-sm:min-w-10'
export const bkIntro = 'col-[1] grid gap-[18px] max-lg:order-0'
export const bkIntroText = 'text-muted max-w-[52ch]'
export const bkSteps = 'flex flex-wrap gap-2 p-0 mt-2 mx-0 mb-0 list-none [counter-reset:step]'
export const bkStep = (on?: boolean) =>
  cx(
    "inline-flex items-center gap-2 py-2 pr-[14px] pl-2 rounded-full text-[0.875rem] [counter-increment:step] before:content-[counter(step)] before:grid before:place-items-center before:size-6 before:rounded-full before:bg-white before:text-[0.8125rem]",
    on ? 'bg-ink text-white before:text-ink' : 'bg-panel text-muted',
  )
export const bkForm = 'col-[1] grid gap-7 max-lg:order-2'
export const bkGroup = (gap = 'gap-[22px]') => cx('grid min-w-0 border-0 m-0 p-[clamp(22px,2.6vw,36px)] bg-white rounded-[18px]', gap)
export const bkLegend = 'float-left w-full p-0 mb-1 font-serif italic font-normal text-[1.75rem] leading-[1.1]'
export const tel = 'grid grid-cols-[minmax(0,150px)_minmax(0,1fr)] gap-[10px] max-sm:grid-cols-[minmax(0,120px)_minmax(0,1fr)]'
export const bkPay = 'min-h-[58px]! text-[1rem]! disabled:opacity-70 disabled:cursor-progress'
export const bkSecure = 'flex gap-[10px] items-start -mt-3 text-[0.8125rem] text-soft'
// Cadenas : le corps en fond, l'anse en ::before
export const lock =
  "relative flex-none w-3 h-[10px] mt-[6px] rounded-[2px] bg-soft before:content-[''] before:absolute before:left-[2px] before:-top-[6px] before:size-2 before:box-border before:border-[1.5px] before:border-b-0 before:border-soft before:rounded-t-[5px]"
export const bkSummary = (gift?: boolean) =>
  cx(
    'col-[2] row-[1/span_2] sticky top-6 rounded-[18px] max-lg:col-[1] max-lg:row-auto max-lg:static',
    gift ? 'grid gap-[14px] overflow-visible max-lg:contents' : 'overflow-hidden bg-white max-lg:order-1',
  )
export const bkCard = (gift?: boolean) => cx('grid gap-5 p-[clamp(24px,2.6vw,36px)]', gift && 'bg-white rounded-[18px] max-lg:order-3')
export const bkTrust = 'grid gap-2 pt-4 border-t border-line'
export const bkTrustItem =
  "relative pl-6 text-[0.875rem] text-muted before:content-[''] before:absolute before:left-[2px] before:top-[0.45em] before:w-[10px] before:h-[5px] before:border-l-[1.5px] before:border-b-[1.5px] before:border-current before:-rotate-45"

// Pastilles à bascule (occasion)
export const chip = (on?: boolean) =>
  cx(
    'h-[42px] px-[18px] border rounded-full font-sans font-normal text-[0.9375rem] leading-[normal] tracking-normal cursor-pointer transition-[background-color,border-color,color]',
    ease,
    on ? 'bg-ink border-ink text-white' : cx('bg-page border-line text-ink', hoverLine),
    'focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2',
  )
