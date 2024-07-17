import { useState, useEffect } from "react"
import {Grid, Typography, Button, CardContent, Card, IconButton} from "@mui/material"
import { getTeach, postPair } from "../APIs";
import CloseIcon from '@mui/icons-material/Close';

export default function Results({content, prompt, difficulty, topic}){
    const [outcome, setOutcome] = useState(2);
    const [explanation, setExplanation] = useState("");
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);



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
        setShow(false);
      }, [content]);

    const colors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFECB3']; // Array of background colors

    const submitGuess = (option) => {
        if (option === content.answer){
            setOutcome(1)
        }else{
            setOutcome(0)
        }
    }

    useEffect(() => {
      const fetchTeachData = async () => {
        try {
          setLoading(true); // Set loading state to true
          const teachData = await getTeach(topic, content.question, content.answer);
          setExplanation(teachData); // Set fetched data to explanation state
          setLoading(false); // Set loading state to false after fetching data
        } catch (error) {
          setLoading(false); // Set loading state to false in case of error
        }
      };
  
      fetchTeachData();
    }, [topic, content]);
  

    return (
        <div style={{ padding: '20px', fontSize: '1.5em', paddingTop:"100px" }}>
          {!loading && show && <Card
        sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        width: '60vw', // 60% of viewport width
        maxWidth: '600px', // Maximum width of 600px
        maxHeight: '80vh', // Maximum height of 80% of viewport height
        overflow: 'auto', // Enable scrolling if content exceeds dimensions
        backgroundColor: '#ffffff', // Solid white background color
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', // Optional: Adds a subtle shadow
        padding: '16px', // Optional: Add padding for better content spacing
      }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Here's Why
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {explanation}
        </Typography>
        <IconButton
          aria-label="close"
          sx={{ position: 'absolute', top: 0, right: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </CardContent>
    </Card>}
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
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    setShow(false);
                    }}>
                    
                    <Typography variant="h6" component="div">
                        {outcome == 1 && option === content.answer &&
                        <div>
                            Correct
                        </div>}
                      {option}
                      {outcome != 2 && option === content.answer && option === content.answer &&
                        <div onClick = {()=>setShow(true)}>
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