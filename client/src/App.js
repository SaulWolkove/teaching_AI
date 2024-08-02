import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Banner from "./Components/Banner"
import PromptMenu from "./Components/PromptMenu"
import Results from "./Components/Results"
import { useState } from 'react';
import { getResponse, postPair } from './APIs';
function App() {
  
  const [response,setResponse] = useState("");
  const [topic,setTopic] = useState("");
  const [difficulty,setDifficulty] = useState("");
  const [rawResponse,setRawResponse] = useState("");
  const [starting,setStarting] = useState(true);
  const [redo, setRedo] = useState(false);






    const submitPrompt = async (e, topic, difficulty, questionType) => {

        e.preventDefault();
        try {
            let responseData = await getResponse(topic, difficulty,questionType === "multipleChoice" ? "MC" : "TF");
            setRawResponse(responseData)
            if(questionType === "multipleChoice"){
              responseData = fileQuestionMC(responseData)
            } else if (questionType === "trueOrFalse"){
              responseData = fileQuestionTF(responseData)
            }
            setResponse(responseData); // Update state with the response data
            setStarting(false)

        } catch (error) {
            console.error('Error fetching response:', error);
            // Handle error if necessary
        }
    }

    const fileQuestionMC = (str) => {
      let startOfQuestion = str.indexOf("Question: ") + "Question: ".length;
      let endOfQuestions = str.indexOf("Options:");
      let lengthOfPreceding = "Options:".length;
      
      if (endOfQuestions === -1) {
          endOfQuestions = str.indexOf("A)");
          lengthOfPreceding = 2;
      }
  
      let question = str.slice(startOfQuestion, endOfQuestions).trim();

      let startOfOptions = endOfQuestions + lengthOfPreceding;
      let endOfOptions = str.indexOf("Answer:");
      let options = str.slice(startOfOptions, endOfOptions).split("\n");

      options = options.slice(1,5);
  
      let answer = str.slice(endOfOptions + "Answer:".length).trim();

      const filtered = {
          question: question,
          options: options,
          answer: answer,
          qType: "mc"
      };
  
      return filtered;
  };

  const fileQuestionTF = (str) => {
    let types = str.split(":")

    const answer = types[2].trim().toLowerCase()
    if (answer.endsWith('.')) {
      answer = answer.slice(0, -1);
    }

    const filtered = {
      question: types[1].split("\n")[0],
      options: ["true","false"],
      answer: answer,
      qType: "tf"
    };
    console.log(filtered)
    return filtered
  }

  const submitPair =()=>{


    postPair(rawResponse, difficulty, topic)
  }

  return (
    <div>
      <Banner/>

      {!starting ? <Grid item container spacing={2} sx={{height:"100%"}}>
        <Grid item xs={4}>
            <PromptMenu submitPrompt={submitPrompt} setTopic={setTopic} setDifficulty={setDifficulty} difficulty={difficulty} topic={topic} redo={redo} setRedo={setRedo}/>
        </Grid>
        <Grid item xs={8}>
          <Results content={response} prompt={topic} topic={topic} difficulty={difficulty} postPair={submitPair}/>
        </Grid>
      </Grid> : 
            <PromptMenu submitPrompt={submitPrompt} setTopic={setTopic} setDifficulty={setDifficulty} difficulty={difficulty} topic={topic} redo={redo} setRedo={setRedo}/>
}
    </div>
    
  );
}

export default App;
