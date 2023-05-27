import React from 'react';
import {AppBar, Toolbar} from '@mui/material';
import './NavBar.css';

const Bar = () => {
    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <h3 className = 'logo'>HeatMap</h3>
                <a href={"https://github.com/daleksprinter/aclogger/blob/master/About.md"}><h3>About</h3></a>
            </Toolbar>
        </AppBar>
   );
}
export default Bar
