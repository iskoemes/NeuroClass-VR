"use client"

import { useState } from "react"

export default function AITutor(){

const [question,setQuestion]=useState("")
const [answer,setAnswer]=useState("")

const askAI=()=>{

setAnswer("AI explanation for: "+question)

}

return(

<div className="glass p-6 rounded-xl">

<h2 className="text-xl mb-4">
AI Tutor
</h2>

<input
className="p-3 bg-black border w-full"
placeholder="Ask anything"
onChange={(e)=>setQuestion(e.target.value)}
/>

<button
className="mt-4 px-6 py-2 bg-purple-600 rounded"
onClick={askAI}
>
Ask
</button>

<p className="mt-4">{answer}</p>

</div>

)

}