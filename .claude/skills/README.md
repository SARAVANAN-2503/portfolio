# Project skills

Frontend design skills from **Taste Skill** (<https://www.tasteskill.dev/>),
source repo <https://github.com/Leonxlnx/taste-skill> (MIT).

Vendored at upstream commit `ccbc15639c97057cbfcf32ecebc38ef716e4bb37`.

Each directory is named after the `name:` field in its `SKILL.md` frontmatter,
which is the name Claude Code registers the skill under. The upstream folder
names differ (e.g. `soft-skill` -> `high-end-visual-design`).

| Skill | What it's for |
| --- | --- |
| `design-taste-frontend` | Main anti-slop skill: landing pages, portfolios, redesigns (v2) |
| `design-taste-frontend-v1` | The original v1, kept only for exact backward compatibility |
| `high-end-visual-design` | Agency-tier visual polish: type, spacing, shadows, motion |
| `minimalist-ui` | Clean editorial monochrome, flat bento grids |
| `industrial-brutalist-ui` | Swiss-print / tactical-terminal aesthetic |
| `gpt-taste` | AIDA structure + GSAP ScrollTrigger motion engineering |
| `image-to-code` | Generate design images first, then implement to match |
| `imagegen-frontend-web` | One reference image per web section (images only, no code) |
| `imagegen-frontend-mobile` | Premium mobile app screen concepts (images only, no code) |
| `stitch-design-taste` | Emits `DESIGN.md` for Google Stitch |
| `full-output-enforcement` | Bans truncation and placeholder output |

Two upstream skills are **not** vendored here — `brandkit` and
`redesign-existing-projects` — because they are already installed as
account-level skills and the files are byte-identical. Vendoring them would
create duplicate skill names.

## Updating

```bash
git clone --depth 1 https://github.com/Leonxlnx/taste-skill /tmp/taste-skill
# then copy /tmp/taste-skill/skills/<folder>/ over the matching directory here
```

Upstream's own installer is `npx skills add https://github.com/Leonxlnx/taste-skill`,
which installs into a personal skills directory rather than into this repo.

---

## Browser automation

`playwright-skill` from <https://github.com/lackeyjb/playwright-skill> (MIT),
vendored at `dd47a6a023e249eb1b36e9e943eab89d0900865d`.

Self-contained: `SKILL.md`, `run.js`, `lib/helpers.js`, `API_REFERENCE.md`,
plus its own `package.json`. First use runs `npm install && npx playwright
install chromium` inside the skill directory; `node_modules/` is covered by the
repo `.gitignore`. Needs Node 20+ (repo runs on 22).

## Aesthetic skills

Eight of the 68 skills in <https://github.com/bergside/awesome-design-skills>
(MIT), vendored at `f631a09b4fcc0166f2e2c1a8c81906ef680c57e8`. Each is a `SKILL.md` plus a `DESIGN.md` of
concrete tokens.

Selected for fit with the Obsidian Crimson system (near-black `#08090b`, ivory
text, crimson accent, light + dark):

`power`, `premium`, `refined`, `editorial`, `minimal`, `sleek`,
`contemporary`, `bento`

The other 60 (`pacman`, `riso`, `claymorphism`, `sega`, …) are deliberately not
vendored — they clash with this system, and 68 skill descriptions in every
session's preamble is a real context cost. To add one:

```bash
git clone --depth 1 https://github.com/bergside/awesome-design-skills /tmp/ads
cp -r /tmp/ads/skills/<name> .claude/skills/<name>
```

Note: these use short generic names (`power`, `minimal`, `bento`) that can
trigger on loose phrasing, and `minimal` overlaps `minimalist-ui` above. Name
the skill explicitly when you want a specific one.
