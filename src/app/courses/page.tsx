import Link from 'next/link'

const courses = [
  { title: 'Падение Римской империи', subject: 'История' },
  { title: 'Путешествие внутри клетки', subject: 'Биология' },
  { title: 'Лаборатория гравитации', subject: 'Физика' },
] as const

export default function Courses() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-28">
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Курсы
      </h1>

      <p className="mt-3 max-w-2xl text-white/60">
        Откройте урок в VR-классе — там сцена, ИИ-тьютор и управление камерой.
      </p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <li
            key={course.title}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-white/45">
              {course.subject}
            </p>
            <h2 className="mt-2 text-lg font-medium text-white">
              {course.title}
            </h2>
            <Link
              href="/vr"
              className="mt-6 inline-flex rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Открыть в VR
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
