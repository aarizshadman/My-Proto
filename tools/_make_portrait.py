"""Turn the portrait JPEG into transparent line art, matching how
rubiks-cube.webp carries a real alpha channel so it can float over any
theme with the radial glow visible behind it."""
from PIL import Image, ImageFilter
import numpy as np

SRC = r"src\assets\portrait.jpg"
DST = r"src\assets\portrait.png"

im = Image.open(SRC).convert("RGB")
a = np.asarray(im).astype(np.float32)

# Background paper samples at ~253; anything whiter than `hi` is paper and
# goes fully transparent, anything darker than `lo` is ink and stays solid.
lo, hi = 230.0, 249.0
mn = a.min(axis=2)
alpha = np.clip((hi - mn) / (hi - lo), 0.0, 1.0) * 255.0
alpha[alpha < 20] = 0.0  # drop JPEG speckle in the flat paper areas

rgba = np.dstack([a.astype(np.uint8), alpha.astype(np.uint8)])
img = Image.fromarray(rgba, "RGBA")

# Feather the alpha only, so edges anti-alias onto the page instead of
# showing a hard cut-out halo.
r, g, b, al = img.split()
al = al.filter(ImageFilter.GaussianBlur(0.7))
img = Image.merge("RGBA", (r, g, b, al))

img.save(DST, optimize=True)

arr = np.asarray(img)
print("saved", DST, img.size)
print("fully transparent: %.1f%%" % ((arr[..., 3] == 0).mean() * 100))
print("fully opaque:      %.1f%%" % ((arr[..., 3] == 255).mean() * 100))
print("partial:           %.1f%%" % (((arr[..., 3] > 0) & (arr[..., 3] < 255)).mean() * 100))
