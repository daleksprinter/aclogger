import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import './userdata.css';
import ACData from './acdata.js';
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