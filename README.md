# Progetto Ingegneria del Software - Frontend

Frontend web del progetto, costruito con React + TypeScript + Vite e pronto al deploy su Cloudflare con Wrangler.

## Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4
- Axios
- Cloudflare Wrangler

## Prerequisiti

- Node.js 20 o superiore
- npm 10 o superiore

Verifica versioni:

```bash
node -v
npm -v
```

## Avvio rapido

1. Installa le dipendenze:

```bash
npm install
```

2. Crea il file ambiente locale:

```bash
cp .env.example .env
```

3. Avvia in sviluppo:

```bash
npm run dev
```

## Script disponibili

- `npm run dev`: avvia Vite in locale.
- `npm run build`: type-check (`tsc -b`) + build di produzione Vite.
- `npm run lint`: esegue ESLint su tutto il progetto.
- `npm run preview`: build e avvio locale via `wrangler dev`.
- `npm run deploy`: build e deploy su Cloudflare (`wrangler deploy`).

## Variabili di ambiente

Le seguenti variabili sono usate nel codice frontend.

- `VITE_API_BASE_URL` (obbligatoria): URL base del backend API.
- `VITE_GEOAPIFY_KEY` (obbligatoria per mappe/ricerca indirizzi): API key Geoapify.
- `VITE_ID_CLIENT_GOOGLE` (obbligatoria se usi Google login): client id OAuth Google.

Esempio `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_GEOAPIFY_KEY=your_geoapify_key
VITE_ID_CLIENT_GOOGLE=your_google_client_id
```

## Workflow consigliato per contributi

1. Crea branch feature/fix.
2. Sviluppa con `npm run dev`.
3. Prima della PR esegui:

```bash
npm run lint
npm run build
```

4. Apri la pull request con descrizione e screenshot (se UI).

## Deploy Cloudflare

Prerequisiti:

- account Cloudflare configurato
- CLI Wrangler autenticata

Login Wrangler (una tantum):

```bash
npx wrangler login
```

Deploy:

```bash
npm run deploy
```

Test locale in ambiente Wrangler:

```bash
npm run preview
```

## Troubleshooting

- Errore `npm start` non trovato:
  usa `npm run dev` (lo script `start` non e definito).
- Build fallisce su TypeScript:
  esegui `npm run build` e correggi gli errori mostrati da `tsc`.
- Errori lint:
  esegui `npm run lint` e correggi le regole ESLint.
- API non raggiungibile:
  controlla `VITE_API_BASE_URL` nel file `.env`.
- Mappa/geo suggerimenti non funzionano:
  verifica `VITE_GEOAPIFY_KEY`.
- Login Google non disponibile:
  verifica `VITE_ID_CLIENT_GOOGLE`.
- Deploy Wrangler fallisce per auth:
  riesegui `npx wrangler login`.

## Struttura progetto

- `src/`: codice sorgente applicazione.
- `public/`: asset statici pubblici.

## Autori

- [Ivan Erricis](mailto:i.erricis@studenti.unina.it)
- [Carla Capozzi](mailto:car.capozzi@studenti.unina.it)

## Licenza

Progetto rilasciato sotto licenza MIT. Vedi il file `LICENSE`.
