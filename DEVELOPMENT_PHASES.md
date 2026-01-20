# 🪵 DRVODJELJA - Faze razvoja

## Pregled

Projekt je podijeljen u 5 faza. Svaka faza = jedan chat = jedan deliverable.

---

## ✅ Faza 1: Kostur projekta
**Status:** ZAVRŠENO

**Deliverables:**
- Next.js 14 projekt setup
- Prisma schema (Project, Service, Inquiry, SiteSetting)
- NextAuth.js autentifikacija
- Admin layout i login stranica
- Tailwind config s drvo paletom
- Osnovni Header/Footer placeholder

---

## ✅ Faza 1.5: Slike i logo
**Status:** ZAVRŠENO

**Deliverables:**
- Logo integracija (Header, Footer, Hero)
- Favicon (32x32, 180x180, 192x192)
- Hero pozadinska slika
- 14 optimiziranih slika radova
- Ažurirana homepage s galerijom
- Responsive Header s mobilnim menuom

---

## ✅ Faza 2: Javne stranice
**Status:** ZAVRŠENO

**Deliverables:**
- Kontakt forma (POST /api/contact → Inquiry model)
- Framer Motion animacije na sekcijama
- Scroll efekti
- Hero redizajn s wood-bg.webp
- Transparentan header

---

## ✅ Faza 3: Galerija
**Status:** ZAVRŠENO

**Deliverables:**
- /galerija stranica
- GalleryFilter - animirani pills po kategorijama
- GalleryGrid - responsive grid (2/3/4 kolone)
- Lightbox - fullscreen + keyboard navigacija (←→Esc)
- Header - full-screen mobile menu overlay
- Framer Motion AnimatePresence za filter tranzicije

**Kreirani fileovi:**
```
src/app/galerija/
└── page.tsx

src/components/gallery/
├── index.ts
├── GalleryFilter.tsx
├── GalleryGrid.tsx
└── Lightbox.tsx
```

---

## ⏳ Faza 4: Admin CMS
**Status:** SLJEDEĆA

**Planirano:**
- Dashboard sa statistikama
- CRUD za Projekte (upload slika, kategorije)
- CRUD za Usluge
- Inbox za upite (označavanje kao pročitano/odgovoreno)
- Postavke stranice

**Novi fileovi:**
```
src/app/admin/
├── projekti/
│   ├── page.tsx
│   ├── novi/page.tsx
│   └── [id]/page.tsx
├── usluge/page.tsx
├── upiti/page.tsx
└── postavke/page.tsx

src/components/admin/
├── Sidebar.tsx
├── DashboardStats.tsx
├── ProjectForm.tsx
├── InquiryList.tsx
└── ImageUpload.tsx
```

---

## ⏳ Faza 5: Polish + Deploy
**Status:** ČEKA

**Planirano:**
- SEO optimizacija (meta tags, OG slike)
- Sitemap.xml generacija
- robots.txt
- Performance optimizacija
- Docker setup
- Caddy reverse proxy config
- Hetzner deployment upute
- SSL certifikat (Let's Encrypt)

**Novi fileovi:**
```
├── Dockerfile
├── docker-compose.yml
├── Caddyfile
└── DEPLOYMENT.md
```

---

## 📊 Napredak

| Faza | Status | Postotak |
|------|--------|----------|
| Faza 1 | ✅ Završeno | 100% |
| Faza 1.5 | ✅ Završeno | 100% |
| Faza 2 | ✅ Završeno | 100% |
| Faza 3 | ✅ Završeno | 100% |
| Faza 4 | ⏳ Sljedeća | 0% |
| Faza 5 | ⏳ Čeka | 0% |

**Ukupno: ~65% završeno**
