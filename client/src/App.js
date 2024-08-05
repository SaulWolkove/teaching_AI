import { useState } from 'react';
import Grid from '@mui/material/Grid';

import Banner from "./Components/Banner"
import PromptMenu from "./Components/PromptMenu"
import Results from "./Components/Results"
import { getResponse, postPair } from './API';
import { fileQuestionMC, fileQuestionTF } from './ComponentFunctions/QuestionFiler';

function App() {


  const [response,setResponse] = useState(""); //response data for question/answer
  const [topic,setTopic] = useState(""); //topic of question
  const [difficulty,setDifficulty] = useState(""); //difficulty of question
  const [rawResponse,setRawResponse] = useState(""); //raw response data for db posting
  const [starting,setStarting] = useState(true); // boolean value to determine if user has prompted the prompt menu yet
  const [redo, setRedo] = useState(false); // boolean value to determine if user is redoing a prompt or starting a new prompt

  const submitPrompt = async (e, topic, difficulty, questionType) => {
    //Submits prompt to API and sets response data to string of filed question
      e.preventDefault();
      try {
        //fetch data from api
        let responseData = await getResponse(topic, difficulty,questionType === "multipleChoice" ? "MC" : "TF");
        setRawResponse(responseData)
        //file question from string to data object
        if(questionType === "multipleChoice"){
          responseData = fileQuestionMC(responseData)
        } else if (questionType === "trueOrFalse"){
          responseData = fileQuestionTF(responseData)
        }
        //set the response to the response data object 
        setResponse(responseData); 
        setStarting(false)
      } catch (error) {
          console.error('Error fetching response:', error);
          // Handle error if necessary
      }
  }


  return (
    <div>
      <Banner/>
      {!starting ? 
      <Grid item container spacing={2} sx={{height:"100%"}}>
        <Grid item xs={4}>
            <PromptMenu submitPrompt={submitPrompt} setTopic={setTopic} setDifficulty={setDifficulty} difficulty={difficulty} topic={topic} redo={redo} setRedo={setRedo}/>
        </Grid>
        <Grid item xs={8}>
          <Results content={response} topic={topic} postPair={()=>postPair(rawResponse, difficulty, topic)}/>
        </Grid>
      </Grid> : 
      <PromptMenu submitPrompt={submitPrompt} setTopic={setTopic} setDifficulty={setDifficulty} difficulty={difficulty} topic={topic} redo={redo} setRedo={setRedo}/>
      }
    </div>
    
  );
}

export default App;
