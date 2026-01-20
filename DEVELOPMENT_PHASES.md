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

## 🔄 Faza 2: Javne stranice
**Status:** SLJEDEĆA

**Planirano:**
- Kontakt forma (POST /api/contact → Inquiry model)
- Email notifikacije (Resend/Nodemailer)
- Framer Motion animacije na sekcijama
- Scroll efekti
- Smooth scroll navigacija

**Novi fileovi:**
```
src/
├── app/api/contact/route.ts
└── components/
    └── sections/
        └── ContactForm.tsx
```

---

## ⏳ Faza 3: Galerija
**Status:** ČEKA

**Planirano:**
- /galerija stranica
- Filtriranje po kategorijama (kuhinje, vrata, namještaj, stepenice, ostalo)
- Lightbox za slike
- Pojedinačna stranica projekta (/galerija/[slug])
- Lazy loading slika

**Novi fileovi:**
```
src/app/
├── galerija/
│   ├── page.tsx
│   └── [slug]/page.tsx
└── components/
    ├── gallery/
    │   ├── GalleryGrid.tsx
    │   ├── GalleryFilter.tsx
    │   └── Lightbox.tsx
```

---

## ⏳ Faza 4: Admin CMS
**Status:** ČEKA

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
| Faza 2 | 🔄 Sljedeća | 0% |
| Faza 3 | ⏳ Čeka | 0% |
| Faza 4 | ⏳ Čeka | 0% |
| Faza 5 | ⏳ Čeka | 0% |

**Ukupno: ~35% završeno**
