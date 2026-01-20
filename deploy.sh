#!/bin/bash
# =====================================================
# 🪵 DRVODJELJA - Update Deployment Script
# =====================================================
# Ovaj script dodaje slike i ažurira komponente
# 
# VAŽNO: Pokreni iz PARENT foldera gdje je ZIP raspakiran!
# Npr: cd ~/Downloads && unzip drvodjelja-fix.zip && cd drvodjelja-fix && ./deploy.sh ~/Projects/drvodjelja
#
# Usage: ./deploy.sh /path/to/drvodjelja
# =====================================================

set -e  # Exit on error

# Boje za output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Provjeri argument
if [ -z "$1" ]; then
  echo -e "${RED}❌ Greška: Moraš navesti path do drvodjelja projekta!${NC}"
  echo ""
  echo "Usage: ./deploy.sh /path/to/drvodjelja"
  echo "Npr:   ./deploy.sh ~/Projects/drvodjelja"
  exit 1
fi

TARGET="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo ""
echo -e "${YELLOW}🪵 DRVODJELJA - Slike i komponente update${NC}"
echo "============================================="
echo -e "Source: ${GREEN}$SCRIPT_DIR${NC}"
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

# CLEANUP: Obriši krivi files/ folder ako postoji (od prethodnog krivog deploya)
if [ -d "$TARGET/files" ]; then
  echo -e "${YELLOW}🧹 Brišem krivi files/ folder od prethodnog deploya...${NC}"
  rm -rf "$TARGET/files"
  echo "   ✅ files/ obrisan"
fi

# Kopiraj src/ fileove
echo "📁 Kopiranje src/ fileova..."
cp -v "$SCRIPT_DIR/src/app/page.tsx" "$TARGET/src/app/"
cp -v "$SCRIPT_DIR/src/app/layout.tsx" "$TARGET/src/app/"
cp -v "$SCRIPT_DIR/src/components/layout/Header.tsx" "$TARGET/src/components/layout/"
cp -v "$SCRIPT_DIR/src/components/layout/Footer.tsx" "$TARGET/src/components/layout/"

# Kopiraj public/ fileove
echo ""
echo "📁 Kopiranje public/ fileova..."
cp -v "$SCRIPT_DIR/public/favicon.ico" "$TARGET/public/"
cp -v "$SCRIPT_DIR/public/apple-touch-icon.png" "$TARGET/public/"
cp -v "$SCRIPT_DIR/public/icon-192.png" "$TARGET/public/"

# Kreiraj images foldere ako ne postoje
mkdir -p "$TARGET/public/images/logo"
mkdir -p "$TARGET/public/images/hero"
mkdir -p "$TARGET/public/images/radovi"

cp -v "$SCRIPT_DIR/public/images/logo/"* "$TARGET/public/images/logo/"
cp -v "$SCRIPT_DIR/public/images/hero/"* "$TARGET/public/images/hero/"
cp -v "$SCRIPT_DIR/public/images/radovi/"* "$TARGET/public/images/radovi/"

# Kopiraj dokumentaciju u root
echo ""
echo "📄 Kopiranje dokumentacije..."
cp -v "$SCRIPT_DIR/CURRENT_STATE.md" "$TARGET/"
cp -v "$SCRIPT_DIR/DEVELOPMENT_PHASES.md" "$TARGET/"
cp -v "$SCRIPT_DIR/DRVODJELJA_PROJEKTNI_PLAN.md" "$TARGET/"

echo ""
echo -e "${GREEN}=============================================${NC}"
echo -e "${GREEN}✅ Update uspješno završen!${NC}"
echo -e "${GREEN}=============================================${NC}"
echo ""
echo "📦 Dodane slike:"
echo "   • public/favicon.ico"
echo "   • public/apple-touch-icon.png"
echo "   • public/icon-192.png"
echo "   • public/images/logo/logo.png, logo-full.png"
echo "   • public/images/hero/drvo_full.webp"
echo "   • public/images/radovi/rad-1.jpg ... rad-14.jpg"
echo ""
echo "📝 Ažurirane komponente:"
echo "   • src/app/layout.tsx"
echo "   • src/app/page.tsx"
echo "   • src/components/layout/Header.tsx"
echo "   • src/components/layout/Footer.tsx"
echo ""
echo "📄 Dokumentacija:"
echo "   • CURRENT_STATE.md"
echo "   • DEVELOPMENT_PHASES.md"
echo "   • DRVODJELJA_PROJEKTNI_PLAN.md"
echo ""
echo "Pokreni development server:"
echo -e "  ${YELLOW}cd $TARGET && yarn dev${NC}"
echo ""
