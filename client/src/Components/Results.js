import { useState, useEffect } from "react"
import { postPair } from "../APIs"
import {Grid, Typography, Button} from "@mui/material"
import { getExplain, postPair } from "../APIs";

export default function Results({content, prompt, difficulty, topic}){
    const [outcome, setOutcome] = useState(2);
    const [explanation, setExplanation] = useState("");

    const submitPair = () => {
        if( prompt === "" || content === ""){
            return
        }
        else{
            postPair(prompt, content, difficulty, topic)
        }
    }

    useEffect(() => {
        // Update state when someProp changes
        setOutcome(2);
        setExplanation("");
      }, [content]);

    const colors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFECB3']; // Array of background colors

    const submitGuess = (option) => {
        if (option === content.answer){
            setOutcome(1)
        }else{
            setOutcome(0)
        }
    }

    const submitExplain = () => {
        getExplain(content.question, content.answer);
    }

    return (
        <div style={{ padding: '20px', fontSize: '1.5em', paddingTop:"100px" }}>
          <div>
            <div style={{ marginBottom: '20px' }}>
              <Typography variant="h4" component="div">
                {content.question}
              </Typography>
            </div>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {content && content.options.map((option, index) => (
                <Grid item xs={6} key={index}>
                  <div style={{ 
                    backgroundColor: (outcome == 0 && option === content.answer) ? "#ffbf00": (outcome == 1 && option === content.answer) ? "#4ae54a" : colors[index % colors.length], 
                    opacity: outcome !== 2 && option !== content.answer ? 0.5 : 1,
                    padding: '20px', 
                    borderRadius: '10px',
                    height: '150px', // Fixed height for uniform size
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.5s',

                  }}
                  onClick={()=>submitGuess(option)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    }}>
                    
                    <Typography variant="h6" component="div">
                        {outcome == 1 && option === content.answer &&
                        <div>
                            Correct
                        </div>}
                      {option}
                      {outcome != 2 && option === content.answer &&
                        <div onClick = {submitExplain}>
                            Find Out Why
                        </div>}
                    </Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
          {content !== "" && (
            <Button 
              variant="contained" 
              color="primary" 
              onClick={submitPair} 
              style={{ marginTop: '20px', fontSize: '1em' }}
            >
              Like this Question?
            </Button>
          )}
        </div>
      );
    };


/*
{content.options.map((option)=>(
    <div>
        {option}
    </div>
))
}
*/