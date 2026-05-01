# Google Sheet schema — `prospects` feuille

Première ligne = en-têtes. Copie-colle tel quel dans A1 (via "Paste values only" si formaté) :

```
business	contact_name	email	city	category	existing_site	site_status	specific_hook	preview_url	template_variant	status	contacted_at	last_action_at	reply_detected_at	reply_snippet	unsubscribed	notes
```

## Colonnes

| Col | Champ | Type | Obligatoire | Notes |
|---|---|---|---|---|
| A | `business` | text | ✓ | Nom officiel — utilisé pour `[business]` placeholder |
| B | `contact_name` | text | recommandé | Prénom. Utilisé dans le "Hi X,". Si vide → "Hi there," |
| C | `email` | email | ✓ | Destinataire. Validation basique : contient `@` |
| D | `city` | text |  | Raglan / Hamilton / Cambridge / Te Awamutu / Auckland / etc |
| E | `category` | text |  | cafe / florist / boutique / B&B / therapist / artisan |
| F | `existing_site` | url |  | URL du site actuel si existe, empty si pas de site |
| G | `site_status` | enum | ✓ | `none` · `broken` · `outdated` · `ok` · `unknown` |
| H | `specific_hook` | text | ✓ | Une ligne perso : `"Welome" typo on hero`, `parkhouse.co.nz offline`, `Shopify store returns 404` |
| I | `preview_url` | url |  | `https://raglandigital.com/preview/<slug>` si tu as fait un mockup |
| J | `template_variant` | enum | ✓ | `A` · `B` · `C` (A = direct insight-led, B = question-led, C = compliment-led) |
| K | `status` | enum | ✓ | `pending` · `sent` · `followup1` · `followup2` · `replied` · `meeting` · `signed` · `dropped` |
| L | `contacted_at` | datetime |  | Auto-rempli au premier envoi |
| M | `last_action_at` | datetime |  | Auto-rempli à chaque envoi (cold ou relance) |
| N | `reply_detected_at` | datetime |  | Auto-rempli quand `detectReplies` matche |
| O | `reply_snippet` | text |  | 200 premiers caractères de la réponse, copié par `detectReplies` |
| P | `unsubscribed` | bool |  | `TRUE` si le prospect a dit STOP. Bypassed par le sender |
| Q | `notes` | text |  | Free-text, pour toi |

## Règles de filtrage du sender

`sendBatch` envoie à une ligne si et seulement si :
- `email` valide (contient `@`)
- `status == "pending"`
- `unsubscribed != TRUE`
- `site_status` ∈ `{none, broken, outdated}` — **jamais `ok`, jamais `unknown`**
- `specific_hook` non vide (la règle d'or : pas de cold sans hook perso)
- `template_variant` ∈ `{A, B, C}`

Si tu ajoutes une ligne sans respecter ces règles, le script la skip silencieusement et log dans la feuille `log`.

## Data validation recommandée (Sheets)

Sélectionne les colonnes et menu **Data → Data validation** :
- `site_status` (G) : liste `none,broken,outdated,ok,unknown`
- `template_variant` (J) : liste `A,B,C`
- `status` (K) : liste `pending,sent,followup1,followup2,replied,meeting,signed,dropped`
- `unsubscribed` (P) : checkbox

## Exemples de lignes

```
Park House B&B	Jan	jan@parkhousebnb.example	Cambridge	B&B	parkhouse.co.nz	broken	parkhouse.co.nz is offline (SiteHost "website doesn't exist yet")	https://raglandigital.com/preview/park-house	A	pending
Harper Inc	Courtney	hello@harperinc.example	Hamilton	boutique	harperinc.co.nz	broken	Shopify store returns "This store is unavailable"	https://raglandigital.com/preview/harper-inc	A	pending
Dawn Til Dusk Café	(owner)	dawntildusk@example.com	Te Awamutu	cafe		none	No website at all — your "site" is a Facebook page so Google can't show your menu/hours	 	B	pending
```

## Feuille `log`

Seconde feuille, en-têtes en A1 :

```
timestamp	action	email	status	notes
```

Remplie automatiquement par le script à chaque `sendBatch`, `sendFollowUps`, `detectReplies`, et skip. Pour audit + debugging.
