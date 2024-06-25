import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Banner from "./Components/Banner"
import PromptMenu from "./Components/PromptMenu"
import Results from "./Components/Results"
import { useState } from 'react';
import { getResponse } from './APIs';
function App() {
  
  const [response,setResponse] = useState("");

    const submitPrompt = async (e, prompt) => {
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
  return (
    <div>
      <Banner/>

      <Grid item container spacing={2} sx={{height:"100%"}}>
        <Grid item xs={4}>
            <PromptMenu submitPrompt={submitPrompt}/>
        </Grid>
        <Grid item xs={8}>
          <Results content={response}/>
        </Grid>
      </Grid>
    </div>
    
  );
}

export default App;
