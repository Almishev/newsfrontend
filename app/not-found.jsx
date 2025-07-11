import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Страницата не е намерена</h2>
      <p className="mb-6 text-gray-600">Съжаляваме, но търсената страница не съществува или е преместена.</p>
      <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Към началната страница
      </Link>
    </div>
  );
} 