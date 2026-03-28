export default function Courses(){

const courses = [
  {
    title:"Падение Римской империи",
    subject:"История"
  },
  {
    title:"Путешествие внутри клетки",
    subject:"Биология"
  },
  {
    title:"Лаборатория гравитации",
    subject:"Физика"
  }
]

return(

<div className="max-w-6xl mx-auto px-6">

<h1 className="text-5xl font-bold mb-12 glow">
Курсы
</h1>

<div className="grid md:grid-cols-3 gap-8">

{courses.map((course,i)=>(

<div key={i} className="glass p-8 rounded-2xl hover:scale-105 transition">

<h2 className="text-2xl font-semibold mb-2">
{course.title}
</h2>

<p className="text-gray-400">
{course.subject}
</p>

<button className="neon-button mt-6 px-6 py-2 rounded-lg">
Начать
</button>

</div>

))}

</div>

</div>

)

}