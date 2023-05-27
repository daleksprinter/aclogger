import React from 'react';
import {AppBar, Toolbar} from '@mui/material';

const Bar = () => {
    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <h3>HeatMap</h3>
                <a href={"https://github.com/daleksprinter/aclogger/blob/master/About.md"}><h3>About</h3></a>
            </Toolbar>
        </AppBar>
   );
}
export default Bar
