"""Crop chapter photos to face-centred squares and export them as WebP.

Usage: python3 scripts/chapter-photos.py
Reads "Chapter 1/<n>.*" and writes public/photos/ch1/<n>.webp.
Each entry is (face centre x, face centre y, square side), all as fractions:
x and y of the image width/height, side of the shorter edge.
"""
import pathlib
import subprocess
import tempfile

from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
CROPS = {
    "Chapter 1": (
        "ch1",
        {
            1: (0.29, 0.42, 0.73),
            2: (0.71, 0.49, 0.78),
            3: (0.48, 0.455, 0.90),
            4: (0.40, 0.55, 0.75),
            5: (0.417, 0.42, 0.80),
            6: (0.45, 0.66, 0.90),
            7: (0.50, 0.517, 1.00),
            8: (0.52, 0.433, 0.85),
            9: (0.50, 0.40, 1.00),
        },
    ),
}
SIZE = 800

for folder, (out_name, crops) in CROPS.items():
    out = ROOT / "public" / "photos" / out_name
    out.mkdir(parents=True, exist_ok=True)
    for n, (cx, cy, side) in crops.items():
        src = next((ROOT / folder).glob(f"{n}.*"))
        with tempfile.TemporaryDirectory() as tmp:
            # sips reads HEIC (PIL alone can't); it keeps the EXIF rotation as a tag, so apply it after.
            jpg = pathlib.Path(tmp) / "full.jpg"
            subprocess.run(
                ["sips", "-s", "format", "jpeg", str(src), "--out", str(jpg)],
                check=True,
                capture_output=True,
            )
            im = ImageOps.exif_transpose(Image.open(jpg)).convert("RGB")
        w, h = im.size
        s = side * min(w, h)
        left = min(max(cx * w - s / 2, 0), w - s)
        top = min(max(cy * h - s / 2, 0), h - s)
        im = im.crop((round(left), round(top), round(left + s), round(top + s)))
        im = im.resize((SIZE, SIZE), Image.LANCZOS)
        im.save(out / f"{n}.webp", "WEBP", quality=82, method=6)
        print(f"{folder}/{src.name} -> {out_name}/{n}.webp")
