# Anaheim Lodge No. 207 F. & A. M. — website

Static site served by Netlify (site ID `f9591a5f-188f-44ed-8d37-cb3d339229ea`, anaheimlodge.netlify.app).

- Source: the HTML pages, `assets/` (css, js, img).
- Deploy: `./build.sh` builds `deploy/site.zip`; Make scenario **Netlify – Publish Site from URL (Claude)** (ID 4991518) pulls it from this repo's raw URL and posts it to Netlify.
- Image sources live in Google Drive; `rename-images.sh` maps Drive names to site names.

Open slots: Google Calendar embed (calendar.html, index.html), Mailchimp action URL (`data-mc-action` on `.mc-form`), GHL webhook (`data-webhook` on the contact form), officer names/photos (officers.html, about.html), DeMolay photos.
