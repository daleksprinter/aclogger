import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import icon from './acicon.jpeg';
import './appbar.css';

export default class Bar extends React.Component{
    
    render(){
        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <img src = {icon} className = 'acicon' alt = 'logo'></img>
                        <h3 className = 'logo'>HeatMap</h3>
                        <a href={"https://github.com/daleksprinter/aclogger/blob/master/About.md"}><h3>About</h3></a>
                    </Toolbar>
                </AppBar>
            </div>
      );
    }
}
