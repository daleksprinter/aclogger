import React, {Component} from 'react';
import {Paper} from '@mui/material';
import SubmissionCount from './SubmissionCount';
import {sitefactory} from "../../modules/site";
import {Submissions} from "../../modules/submit";

interface AppProps{
    data: Submissions
}
interface AppState{}
export default class SubmissionCounts extends Component<AppProps, AppState>{

    render(){
        return(
            <Paper className = 'userdata'>
                <SubmissionCount site = {"AtCoder"} count = {this.props.data.count(sitefactory.AtCoder())} />
                <SubmissionCount site = {"Codeforces"} count = {this.props.data.count(sitefactory.Codeforces())} />
                <SubmissionCount site = {"AOJ"} count = {this.props.data.count(sitefactory.AOJ())} />
                <SubmissionCount site = {"yukicoder"} count = {this.props.data.count(sitefactory.yukicoder())} />
                <SubmissionCount site = {"Sum"} count = {this.props.data.count(null)} />
            </Paper>
        )
    }
    
}
