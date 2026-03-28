import Link from 'next/link'

export default function Dashboard() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-28">
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Панель
      </h1>

      <p className="mt-3 text-white/60">
        Краткий обзор — можно расширить под ваши метрики.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-white/50">Бонусы</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-white">
            0
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-white/50">Уровень</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-white">
            6
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-white/50">Курсы</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-white">
            3
          </p>
        </div>
      </div>

      <Link
        href="/vr"
        className="mt-10 inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-white/90"
      >
        Перейти в VR-класс
      </Link>
    </main>
  )
}
