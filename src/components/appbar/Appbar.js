import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Pop from './popup/Pop';

import icon from './acicon.jpeg';
import './appbar.css';

export default class Bar extends React.Component{
    
    render(){
        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <img src = {icon} className = 'acicon' alt = 'logo'></img>
                        <h3 className = 'logo'>Logger</h3>
                        <Pop id = 'about' title = 'About' ></Pop>
                    </Toolbar>
                </AppBar>
            </div>
      );
    }
}