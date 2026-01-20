# 🪵 DRVODJELJA - Current State

## ✅ Završene faze
- [x] **Faza 1: Kostur** - Chat 1
- [x] **Faza 1.5: Slike + Logo** - Chat 1 (nastavak)
- [x] **Faza 2: Javne stranice** - Chat 2 ✅ NOVO
- [ ] Faza 3: Galerija (filtriranje, lightbox)
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
│       │   ├── drvo_full.webp      (stari - ne koristi se)
│       │   └── wood-bg.webp        ✅ NOVO (tekstura drva)
│       └── radovi/
│           ├── rad-1.jpg
│           ├── ...
│           └── rad-14.jpg
│
└── src/
    ├── app/
    │   ├── layout.tsx              ✅ AŽURIRANO (bez pt-16)
    │   ├── page.tsx                ✅ AŽURIRANO (Framer Motion + ContactForm)
    │   ├── globals.css
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
    │           └── route.ts        ✅ NOVO
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx          ✅ AŽURIRANO (transparentan)
    │   │   └── Footer.tsx
    │   ├── sections/
    │   │   └── ContactForm.tsx     ✅ NOVO
    │   ├── providers/
    │   │   └── AuthProvider.tsx
    │   └── index.ts                ✅ AŽURIRANO
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

### Hero dizajn
- **Pozadina:** `wood-bg.webp` - tekstura drva (lamperija)
- **Overlay:** Gradient `from-black/40 via-black/30 to-black/50`
- **Sadržaj:** STOLARSKA RADIONICA → DRVODJELJA (veliki) → logo (bijeli) → 30 godina → CTA
- **Header:** Transparentan na vrhu, bijeli na scroll

---

## 🔧 Faza 2 - Što je napravljeno

### ✅ Hero redizajn
- Nova pozadinska slika (wood-bg.webp)
- Transparentan header s gradient pozadinom
- Framer Motion animacije na hero sadržaju
- Layout bez padding-top na main

### ✅ Kontakt forma
- Validacija (ime, email, poruka obavezni)
- Dropdown za tip usluge
- Loading/Success/Error states
- POST na /api/contact → sprema u Inquiry model

### ✅ Framer Motion animacije
- fadeInUp, fadeIn, scaleIn, staggerContainer variants
- whileInView animacije na svim sekcijama
- Staggered animacije na grid elementima

### ⏳ Nije implementirano (za kasnije)
- Email notifikacije (Resend/Nodemailer)

---

## 🔐 Admin pristup

| Email | Password |
|-------|----------|
| admin@drvodjelja.hr | Drvodjelja2024! |

---

## 🔧 Sljedeća faza (Faza 3)

### Cilj: Galerija stranica

**Novi fileovi:**
```
src/app/galerija/
├── page.tsx              # Grid svih radova s filterom
└── [slug]/page.tsx       # Pojedinačni projekt

src/components/gallery/
├── GalleryGrid.tsx
├── GalleryFilter.tsx
└── Lightbox.tsx
```

**Zadaci:**
1. /galerija stranica s filterom po kategorijama
2. Lightbox za pregled slika
3. Pojedinačna stranica projekta
4. Lazy loading slika

---

## 📝 Odluke donesene u Fazi 2

1. Hero koristi wood-bg.webp (lamperija tekstura) umjesto drvo_full.webp
2. Header je transparentan na vrhu s blagim gradientom
3. Kontakt forma sprema u Inquiry model (email notifikacije za kasnije)
4. Framer Motion koristi whileInView za scroll animacije
