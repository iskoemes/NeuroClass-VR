import Link from 'next/link'

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col justify-center px-6 pb-20 pt-28">
      <p className="text-sm font-medium tracking-wide text-white/50">
        NeuroClass VR
      </p>

      <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
        Обучение в виртуальной реальности с ИИ-тьютором
      </h1>

      <p className="mt-6 text-pretty text-lg leading-relaxed text-white/65">
        История, биология и физика — через VR-сцены и персональные объяснения на русском.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link
          href="/vr"
          className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-medium text-zinc-950 transition hover:bg-white/90"
        >
          Начать обучение
        </Link>

        <Link
          href="/courses"
          className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 text-base font-medium text-white/90 transition hover:border-white/30 hover:bg-white/5"
        >
          Курсы
        </Link>
      </div>

      <ul className="mt-16 grid gap-6 border-t border-white/10 pt-12 sm:grid-cols-3">
        <li>
          <p className="text-sm font-medium text-white">ИИ-тьютор</p>
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            Ответы и объяснения под ваш темп.
          </p>
        </li>
        <li>
          <p className="text-sm font-medium text-white">VR-уроки</p>
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            Сцены и объекты, с которыми можно взаимодействовать.
          </p>
        </li>
        <li>
          <p className="text-sm font-medium text-white">Прогресс</p>
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            Панель с обзором активности.
          </p>
        </li>
      </ul>
    </main>
  )
}
