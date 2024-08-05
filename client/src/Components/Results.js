import { useState, useEffect } from "react"
import {Grid, Typography, Button, CardContent, Card, IconButton} from "@mui/material"
import { getTeach, postPair } from "../API";
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function Results({content, topic, postPair}){

  const [outcome, setOutcome] = useState(2);//outcome of users answer to question. 2 = not answered, 1 = correct, 2 = not correct
  const [accuracy, setAccuracy] = useState(0);//mathimatical value of user accuracy based on questions
  const [numGuesses, setNumGuesses] = useState(0);//int value of number of guesses on current topic
  const [numCorrect, setNumCorrect] = useState(0);//int value of number of correct guesses on current topic
  const [canUpdateAcc, setCanUpdateAcc] = useState(true);//boolean determining if accuracy can be updated at the time

  const [explanation, setExplanation] = useState("");//explanation of question
  const [loading, setLoading] = useState(true);//boolean determining if the explanation has loaded
  const [show, setShow] = useState(false);//boolean determining if explanation should be showing
  
  const [posted, setPosted] = useState(false);//boolean determining if question/answer pair has already been posted to prevent spamming

  const colors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFECB3']; // Array of background colors

  //handles posting of prompt/response pairs
  const handlePostButton = () => {
    if(!posted){
      postPair()
      setPosted(true)
    }
  }

  useEffect(() => {
    // Update state when content changes changes
    //sets outcome to undetermined
    setOutcome(2);
    //sets explanation to blank
    setExplanation("");
    //set showing of explanation to false
    setShow(false);
    //set ability to update accuracy to true
    setCanUpdateAcc(true)
    //set boolean of posted prompt/response pairs
    setPosted(false)
  }, [content]);

  //handles user guess
  const submitGuess = (option) => {
    //if able, update number of guesses
    if(canUpdateAcc){
      setNumGuesses(prevNumGuesses => prevNumGuesses + 1);
    }
    //only run if outcome is undetermined
    if (outcome === 2) {
      if (option === content.answer) {
        setNumCorrect(prevNumCorrect => prevNumCorrect + 1);
        setOutcome(1);
      } else {
        setOutcome(0);
      }
      setCanUpdateAcc(false)
    }
  };

  //update the accuracy if the number of guesses/correct guesses changes
  useEffect(() => {
    const acc = numCorrect / numGuesses;
    setAccuracy(isNaN(acc) ? 0 : acc);
  }, [numGuesses, numCorrect]);
  
  //sets the explanation to the question by fetching from api, if the topic or content changes
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
  <div style={{ padding: '20px', fontSize: '1.5em', paddingTop:"50px" }}>
    {!loading && show && 
    <Card
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
      <Typography variant="h4" component="div">
        Here's Why
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {explanation}
      </Typography>
      <IconButton
        aria-label="close"
        sx={{ position: 'absolute', top: 0, right: 0 }}
        onClick={()=>setShow(false)}
      >
        <CloseIcon />
      </IconButton>
    </CardContent>
  </Card>}
    <div>
      <div style={{ marginBottom: '20px', fontSize: '0.5em'}}>
        {numGuesses != 0 && <div style={{color:"#018749"}}>
              Accuracy: %{accuracy * 100}<br/>
        {numCorrect}/{numGuesses} Questions answered correctly
        </div>}
        <Typography variant="h5" component="div">
          {content.question}
        </Typography>
      </div>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {content && content.options.map((option, index) => (
          <Grid item xs={6} key={index}>
            <div style={{ 
              backgroundColor: (outcome == 0 && option === content.answer) ? "#ffbf00": (outcome == 1 && option === content.answer) ? "#22b600" : colors[index % colors.length], 
              opacity: outcome !== 2 && option !== content.answer ? 0.5 : 1,
              padding: '20px', 
              borderRadius: '10px',
              height: '150px', // Fixed height for uniform size
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.5s',
              color: (outcome == 1 && option === content.answer) ? "#F7F7FF" : "black" 

            }}
            onClick={()=>submitGuess(option)}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              }}>
              
              <Typography variant="h6" component="div">
                {option}
                {outcome != 2 && option === content.answer && option === content.answer &&
                  <div onClick = {()=>setShow(true)} style={{paddingTop:"20px", color:"white",}}>
                      <SchoolIcon/>   Learn Here
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
        onClick={handlePostButton} 
        style={{ marginTop: '20px', fontSize: '1em' }}
      >
        Like this Question? <ThumbUpIcon style = {{marginLeft:"20px"}}/>
        
      </Button>
    )}
      
  </div>
    );
  };


