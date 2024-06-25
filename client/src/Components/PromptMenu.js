import { useState } from "react"
import {getResponse, postPair} from "../APIs"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, Typography, TextField } from "@mui/material";


export default function PromptMenu({submitPrompt}){
    const [prompt,setPrompt] = useState("");
    

    return(
        <div style={{height:"calc(100vh - 80px)", justifyContent:"center", alignItems:"center", display:"flex"}}>
            <form onSubmit={(e)=>submitPrompt(e,prompt)} style={{borderRadius:"20px", marginTop:"20px", padding:"20px", backgroundColor:"#D0DED8",}}>
                {/* 
                Topic Input
                */}
                <Typography variant="button" sx={{textAlign:"center", color:"grey"}}>Create Your Own Questions and Answers</Typography>
                <TextField fullWidth label="Topic" id="fullWidth" type="text" onChange={(e)=>setPrompt(e.target.value)} sx={{borderRadius:"30px"}}></TextField>
                {/* 
                Difficulty level options 
                */}
                <FormControl sx={{justifyContent:"center", alignItems:"center", display:"flex", marginTop:"10px"}}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Difficulty</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
                        <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                        <FormControlLabel value="Hard" control={<Radio />} label="Hard" />
                    </RadioGroup>
                </FormControl>
                <Button variant="contained" color="success" type="submit">Submit</Button>

            </form>
        </div>
    )
}