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
  

    const submitPrompt = async (e, topic, difficulty) => {
        e.preventDefault();
        try {
            let responseData = await getResponse(topic, difficulty,"Multiple Choice");
            responseData = fileQuestion(responseData)
            setResponse(responseData); // Update state with the response data
        } catch (error) {
            console.error('Error fetching response:', error);
            // Handle error if necessary
        }
    }

    const fileQuestion =(str)=>{
      let startOfQuestion = str.indexOf("Question: ") + "Question: ".length;
      let endOfQuestions = str.indexOf("Options:");
      let lengthOfPreceding = "Options:".length;
      if(endOfQuestions == -1){
        endOfQuestions = str.indexOf("A)");
        lengthOfPreceding = 2;
      }
      let question = str.slice(startOfQuestion,endOfQuestions);
      let startOfOptions = endOfQuestions + lengthOfPreceding;
      let endOfOptions = str.indexOf("Answer:");
      let options = str.slice(startOfOptions,endOfOptions);
      let answer = str.slice(endOfOptions + "ANswer:".length);

      const filtered = {
        questions: question,
        options: options,
        answer: answer

      }
      console.log(filtered)
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
