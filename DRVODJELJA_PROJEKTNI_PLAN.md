# 🪵 DRVODJELJA - Projektni plan

## Osnovne informacije

| Stavka | Vrijednost |
|--------|-----------|
| **Projekt** | Web stranica za stolarsku radionicu |
| **Klijent** | Miljenko Bošnjak (VL: Drvodjelja) |
| **Developer** | Bojan Marić |
| **Početak** | Siječanj 2026 |

---

## 📋 O projektu

**Drvodjelja** je stolarska radionica s **30+ godina iskustva** u izradi kvalitetnog drvenog namještaja i stolarije.

### Vlasnik
- **Ime:** Miljenko Bošnjak
- **Iskustvo:** 30+ godina
- **Specijalizacija:** Kuhinje po mjeri, vrata, namještaj, stepenice

---

## 🎯 Ciljevi projekta

1. **Profesionalna web prezentacija** - moderna stranica koja odražava kvalitetu rada
2. **Galerija radova** - showcase dosadašnjih projekata
3. **Jednostavan kontakt** - forma za upite potencijalnih klijenata
4. **Admin panel** - CMS za samostalno upravljanje sadržajem
5. **SEO optimizacija** - vidljivost na Google pretraživanju

---

## 🛠️ Tech Stack

| Komponenta | Tehnologija |
|------------|-------------|
| Frontend | Next.js 14, React, TypeScript |
| Styling | Tailwind CSS |
| Database | MySQL (Prisma ORM) |
| Auth | NextAuth.js |
| Animacije | Framer Motion |
| Ikone | Lucide React |
| Hosting | Hetzner VPS |
| Reverse Proxy | Caddy |

---

## 🎨 Dizajn

### Paleta boja
```
Primarna (drvo):    #8B5A2B
Svijetlo drvo:      #D4A574
Tamno drvo:         #5C4033
Tekst:              #3D2B1F
Pozadina:           #FDF8F3 (cream)
```

### Fontovi
- **Naslovi:** Georgia / Playfair Display (serif)
- **Tekst:** Inter (sans-serif)

### Logo
- Tradicionalni stolarski alati (blanja, sjekira, pile)
- Boja: #8B5A2B (wood)
- Tekst: "DRVODJELJA" + "30 Godina sa vama"

---

## 📁 Struktura stranica

### Javne stranice
- `/` - Početna (Hero, O nama, Usluge, Radovi, Kontakt)
- `/galerija` - Svi projekti s filterom
- `/galerija/[slug]` - Pojedinačni projekt

### Admin panel
- `/admin` - Dashboard
- `/admin/projekti` - Upravljanje projektima
- `/admin/usluge` - Upravljanje uslugama  
- `/admin/upiti` - Inbox kontakt upita
- `/admin/postavke` - Postavke stranice

---

## 📊 Modeli podataka

### Project (Projekti/Radovi)
- Naslov, opis, kategorija
- Više slika s cover oznakom
- Datum, status (draft/published)

### Service (Usluge)
- Naslov, opis, ikona
- Redoslijed prikaza

### Inquiry (Upiti)
- Ime, email, telefon, poruka
- Status (new/replied/archived)
- Datum

### SiteSetting (Postavke)
- Key-value parovi
- Email, telefon, adresa, radno vrijeme

---

## 🔐 Admin pristup

| Email | Password |
|-------|----------|
| admin@drvodjelja.hr | Drvodjelja2024! |

⚠️ **OBAVEZNO PROMIJENITI LOZINKU!**

---

## 📅 Timeline

| Faza | Opis | Status |
|------|------|--------|
| Faza 1 | Kostur projekta | ✅ |
| Faza 1.5 | Slike i logo | ✅ |
| Faza 2 | Javne stranice + kontakt | 🔄 |
| Faza 3 | Galerija | ⏳ |
| Faza 4 | Admin CMS | ⏳ |
| Faza 5 | Polish + Deploy | ⏳ |

---

## 📝 Napomene

- Sve na hrvatskom jeziku (bez i18n)
- Responsive dizajn (mobile-first)
- Slike optimizirane za web (max 1200px, quality 85%)
- MySQL baza na istom serveru

---

## 🔗 Linkovi

- **GitHub repo:** github.com/bojan-maric/drvodjelja
- **Produkcija:** (TBD)
- **Staging:** (TBD)
