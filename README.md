# KoinX - Tax Loss Harvesting Tool

A responsive React application for simulating tax loss harvesting on crypto holdings. Built as part of the KoinX Frontend Intern assignment.

## Features

- **Pre-Harvesting & After-Harvesting cards** — Compare capital gains before and after selecting holdings
- **Real-time updates** — After-harvesting view updates instantly when rows are selected/deselected
- **Holdings table** — Sortable list with checkboxes, select-all, and amount-to-sell column
- **Tax savings indicator** — Shows savings message when harvesting reduces realised capital gains
- **Mock APIs** — Simulated async API calls with loading and error states
- **View All** — Collapsible table showing top holdings by default
- **Mobile responsive** — Adapts layout for smaller screens

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Context for state management

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <your-repo-url>
cd koinx-tax-loss-harvesting
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Deployment

### Vercel (Recommended)

1. Push the repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — click Deploy

### Netlify

1. Push to GitHub
2. Connect repo on [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

## Project Structure

```
src/
├── api/              # Mock API layer
│   ├── mockData.ts   # Assignment dummy data
│   ├── capitalGainsApi.ts
│   └── holdingsApi.ts
├── components/       # UI components
├── context/          # React Context (state management)
├── types/            # TypeScript interfaces
└── utils/            # Formatters & business logic
```

## Business Logic

### Capital Gains Calculation

- **Net Short-Term Gains** = `stcg.profits - stcg.losses`
- **Net Long-Term Gains** = `ltcg.profits - ltcg.losses`
- **Realised Capital Gains** = Net STCG + Net LTCG

### After Harvesting

When a holding is selected:

- If `stcg.gain > 0` → add to short-term **profits**
- If `stcg.gain < 0` → add absolute value to short-term **losses**
- Same logic applies for long-term gains

### Tax Savings

Displayed only when:

```
Pre-harvesting realised gains > After-harvesting realised gains
```

Savings = difference between the two realised amounts.

## Assumptions

1. **Capital Gains API** represents currently realised gains (excluding unrealised holdings gains until selected).
2. **Selecting a holding** simulates selling that asset and realising its STCG/LTCG into the capital gains buckets.
3. **Holdings are sorted** by total absolute gain (descending) so the most impactful assets appear first.
4. **Duplicate coin symbols** (e.g. two USDC entries) are treated as separate holdings using unique IDs.
5. **Amount to Sell** shows `totalHolding` when the row is selected, otherwise displays "—".
6. **Currency** is displayed in INR (₹) as per the assignment examples.

## Live Demo

Deploy your instance and add the link here:

`https://your-deployment-url.vercel.app`

## License

MIT
