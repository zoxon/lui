# Lui logo guidelines

The logo is a square frame with an open corner and a separate square in the opening.
The frame is the library: you take it and adapt it. The square is the light of "lightweight".

## Colours

All colours come from `src/tokens/colors.css`. Use the token, not a copy of the hex value.

| Use | Ground | Mark colour | Token | Contrast |
|---|---|---|---|---|
| Default | Light (white) | `#2563eb` | `--color-blue-600` | 5.2:1 |
| Default | Dark (`#0f172a`) | `#93c5fd` | `--color-blue-300` | 9.9:1 |
| App icon, avatar | Tile `#0f172a` | `#93c5fd` | `--color-slate-900`, `--color-blue-300` | 9.9:1 |
| One colour, print | White | `#000000` | none | 21:1 |
| One colour, on a photo or a dark ground | Any dark | `#ffffff` | `--color-white` | 17.9:1 on `#0f172a` |

The rule is short:

- **On a dark ground the mark is always light blue (`#93c5fd`) or white.**
- **On a light ground the mark is always blue (`#2563eb`) or black.**

Every visible part reaches 3:1. The light-ground blue and the dark-ground blue are two colours of one logo: never put the dark-ground version on a light ground, and never put the blue `#2563eb` on a dark ground (it reaches only 2.7:1 on a dark browser tab).

`favicon.svg` follows this rule by itself: it is blue in a light browser and light blue in a dark browser. `favicon.ico` and the small PNG files have one colour, blue `#2563eb`. They are a fallback for old browsers and are weaker on a dark tab. Link the SVG first.

## Files

| File | Use |
|---|---|
| `svg/symbol-ink.svg` | Light grounds. |
| `svg/symbol-pale.svg` | Dark grounds. |
| `svg/symbol-small-ink.svg`, `svg/symbol-small-pale.svg` | Small sizes (below 40 px). The frame and the square are thicker. |
| `svg/symbol-white.svg`, `svg/symbol-black.svg` | One colour: photos, print. |
| `svg/favicon.svg`, `favicon.ico` | Browser tab. Transparent. The SVG follows the browser theme. |
| `svg/app-icon.svg` | Full square tile. The platform rounds the corners. |
| `svg/app-icon-rounded.svg` | Tile with rounded corners, for the README header only. |
| `png/avatar-512.png` | GitHub avatar. |
| `png/apple-touch-icon-180.png` | Apple touch icon. It has a solid ground on purpose. |

## Size and clear space

- Use the main cut from 40 px up. Use the small-size cut below 40 px.
- Smallest size: 16 px.
- Clear space: keep free space of one quarter of the mark width on every side.
- A favicon has no tile. An app icon and an avatar always have the tile.

## Do not

- Do not rotate or mirror the mark. Turned, it reads as a different shape.
- Do not round the corners of the mark. Sharp corners are part of the shape.
- Do not close the opening of the frame. Do not join the square to the frame.
- Do not change the stroke widths or the gap around the square.
- Do not add a gradient, a shadow or an outline.
- Do not use a mark colour that is not in the table above.
- Do not put the name in a font and call it a wordmark. The logo has no wordmark.
