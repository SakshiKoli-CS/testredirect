import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to my simple Next.js app!</p>
      <Link href="/about">Go to About</Link>
      {' | '}
      <Link href="/contact">Go to Contact</Link>
    </div>
  );
}

