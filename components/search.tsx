'use client';
import { OramaSearchBox } from "@orama/react-components";
import type { SharedProps } from 'fumadocs-ui/components/dialog/search';
import { useEffect, useRef } from 'react';

export default function SearchDialog(props: SharedProps) {
  const searchBoxRef = useRef(null);

  useEffect(() => {
    if (searchBoxRef.current) {
      (window as any).__oramaSearchBox = searchBoxRef.current;
    }

    const handleSearchButtonClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('button[data-search-full]') || target.closest('button[data-search]')) {
        event.preventDefault();
        toggleSearch();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        toggleSearch();
      }
    };

    const toggleSearch = () => {
      if (searchBoxRef.current) {
        if (typeof (searchBoxRef.current as any).setOpen === 'function') {
          (searchBoxRef.current as any).setOpen(true);
          return;
        }
      }

      const searchBoxElement = document.querySelector('orama-search-box') || document.querySelector('[data-orama-search]');
      
      if (searchBoxElement) {
        if ('open' in searchBoxElement) {
          (searchBoxElement as any).open = !(searchBoxElement as any).open;
        }
      } else {
        console.warn('Search box element not found in DOM');
      }
    };

    document.addEventListener('click', handleSearchButtonClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleSearchButtonClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <OramaSearchBox
      ref={searchBoxRef}
      index={{
        endpoint: "https://cloud.orama.run/v1/indexes/build-avax-network-j5catx",
        api_key: "1J1RCcZwUUdw8CRIgMhUfFUoGJHeSmXe",
      }}
      resultMap={{
        "title": "title",
        "description": "content"
      }}
      {...props}
    />
  );
}