// Téléphone des formulaires (réservation, offrir) : pays proposés, indicatif, drapeau,
// forme du numéro national et exemple affiché dans le champ.
// `national` : chiffres composés après l'indicatif, sans le 0 (ou le 1 en Amérique du Nord)
// que l'on compose dans le pays. Règles vérifiées sur libphonenumber (Google) :
// les mobiles et les fixes de chaque pays passent, une longueur ou un début impossibles sont refusés.
// « other » : pays absent de la liste, le numéro est écrit en entier avec son indicatif (+41 …).
// Drapeaux : public/images/dc-thermes/flags, tirés de country-flag-icons (licence MIT, jointe).

export type CountryKey = 'MA' | 'FR' | 'ES' | 'US' | 'CA' | 'GB' | 'DE' | 'IT' | 'BE' | 'NL' | 'SA' | 'AE' | 'other'

type Rule = { dial: string; national: RegExp; trunk?: string; example: string }

export const phoneRules: Record<CountryKey, Rule> = {
  MA: { dial: '+212', national: /^[5-8]\d{8}$/, trunk: '0', example: '6 12 34 56 78' },
  FR: { dial: '+33', national: /^[1-9]\d{8}$/, trunk: '0', example: '6 12 34 56 78' },
  ES: { dial: '+34', national: /^[5-9]\d{8}$/, example: '612 34 56 78' },
  US: { dial: '+1', national: /^[2-9]\d{2}[2-9]\d{6}$/, trunk: '1', example: '201 555 0123' },
  CA: { dial: '+1', national: /^[2-9]\d{2}[2-9]\d{6}$/, trunk: '1', example: '506 234 5678' },
  GB: { dial: '+44', national: /^(7\d{9}|[1-35689]\d{8,9})$/, trunk: '0', example: '7400 123456' },
  // Allemagne : les fixes vont de 5 à 15 chiffres selon la ville
  DE: { dial: '+49', national: /^(1[5-7]\d{8,9}|[2-9]\d{4,14})$/, trunk: '0', example: '1512 3456789' },
  // En Italie le 0 des fixes fait partie du numéro, même depuis l'étranger
  IT: { dial: '+39', national: /^(3\d{8,9}|43\d{8}|0\d{5,10})$/, example: '312 345 6789' },
  BE: { dial: '+32', national: /^(4\d{8}|[1-9]\d{7})$/, trunk: '0', example: '470 12 34 56' },
  NL: { dial: '+31', national: /^(970\d{8}|[1-9]\d{8})$/, trunk: '0', example: '6 12345678' },
  SA: { dial: '+966', national: /^[15]\d{8}$/, trunk: '0', example: '51 234 5678' },
  AE: { dial: '+971', national: /^(5\d{8}|[2-46-9]\d{7})$/, trunk: '0', example: '50 123 4567' },
  other: { dial: '', national: /^[1-9]\d{6,14}$/, example: '+41 79 123 45 67' },
}

export const flagSrc = (key: CountryKey) => `/images/dc-thermes/flags/${key.toLowerCase()}.svg`

// Les espaces, points, tirets et parenthèses sont permis ; 00 vaut +
const compact = (raw: string) => raw.replace(/[\s.\-()/]/g, '').replace(/^00/, '+')

// Numéro au format international (« +212 612345678 », « +41791234567 »), ou null s'il ne convient pas au pays
export function phoneNumber(key: CountryKey, raw: string): string | null {
  const rule = phoneRules[key]
  let digits = compact(raw)
  if (!/^\+?\d+$/.test(digits)) return null
  if (key === 'other') return digits.startsWith('+') && rule.national.test(digits.slice(1)) ? digits : null
  if (digits.startsWith('+')) {
    if (!digits.startsWith(rule.dial)) return null
    digits = digits.slice(rule.dial.length)
  }
  if (rule.trunk && digits.startsWith(rule.trunk)) digits = digits.slice(1)
  return rule.national.test(digits) ? `${rule.dial} ${digits}` : null
}

// Pays dont l'indicatif est tapé ou collé en tête du numéro (+33 6 …), pour mettre la liste à jour.
// +1 garde les États-Unis ou le Canada s'il est déjà choisi.
export function countryFromNumber(raw: string, current: CountryKey): CountryKey | null {
  const digits = compact(raw)
  if (!digits.startsWith('+')) return null
  if (phoneRules[current].dial && digits.startsWith(phoneRules[current].dial)) return current
  const found = (Object.keys(phoneRules) as CountryKey[]).find((k) => phoneRules[k].dial && digits.startsWith(phoneRules[k].dial))
  return found || null
}
