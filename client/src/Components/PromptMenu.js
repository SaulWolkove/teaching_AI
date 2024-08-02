import { useState } from "react"
import {getResponse, postPair} from "../APIs"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, Typography, TextField, Box } from "@mui/material";


export default function PromptMenu({submitPrompt, setTopic, setDifficulty, difficulty, topic, redo, setRedo}){
    const [selectedOption, setSelectedOption] = useState('multipleChoice');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    }
    
    const handleTextChange = (event) => {
        event.preventDefault()
        setTopic(event.target.value)
        setRedo(false)

    }

    const checkValidSubmission = () => {
        return topic !== "" && difficulty !== ""
    }

    return(
        <div style={{height:"calc(100vh - 80px)", justifyContent:"center", alignItems:"center", display:"flex"}}>
            <form onSubmit={(e)=>submitPrompt(e,topic, difficulty,selectedOption)} style={{borderRadius:"20px", marginTop:"20px", padding:"20px", backgroundColor:"#D0DED8",}}>
                {/* 
                Topic Input
                */}
                <Typography variant="button" sx={{textAlign:"center", color:"grey"}}>Create Your Own Questions and Answers</Typography>
                <TextField fullWidth label="Topic" id="fullWidth" type="text" value={topic} onChange={handleTextChange} sx={{borderRadius:"30px"}}></TextField>
                {/* 
                Difficulty level options 
                */}
                <FormControl sx={{justifyContent:"center", alignItems:"center", display:"flex", marginTop:"10px"}}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Difficulty</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={difficulty}
                        onChange={(event)=>setDifficulty(event.target.value)}
                    >
                        <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
                        <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                        <FormControlLabel value="Hard" control={<Radio />} label="Hard" />
                    </RadioGroup>
                    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6">
        {selectedOption === 'multipleChoice' ? 'Multiple Choice' : 'True or False'}
      </Typography>
      <RadioGroup value={selectedOption} onChange={handleChange} row>
        <FormControlLabel value="multipleChoice" control={<Radio color="primary" />} label="Multiple Choice" />
        <FormControlLabel value="trueOrFalse" control={<Radio color="primary" />} label="True or False" />
      </RadioGroup>
      <Button variant="contained" disabled = {!checkValidSubmission()} color="success" type="submit" onClick={()=>setRedo(true)}>{!redo ? "Submit Question" : "Regenerate Question"}</Button>

    </Box>
                </FormControl>
            


            </form>
        </div>
    )
}