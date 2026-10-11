"""Export the Chapter 5 travel photos for the map: a small round-crop thumbnail
and a large version for the enlarged view.

Usage: python3 scripts/travel-photos.py
Reads "Chapter 5/<name>.*" and writes public/photos/ch5/<name>-thumb.webp and <name>.webp.
Each entry is (centre x, centre y, square side) for the thumbnail, as fractions:
x and y of the image width/height, side of the shorter edge.
"""
import pathlib
import subprocess
import tempfile

from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "Chapter 5"
OUT = ROOT / "public" / "photos" / "ch5"
THUMBS = {
    "athens": (0.58, 0.47, 0.62),
    "czech": (0.52, 0.52, 0.52),
    "france": (0.53, 0.47, 0.55),
    "germany": (0.63, 0.45, 0.55),
    "hungary": (0.68, 0.56, 0.48),
    "india": (0.66, 0.55, 0.65),
    "japan": (0.45, 0.39, 0.52),
    "korea": (0.60, 0.50, 0.55),
    "mexico": (0.73, 0.50, 0.50),
    "peru": (0.62, 0.36, 0.52),
    "portugal": (0.52, 0.62, 0.55),
    "shanghai": (0.56, 0.50, 0.60),
    "spain": (0.50, 0.60, 0.50),
    "uk": (0.50, 0.35, 0.75),
    "usa": (0.60, 0.40, 0.50),
}

OUT.mkdir(parents=True, exist_ok=True)
for name, (cx, cy, side) in THUMBS.items():
    src = next(p for p in SRC.iterdir() if p.stem.lower() == name)
    with tempfile.TemporaryDirectory() as tmp:
        # sips reads HEIC (PIL alone can't); it keeps the EXIF rotation as a tag, so apply it after.
        jpg = pathlib.Path(tmp) / "full.jpg"
        subprocess.run(["sips", "-s", "format", "jpeg", str(src), "--out", str(jpg)], check=True, capture_output=True)
        im = ImageOps.exif_transpose(Image.open(jpg)).convert("RGB")
    w, h = im.size
    s = side * min(w, h)
    left = min(max(cx * w - s / 2, 0), w - s)
    top = min(max(cy * h - s / 2, 0), h - s)
    thumb = im.crop((round(left), round(top), round(left + s), round(top + s))).resize((200, 200), Image.LANCZOS)
    thumb.save(OUT / f"{name}-thumb.webp", "WEBP", quality=82, method=6)
    big = im.copy()
    big.thumbnail((1400, 1400), Image.LANCZOS)
    big.save(OUT / f"{name}.webp", "WEBP", quality=82, method=6)
    print(f"{src.name} -> {name}.webp {big.size}, {name}-thumb.webp")
