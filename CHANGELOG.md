# VECTOR Changelog

## [2.1.0] - 2026-05-06

### 🔧 Fixed
- **CRITICAL**: TabContent.js data structure loss during CMS.js modularization
  - Fixed nested array references (trustedClients.items, services.list, etc.)
  - Restored all 22 CMS tabs with correct data structures
  - Error: TypeError "(...).map is not a function" - RESOLVED
  
- **DOM Property**: Fixed `fetchpriority` → `fetchPriority` in Shared.js
  - React requires camelCase for DOM attributes
  
- **Missing Imports**: Added Tooltip, Check, Upload imports to TabContent.js

### ✨ Features (Completed in Phase 2)
- Full CMS modularization: 22 tabs distributed across modular components
- All P0, P1, P2 priority tabs implemented and tested
- Draft-state pattern maintained across all tabs
- Import/Export JSON functionality preserved

### 📊 Quality Metrics
- **Build**: ✅ Success (308.74 kB gzipped)
- **Runtime Errors**: ✅ 0 errors
- **Lighthouse**: ✅ 82-100 scores (Accessibility, Best Practices, SEO)
- **Bundle**: ✅ Optimized with lazy-loaded chunks
- **Tests**: ✅ All smoke tests passed

### 📝 Testing Results
- **Tab Coverage**: 22/22 tabs functional ✅
- **Console**: Clean, no runtime errors ✅
- **Routes**: All critical routes working ✅
- **Performance**: Production-ready ✅

## [2.0.0] - 2026-04-29

### 🎉 Major Release
- Full CMS refactor with draft-state pattern
- Dynamic content via interpolate() utility
- CMS-first architecture
- Modular SVG visuals (Geography section)
- Industrial Tech aesthetic with CSS variables

---

**Latest Stable**: v2.1.0  
**Production Ready**: YES ✅
