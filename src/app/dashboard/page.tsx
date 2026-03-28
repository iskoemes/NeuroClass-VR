export default function Dashboard(){

return(

<div className="max-w-6xl mx-auto px-6">

<h1 className="text-5xl font-bold mb-12 glow">
Dashboard
</h1>

<div className="grid md:grid-cols-3 gap-8">

<div className="glass p-8 rounded-xl">
<h2 className="text-xl">Бонус</h2>
<p className="text-3xl font-bold mt-2">0</p>
</div>

<div className="glass p-8 rounded-xl">
<h2 className="text-xl">Уровень</h2>
<p className="text-3xl font-bold mt-2">6</p>
</div>

<div className="glass p-8 rounded-xl">
<h2 className="text-xl">Курсы</h2>
<p className="text-3xl font-bold mt-2">3</p>
</div>

</div>

</div>

)

}