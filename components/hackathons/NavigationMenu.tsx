"use client"

interface MenuItem {
  name: string
  ref: string
}

interface NavigationMenuProps {
  items: MenuItem[]
}

export function NavigationMenu({ items }: NavigationMenuProps) {
  return (
    <div className="p-4 border-b border-gray-700">
      <nav className="text-sm">
        <ul className="flex space-x-4 px-4 py-2 text-sm">
          {items.map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.ref}`}
                className="hover:text-zinc-300 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(item.ref)
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}