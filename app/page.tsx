import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import Link from 'next/link';

export default function Home() {
  const dir = path.join(process.cwd(), 'app', 'challenges');
  const challenges = existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .sort()
        .reverse()
    : [];

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-4 text-2xl font-bold">Challenges</h1>
      <ul className="space-y-2">
        {challenges.map((c) => (
          <li key={c}>
            <Link href={`/challenges/${c}`} className="text-blue-600 hover:underline">
              {c}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}