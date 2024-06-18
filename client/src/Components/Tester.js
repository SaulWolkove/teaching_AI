import { useState } from "react"
import getResponse from "../APIs"


export default function Tester(){

    const [prompt,setPrompt] = useState("");
    const [response,setResponse] = useState("");

    const submitPrompt = async (e) => {
        e.preventDefault();
        console.log(prompt)
        try {
            const responseData = await getResponse(prompt);
            setResponse(responseData); // Update state with the response data
        } catch (error) {
            console.error('Error fetching response:', error);
            // Handle error if necessary
        }
    };

    return(
        <div>
            <form onSubmit={(e)=>submitPrompt(e)}>
                <input type="text" onChange={(e)=>setPrompt(e.target.value)}></input>
                <button type="submit"></button>
            </form>
            <div>
                Here: {response}
            </div>
        </div>
    )
}