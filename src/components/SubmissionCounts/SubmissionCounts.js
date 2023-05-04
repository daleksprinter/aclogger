import React, {Component} from 'react';
import {Paper} from '@material-ui/core';
import SubmissionCount from './SubmissionCount';
import './SubmissionCounts.css';

export default class SubmissionCounts extends Component{

    render(){
        return(
            <Paper className = 'userdata'>
                {Object.keys(this.props.data).map((key) => (
                    <SubmissionCount className = "account" site = {key} count = {this.props.data[key]} />
                ))}
            </Paper>
        )
    }
    
}
