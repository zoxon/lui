#!/usr/bin/env python3
"""Build the Lui logo kit (mark E, colour Blue). Standard library only.
Edit the PALETTE block to change a colour, then run: python3 build_kit.py   (writes ../svg).
Colours come from src/tokens/colors.css."""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'svg'
PALETTE = {
  'ink': '#2563eb',      # --color-blue-600: the mark on light grounds
  'pale': '#93c5fd',     # --color-blue-300: the mark on dark grounds
  'ground': '#0f172a',   # --color-slate-900: the ground of the tile
}
# Main cut and small-size cut (thicker frame, bigger dot, wider gaps). 256 grid, sharp corners.
MAIN = ('M36 36H150V70H70V186H186V106H220V220H36Z', 'M186 36H220V70H186Z')
SMALL = ('M26 26H142V72H72V184H184V112H230V230H26Z', 'M184 26H230V72H184Z')


def svg(inner, root=''):
  return f'<svg xmlns="http://www.w3.org/2000/svg" {root}viewBox="0 0 256 256">{inner}</svg>\n'


def mark(cut, colour, cls=''):
  return ''.join(f'<path{cls} fill="{colour}" d="{d}"/>' for d in cut)


def write(name, text):
  OUT.mkdir(parents=True, exist_ok=True)
  (OUT / name).write_text(text, encoding='utf-8')


ink, pale, ground = PALETTE['ink'], PALETTE['pale'], PALETTE['ground']
write('symbol-ink.svg', svg(f'<title>Lui</title>{mark(MAIN, ink)}'))
write('symbol-pale.svg', svg(f'<title>Lui</title>{mark(MAIN, pale)}'))
write('symbol-small-ink.svg', svg(f'<title>Lui</title>{mark(SMALL, ink)}'))
write('symbol-small-pale.svg', svg(f'<title>Lui</title>{mark(SMALL, pale)}'))
write('symbol-white.svg', svg(f'<title>Lui</title>{mark(MAIN, "#ffffff")}'))
write('symbol-black.svg', svg(f'<title>Lui</title>{mark(MAIN, "#000000")}'))
# Favicon: transparent, small-size cut, follows the browser theme. The rules use #fav so they stay inside the file.
css = f'#fav path{{fill:{ink}}}@media (prefers-color-scheme:dark){{#fav path{{fill:{pale}}}}}'
write('favicon.svg', svg(f'<style>{css}</style><title>Lui</title>{mark(SMALL, ink)}', 'id="fav" '))
# App icon: a full square (the platform rounds the corners). The rounded tile is for the README header only.
tile = (f'<title>Lui</title><rect{{R}} width="256" height="256" fill="{ground}"/>'
        f'<g transform="translate(48.6 48.6) scale(.62)">{mark(MAIN, pale)}</g>')
write('app-icon.svg', svg(tile.replace('{R}', '')))
write('app-icon-rounded.svg', svg(tile.replace('{R}', ' rx="56"')))
print('wrote the kit to', OUT)
