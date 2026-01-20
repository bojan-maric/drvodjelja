# 🪵 DRVODJELJA - README za Chat 4 (Faza 4)

> **PROČITAJ OVO PRVO!**
> Ovaj chat kreira ADMIN CMS - dashboard, CRUD projekata, inbox upita.

---

## 📋 ŠTO JE NAPRAVLJENO (Faze 1-3)

### Faza 1 (Kostur)
✅ Next.js 14 projekt setup
✅ Prisma schema (Project, ProjectImage, Service, Inquiry, SiteSetting, AdminUser)
✅ NextAuth.js autentifikacija
✅ Admin layout i login stranica

### Faza 1.5 (Slike)
✅ Logo integracija
✅ Favicon
✅ 14 slika radova u /public/images/radovi/

### Faza 2 (Javne stranice)
✅ Hero s wood-bg.webp pozadinom
✅ Transparentan header
✅ Kontakt forma → POST /api/contact → Inquiry model
✅ Framer Motion animacije

### Faza 3 (Galerija)
✅ /galerija stranica
✅ GalleryFilter - animirani pills po kategorijama
✅ GalleryGrid - responsive grid (2/3/4 col)
✅ Lightbox - fullscreen + keyboard navigacija
✅ Header - full-screen mobile menu s Framer Motion

---

## 🎯 CILJ OVOG CHATA (Faza 4)

Kreirati Admin CMS za upravljanje sadržajem.

### Novi fileovi:
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
├── Sidebar.tsx           # Admin sidebar navigacija
├── DashboardStats.tsx    # Statistike kartice
├── ProjectForm.tsx       # Forma za projekt
├── InquiryList.tsx       # Lista upita
└── ImageUpload.tsx       # Drag & drop upload slika

src/app/api/
├── projects/
│   ├── route.ts          # GET, POST projekti
│   └── [id]/route.ts     # GET, PUT, DELETE projekt
├── services/
│   ├── route.ts
│   └── [id]/route.ts
├── inquiries/
│   ├── route.ts
│   └── [id]/route.ts
└── upload/
    └── route.ts          # Upload slika
```

### Funkcionalnosti:
1. **Dashboard** - statistike (projekti, upiti, usluge)
2. **Projekti CRUD** - naslov, opis, kategorija, slike
3. **Usluge CRUD** - naziv, opis, ikona, redoslijed
4. **Inbox upita** - lista, status (new/replied/archived)
5. **Postavke** - email, telefon, adresa, radno vrijeme

---

## 📦 PRISMA MODELI (prisma/schema.prisma)

```prisma
model Project {
  id          String         @id @default(cuid())
  title       String
  slug        String         @unique
  description String?        @db.Text
  category    String         // kuhinje | vrata | namjestaj | stepenice | ostalo
  featured    Boolean        @default(false)
  order       Int            @default(0)
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  images      ProjectImage[]
}

model ProjectImage {
  id        String   @id @default(cuid())
  projectId String
  project   Project  @relation(...)
  filename  String
  path      String
  alt       String?
  isCover   Boolean  @default(false)
  order     Int      @default(0)
}

model Service {
  id          String  @id @default(cuid())
  name        String
  slug        String  @unique
  description String? @db.Text
  icon        String  // lucide icon name
  order       Int     @default(0)
  active      Boolean @default(true)
}

model Inquiry {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  service   String?
  message   String   @db.Text
  status    String   @default("new") // new | replied | archived
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model SiteSetting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String   @db.Text
  updatedAt DateTime @updatedAt
}
```

---

## 🔧 POSTOJEĆI ADMIN FILEOVI

```
src/app/admin/
├── layout.tsx      # Wrapper s auth check
├── page.tsx        # Placeholder (treba dashboard)
└── login/
    └── page.tsx    # Login forma (radi)
```

---

## 🎨 DIZAJN ZA ADMIN

- **Sidebar** - tamna (wood-darker), fiksna lijevo
- **Main content** - svijetla pozadina (cream ili white)
- **Kartice** - bijele sa shadow-sm, rounded-xl
- **Tablice** - jednostavne, responsive
- **Forme** - konzistentne s javnim stranicama

---

## ⚠️ PRAVILA

1. **Koristi postojeće boje** iz tailwind.config.ts
2. **Hrvatski jezik** - svi tekstovi i labele
3. **Responsive** - admin mora raditi i na tabletu
4. **Server Actions ili API routes** - za CRUD operacije
5. **Validacija** - Zod ili ručna validacija
6. **Toast notifikacije** - za success/error feedback

---

## 📚 POTREBNI FILEOVI ZA OVAJ CHAT

1. Ovaj README_FOR_NEXT_CHAT.md
2. CURRENT_STATE.md
3. PROJECT_STRUCTURE.md ← MASTER DOKUMENT STRUKTURE
4. prisma/schema.prisma (već u dokumentima)
5. src/app/admin/layout.tsx
6. src/app/admin/page.tsx
7. src/lib/auth.ts
8. tailwind.config.ts (reference za boje)
