# 🪵 DRVODJELJA - README za Chat 2 (Faza 2)

> **PROČITAJ OVO PRVO!**
> Ovaj chat kreira JAVNE STRANICE - hero, o nama, usluge, kontakt.

---

## 📋 ŠTO JE NAPRAVLJENO (Faza 1)

✅ Next.js 14 projekt inicijaliziran
✅ Tailwind s drvo paletom boja
✅ Prisma schema (svi modeli)
✅ Seed file (admin + 6 usluga)
✅ Admin login funkcionira
✅ Admin dashboard placeholder
✅ Header/Footer placeholderi
✅ Homepage placeholder

---

## 🎯 CILJ OVOG CHATA (Faza 2)

Kreirati `drvodjelja-faza2.zip` + `deploy.sh` koji dodaje:

### Nove komponente:
```
src/components/sections/
├── Hero.tsx          # Hero s pozadinskom slikom
├── About.tsx         # O nama tekst + statistike
├── Services.tsx      # Grid usluga s ikonama
└── Contact.tsx       # Kontakt forma
```

### Nove API rute:
```
src/app/api/
└── contact/
    └── route.ts      # POST za slanje upita
```

### Update fileovi:
```
src/app/page.tsx      # Prave sekcije umjesto placeholder
src/components/layout/Header.tsx  # Finalni header
src/components/layout/Footer.tsx  # Finalni footer
src/components/index.ts           # Export novih komponenti
```

---

## 🎨 DIZAJN SPECIFIKACIJE

### Hero sekcija
- Full-height pozadinska slika (placeholder za sada)
- Overlay gradient
- Naslov: "Drvodjelja"
- Podnaslov: "30 godina sa vama"
- Tagline: "Tradicija. Kvaliteta. Povjerenje."
- 2 CTA buttona: "Pogledaj radove" + "Kontakt"

### O nama sekcija
- Tekst o Miljenku i 30 godina iskustva
- Statistike: 30+ godina, 500+ projekata, 100% zadovoljnih
- Možda slika majstora (placeholder)

### Usluge sekcija
- 6 kartica u gridu (3x2 na desktopu)
- Ikone iz lucide-react
- Podaci iz Service modela (seed)

### Kontakt sekcija
- Forma: ime, email, telefon (opcionalno), usluga (dropdown), poruka
- Kontakt info sa strane
- Forma sprema u Inquiry model

---

## 📦 OUTPUT FORMAT

```
drvodjelja-faza2.zip
├── deploy.sh
└── files/
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx
    │   │   └── api/
    │   │       └── contact/
    │   │           └── route.ts
    │   └── components/
    │       ├── sections/
    │       │   ├── Hero.tsx
    │       │   ├── About.tsx
    │       │   ├── Services.tsx
    │       │   └── Contact.tsx
    │       ├── layout/
    │       │   ├── Header.tsx
    │       │   └── Footer.tsx
    │       └── index.ts
    └── CURRENT_STATE.md
```

---

## 🔧 KORISNE INFORMACIJE

### Boje (koristi ove)
```
text-wood / bg-wood         # #8B5A2B
text-wood-light / bg-wood-light  # #D4A574
text-wood-dark / bg-wood-dark    # #5C4033
text-wood-darker            # #3D2B1F
bg-cream                    # #FDF8F3
```

### Ikone za usluge (lucide-react)
```typescript
import { ChefHat, DoorOpen, Armchair, Stairs, Hammer, Building2 } from 'lucide-react';
```

### Usluge iz seeda
| slug | name | icon |
|------|------|------|
| kuhinje | Kuhinje po mjeri | ChefHat |
| vrata | Vrata i prozori | DoorOpen |
| namjestaj | Namještaj po mjeri | Armchair |
| stepenice | Stepenice | Stairs |
| restauracija | Restauracija | Hammer |
| poslovni-prostori | Poslovni prostori | Building2 |

---

## ⚠️ PRAVILA

1. **Svaki file mora imati path komentar na vrhu**
2. **Koristi Tailwind klase iz config-a** (wood, cream, itd.)
3. **Hrvatski jezik** - svi tekstovi na hrvatskom
4. **Responsive** - mobile first
5. **Framer Motion** za animacije (već instaliran)

---

## 📚 POTREBNA DOKUMENTACIJA

Za ovaj chat trebaš:
1. Ovaj README_FOR_NEXT_CHAT.md
2. CURRENT_STATE.md (iz projekta)
3. DEVELOPMENT_PHASES.md (organizacija)
4. PROJEKTNI_PLAN.md (dizajn detalji)
