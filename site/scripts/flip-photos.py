"""Export the Chapter 3 flip-card photos as two same-sized WebPs.

Usage: python3 scripts/flip-photos.py
The front is used whole; the back is cropped to the front's 2:3 shape,
centred on BACK_CENTER_X (fraction of its width) so the face stays in frame.
"""
import pathlib

from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "Chapter 3"
OUT = ROOT / "public" / "photos" / "ch3"
SIZE = (800, 1200)
BACK_CENTER_X = 0.53

OUT.mkdir(parents=True, exist_ok=True)

front = ImageOps.exif_transpose(Image.open(SRC / "front.jpg")).convert("RGB")
ImageOps.fit(front, SIZE, Image.LANCZOS).save(OUT / "front.webp", "WEBP", quality=84, method=6)

back = ImageOps.exif_transpose(Image.open(SRC / "back.jpg")).convert("RGB")
ImageOps.fit(back, SIZE, Image.LANCZOS, centering=(BACK_CENTER_X, 0.5)).save(
    OUT / "back.webp", "WEBP", quality=84, method=6
)
print("front", front.size, "back", back.size, "->", SIZE)
