import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Banner from "./Components/Banner"
import PromptMenu from "./Components/PromptMenu"
import Results from "./Components/Results"
import { useState } from 'react';
import { getResponse } from './APIs';
function App() {
  
  const [response,setResponse] = useState("");
  const [topic,setTopic] = useState("");
  const [difficulty,setDifficulty] = useState("");
  

    const submitPrompt = async (e, topic, difficulty, questionType) => {
        e.preventDefault();
        try {
            let responseData = await getResponse(topic, difficulty,questionType);
            if(questionType === "MC"){
              responseData = fileQuestionMC(responseData)
            } else if (questionType === "TF"){
              responseData = fileQuestionTF(responseData)
              console.log(responseData)
            }
            setResponse(responseData); // Update state with the response data
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

    const filtered = {
      question: types[1].split("\n")[0],
      options: ["true","false"],
      answer: types[2],
      qType: "tf"
    };
    console.log(filtered)
    return filtered
  }

  const fileQuestionFTB = (str) => {
    console.log(str)
  }

  return (
    <div>
      <Banner/>

      <Grid item container spacing={2} sx={{height:"100%"}}>
        <Grid item xs={4}>
            <PromptMenu submitPrompt={submitPrompt} setTopic={setTopic} setDifficulty={setDifficulty} difficulty={difficulty} topic={topic}/>
        </Grid>
        <Grid item xs={8}>
          <Results content={response} prompt={prompt} topic={topic} difficulty={difficulty}/>
        </Grid>
      </Grid>
    </div>
    
  );
}

export default App;
