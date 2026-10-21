ANAHEIM LODGE No. 207 - IMAGE MANIFEST
========================================================================
Run rename-images.sh and this all happens automatically. This file is the
human-readable version of what that script does.

Filenames MUST stay lowercase. Netlify runs on Linux and is case
sensitive, so Hero-1.webp would 404 even though it works on a Mac.

SOURCE RATIOS come from the Drive filename suffix:
    _a  = 1080 x 1080   (1:1 square)
    _b  = 1080 x 1350   (4:5 portrait)
    _c  = 1920 x 1080   (16:9)
    none = wide, roughly 5:4

The layout respects this. Only _c and no-suffix files are used behind
heroes and full-width bands. Squares and portraits go to the galleries
and the 4:5 split sections, where the masonry layout crops nothing.

Officer headshots are 1080 x 1350 and display at 4:5.


------------------------------------------------------------------------
HOME - HERO SLIDER            Ken Burns, hero-1 loads first
------------------------------------------------------------------------
hero-1.webp  <- officers_black and white_anaheim lodge_c.webp
hero-2.webp  <- anaheim lodge members_c.webp
hero-3.webp  <- anaheim lodge cornerstone_c.webp            [RECOMPRESS 618KB]
hero-4.webp  <- full image_lodge.webp

Slides are cropped to fill and animate with a slow push-in, so keep the
subject clear of the outer 12 per cent.


------------------------------------------------------------------------
FULL-WIDTH BANDS              62% black scrim, text sits on top
------------------------------------------------------------------------
band-community.webp    <- public schools outreach and appreication_..._c.webp
band-legacy.webp       <- anaheim officers_masonic lodge_c.webp
band-installation.webp <- anaheim officers_masonic lodge_california.jpg
band-meet.webp         <- stated meeting_anaheim lodge.webp
band-youth.webp        <- jobs daughters_anaheim_bethel no 5_event.webp


------------------------------------------------------------------------
SITEWIDE PRE-FOOTER
------------------------------------------------------------------------
footer-bg.webp   <- footer_holy bible square compass_anaheim_a.webp

This one is a 1:1 square behind a wide band, so it centre-crops heavily.
It sits under a 66% scrim and reads as texture, which is why it is here
despite the ratio. A _c version would be better if one ever exists.


------------------------------------------------------------------------
INTERIOR PAGE HEROES
------------------------------------------------------------------------
page-hero-about.webp    <- anaheim lodge_members and officers.webp
page-hero-officers.webp <- officers_black and white_anaheim lodge_c.webp
page-hero-becoming.webp <- anaheim lodge cornerstone_c.webp
page-hero-youth.webp    <- jobs daughters_anaheim_bethel no 5_disneyland.webp
page-hero-calendar.webp <- anaheim lodge_public schools appreciation_c.webp
page-hero-contact.webp  <- full image_lodge.webp
page-hero-legal.webp    <- anaheim lodge_members and officers.webp
                           (shared by privacy.html and terms.html)


------------------------------------------------------------------------
4:5 SPLIT SECTIONS            image runs tall beside the copy
------------------------------------------------------------------------
community-service.webp <- holy bible_anaheim lodge_b.webp      [home]
about-fraternity.webp  <- square and compass_b.webp            [about]
jobs-daughters.webp    <- jobs daughters_anaheim_bethel no 5_1.webp


------------------------------------------------------------------------
GALLERIES                     masonry + lightbox, nothing is cropped
------------------------------------------------------------------------
Home - four 1:1 squares
  gallery-home-01.webp  <- anaheim lodge_installation of officers_a.webp
  gallery-home-02.webp  <- anaheim members_master masons_a.webp
  gallery-home-03.webp  <- brother nash_brother lopez_a.webp
  gallery-home-04.webp  <- anaheim lodge cornerstone_anaheim building_a.webp

About - three squares and one portrait
  gallery-about-01.webp <- masonic rings_a.webp
  gallery-about-02.webp <- tilers desk_anaheim lodge_a.webp
  gallery-about-03.webp <- square and compass_blue lodge_a.webp
  gallery-about-04.webp <- master avery malate_blue lodge member_b.webp

Becoming a Mason - the three 4:5 portraits
  gallery-journey-01.webp <- lodge_altar_holy bible_square-compass_..._b.jpg
  gallery-journey-02.webp <- holy bible_anaheim lodge_b.webp
  gallery-journey-03.webp <- square and compass_b.webp

Youth Orders - Job's Daughters
  gallery-youth-01.webp <- jobs daughters_anaheim_bethel no 5_2.webp
  gallery-youth-02.webp <- jobs daughters_bethel no 5.webp
  gallery-youth-03.webp <- jobs daughters_anaheim_bethel no 5_1.webp


------------------------------------------------------------------------
OFFICERS  ->  assets/img/officers/     4:5, 1080 x 1350
------------------------------------------------------------------------
officer-marcial-tagao.webp     <- marcial tagao_master.webp
officer-robert-lukowiak.webp   <- robert lukowiak_junior warden.webp
officer-pilardo-espinosa.webp  <- pilardo bong espinosa_assistant treasurer.webp
officer-ernesto-ramirez.webp   <- ernesto ramirez_assistant secretary.webp
officer-jag-geotina.webp       <- jag geotina_senior deacon.webp
officer-geoffrey-ray.webp      <- geoffrey ray_junior deacon.webp
officer-wilfredo-matias.webp   <- wilfredo matias_marshal.webp
officer-jerome-ramirez-jr.webp <- jerome ramirez jr_junior steward.webp
officer-placeholder.png        <- officer.png

Six seats use the placeholder and show the office title only, with no
name: Senior Warden, Treasurer, Secretary, Chaplain, Senior Steward,
Tiler. Send the names and they drop straight in.


------------------------------------------------------------------------
SOCIAL SHARE
------------------------------------------------------------------------
og-lodge.jpg  <- officers_black and white_anaheim lodge_c.webp
                 crop to 1200 x 630 and SAVE AS JPG. WebP OG images still
                 fail on some platforms.


------------------------------------------------------------------------
DUPLICATES - one source, more than one slot
------------------------------------------------------------------------
There are more slots on the site than photographs in Drive, so seven
sources are used twice. None of these needs a code change to replace -
drop a new file in under the destination name and it is done.

  officers_black and white ... _c    -> hero-1, page-hero-officers, og-lodge
  anaheim lodge cornerstone_c        -> hero-3, page-hero-becoming
  full image_lodge                   -> hero-4, page-hero-contact
  anaheim lodge_members and officers -> page-hero-about, page-hero-legal
  holy bible_anaheim lodge_b         -> community-service, gallery-journey-02
  square and compass_b               -> about-fraternity, gallery-journey-03
  jobs daughters ... _1              -> jobs-daughters, gallery-youth-03


------------------------------------------------------------------------
STILL OUTSTANDING
------------------------------------------------------------------------
DeMolay photography. Four visible "awaiting asset" placeholders remain -
one on index.html, three on youth-orders.html. Name new files
demolay.webp, demolay-02.webp, demolay-03.webp.

Names for the six officer seats listed above.

anaheim lodge cornerstone_c.webp needs recompressing. At 618 KB it is the
single heaviest asset and it is used for hero-3.


------------------------------------------------------------------------
THE FILES CURRENTLY IN THIS FOLDER
------------------------------------------------------------------------
Everything here right now is a grey labelled stand-in, generated at the
exact ratio of the source that replaces it, so you can open the site
locally and judge the layout before the photography lands.

rename-images.sh overwrites all of them. Nothing needs deleting first.
