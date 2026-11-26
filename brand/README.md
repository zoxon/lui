# Lui brand

The logo of Lui: a square frame with an open corner and a separate square in the opening.
Use `guidelines.md` for the rules. Use this file to find the files and to understand the choices.

## What is here

| Path | What it is |
|---|---|
| `svg/` | The logo files: colour for light and dark grounds, small-size cuts, one colour, favicon, app icon. |
| `png/` | PNG exports: avatar 512, Apple touch icon 180, the symbol from 16 to 1024 px. |
| `favicon.ico` | Transparent icon with 16, 32 and 48 px. |
| `readme-header-light.svg`, `readme-header-dark.svg` | The README header as an image, one file for each GitHub theme. |
| `social-preview.png`, `social-preview.svg` | The GitHub social preview, 1280 x 640 px. The SVG is the source. |
| `guidelines.md` | Usage rules. |
| `preview.html` | The logo in real contexts. Open it in a browser. |
| `scripts/` | `build_kit.py` builds `svg/`. The other scripts come from the `design` plugin (`design-logo`). |

## Quick use

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="brand/readme-header-dark.svg">
  <img src="brand/readme-header-light.svg" width="520" alt="Lui: lightweight, cross-framework UI library">
</picture>
```

GitHub removes style attributes from README HTML, so the header is an image. An SVG image keeps its own styles.

- **GitHub avatar:** upload `png/avatar-512.png`.
- **GitHub social preview:** upload `social-preview.png` by hand (Settings, General, Social preview). GitHub has no API for it. The file must be under 1 MB.
- **Docs site favicon:** `svg/favicon.svg` and `favicon.ico`. This kit does not change `src/index.html`.

## Rebuild

Change a colour in the `PALETTE` block of `scripts/build_kit.py`, then run:

```bash
python3 scripts/build_kit.py
```

The PNG files, `favicon.ico`, the README headers, `preview.html` and the social preview come from the `design-logo` and `design-web-assets` skills of the `design` plugin. `build_kit.py` needs only Python 3.

## Decisions (2026-11-26)

**Chosen:** mark E, the open frame with a separate square, in blue from the Lui palette (`blue-600` on light, `blue-300` on dark).

**Why this mark:** it is a simple shape made of two parts, it stays readable at 16 px with the small-size cut, and its sharp corners match the Axiom logo, so the two projects look like a family.

**Colour:** the Lui interface is monochrome (the interactive colour is slate-900), so a mark in the brand blue stands out from it and does not copy it. Blue is the most common colour in the category: that is the main weakness of this choice.

**Not chosen, and why:**

| Concept | Reason |
|---|---|
| Lit L | A clean letter with a dot, but only an L. |
| One U ("Li") | Reads as "Li". Kept as the second choice. |
| Cut L, thick and thin L, italic L | A letter in a tile or a plain letter: too common. |
| l-u-i, wordmarks in a pixel or a font style | A typed name. Easy to confuse with other projects. |
| Tray, user in U, frame with an l | Read as a face, a person or a viewfinder. |
| Two themes, track, three blocks | Read as "10", a toggle or a bar chart. |
| Colours: slate, slate with a blue dot, slate with an amber dot | Slate is the same as the interface. The dot accent is lost at 16 px. Amber means a warning in the tokens. |

## Open checks

- Search for similar marks before public use. A frame with a dot is a common shape.
- "Lui" is a short, common name. Check the trademark separately.
- Check the favicon in a real browser tab, light and dark. The preview page cannot show the dark tab.
- Not tested: the shelf test against Radix, shadcn/ui, Open Props and Primer, colour-blind view, the white version on photos, print.
- The mark has no wordmark. The README header and the social preview use plain system-font text, not outlines.
