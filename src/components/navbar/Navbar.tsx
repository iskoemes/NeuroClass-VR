'use client'

import Link from 'next/link'

const links = [
  { href: '/', label: 'Главная' },
  { href: '/courses', label: 'Курсы' },
  { href: '/dashboard', label: 'Панель' },
  { href: '/vr', label: 'VR-класс' },
] as const

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-white"
        >
          NeuroClass VR
        </Link>

        <ul className="flex flex-wrap items-center justify-end gap-6 text-sm text-white/70">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="transition hover:text-white"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
