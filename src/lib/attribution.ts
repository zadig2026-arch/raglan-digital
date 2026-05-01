export const ATTR_COOKIE = 'rd_attr';
export const ATTR_COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
type UtmKey = (typeof UTM_KEYS)[number];

export type Attribution = {
  utm: Partial<Record<UtmKey, string>>;
  referrer: string | null;
  landing: string | null;
  first_seen_at: string;
};

export function parseAttributionFromUrl(url: URL, referrer: string | null): Attribution | null {
  const utm: Partial<Record<UtmKey, string>> = {};
  let hasUtm = false;
  for (const key of UTM_KEYS) {
    const v = url.searchParams.get(key);
    if (v) {
      utm[key] = v.slice(0, 200);
      hasUtm = true;
    }
  }

  const externalReferrer = isExternalReferrer(referrer, url.hostname);

  if (!hasUtm && !externalReferrer) return null;

  return {
    utm,
    referrer: externalReferrer ? referrer : null,
    landing: `${url.pathname}${url.search}`.slice(0, 500),
    first_seen_at: new Date().toISOString(),
  };
}

function isExternalReferrer(referrer: string | null, currentHost: string): boolean {
  if (!referrer) return false;
  try {
    const refUrl = new URL(referrer);
    return refUrl.hostname !== currentHost;
  } catch {
    return false;
  }
}

export function serializeAttribution(attr: Attribution): string {
  return encodeURIComponent(JSON.stringify(attr));
}

export function parseAttributionCookie(value: string | undefined): Attribution | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(value));
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed as Attribution;
  } catch {
    return null;
  }
}
