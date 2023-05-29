import React, {Component} from 'react';
import {Paper} from '@mui/material';
import SubmissionCount from './SubmissionCount';
import {Submissions} from "../../modules/submit";
import {AOJ, AtCoder, Codeforces, yukicoder} from "../../modules/site";

interface AppProps{
    data: Submissions
}
const SubmissionCounts = (props: AppProps) => {
    return(
        <Paper style={{textAlign:'center', position:'relative', marginBottom:'1%'}}>
            <SubmissionCount site = "AtCoder" count = {props.data.count(new AtCoder())} />
            <SubmissionCount site = "Codeforces" count = {props.data.count(new Codeforces())} />
            <SubmissionCount site = "AOJ" count = {props.data.count(new AOJ())} />
            <SubmissionCount site = "yukicoder" count = {props.data.count(new yukicoder())} />
            <SubmissionCount site = "Sum" count = {props.data.count(null)} />
        </Paper>
    )
}
export default SubmissionCounts
