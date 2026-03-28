export default function Home() {

  return (

    <div className="flex flex-col items-center text-center px-6">

      <section className="max-w-4xl mt-32">

        <h1 className="text-7xl font-bold glow float">
          Узнайте больше о виртуальной реальности изнутри
        </h1>

        <p className="text-gray-300 text-xl mt-6">
          Изучайте историю, биологию и физику с помощью захватывающих уроков в виртуальной реальности, созданных на основе искусственного интеллекта.
        </p>

        <button className="neon-button mt-10 px-10 py-4 rounded-xl text-lg">
          Начать обучение
        </button>

      </section>


      <section className="grid md:grid-cols-3 gap-10 mt-28 max-w-6xl">

        <div className="glass p-8 rounded-2xl">

          <h3 className="text-2xl font-semibold mb-4">
            🧠 ИИ-репетитор
          </h3>

          <p className="text-gray-400">
            Персонализированные объяснения и адаптивное обучение.
          </p>

        </div>

        <div className="glass p-8 rounded-2xl">

          <h3 className="text-2xl font-semibold mb-4">
            🎮 Уроки виртуальной реальности
          </h3>

          <p className="text-gray-400">
            Исследуйте исторические события и научные миры в VR.
          </p>

        </div>

        <div className="glass p-8 rounded-2xl">

          <h3 className="text-2xl font-semibold mb-4">
            📊 Умный прогресс
          </h3>

          <p className="text-gray-400">
            ИИ отслеживает ваш прогресс и регулирует сложность.
          </p>

        </div>

      </section>

    </div>

  )
}