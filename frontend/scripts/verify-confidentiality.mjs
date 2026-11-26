import fs from 'node:fs';
import path from 'node:path';

const FRONTEND_DIR = path.resolve(import.meta.dirname, '..');
const NEXT_DIR = path.join(FRONTEND_DIR, '.next');
const PUBLIC_DIR = path.join(FRONTEND_DIR, 'public');

const FORBIDDEN_PATTERNS = [
  /seltrix/i,
  /nexusone/i,
  /breath-?work/i,
  /zponz/i,
  /govpass/i,
  /app?olo/i,
  /adunity/i,
  /quickbizz/i,
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else {
      files.push(full);
    }
  }
  return files;
}

let failures = 0;

// 1. Check .next/static and .next/server/app for forbidden product names
for (const subdir of ['static', 'server/app']) {
  const dir = path.join(NEXT_DIR, subdir);
  for (const file of walk(dir)) {
    if (/\.(png|jpg|jpeg|webp|woff2?|ico)$/i.test(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (pattern.test(content)) {
        console.error(`FAIL: Forbidden pattern ${pattern} found in ${path.relative(FRONTEND_DIR, file)}`);
        failures += 1;
      }
    }
  }
}

// 2. Check no .map source maps exist in .next/static
for (const file of walk(path.join(NEXT_DIR, 'static'))) {
  if (file.endsWith('.map')) {
    console.error(`FAIL: Public source map found in ${path.relative(FRONTEND_DIR, file)}`);
    failures += 1;
  }
}

// 3. Check public asset filenames (excluding resume.pdf which is flagged separately)
for (const file of walk(PUBLIC_DIR)) {
  const rel = path.relative(PUBLIC_DIR, file);
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(rel)) {
      console.error(`FAIL: Branded public asset filename: ${rel}`);
      failures += 1;
    }
  }
}

if (failures > 0) {
  console.error(`\nConfidentiality verification failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log('PASS: Production bundle, server HTML, source maps, and public asset filenames are clean.');
