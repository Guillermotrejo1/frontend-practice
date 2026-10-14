import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const [day, slug] = process.argv.slice(2);
if (!day || !slug) {
  console.error('Usage: npm run new -- <day 1|2|3> <slug>   e.g. npm run new -- 2 user-search');
  process.exit(1);
}

const date = new Date().toLocaleDateString('en-CA'); // local YYYY-MM-DD
const name = slug.split('-').map((s) => s[0].toUpperCase() + s.slice(1)).join('');
const dir = path.join('app', 'challenges', `${date}-day${day}-${slug}`);

try {
  await access(dir);
  console.error(`${dir} already exists`);
  process.exit(1);
} catch {}

await mkdir(dir, { recursive: true });

await writeFile(path.join(dir, 'page.tsx'),
`import ${name} from './${name}';

export default function Page() {
  return <${name} />;
}
`);

await writeFile(path.join(dir, `${name}.tsx`),
`'use client';

export default function ${name}() {
  return <div>${name}</div>;
}
`);

await writeFile(path.join(dir, 'NOTES.md'),
`# Day ${day}: ${slug} (${date})

## Challenge
(paste the prompt here)

## My approach / root causes

## Complexity

## Hints used: 0

## Score

## What I'd do differently
`);

console.log(`Created ${dir}\nOpen http://localhost:3000/challenges/${path.basename(dir)}`);