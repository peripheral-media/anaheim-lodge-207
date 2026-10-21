#!/usr/bin/env bash
# Builds deploy/site.zip (what Netlify serves). Source of truth = this folder.
set -e
cd "$(dirname "$0")"
rm -rf deploy/_stage deploy/site.zip && mkdir -p deploy/_stage
cp *.html _redirects _headers deploy/_stage/
mkdir -p deploy/_stage/assets && cp -r assets/css assets/js deploy/_stage/assets/
mkdir -p deploy/_stage/assets/img/officers
cp assets/img/*.webp assets/img/*.jpg deploy/_stage/assets/img/ 2>/dev/null || true
cp assets/img/officers/*.webp assets/img/officers/*.png deploy/_stage/assets/img/officers/
(cd deploy/_stage && zip -qr ../site.zip .)
rm -rf deploy/_stage
ls -la deploy/site.zip
