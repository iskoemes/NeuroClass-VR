"use client"

import Link from "next/link"

export default function Navbar() {

  return (

    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-4 glass">

      <h1 className="text-2xl font-bold glow">
        NeuroClass VR
      </h1>

      <div className="flex gap-8 text-gray-300">

        <Link href="/" className="hover:text-white transition">
          главная
        </Link>

        <Link href="/courses" className="hover:text-white transition">
            курсы
        </Link>

        <Link href="/dashboard" className="hover:text-white transition">
          панель управления
        </Link>

        <Link href="/vr" className="hover:text-white transition">
         VR-класс
        </Link>

      </div>

    </nav>

  )
}