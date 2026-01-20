# 🪵 DRVODJELJA - README za Chat 3 (Faza 3)

> **PROČITAJ OVO PRVO!**
> Ovaj chat kreira GALERIJU - stranica s filterom, lightbox, pojedinačni projekti.

---

## 📋 ŠTO JE NAPRAVLJENO (Faza 1 + 1.5 + 2)

### Faza 1 (Kostur)
✅ Next.js 14 projekt setup
✅ Prisma schema (svi modeli)
✅ NextAuth.js autentifikacija
✅ Admin layout i login stranica

### Faza 1.5 (Slike)
✅ Logo integracija
✅ Favicon
✅ 14 slika radova

### Faza 2 (Javne stranice)
✅ Hero redizajn - wood-bg.webp pozadina
✅ Transparentan header (gradient → bijeli na scroll)
✅ Kontakt forma s validacijom
✅ API ruta /api/contact → Inquiry model
✅ Framer Motion animacije na svim sekcijama
✅ Layout bez pt-16/pt-20

---

## 🎯 CILJ OVOG CHATA (Faza 3)

Kreirati galeriju s filterom i lightboxom.

### Novi fileovi:
```
src/app/galerija/
├── page.tsx              # Grid svih radova s filterom
└── [slug]/page.tsx       # Pojedinačni projekt (opcionalno)

src/components/gallery/
├── GalleryGrid.tsx       # Responsive grid slika
├── GalleryFilter.tsx     # Filter po kategorijama
└── Lightbox.tsx          # Fullscreen pregled slike
```

### Funkcionalnosti:
1. **Filter po kategorijama** - Sve, Kuhinje, Vrata, Namještaj, Stepenice, Ostalo
2. **Lightbox** - Klik na sliku otvara fullscreen s navigacijom
3. **Animacije** - Framer Motion na filter tranzicijama
4. **Responsive** - 2 col mobile, 3 col tablet, 4 col desktop

---

## 📦 POSTOJEĆE SLIKE

```
public/images/radovi/
├── rad-1.jpg   (Kuhinja)
├── rad-2.jpg   (Kuhinja)
├── rad-3.jpg   (Kuhinja)
├── rad-4.jpg   (Kuhinja)
├── rad-5.jpg   (Kuhinja s pregradom)
├── rad-6.jpg   (Namještaj)
├── rad-7.jpg   (Kuhinja)
├── rad-8.jpg   (Stolarija)
├── rad-9.jpg   (Kuhinja)
├── rad-10.jpg  (Kuhinja)
├── rad-11.jpg  (Namještaj)
├── rad-12.jpg  (Ostalo)
├── rad-13.jpg  (Ostalo)
└── rad-14.jpg  (Ostalo)
```

---

## 🎨 KATEGORIJE

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

## 🔧 KORISNE INFORMACIJE

### Boje
```
text-wood / bg-wood         # #8B5A2B
bg-cream                    # #FDF8F3
text-wood-darker            # #3D2B1F
```

### Framer Motion variants (već korišteni)
```typescript
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
```

### Lightbox biblioteke (prijedlog)
- `yet-another-react-lightbox` - moderna, lightweight
- Ili custom s Framer Motion

---

## ⚠️ PRAVILA

1. **Koristi postojeće boje** iz tailwind.config.ts
2. **Hrvatski jezik** - svi tekstovi
3. **Responsive** - mobile first
4. **Framer Motion** za animacije (već instaliran)
5. **Ažuriraj Header** - dodaj "Galerija" link u navigaciju

---

## 📚 POTREBNI FILEOVI ZA OVAJ CHAT

1. Ovaj README_FOR_NEXT_CHAT.md
2. CURRENT_STATE.md
3. src/components/layout/Header.tsx (za dodavanje Galerija linka)
4. tailwind.config.ts (reference za boje)
