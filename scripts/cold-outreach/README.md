# Cold outreach system — Gmail + Apps Script + Sheets

100% gratuit. Lit une Google Sheet, envoie des emails personnalisés via `raglandigital@gmail.com`, détecte les réponses, relance automatiquement, respecte l'UEM Act 2007 NZ.

## Ce que fait le système

- **Batch send** : tu cliques un bouton dans la Sheet, il envoie jusqu'à 20 emails en 1 run à des prospects `status = pending`.
- **Relances automatiques** : un trigger quotidien détecte les `status = sent` sans réponse après 4 jours → `followup1`, après 7 jours → `followup2`, après 14 jours → `dropped`.
- **Détection des réponses** : scan quotidien Gmail. Si un prospect a répondu, `status = replied` + date + extrait. Tu gères ensuite à la main.
- **Unsubscribe** : si le prospect répond "STOP", "unsubscribe", "remove" → `unsubscribed = TRUE`, plus jamais contacté.
- **Conformité NZ UEM Act 2007** : chaque email inclut identification expéditeur + adresse physique + mécanisme opt-out.

## Pré-requis

1. Compte Gmail dédié `raglandigital@gmail.com` (séparé de `zadig2026@gmail.com`).
2. Un Google Drive sur ce compte.
3. Quota Gmail gratuit = 500 emails/jour (largement suffisant).

## Setup (30 min, une fois)

### 1. Créer la Google Sheet

1. Connecte-toi à `raglandigital@gmail.com` sur Google.
2. Va sur [sheets.new](https://sheets.new) → renomme en **"Raglan Digital — Cold Outreach"**.
3. Crée une feuille `prospects` avec les colonnes définies dans [`sheet-schema.md`](./sheet-schema.md) (copie la ligne d'en-têtes telle quelle).
4. Crée une 2ᵉ feuille `log` avec : `timestamp | action | email | status | notes`.

### 2. Ouvrir l'éditeur Apps Script

1. Dans la Sheet, menu **Extensions → Apps Script**.
2. Le fichier `Code.gs` s'ouvre. Supprime tout son contenu.
3. Copie-colle le contenu complet de [`Code.gs`](./Code.gs) de ce repo.
4. Clique sur le **+** à côté de "Files" → **Script** → nomme-le `Templates` → copie-colle [`Templates.gs`](./Templates.gs).
5. **Sauvegarde** (⌘S / Ctrl+S). Donne un nom au projet : "Raglan Digital Outreach".

### 3. Autoriser les permissions

1. Dans l'éditeur, sélectionne la fonction `onOpen` dans le dropdown du haut.
2. Clique ▶️ Run. Google va demander des permissions — **autorise-les toutes** :
   - Gmail (envoyer + lire pour détecter les réponses)
   - Sheets (lire/écrire la Sheet)
   - Script (créer des triggers)
3. Si Google flag "App non vérifiée", clique "Advanced → Go to Raglan Digital Outreach (unsafe)". C'est ton propre code, c'est normal.

### 4. Configurer les triggers

Dans Apps Script, icône ⏰ (Triggers) à gauche :

| Fonction | Event | Fréquence |
|---|---|---|
| `sendFollowUps` | Time-driven | Jour, entre 9h-10h NZST |
| `detectReplies` | Time-driven | Jour, toutes les 2h, entre 8h-20h NZST |

`sendBatch` reste manuel (tu le déclenches depuis le menu de la Sheet).

### 5. Recharger la Sheet

1. Retourne à ta Sheet → **Refresh** (⌘R).
2. Un nouveau menu **"Cold Outreach"** apparaît dans la barre.
3. Options : `▶ Send batch (20 max)`, `🔎 Check for replies`, `📅 Run follow-ups`, `📊 Show stats`.

### 6. Tester avec 1 prospect

1. Ajoute UNE ligne dans `prospects` avec **ton propre email personnel** comme destinataire, `status = pending`, `template_variant = A`, un `specific_hook` court.
2. Menu Cold Outreach → **Send batch (20 max)** → confirme.
3. Vérifie ta boîte perso dans 30s. Réponds. Attends 2h.
4. Menu → **Check for replies**. Le `status` doit passer à `replied`.

Si tout marche, go.

## Workflow hebdomadaire (2-3h)

1. **Prospection** (1h) : ouvre `PROSPECTS.md` / `PROSPECTS-v2.md` + Google Maps + directories. Cible strict : no-site / broken-site. Ajoute 20-40 lignes dans la Sheet avec `status = pending` et un `specific_hook` perso pour chacun.
2. **Qualification express** (30 min) : pour chaque ligne, ouvre l'URL `existing_site` (si fournie) — si elle marche et n'est pas moche, passe `site_status = ok` → ne sera pas contacté.
3. **Send batch** (5 min) : menu → "Send batch" → 20 emails partent.
4. **Relances** : automatiques, rien à faire.
5. **Réponses** : quand `status = replied`, ouvre le thread Gmail, passe à WhatsApp / Calendly manuellement. Mets `status = meeting` puis `signed` dans la Sheet.

## Limites & garde-fous

- **Max 20/jour** via le bouton (modifiable dans `Code.gs` → `BATCH_SIZE`). Gmail autorise 500/jour mais on ramp slow pour pas déclencher de filtres anti-spam.
- **Pause 30s entre chaque envoi** (anti-spam detection).
- **Skip auto si** `unsubscribed = TRUE`, `status != pending` pour le batch, `site_status IN [ok, unknown]`.
- **Jamais de pixel tracking invisible** — c'est dans la zone grise de UEM Act. Si tu veux tracker les ouvertures, ajoute un lien UTM cliquable dans l'email.
- **Domaine expéditeur** : `raglandigital@gmail.com` = envoi via infra Gmail, réputation saine. Si tu passes à volume >100/jour, setup SPF/DKIM sur un domaine custom (`zadig@raglandigital.com` via Cloudflare Email Routing + workspace).

## Troubleshooting

- **"Exception: Service Gmail: Too many recipients"** → Tu as dépassé 500/jour. Patiente 24h.
- **Emails arrivent en spam** → Warm-up manuel : envoie-toi 10 emails depuis ta Sheet, marque-les "not spam", ajoute `raglandigital@gmail.com` aux contacts. Puis demande à 5 amis de t'envoyer un email auquel tu réponds.
- **Le bouton n'apparaît pas** → Vérifie que `onOpen()` est dans `Code.gs` et refresh la Sheet.
- **Apps Script se plaint de quotas** → Quota scripts = 6 min/run. Baisse `BATCH_SIZE` si tu vois `Exception: Exceeded maximum execution time`.

## Fichiers

- `Code.gs` — orchestration (sendBatch, sendFollowUps, detectReplies, onOpen menu)
- `Templates.gs` — 3 variantes cold + 2 relances + signature UEM-compliant
- `sheet-schema.md` — colonnes de la Google Sheet
- `email-copy.md` — templates en markdown (source de vérité, source de Templates.gs)
