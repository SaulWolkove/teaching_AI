import { postPair } from "../APIs"

export default function Results({content, prompt, difficulty, topic}){

    const submitPair = () => {
        if( prompt === "" || content === ""){
            return
        }
        else{
            postPair(prompt, content, difficulty, topic)
        }
    }

    


    return(
        <div>
            {content}
            {content !== "" && <button onClick = {submitPair}>Like this Quiz Set?</button>}
        </div>
    )
}