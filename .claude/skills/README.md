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
