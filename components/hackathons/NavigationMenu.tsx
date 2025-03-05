'use client';

import { useHash } from '@/hooks/use-hash-route';

interface MenuItem {
  name: string;
  ref: string;
}

interface NavigationMenuProps {
  items: MenuItem[];
}

export function NavigationMenu({ items }: NavigationMenuProps) {
  const currentPath = useHash();
  return (
    <div className='py-4 px-8 border-b border-gray-700'>
      <nav className='text-sm'>
        <ul className='flex gap-6 px-4 py-2 text-sm'>
          {items.map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.ref}`}
                className={`hover:text-zinc-300 transition-colors cursor-pointer ${
                  currentPath?.includes(item.ref) ? 'font-bold' : ''
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
