// src/components/ui/logo.tsx
import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/logo.png"
        alt="Logo"
        width={32}
        height={32}
        className="w-8 h-8"
      />
      <span className="font-bold text-xl">Expense Manager</span>
    </Link>
  );
}