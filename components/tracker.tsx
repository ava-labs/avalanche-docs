'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const IndexedDBComponent: React.FC = () => {
  const currentPath = usePathname();

  useEffect(() => {
    const request = indexedDB.open("PathDatabase", 1);

    request.onerror = function (event: any) {
      console.error("Database error:", event.target.errorCode);
    };

    request.onupgradeneeded = function (event: any) {
      const db = event.target.result as IDBDatabase;
      const objectStore = db.createObjectStore("paths", { keyPath: "id", autoIncrement: true });
      objectStore.createIndex("path", "path", { unique: false });
    };

    request.onsuccess = function (event: any) {
      const db = event.target.result as IDBDatabase;
      const transaction = db.transaction(["paths"], "readwrite");
      const objectStore = transaction.objectStore("paths");
      const index = objectStore.index("path");

      const getRequest = index.get(currentPath);

      getRequest.onsuccess = function (event: any) {
        if (event.target.result) {
          console.log("Path already exists in Academy DB:", currentPath);
        } else {
          const addRequest = objectStore.add({ path: currentPath });

          addRequest.onsuccess = function () {
            console.log("Path has been added to Academy DB:", currentPath);
          };

          addRequest.onerror = function (event: any) {
            console.error("Error adding path:", event.target.errorCode);
          };
        }
      };

      getRequest.onerror = function (event: any) {
        console.error("Error checking path:", event.target.errorCode);
      };

      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = function (event: any) {
        const paths = event.target.result as { path: string }[];
        paths.forEach(item => {
          const sidebarItem = document.querySelector(`aside a[href="${item.path}"]`);
          
          if (sidebarItem) {
            // Check if a checkmark already exists
            const existingCheckmark = sidebarItem.querySelector('.lucide-check');
            
            // If no checkmark exists, append a new one
            if (!existingCheckmark) {
              sidebarItem.innerHTML += `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3752AC" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check ml-auto shrink-0"><path d="M20 6 9 17l-5-5"></path></svg>
              `;
            }
          }
          
        });
      };

      getAllRequest.onerror = function (event: any) {
        console.error("Error retrieving all paths:", event.target.errorCode);
      };
    };
  }, [currentPath]);

  return null;
};

export default IndexedDBComponent;

