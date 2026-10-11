"""Cut pieces out of the Chapter 2 portfolio images and export them as WebP.

Usage: python3 scripts/work-samples.py
Each entry: (source file, crop box in pixels or None for the whole image).
Writes public/photos/ch2/<n>.webp in the order listed and prints each
width/height ratio for src/content.js.
"""
import pathlib

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "Chapter 2"
OUT = ROOT / "public" / "photos" / "ch2"
PIECES = [
    ("attentive-email.webp", (0, 0, 507, 465)),
    ("starburst-linkedin.webp", None),
    ("materialize-ramp.webp", None),
    ("microsoft-deck.jpg", (0, 0, 591, 333)),
]
FULL = {
    "attentive-email.webp": "full-attentive.webp",
    "microsoft-deck.jpg": "full-microsoft.webp",
}

OUT.mkdir(parents=True, exist_ok=True)
for n, (name, box) in enumerate(PIECES, 1):
    im = Image.open(SRC / name)
    dest = OUT / f"{n}.webp"
    if getattr(im, "n_frames", 1) > 1:
        im.save(dest, "WEBP", save_all=True, quality=80, method=4)
    else:
        im = im.convert("RGB")
        if box:
            im = im.crop(box)
        if im.width > 1200:
            im = im.resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS)
        im.save(dest, "WEBP", quality=86, method=6)
    w, h = Image.open(dest).size
    print(f"{n}.webp  {name}  ratio {w / h:.3f}")

# Whole-length versions shown when a cropped sample is enlarged.
for name, dest in FULL.items():
    Image.open(SRC / name).convert("RGB").save(OUT / dest, "WEBP", quality=88, method=6)
    print(f"{dest}  {name}  (full)")
