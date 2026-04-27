# Geography SVG Rework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework 8 SVG visual variants for the Geography section to ensure high differentiation and theme adaptability (Dark/Light).

**Architecture:** Modularize SVG variants into functional components/helpers. Use Tailwind CSS and CSS variables for theme-aware styling. Enhance CMS integration for reliable previewing.

**Tech Stack:** React, SVG, Tailwind CSS, Lucide Icons.

---

### Task 1: Refactor ServiceArea.js for Modular Variants

**Files:**
- Modify: `src/components/ServiceArea.js`

- [ ] **Step 1: Define new variant components and helper**
Refactor the current `ServiceArea` to use a helper function or map for variants. Move SVG definitions into a separate object/function.

- [ ] **Step 2: Update mapVariant selection logic**
Ensure `isLight` prop is passed and used correctly in variant rendering.

- [ ] **Step 3: Commit refactoring**
```bash
git add src/components/ServiceArea.js
git commit -m "refactor: modularize Geography SVG variants"
```

### Task 2: Implement "Radar" and "Mesh" Variants

**Files:**
- Modify: `src/components/ServiceArea.js`

- [ ] **Step 1: Implement Radar variant**
Use a rotating `linear-gradient` mask and scanning beam effect.
- [ ] **Step 2: Implement Mesh variant**
Create a perspective-warped 3D grid using repeated SVG paths or a pattern with transformation.
- [ ] **Step 3: Verify visual output in browser**
- [ ] **Step 4: Commit**
```bash
git add src/components/ServiceArea.js
git commit -m "feat: implement Radar and Mesh geography variants"
```

### Task 3: Implement "Blueprint" and "Isometric" Variants

**Files:**
- Modify: `src/components/ServiceArea.js`

- [ ] **Step 1: Implement Blueprint variant**
Use thin dashed lines, drafting axes, and "blueprint" fill for the region shape.
- [ ] **Step 2: Implement Isometric variant**
Apply isometric transformation (skew/rotate) to the region nodes and add vertical "bar" indicators.
- [ ] **Step 3: Verify visual output**
- [ ] **Step 4: Commit**
```bash
git add src/components/ServiceArea.js
git commit -m "feat: implement Blueprint and Isometric geography variants"
```

### Task 4: Implement "Topology" and "Pulse" Variants

**Files:**
- Modify: `src/components/ServiceArea.js`

- [ ] **Step 1: Implement Topology variant**
Create multiple offset Bezier curves for the region shape to simulate contour lines.
- [ ] **Step 2: Implement Pulse variant**
Implement concentric expanding circles from the main Voronezh node.
- [ ] **Step 3: Verify visual output**
- [ ] **Step 4: Commit**
```bash
git add src/components/ServiceArea.js
git commit -m "feat: implement Topology and Pulse geography variants"
```

### Task 5: Implement "Heatmap" and "Digital" Variants

**Files:**
- Modify: `src/components/ServiceArea.js`

- [ ] **Step 1: Implement Heatmap variant**
Use soft radial gradients with `animate` tags or CSS animations on gradient stops.
- [ ] **Step 2: Implement Digital variant**
Create a hexagonal grid background and add small "pixel" flickers.
- [ ] **Step 3: Verify visual output**
- [ ] **Step 4: Commit**
```bash
git add src/components/ServiceArea.js
git commit -m "feat: implement Heatmap and Digital geography variants"
```

### Task 6: Theme Optimization & CMS Final Sync

**Files:**
- Modify: `src/components/ServiceArea.js`
- Modify: `vector_content_2026-04-24_UPDATED.json`

- [ ] **Step 1: Fine-tune Light Theme colors**
Ensure all variants use high-contrast strokes and subtle shadows in Light mode.
- [ ] **Step 2: Add mapVariant to default content**
Initialize `mapVariant` in the content JSON to a specific value for testing.
- [ ] **Step 3: Final verification of all 8 variants**
- [ ] **Step 4: Commit**
```bash
git add src/components/ServiceArea.js vector_content_2026-04-24_UPDATED.json
git commit -m "feat: final theme optimization and CMS sync for Geography"
```

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
