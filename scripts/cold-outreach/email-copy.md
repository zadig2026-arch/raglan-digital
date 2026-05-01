# Email copy — source de vérité

Ces templates sont la source de vérité. `Templates.gs` réplique **exactement** le contenu ci-dessous. Si tu changes un template, change les deux en même temps.

## Règles de style (toutes variantes)

- **Sous ~110 mots** corps (hors signature)
- **Première personne**, pas de "nous", pas de corporate-speak
- **Mentionne le `specific_hook`** dans les 2 premières lignes
- **Lien vers `preview_url`** si fourni, sinon lien vers `/launch`
- **Un seul CTA** : "reply yes" ou "click the link"
- **Signature UEM Act 2007 compliant** en bas (identification + unsubscribe)
- **Anglais NZ-friendly** : pas de "y'all", pas de "super stoked", ton Zadig normal

## Variantes cold (premier contact)

### Variante A — Direct insight-led

**Subject** : `Your {business} website has a problem`
OU `Quick fix for {business}` (alterner aléatoirement à l'envoi)

```
Hi {contact_name},

Zadig here — I just started Raglan Digital and I'm building my first NZ client book.

Noticed something about {business}: {specific_hook}.

I put together a free mockup of a fixed version so you can see exactly what I mean:
→ {preview_url}

If you like it, I'll build and ship the real thing for $399 NZD — launch pricing for my first 5 paying clients in NZ. No payment until you're happy with the final site.

If not, no pressure. Just reply STOP and I won't contact you again.

Cheers,
Zadig
```

### Variante B — Question-led (no preview yet)

**Subject** : `Quick question about {business} on Google`

```
Hi {contact_name},

Zadig here, founder of Raglan Digital. New in NZ, building my first paying client book.

Quick question: when people google "{business} {city}", do they find your menu / prices / photos, or do they end up on Facebook / Instagram / nowhere?

I ask because I spotted {specific_hook}.

I'm building 5 launch-priced websites right now at $399 NZD — custom, mobile-first, yours forever. If you'd like, I can send a free mockup so you can see what yours could look like. No commitment, no payment until delivery.

Reply "mockup" if curious. Reply STOP to never hear from me again.

Cheers,
Zadig
```

### Variante C — Compliment-led

**Subject** : `Loved the {category} work at {business}`

```
Hi {contact_name},

Zadig here — I run Raglan Digital and I've been looking at {category}s around {city} for inspiration.

Your {business} caught my eye. Honestly good {category} work.

One thing though — {specific_hook}. That's hurting you more than you think, because Google and new customers see that before they see the good stuff.

I'm opening 5 launch-priced spots at $399 NZD for a custom website. First 5 paying NZ clients only. Here's what it could look like for you:
→ {preview_url}

Want to chat? Just reply. Not interested? Reply STOP.

Cheers,
Zadig
```

## Relances

### Relance 1 — J+4 après envoi initial (pas de réponse)

**Subject** : `Re: {original_subject}` (reply dans le thread)

```
Hi {contact_name},

Quick nudge in case the first one got buried.

Still 5 spots at $399 NZD. Still happy to send (or refine) a mockup for {business} — no payment until you love it.

If it's not a fit, no worries — reply STOP and I'll stop.

Zadig
```

### Relance 2 — J+7 après relance 1 (toujours pas de réponse)

**Subject** : `Re: {original_subject}` (reply dans le thread)

```
Hi {contact_name},

Last note, promise.

The $399 spots are filling — 2 left as of today. If you want one for {business}, this is the moment. Otherwise I won't chase again.

Reply "in" or STOP, either works.

Zadig
```

Après J+14 sans réponse → `status = dropped`, pas de relance additionnelle.

## Signature (commune à tous les emails)

```
—
Zadig · Raglan Digital
Home-based in Raglan, New Zealand
📱 020 4010 3409 · WhatsApp +33 7 52 03 22 13
🌐 raglandigital.com/launch

Don't want to hear from me again? Just reply STOP and I'll remove you.
This email is a one-time outreach under NZ's Unsolicited Electronic Messages Act 2007 — no automated mass-list, no bought data, just me picking businesses one by one.
```

## Variables injectées

| Variable | Source | Fallback |
|---|---|---|
| `{contact_name}` | Sheet col B | "there" |
| `{business}` | Sheet col A | required |
| `{city}` | Sheet col D | "your area" |
| `{category}` | Sheet col E | "small business" |
| `{specific_hook}` | Sheet col H | required — si vide, skip |
| `{preview_url}` | Sheet col I | si vide → `https://raglandigital.com/launch` |
| `{original_subject}` | stocké dans le thread Gmail | via `GmailThread.getFirstMessageSubject()` |
