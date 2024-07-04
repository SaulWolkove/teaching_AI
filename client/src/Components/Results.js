import { useState } from "react"
import { postPair } from "../APIs"

export default function Results({content, prompt, difficulty, topic}){
    const [selected, setSelected] = useState("")

    const submitPair = () => {
        if( prompt === "" || content === ""){
            return
        }
        else{
            postPair(prompt, content, difficulty, topic)
        }
    }

    console.log(content.options)

    


    return(
        <div>
            {content.question}
            {content.options}
            {content.answer}
            {content !== "" && <button onClick = {submitPair}>Like this Quiz Set?</button>}
        </div>
    )
}


/*
{content.options.map((option)=>(
    <div>
        {option}
    </div>
))
}
*/