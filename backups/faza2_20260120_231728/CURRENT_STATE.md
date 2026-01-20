# 🪵 DRVODJELJA - Current State

## ✅ Završene faze
- [x] **Faza 1: Kostur** - Chat 1
- [x] **Faza 1.5: Slike + Logo** - Chat 1 (nastavak)
- [ ] Faza 2: Javne stranice (kontakt forma, animacije)
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
│   ├── favicon.ico              ✅ NOVO
│   ├── apple-touch-icon.png     ✅ NOVO
│   ├── icon-192.png             ✅ NOVO
│   └── images/
│       ├── logo/
│       │   ├── logo.png         ✅ NOVO (za header)
│       │   └── logo-full.png    ✅ NOVO (puni logo)
│       ├── hero/
│       │   └── drvo_full.webp   ✅ NOVO
│       └── radovi/
│           ├── rad-1.jpg        ✅ NOVO
│           ├── rad-2.jpg
│           ├── ...
│           └── rad-14.jpg       (14 slika radova)
│
└── src/
    ├── app/
    │   ├── layout.tsx          ✅ AŽURIRANO (favicon)
    │   ├── page.tsx            ✅ AŽURIRANO (hero, galerija)
    │   ├── globals.css
    │   │
    │   ├── admin/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   └── login/
    │   │       └── page.tsx
    │   │
    │   └── api/
    │       └── auth/
    │           └── [...nextauth]/
    │               └── route.ts
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx      ✅ AŽURIRANO (logo slika)
    │   │   └── Footer.tsx      ✅ AŽURIRANO (logo slika)
    │   ├── providers/
    │   │   └── AuthProvider.tsx
    │   └── index.ts
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

### Logo
- **Header:** `/images/logo/logo.png` (80px visine)
- **Puni:** `/images/logo/logo-full.png` (400px širine)
- **Favicon:** `/favicon.ico` (32x32)

---

## 🖼️ Slike

### Radovi (14 slika)
| Slika | Kategorija |
|-------|------------|
| rad-1.jpg | Kuhinja |
| rad-2.jpg | Kuhinja |
| rad-3.jpg | Kuhinja |
| rad-4.jpg | Kuhinja |
| rad-5.jpg | Kuhinja s pregradom |
| rad-6.jpg | Namještaj |
| rad-7.jpg | Kuhinja |
| rad-8.jpg | Stolarija |
| rad-9.jpg | Kuhinja |
| rad-10.jpg | Kuhinja |
| rad-11.jpg | Namještaj |
| rad-12.jpg | Ostalo |
| rad-13.jpg | Ostalo |
| rad-14.jpg | Ostalo |

---

## 🔐 Admin pristup

| Email | Password |
|-------|----------|
| admin@drvodjelja.hr | Drvodjelja2024! |

⚠️ **PROMIJENI LOZINKU NAKON PRVOG LOGINA!**

---

## 🔧 Sljedeća faza (Faza 2)

### Cilj: Kontakt forma + animacije

**Novi fileovi:**
- `src/app/api/contact/route.ts` - API za kontakt formu
- `src/components/sections/ContactForm.tsx` - Kontakt forma komponenta

**Zadaci:**
1. Kontakt forma koja sprema u Inquiry model
2. Framer Motion animacije na sekcijama
3. Scroll efekti na hero
4. Email notifikacija (Resend)

---

## ⚠️ Napomene

- **VL: Miljenko Bošnjak** - vlasnik Drvodjelje
- Sve slike su optimizirane za web (max 1200px, quality 85%)
- Hero slika je WebP format za bolju kompresiju
- Logo u footeru ima `brightness-0 invert` za bijelu verziju

---

## 📝 Odluke donesene

1. Logo se koristi kao slika, ne tekst
2. Hero sekcija koristi drvo_full.webp kao pozadinu
3. Galerija prikazuje 8 slika na homepage-u
4. Favicon je izveden iz loga (alati)
