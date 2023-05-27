import React, {Component} from 'react';
import {Paper} from '@mui/material';
import SubmissionCount from './SubmissionCount';
import {sitefactory} from "../../modules/site";
import {Submissions} from "../../modules/submit";

interface AppProps{
    data: Submissions
}
const SubmissionCounts = (props: AppProps) => {
    return(
        <Paper style={{textAlign:'center', position:'relative', marginBottom:'1%'}}>
            <SubmissionCount site = "AtCoder" count = {props.data.count(sitefactory.AtCoder())} />
            <SubmissionCount site = "Codeforces" count = {props.data.count(sitefactory.Codeforces())} />
            <SubmissionCount site = "AOJ" count = {props.data.count(sitefactory.AOJ())} />
            <SubmissionCount site = "yukicoder" count = {props.data.count(sitefactory.yukicoder())} />
            <SubmissionCount site = "Sum" count = {props.data.count(null)} />
        </Paper>
    )
}
export default SubmissionCounts
