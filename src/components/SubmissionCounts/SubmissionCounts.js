import React, {Component} from 'react';
import {Paper} from '@mui/material';
import SubmissionCount from './SubmissionCount';
import './SubmissionCounts.css';
import {sitefactory} from "../../modules/site";

export default class SubmissionCounts extends Component{

    render(){
        return(
            <Paper className = 'userdata'>
                <SubmissionCount className = "account" site = {"AtCoder"} count = {this.props.data.count(sitefactory.AtCoder())} />
                <SubmissionCount className = "account" site = {"Codeforces"} count = {this.props.data.count(sitefactory.Codeforces())} />
                <SubmissionCount className = "account" site = {"AOJ"} count = {this.props.data.count(sitefactory.AOJ())} />
                <SubmissionCount className = "account" site = {"yukicoder"} count = {this.props.data.count(sitefactory.yukicoder())} />
                <SubmissionCount className = "account" site = {"Sum"} count = {this.props.data.count()} />
            </Paper>
        )
    }
    
}
