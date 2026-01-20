#!/bin/bash
# =====================================================
# 🪵 DRVODJELJA - Update Deployment Script
# =====================================================
# Ovaj script dodaje slike i ažurira komponente
# Usage: ./deploy.sh /path/to/drvodjelja
# =====================================================

set -e  # Exit on error

# Boje za output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default target je trenutni direktorij
TARGET="${1:-.}"

echo ""
echo -e "${YELLOW}🪵 DRVODJELJA - Slike i komponente update${NC}"
echo "============================================="
echo -e "Target: ${GREEN}$TARGET${NC}"
echo ""

# Provjeri postoji li target
if [ ! -d "$TARGET" ]; then
  echo -e "${RED}❌ Greška: Direktorij $TARGET ne postoji!${NC}"
  exit 1
fi

# Provjeri je li to drvodjelja projekt
if [ ! -f "$TARGET/package.json" ]; then
  echo -e "${RED}❌ Greška: package.json nije pronađen u $TARGET${NC}"
  echo "Jeste li u pravom direktoriju?"
  exit 1
fi

# Kopiraj fileove
echo "📁 Kopiranje fileova..."
cp -rv files/* "$TARGET/"

echo ""
echo -e "${GREEN}✅ Fileovi kopirani!${NC}"
echo ""

# Prikaz što je dodano
echo "📦 Dodane slike:"
echo "   - public/favicon.ico"
echo "   - public/apple-touch-icon.png"
echo "   - public/icon-192.png"
echo "   - public/images/logo/logo.png"
echo "   - public/images/logo/logo-full.png"
echo "   - public/images/hero/drvo_full.webp"
echo "   - public/images/radovi/rad-1.jpg ... rad-14.jpg (14 slika)"
echo ""
echo "📝 Ažurirane komponente:"
echo "   - src/app/layout.tsx (favicon linkovi)"
echo "   - src/app/page.tsx (hero, galerija radova)"
echo "   - src/components/layout/Header.tsx (logo)"
echo "   - src/components/layout/Footer.tsx (logo)"
echo ""

# Provjeri treba li yarn install
if [ -f "files/package.json" ]; then
  echo "📦 Pokretanje yarn install..."
  cd "$TARGET" && yarn install
fi

echo ""
echo -e "${GREEN}🎉 Update uspješno završen!${NC}"
echo ""
echo "Pokreni development server:"
echo -e "  ${YELLOW}cd $TARGET && yarn dev${NC}"
echo ""
