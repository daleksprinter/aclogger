import React, {Component} from 'react';
import {Paper} from '@material-ui/core';
import SubmissionCount from './SubmissionCount';
import './SubmissionCounts.css';

export default class SubmissionCounts extends Component{

    render(){
        return(
            <Paper className = 'userdata'>
                <SubmissionCount className = "account" site = {"AtCoder"} count = {this.props.data.account()} />
                <SubmissionCount className = "account" site = {"Codeforces"} count = {this.props.data.cfcount()} />
                <SubmissionCount className = "account" site = {"AOJ"} count = {this.props.data.aojcount()} />
                <SubmissionCount className = "account" site = {"yukicoder"} count = {this.props.data.ykcount()} />
                <SubmissionCount className = "account" site = {"Sum"} count = {this.props.data.count()} />
            </Paper>
        )
    }
    
}
