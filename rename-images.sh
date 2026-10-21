#!/usr/bin/env bash
# =========================================================================
#  Anaheim Lodge No. 207 - image rename helper
#
#  1. Download BOTH Drive folders (main images AND Officers, plus the five
#     Job's Daughters files) into one directory.
#  2. Run:   bash rename-images.sh ~/Downloads/anaheim-images
#
#  Source ratios are read from the filename suffix:
#      _a = 1080x1080 (1:1)      _b = 1080x1350 (4:5)
#      _c = 1920x1080 (16:9)     no suffix = wide, roughly 5:4
#
#  Only _c and no-suffix files go into heroes and full-width bands.
#  _a and _b files go to the masonry galleries and the 4:5 splits, where
#  nothing is cropped. Originals are never modified.
# =========================================================================
set -u

SRC="${1:-}"
if [ -z "$SRC" ] || [ ! -d "$SRC" ]; then
  echo "Usage: bash rename-images.sh /path/to/downloaded/images"; exit 1
fi

DEST="$(cd "$(dirname "$0")" && pwd)/assets/img"
mkdir -p "$DEST/officers"
MISSING=(); COPIED=0

place () {
  local from="$1" to="$2" hit
  hit="$(find "$SRC" -type f -iname "$from" -print -quit 2>/dev/null)"
  if [ -n "$hit" ]; then
    cp "$hit" "$DEST/$to"; COPIED=$((COPIED+1))
    printf '  ok   %-30s <- %s\n' "$to" "$(basename "$hit")"
  else
    MISSING+=("$to  <-  $from")
    printf '  MISS %-30s <- %s\n' "$to" "$from"
  fi
}

echo ""; echo "--- home hero slider (16:9) -----------------------------------------"
place "officers_black and white_anaheim lodge_c.webp"              "hero-1.webp"
place "anaheim lodge members_c.webp"                               "hero-2.webp"
place "anaheim lodge cornerstone_c.webp"                           "hero-3.webp"
place "full image_lodge.webp"                                      "hero-4.webp"

echo ""; echo "--- full-width bands ------------------------------------------------"
place "public schools outreach and appreication_anaheim lodge_c.webp" "band-community.webp"
place "anaheim officers_masonic lodge_c.webp"                      "band-legacy.webp"
place "anaheim officers_masonic lodge_california.jpg"              "band-installation.webp"
place "stated meeting_anaheim lodge.webp"                          "band-meet.webp"
place "jobs daughters_anaheim_bethel no 5_event.webp"              "band-youth.webp"

echo ""; echo "--- sitewide pre-footer ---------------------------------------------"
place "footer_holy bible square compass_anaheim_a.webp"            "footer-bg.webp"

echo ""; echo "--- interior page heroes --------------------------------------------"
place "anaheim lodge_members and officers.webp"                    "page-hero-about.webp"
place "officers_black and white_anaheim lodge_c.webp"              "page-hero-officers.webp"
place "anaheim lodge cornerstone_c.webp"                           "page-hero-becoming.webp"
place "jobs daughters_anaheim_bethel no 5_disneyland.webp"         "page-hero-youth.webp"
place "anaheim lodge_public schools appreciation_c.webp"           "page-hero-calendar.webp"
place "full image_lodge.webp"                                      "page-hero-contact.webp"
place "anaheim lodge_members and officers.webp"                    "page-hero-legal.webp"

echo ""; echo "--- 4:5 split images ------------------------------------------------"
place "holy bible_anaheim lodge_b.webp"                            "community-service.webp"
place "square and compass_b.webp"                                  "about-fraternity.webp"
place "jobs daughters_anaheim_bethel no 5_1.webp"                  "jobs-daughters.webp"

echo ""; echo "--- home gallery (1:1) ----------------------------------------------"
place "anaheim lodge_installation of officers_a.webp"              "gallery-home-01.webp"
place "anaheim members_master masons_a.webp"                       "gallery-home-02.webp"
place "brother nash_brother lopez_a.webp"                          "gallery-home-03.webp"
place "anaheim lodge cornerstone_anaheim building_a.webp"          "gallery-home-04.webp"

echo ""; echo "--- about gallery ---------------------------------------------------"
place "masonic rings_a.webp"                                       "gallery-about-01.webp"
place "tilers desk_anaheim lodge_a.webp"                           "gallery-about-02.webp"
place "square and compass_blue lodge_a.webp"                       "gallery-about-03.webp"
place "master avery malate_blue lodge member_b.webp"               "gallery-about-04.webp"

echo ""; echo "--- becoming a mason gallery (4:5) ----------------------------------"
place "lodge_altar_holy bible_square-compass_anaheim lodge_b.jpg"  "gallery-journey-01.webp"
place "holy bible_anaheim lodge_b.webp"                            "gallery-journey-02.webp"
place "square and compass_b.webp"                                  "gallery-journey-03.webp"

echo ""; echo "--- youth orders gallery --------------------------------------------"
place "jobs daughters_anaheim_bethel no 5_2.webp"                  "gallery-youth-01.webp"
place "jobs daughters_bethel no 5.webp"                            "gallery-youth-02.webp"
place "jobs daughters_anaheim_bethel no 5_1.webp"                  "gallery-youth-03.webp"

echo ""; echo "--- officers (4:5, 1080x1350) ---------------------------------------"
place "marcial tagao_master.webp"                      "officers/officer-marcial-tagao.webp"
place "robert lukowiak_junior warden.webp"             "officers/officer-robert-lukowiak.webp"
place "pilardo bong espinosa_assistant treasurer.webp" "officers/officer-pilardo-espinosa.webp"
place "ernesto ramirez_assistant secretary.webp"       "officers/officer-ernesto-ramirez.webp"
place "jag geotina_senior deacon.webp"                 "officers/officer-jag-geotina.webp"
place "geoffrey ray_junior deacon.webp"                "officers/officer-geoffrey-ray.webp"
place "wilfredo matias_marshal.webp"                   "officers/officer-wilfredo-matias.webp"
place "jerome ramirez jr_junior steward.webp"          "officers/officer-jerome-ramirez-jr.webp"
place "officer.png"                                    "officers/officer-placeholder.png"

echo ""; echo "--- social share image ----------------------------------------------"
place "officers_black and white_anaheim lodge_c.webp"              "og-lodge.jpg"

if command -v cwebp >/dev/null 2>&1; then
  echo ""; echo "--- converting jpg sources to webp ----------------------------------"
  for f in band-installation.webp gallery-journey-01.webp; do
    if [ -f "$DEST/$f" ]; then
      cwebp -quiet -q 80 "$DEST/$f" -o "$DEST/$f" && echo "  ok   $f"
    fi
  done
else
  echo ""
  echo "  NOTE: cwebp is not installed, so band-installation.webp and"
  echo "        gallery-journey-01.webp are still JPEGs with a .webp name."
  echo "        They WILL display, but convert before launch:"
  echo "        brew install webp    then re-run this script."
fi

echo ""
echo "====================================================================="
echo "Copied: $COPIED"
if [ ${#MISSING[@]} -gt 0 ]; then
  echo ""; echo "Missing ${#MISSING[@]}:"
  for m in "${MISSING[@]}"; do echo "  - $m"; done
else
  echo "Nothing missing."
fi
cat <<'NOTES'

DUPLICATES - one source, more than one slot
  There are more slots on the site than photographs in Drive, so seven
  sources are deliberately reused. Dropping in a new photograph later is a
  straight file swap, no code change:

    officers_black and white ... _c    -> hero-1, page-hero-officers, og-lodge
    anaheim lodge cornerstone_c        -> hero-3, page-hero-becoming
    full image_lodge                   -> hero-4, page-hero-contact
    anaheim lodge_members and officers -> page-hero-about, page-hero-legal
    holy bible_anaheim lodge_b         -> community-service, gallery-journey-02
    square and compass_b               -> about-fraternity, gallery-journey-03
    jobs daughters ... _1              -> jobs-daughters, gallery-youth-03

RECOMPRESS BEFORE LAUNCH
    anaheim lodge cornerstone_c.webp is 618 KB and becomes hero-3 and
    page-hero-becoming. Target under 250 KB.

STILL NEEDED
    Walt Disney Chapter photography. Four visible "awaiting asset"
    placeholders remain: one on index.html, three on youth-orders.html.
    Name them demolay.webp, demolay-02.webp, demolay-03.webp.

    Names for six officer seats: Senior Warden, Treasurer, Secretary,
    Chaplain, Senior Steward, Tiler.
NOTES
echo "====================================================================="
