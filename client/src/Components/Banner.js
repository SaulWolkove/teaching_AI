import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AttractionsSharpIcon from '@mui/icons-material/AttractionsSharp';

export default function Banner() {
  return (
    <Box sx={{ flexGrow: 1 }} color="white">
      <AppBar position="static" sx={{ backgroundColor: 'white', color: "#588B76" }}>
        <Toolbar>
          <AttractionsSharpIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </AttractionsSharpIcon>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Teaching Assistant
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}