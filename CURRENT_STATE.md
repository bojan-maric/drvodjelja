# 🪵 DRVODJELJA - Current State

## ✅ Završene faze
- [x] **Faza 1: Kostur** - Ovaj chat
- [ ] Faza 2: Javne stranice
- [ ] Faza 3: Galerija
- [ ] Faza 4: Admin CMS
- [ ] Faza 5: Polish + Deploy

---

## 📂 Struktura projekta

```
drvodjelja/
├── package.json
├── next.config.js
├── tailwind.config.ts          # Drvo paleta boja
├── tsconfig.json
├── postcss.config.js
├── .env.example
├── .gitignore
│
├── prisma/
│   ├── schema.prisma           # AdminUser, Project, ProjectImage, Service, Inquiry, SiteSetting
│   └── seed.ts                 # Admin user + 6 demo usluga
│
├── public/
│   ├── images/.gitkeep
│   └── uploads/.gitkeep
│
└── src/
    ├── app/
    │   ├── layout.tsx          # Root layout s Header/Footer
    │   ├── page.tsx            # Homepage placeholder
    │   ├── globals.css
    │   │
    │   ├── admin/
    │   │   ├── layout.tsx      # Admin layout sa sidebar-om
    │   │   ├── page.tsx        # Dashboard
    │   │   └── login/
    │   │       └── page.tsx    # Login stranica
    │   │
    │   └── api/
    │       └── auth/
    │           └── [...nextauth]/
    │               └── route.ts
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx      # Placeholder
    │   │   └── Footer.tsx      # Placeholder
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

### Fontovi
- **Naslovi:** font-serif (Georgia, Playfair Display)
- **Tekst:** font-sans (Inter)

---

## 🗄️ Database modeli

| Model | Opis |
|-------|------|
| AdminUser | Admin korisnici za CMS |
| Project | Projekti/radovi u galeriji |
| ProjectImage | Slike projekata |
| Service | Usluge (kuhinje, vrata, itd.) |
| Inquiry | Upiti s kontakt forme |
| SiteSetting | Key-value postavke stranice |

---

## 🔐 Admin pristup

| Email | Password |
|-------|----------|
| admin@drvodjelja.hr | Drvodjelja2024! |

⚠️ **PROMIJENI LOZINKU NAKON PRVOG LOGINA!**

---

## 🔧 Sljedeća faza (Faza 2)

### Cilj: Javne stranice

**Novi fileovi:**
- `src/components/sections/Hero.tsx`
- `src/components/sections/About.tsx`
- `src/components/sections/Services.tsx`
- `src/components/sections/Contact.tsx`
- `src/app/page.tsx` (update s pravim sekcijama)
- `src/app/api/contact/route.ts`

**Zadaci:**
1. Hero sekcija s placeholder slikom
2. O nama sekcija s tekstom
3. Usluge grid (kartice s ikonama)
4. Kontakt forma koja sprema u Inquiry
5. Pravi Header i Footer

---

## ⚠️ Napomene

- Projekt koristi **MySQL** bazu (Prisma)
- **Nema i18n** - samo hrvatski jezik
- Pattern fileovi kopirani iz **Olea Malinska** projekta
- Admin sidebar ima linkove za buduće stranice (projects, services, inquiries, settings) - još nisu implementirane

---

## 📝 Odluke donesene

1. Boja paleta: drvo tonovi iz loga (#8B5A2B, #D4A574, #5C4033)
2. Kategorije projekata: kuhinje, vrata, namjestaj, stepenice, ostalo
3. Status upita: new, replied, archived
4. Font kombinacija: Georgia za naslove, Inter za tekst
