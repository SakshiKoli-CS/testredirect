import Link from 'next/link';

export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page.</p>
      <Link href="/">Go to Home</Link>
      {' | '}
      <Link href="/contact">Go to Contact</Link>
    </div>
  );
}

