# Update Trusted Clients Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Trusted Clients section with real data and simplified UI, removing testimonial and metric fields.

**Architecture:** 
1. Clean up unused assets.
2. Update the `INITIAL_CONTENT` in `App.js` with the new client list.
3. Simplify `src/components/TrustedClients.js` to only show names and logos.
4. Verify via build and commit changes.

**Tech Stack:** React, Tailwind CSS, Git.

---

### Task 1: Asset Cleanup

**Files:**
- Delete: `public/logos/epss.png`
- Delete: `public/logos/fkr.png`

- [ ] **Step 1: Delete files**

Run: `rm -f public/logos/epss.png public/logos/fkr.png`

---

### Task 2: Update Client Data in App.js

**Files:**
- Modify: `src/App.js` (Lines 680-714)

- [ ] **Step 1: Replace test clients with real clients**

```javascript
  "trustedClients": {
    "title": "Нам доверяют",
    "subtitle": "Компании, которые выбрали надёжную доставку",
    "items": [
      {
        "id": "client-1",
        "name": "АО «ЕПСС ЖКХ ВО»",
        "logoUrl": "",
        "url": "epss-vrn.ru",
        "isVisible": true
      },
      {
        "id": "client-2",
        "name": "Фонд капитального ремонта МКД Воронежской области",
        "logoUrl": "",
        "url": "fkr36.ru",
        "isVisible": true
      },
      {
        "id": "client-3",
        "name": "Филиал АО «РИР Энерго» — «Воронежская генерация»",
        "logoUrl": "/logos/rir-energo.png",
        "url": "voronezh.rirenergy.ru",
        "isVisible": true
      },
      {
        "id": "client-4",
        "name": "ООО «РВК-Воронеж»",
        "logoUrl": "",
        "url": "voronezh.rosvodokanal.ru",
        "isVisible": true
      }
    ]
  }
```

---

### Task 3: Simplify TrustedClients Component

**Files:**
- Modify: `src/components/TrustedClients.js`

- [ ] **Step 1: Remove category, volume, experience, and testimonials from ClientCard**

Remove lines related to `category`, `contractSince`, `deliveryVolume`, and `hasTestimonial`.

- [ ] **Step 2: Remove Volume counter from TrustedClients header**

Remove the `totalVolume` calculation and the corresponding UI block.

---

### Task 4: Build and Release

**Files:**
- CLI operations

- [ ] **Step 1: Run production build**

Run: `npm run build`

- [ ] **Step 2: Commit and Merge**

```bash
git add -A
git commit -m "fix: real clients data, remove fake fields"
git checkout main
git merge feature/trusted-clients
git push origin main
```
