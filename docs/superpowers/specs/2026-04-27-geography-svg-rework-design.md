# Design Spec: Geography SVG Rework (VECTOR Project)

**Date:** 2026-04-27
**Status:** Validated
**Topic:** Reworking Geography section SVG variants for high-impact visual differentiation and theme adaptability.

## 1. Problem Statement
The current Geography section (ServiceArea) has subtle SVG variants that are hard to distinguish. Additionally, the visual elements do not adapt well to the light theme, maintaining a dark-mode aesthetic even when the rest of the site is light.

## 2. Goals
- Create 8 distinct, high-quality SVG visual variants.
- Ensure 100% adaptability to Dark and Light themes.
- Maintain performance with optimized SVG and CSS animations.
- Ensure full integration with the CMS draft state.

## 3. Aesthetic Direction: "Technological Precision"
The design will follow a high-end industrial/tech aesthetic, using sharp lines, precise grids, and purposeful motion.

### Theme Adaptability
- **Dark Mode**: High glow, semi-transparent overlays, neon accents (`blue-500`, `cyan-400`). Background: `slate-950/40`.
- **Light Mode**: Sharp strokes, subtle shadows, solid accent colors (`blue-600`, `indigo-500`). Background: `white/60` with soft borders.

## 4. Proposed Variants

| Variant | Visual Description | Key Animation |
|---------|--------------------|---------------|
| **Radar** | Circular scanner beam with fade tail. | Rotating `linear-gradient` mask. |
| **Mesh** | Perspective-warped 3D grid. | Subtle `translate` oscillation. |
| **Blueprint** | Technical drafting style with axes and labels. | Drawing effect on load (`stroke-dashoffset`). |
| **Isometric** | 3D projection of nodes and connections. | Pulse effect on vertical "activity" bars. |
| **Topology** | Fluid elevation curves. | Slow morphing of Bezier paths. |
| **Pulse** | Concentric ripples from Voronezh center. | `scale` and `opacity` ripples (ping). |
| **Heatmap** | Soft radial clusters of intensity. | Breathing effect on gradient stops. |
| **Digital** | Hexagonal honeycomb grid with glitch bits. | Randomized "data packet" flickers. |

## 5. Technical Architecture
- **Component Breakdown**: Move SVG logic into a helper map/function `getMapVisual(variant, isLight)`.
- **Styling**: Use Tailwind `dark:` utilities and CSS variables for core colors.
- **Data Flow**: Ensure `ServiceArea` re-renders when `mapVariant` or `randomMapVariant` changes in CMS.

## 6. Testing & Success Criteria
- Each of the 8 variants is visually unique and identifiable.
- Switching between Dark and Light mode maintains high legibility.
- No performance degradation on mobile devices.
- CMS "Random" mode correctly cycles through variants on reload.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
