'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { routes } from '@/constants/routes';
import { cn } from '@/lib/utils';

const ClientNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4">
      {routes.map(route => (
        <Link
          key={route.key}
          href={route.href}
          className={cn(
            'text-sm font-medium text-muted-foreground transition-colors hover:text-black/90 dark:hover:text-white/90',
            pathname.includes(route.href) ? 'text-black dark:text-white' : 'text-muted-foreground',
          )}>
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default ClientNavbar;
