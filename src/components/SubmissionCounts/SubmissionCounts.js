import React, {Component} from 'react';
import {Paper} from '@material-ui/core';
import SubmissionCount from './SubmissionCount';
import './SubmissionCounts.css';

export default class SubmissionCounts extends Component{

    render(){
        return(
            <Paper className = 'userdata'>
                <SubmissionCount className = "account" site = {"AtCoder"} count = {this.props.data.count("AtCoder")} />
                <SubmissionCount className = "account" site = {"Codeforces"} count = {this.props.data.count("CodeForces")} />
                <SubmissionCount className = "account" site = {"AOJ"} count = {this.props.data.count("AizuOnlineJudge")} />
                <SubmissionCount className = "account" site = {"yukicoder"} count = {this.props.data.count("yukicoder")} />
                <SubmissionCount className = "account" site = {"Sum"} count = {this.props.data.count()} />
            </Paper>
        )
    }
    
}
