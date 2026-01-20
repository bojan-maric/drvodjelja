# 🪵 DRVODJELJA - Project Structure

> **MASTER DOKUMENT** - Ažurira se sa svakom fazom
> 
> Zadnje ažuriranje: **Faza 3 (Galerija)** - 20.01.2026.

---

## 📊 Pregled projekta

| Info | Vrijednost |
|------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Jezik** | TypeScript |
| **Styling** | Tailwind CSS |
| **Baza** | MySQL (Prisma ORM) |
| **Auth** | NextAuth.js |
| **Animacije** | Framer Motion |
| **Ikone** | Lucide React |

---

## 📁 Kompletna struktura

```
drvodjelja/
│
├── 📄 KONFIGURACIJA
├── package.json              # NPM dependencies
├── next.config.js            # Next.js config
├── tailwind.config.ts        # Tailwind + custom boje (wood paleta)
├── tsconfig.json             # TypeScript config
├── postcss.config.js         # PostCSS config
├── next-env.d.ts             # Next.js TypeScript declarations
├── .env                      # Environment variables (NE COMMITATI!)
├── .env.example              # Primjer env varijabli
├── .gitignore
│
├── 📄 DOKUMENTACIJA
├── CURRENT_STATE.md          # Trenutno stanje projekta
├── README_FOR_NEXT_CHAT.md   # Upute za sljedeći chat
├── DEVELOPMENT_PHASES.md     # Pregled svih faza
├── PROJECT_STRUCTURE.md      # OVAJ DOKUMENT
├── DRVODJELJA_PROJEKTNI_PLAN.md  # Originalni plan projekta
│
├── 📁 prisma/
│   ├── schema.prisma         # Database schema (svi modeli)
│   └── seed.ts               # Seed script za inicijalnu bazu
│
├── 📁 public/
│   ├── favicon.ico
│   ├── apple-touch-icon.png  # 180x180
│   ├── icon-192.png          # 192x192 za PWA
│   │
│   └── 📁 images/
│       ├── 📁 logo/
│       │   ├── logo.png          # Glavni logo
│       │   └── logo-full.png     # Logo s tekstom
│       │
│       ├── 📁 hero/
│       │   └── wood-bg.webp      # Hero pozadina (lamperija)
│       │
│       └── 📁 radovi/
│           ├── rad-1.jpg         # Kuhinja
│           ├── rad-2.jpg         # Kuhinja
│           ├── rad-3.jpg         # Kuhinja
│           ├── rad-4.jpg         # Kuhinja
│           ├── rad-5.jpg         # Kuhinja s pregradom
│           ├── rad-6.jpg         # Namještaj
│           ├── rad-7.jpg         # Kuhinja
│           ├── rad-8.jpg         # Stolarija
│           ├── rad-9.jpg         # Kuhinja
│           ├── rad-10.jpg        # Kuhinja
│           ├── rad-11.jpg        # Namještaj
│           ├── rad-12.jpg        # Ostalo
│           ├── rad-13.jpg        # Ostalo
│           └── rad-14.jpg        # Ostalo
│
└── 📁 src/
    │
    ├── 📁 app/                   # Next.js App Router
    │   ├── layout.tsx            # Root layout (Header + Footer)
    │   ├── page.tsx              # Homepage (Hero, O nama, Usluge, Radovi, Kontakt)
    │   ├── globals.css           # Global styles
    │   │
    │   ├── 📁 galerija/          # ✅ FAZA 3
    │   │   └── page.tsx          # Galerija stranica (filter + grid + lightbox)
    │   │
    │   ├── 📁 admin/
    │   │   ├── layout.tsx        # Admin layout (auth wrapper)
    │   │   ├── page.tsx          # Admin dashboard (placeholder)
    │   │   └── 📁 login/
    │   │       └── page.tsx      # Login stranica
    │   │
    │   └── 📁 api/
    │       ├── 📁 auth/
    │       │   └── 📁 [...nextauth]/
    │       │       └── route.ts  # NextAuth API route
    │       │
    │       └── 📁 contact/
    │           └── route.ts      # POST /api/contact → Inquiry model
    │
    ├── 📁 components/
    │   ├── index.ts              # Barrel exports za sve komponente
    │   │
    │   ├── 📁 layout/
    │   │   ├── Header.tsx        # ✅ FAZA 3: Full-screen mobile menu
    │   │   └── Footer.tsx        # Footer s kontakt info
    │   │
    │   ├── 📁 sections/
    │   │   └── ContactForm.tsx   # Kontakt forma s validacijom
    │   │
    │   ├── 📁 gallery/           # ✅ FAZA 3
    │   │   ├── index.ts          # Barrel exports
    │   │   ├── GalleryFilter.tsx # Filter pills s animacijom
    │   │   ├── GalleryGrid.tsx   # Responsive grid slika
    │   │   └── Lightbox.tsx      # Fullscreen pregled + keyboard nav
    │   │
    │   └── 📁 providers/
    │       └── AuthProvider.tsx  # NextAuth SessionProvider
    │
    ├── 📁 lib/
    │   ├── prisma.ts             # Prisma client singleton
    │   ├── auth.ts               # NextAuth config
    │   └── utils.ts              # Utility funkcije (cn, etc.)
    │
    └── 📁 types/
        ├── index.ts              # Shared TypeScript types
        └── next-auth.d.ts        # NextAuth type extensions
```

---

## 📋 Fileovi po fazama

### Faza 1: Kostur ✅
```
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── .env.example
├── prisma/schema.prisma
├── prisma/seed.ts
├── src/app/layout.tsx
├── src/app/page.tsx (basic)
├── src/app/globals.css
├── src/app/admin/layout.tsx
├── src/app/admin/page.tsx
├── src/app/admin/login/page.tsx
├── src/app/api/auth/[...nextauth]/route.ts
├── src/components/layout/Header.tsx (basic)
├── src/components/layout/Footer.tsx
├── src/components/providers/AuthProvider.tsx
├── src/components/index.ts
├── src/lib/prisma.ts
├── src/lib/auth.ts
├── src/lib/utils.ts
├── src/types/index.ts
└── src/types/next-auth.d.ts
```

### Faza 1.5: Slike + Logo ✅
```
├── public/favicon.ico
├── public/apple-touch-icon.png
├── public/icon-192.png
├── public/images/logo/logo.png
├── public/images/logo/logo-full.png
├── public/images/hero/wood-bg.webp
└── public/images/radovi/rad-1.jpg ... rad-14.jpg
```

### Faza 2: Javne stranice ✅
```
├── src/app/page.tsx (ažurirano - Hero, animacije)
├── src/app/api/contact/route.ts
├── src/components/sections/ContactForm.tsx
└── src/components/layout/Header.tsx (ažurirano - transparentan)
```

### Faza 3: Galerija ✅
```
├── src/app/galerija/page.tsx
├── src/components/gallery/index.ts
├── src/components/gallery/GalleryFilter.tsx
├── src/components/gallery/GalleryGrid.tsx
├── src/components/gallery/Lightbox.tsx
├── src/components/layout/Header.tsx (ažurirano - mobile menu)
└── src/components/index.ts (ažurirano - gallery exports)
```

### Faza 4: Admin CMS ⏳ (Sljedeća)
```
├── src/app/admin/page.tsx (dashboard)
├── src/app/admin/projekti/page.tsx
├── src/app/admin/projekti/novi/page.tsx
├── src/app/admin/projekti/[id]/page.tsx
├── src/app/admin/usluge/page.tsx
├── src/app/admin/upiti/page.tsx
├── src/app/admin/postavke/page.tsx
├── src/app/api/projects/route.ts
├── src/app/api/projects/[id]/route.ts
├── src/app/api/services/route.ts
├── src/app/api/inquiries/route.ts
├── src/app/api/upload/route.ts
├── src/components/admin/Sidebar.tsx
├── src/components/admin/DashboardStats.tsx
├── src/components/admin/ProjectForm.tsx
├── src/components/admin/InquiryList.tsx
└── src/components/admin/ImageUpload.tsx
```

### Faza 5: Polish + Deploy ⏳
```
├── Dockerfile
├── docker-compose.yml
├── Caddyfile
├── DEPLOYMENT.md
├── src/app/sitemap.ts
└── src/app/robots.ts
```

---

## 🎨 Dizajn sustav

### Boje (tailwind.config.ts)
```typescript
colors: {
  wood: {
    DEFAULT: '#8B5A2B',  // Primarna smeđa
    light: '#D4A574',    // Svijetlo drvo / hrast
    dark: '#5C4033',     // Tamno drvo / orah
    darker: '#3D2B1F',   // Tekst / najtamnija
  },
  cream: '#FDF8F3',      // Pozadina sekcija
}
```

### Korištenje
```jsx
// Tekst
<p className="text-wood">Primarna boja</p>
<p className="text-wood-darker">Tekst boja</p>

// Pozadine
<div className="bg-wood">...</div>
<section className="bg-cream">...</section>

// Hover
<button className="bg-wood hover:bg-wood-dark">...</button>
```

### Fontovi
- **Naslovi:** `font-serif` (Georgia, Playfair Display)
- **Tekst:** `font-sans` (Inter)

---

## 🔧 Ključne komponente

### Header.tsx
- Transparentan na vrhu (Hero)
- Bijeli na scroll
- Full-screen mobilni meni (Framer Motion)
- Navigacija: Početna, O nama, Usluge, Galerija, Radovi, Kontakt

### Galerija sustav
- **GalleryFilter** - Pills s layoutId animacijom
- **GalleryGrid** - 2/3/4 kolone, AnimatePresence
- **Lightbox** - Keyboard nav (← → Escape), counter

### Framer Motion variants (standardni)
```typescript
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};
```

---

## 🗄️ Database modeli (Prisma)

```prisma
model AdminUser     # Admin korisnici
model Project       # Projekti/radovi
model ProjectImage  # Slike projekata
model Service       # Usluge
model Inquiry       # Kontakt upiti
model SiteSetting   # Postavke stranice
```

---

## 🔐 Admin pristup

| Email | Password |
|-------|----------|
| admin@drvodjelja.hr | Drvodjelja2024! |

---

## 📝 Changelog

| Datum | Faza | Promjene |
|-------|------|----------|
| - | 1 | Inicijalni setup |
| - | 1.5 | Slike, logo, favicon |
| - | 2 | Hero, kontakt forma, animacije |
| 20.01.2026 | 3 | Galerija, lightbox, mobile menu |

---

## ⚠️ Napomene za buduće chatove

1. **UVIJEK pročitaj** PROJECT_STRUCTURE.md i CURRENT_STATE.md prije rada
2. **NE izmišljaj** fileove koji ne postoje u ovoj strukturi
3. **Ažuriraj** ovaj dokument na kraju svake faze
4. **Koristi** postojeće boje i Framer Motion variants
5. **Hrvatski jezik** za sve tekstove
