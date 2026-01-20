# 🪵 DRVODJELJA - Current State

## ✅ Završene faze
- [x] **Faza 1: Kostur** - Chat 1
- [x] **Faza 1.5: Slike + Logo** - Chat 1 (nastavak)
- [x] **Faza 2: Javne stranice** - Chat 2
- [x] **Faza 3: Galerija** - Chat 3 ✅ NOVO
- [ ] Faza 4: Admin CMS
- [ ] Faza 5: Polish + Deploy

---

## 📂 Struktura projekta

```
drvodjelja/
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── .env.example
├── .gitignore
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   └── images/
│       ├── logo/
│       │   ├── logo.png
│       │   └── logo-full.png
│       ├── hero/
│       │   └── wood-bg.webp
│       └── radovi/
│           ├── rad-1.jpg ... rad-14.jpg
│
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── globals.css
    │   │
    │   ├── galerija/                 ✅ NOVO
    │   │   └── page.tsx              # Filter + Grid + Lightbox
    │   │
    │   ├── admin/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   └── login/
    │   │       └── page.tsx
    │   │
    │   └── api/
    │       ├── auth/
    │       │   └── [...nextauth]/
    │       │       └── route.ts
    │       └── contact/
    │           └── route.ts
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx            ✅ AŽURIRANO (full-screen mobile menu)
    │   │   └── Footer.tsx
    │   ├── sections/
    │   │   └── ContactForm.tsx
    │   ├── gallery/                  ✅ NOVO
    │   │   ├── index.ts
    │   │   ├── GalleryFilter.tsx     # Filter kategorija s animiranim pillom
    │   │   ├── GalleryGrid.tsx       # Responsive grid s hover efektima
    │   │   └── Lightbox.tsx          # Fullscreen pregled + navigacija
    │   ├── providers/
    │   │   └── AuthProvider.tsx
    │   └── index.ts                  ✅ AŽURIRANO
    │
    ├── lib/
    │   ├── prisma.ts
    │   ├── auth.ts
    │   └── utils.ts
    │
    └── types/
        ├── index.ts
        └── next-auth.d.ts
```

---

## 🎨 Dizajn sustav

### Boje (Tailwind)
```javascript
colors: {
  wood: {
    DEFAULT: '#8B5A2B',  // Primarna smeđa
    light: '#D4A574',    // Svijetlo drvo
    dark: '#5C4033',     // Tamno drvo
    darker: '#3D2B1F',   // Tekst
  },
  cream: '#FDF8F3',      // Pozadina
}
```

### Kategorije galerije
```typescript
const categories = [
  { value: 'sve', label: 'Sve' },
  { value: 'kuhinje', label: 'Kuhinje' },
  { value: 'vrata', label: 'Vrata i prozori' },
  { value: 'namjestaj', label: 'Namještaj' },
  { value: 'stepenice', label: 'Stepenice' },
  { value: 'ostalo', label: 'Ostalo' },
];
```

---

## 🔧 Faza 3 - Što je napravljeno

### ✅ Header - Full-screen mobile menu
- Full-screen overlay s gradientom (wood-darker → wood-dark)
- Framer Motion animacije (staggered fade-in)
- Elegantan close button (krug, ne ružan X)
- Body scroll lock kad je otvoren
- Dodan "Galerija" link u navigaciju

### ✅ Galerija stranica (/galerija)
- Hero sekcija s naslovom
- GalleryFilter - animirani pill koji prati aktivnu kategoriju
- GalleryGrid - responsive grid (2/3/4 kolone)
- Lightbox - fullscreen pregled s:
  - Keyboard navigacija (← → Escape)
  - Prev/Next buttoni
  - Image counter i kategorija
  - Smooth animacije
- CTA sekcija na dnu

### ✅ Framer Motion animacije
- Filter pill layoutId animacija
- Grid AnimatePresence za filter tranzicije
- Lightbox fade/scale animacije
- Mobile menu staggered reveal

---

## 🔐 Admin pristup

| Email | Password |
|-------|----------|
| admin@drvodjelja.hr | Drvodjelja2024! |

---

## 🔧 Sljedeća faza (Faza 4)

### Cilj: Admin CMS

**Novi fileovi:**
```
src/app/admin/
├── page.tsx              # Dashboard (statistike)
├── projekti/
│   ├── page.tsx          # Lista projekata
│   ├── novi/page.tsx     # Kreiranje projekta
│   └── [id]/page.tsx     # Editiranje projekta
├── usluge/page.tsx       # CRUD usluga
├── upiti/page.tsx        # Inbox upita
└── postavke/page.tsx     # Site settings

src/components/admin/
├── Sidebar.tsx
├── DashboardStats.tsx
├── ProjectForm.tsx
├── InquiryList.tsx
└── ImageUpload.tsx
```

**Zadaci:**
1. Dashboard sa statistikama (broj projekata, upita, etc.)
2. CRUD za Projekte (upload slika, kategorije)
3. CRUD za Usluge
4. Inbox za upite (status: new/replied/archived)
5. Postavke stranice (kontakt info, radno vrijeme)

---

## 📝 Odluke donesene u Fazi 3

1. Mobile menu je full-screen overlay (ne dropdown)
2. Filter koristi Framer Motion layoutId za smooth pill animaciju
3. Lightbox ima keyboard navigaciju (←→ Escape)
4. Kategorije galerije su hardkodirane (za sada), kasnije će dolaziti iz baze
5. Slike su trenutno statičke (/images/radovi/rad-X.jpg), Admin CMS će omogućiti upload
