import React, {Component} from 'react';
import {Paper} from '@material-ui/core';
import ACData from './account/acdata';
import './userdata.css';

export default class UserData extends Component{

    render(){
        return(
            <Paper className = 'userdata'>
                {Object.keys(this.props.data).map((key) => (
                    <ACData className = "account" site = {key} count = {this.props.data[key]} />
                ))}
            </Paper>
        )
    }
    
}
