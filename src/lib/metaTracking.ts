/**
 * Meta (Facebook) advertising attribution helper — evasion-3 landing page.
 *
 * Zero dependencies, browser-only, and deliberately fail-soft: every function
 * returns empty strings rather than throwing, so a missing pixel, a blocked
 * cookie jar or Safari private mode can never break the lead form.
 *
 * Lifecycle:
 *   1. captureAttribution() runs on mount and persists the ad click params in
 *      sessionStorage, because the visitor may land on `?fbclid=...` and then
 *      navigate before submitting the form.
 *   2. getAttribution(country) runs at submit time and returns the flat,
 *      string-only object that is merged into the Google Sheets payload.
 */

/** sessionStorage key holding the first-touch attribution of this session. */
const STORAGE_KEY = 'dc_meta_attribution';

/** Meta Conversions API event name for a form submission. */
const EVENT_NAME = 'Lead';

/** The attribution params we persist across in-session navigation. */
interface StoredAttribution {
  fbclid: string;
  fbc: string;
  utm_source: string;
  utm_campaign: string;
  utm_medium: string;
  utm_content: string;
  utm_term: string;
}

/** The exact 8 fields appended to the Google Sheet, all as strings. */
export interface MetaAttribution {
  fbclid: string;
  fbp: string;
  utm_source: string;
  utm_campaign: string;
  country: string;
  event_time: string;
  event_name: string;
  event_id: string;
}

const EMPTY_STORED: StoredAttribution = {
  fbclid: '',
  fbc: '',
  utm_source: '',
  utm_campaign: '',
  utm_medium: '',
  utm_content: '',
  utm_term: '',
};

/** True only in a real browser; guards every window/document/storage access. */
const isBrowser = (): boolean => typeof window !== 'undefined' && typeof document !== 'undefined';

/** Reads a cookie by name. Returns '' when absent, unreadable or SSR. */
function readCookie(name: string): string {
  if (!isBrowser()) return '';

  try {
    const cookies = document.cookie ? document.cookie.split(';') : [];
    const prefix = `${name}=`;

    for (const cookie of cookies) {
      const entry = cookie.trim();
      if (entry.indexOf(prefix) === 0) {
        return decodeURIComponent(entry.substring(prefix.length));
      }
    }
  } catch {
    // Some embedded webviews throw on document.cookie access.
  }

  return '';
}

/** Reads the persisted first-touch attribution. Never throws. */
function readStored(): StoredAttribution {
  if (!isBrowser()) return { ...EMPTY_STORED };

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_STORED };

    const parsed = JSON.parse(raw) as Partial<StoredAttribution> | null;
    if (!parsed || typeof parsed !== 'object') return { ...EMPTY_STORED };

    return {
      fbclid: toStringValue(parsed.fbclid),
      fbc: toStringValue(parsed.fbc),
      utm_source: toStringValue(parsed.utm_source),
      utm_campaign: toStringValue(parsed.utm_campaign),
      utm_medium: toStringValue(parsed.utm_medium),
      utm_content: toStringValue(parsed.utm_content),
      utm_term: toStringValue(parsed.utm_term),
    };
  } catch {
    // Safari private mode throws on sessionStorage; corrupt JSON lands here too.
    return { ...EMPTY_STORED };
  }
}

/** Persists the attribution. Silently gives up when storage is unavailable. */
function writeStored(value: StoredAttribution): void {
  if (!isBrowser()) return;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Quota or private-mode error: attribution degrades to URL-only, form still works.
  }
}

/** Coerces anything to a trimmed string. */
function toStringValue(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/** Reads one query param. Returns '' when absent. */
function readParam(params: URLSearchParams, name: string): string {
  try {
    return toStringValue(params.get(name));
  } catch {
    return '';
  }
}

/**
 * Reads the attribution params straight off the current URL. Used both by the
 * capture pass and, at submit time, as the fallback when sessionStorage is
 * unavailable (private mode) but the ad params are still in the address bar.
 */
function readUrlAttribution(): Omit<StoredAttribution, 'fbc'> {
  if (!isBrowser()) return { ...EMPTY_STORED };

  try {
    const params = new URLSearchParams(window.location.search);

    return {
      fbclid: readParam(params, 'fbclid'),
      utm_source: readParam(params, 'utm_source'),
      utm_campaign: readParam(params, 'utm_campaign'),
      utm_medium: readParam(params, 'utm_medium'),
      utm_content: readParam(params, 'utm_content'),
      utm_term: readParam(params, 'utm_term'),
    };
  } catch {
    return { ...EMPTY_STORED };
  }
}

/**
 * Captures the ad attribution from the current URL and persists it for the rest
 * of the session, so navigating away from the landing URL does not lose the
 * click id. Idempotent — safe to call from several components.
 *
 * A touch is stored as a whole, never field by field. Merging per field lets a
 * Meta fbclid from one visit sit next to a Google utm_source from another, and
 * the resulting row claims the same lead for two channels. Only a URL carrying
 * at least one attribution param counts as a touch; a param-free page view
 * leaves the stored touch untouched.
 *
 * The latest touch wins, matching Meta's last-click model and the Pixel, which
 * overwrites its own _fbc cookie on every new click.
 */
export function captureAttribution(): void {
  if (!isBrowser()) return;

  try {
    const url = readUrlAttribution();

    const isTouch = Boolean(
      url.fbclid ||
        url.utm_source ||
        url.utm_campaign ||
        url.utm_medium ||
        url.utm_content ||
        url.utm_term
    );
    if (!isTouch) return;

    writeStored({
      fbclid: url.fbclid,
      fbc: synthesizeFbc(url.fbclid),
      utm_source: url.utm_source,
      utm_campaign: url.utm_campaign,
      utm_medium: url.utm_medium,
      utm_content: url.utm_content,
      utm_term: url.utm_term,
    });
  } catch {
    // Never let tracking break the page.
  }
}

/** Meta's documented fbc shape: `fb.<subdomainIndex>.<creationTime>.<fbclid>`. */
function synthesizeFbc(fbclid: string): string {
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : '';
}

/**
 * Generates the deduplication id shared by the browser Pixel and the
 * server-side Conversions API. Unique per submission.
 */
export function generateEventId(): string {
  try {
    if (typeof crypto !== 'undefined') {
      const webCrypto = crypto as Crypto & { randomUUID?: () => string };
      if (typeof webCrypto.randomUUID === 'function') {
        return webCrypto.randomUUID();
      }
    }
  } catch {
    // Non-secure contexts can throw on crypto access.
  }

  // Fallback for older browsers: timestamp + random, collision risk negligible.
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

/**
 * Meta's `fbc` value: the live `_fbc` cookie when the pixel set one, otherwise
 * the value synthesized at first touch from `fbclid` (`fb.1.<unix_ms>.<fbclid>`).
 *
 * NOT part of the 8 contracted sheet columns — exported for a future
 * Conversions API integration, which needs it for match quality.
 */
export function getFbc(): string {
  const cookie = readCookie('_fbc');
  if (cookie) return cookie;

  // Stored latest-touch value, else synthesize from an fbclid still in the URL.
  return readStored().fbc || synthesizeFbc(readUrlAttribution().fbclid);
}

/**
 * Returns the 8 attribution fields for the submit payload, all as strings and
 * all safe to be ''. `country` is the ISO code chosen by the caller (derived
 * from the phone country selector), not geolocated here.
 */
export function getAttribution(country: string = ''): MetaAttribution {
  // Re-capture first: the visitor may have landed straight on the form with
  // ?fbclid=... and submitted before any other capture ran.
  captureAttribution();

  // Pick the touch as a block, never field by field, so one row can never mix
  // a click id from one channel with a utm_source from another. Storage holds
  // the latest touch; the live URL is the fallback for when storage is
  // unavailable, e.g. private mode, where the params may still be in the URL.
  const stored = readStored();
  const touch =
    stored.fbclid || stored.utm_source || stored.utm_campaign
      ? stored
      : readUrlAttribution();

  return {
    fbclid: touch.fbclid,
    fbp: readCookie('_fbp'),
    utm_source: touch.utm_source,
    utm_campaign: touch.utm_campaign,
    country: toStringValue(country),
    // Meta CAPI convention: Unix time in SECONDS.
    event_time: String(Math.floor(Date.now() / 1000)),
    event_name: EVENT_NAME,
    event_id: generateEventId(),
  };
}
