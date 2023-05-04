import React, { Component } from 'react';
import SubmissionHistories from '../SubmissionHistories/SubmissionHistories';
import SubmissionCounts from '../SubmissionCounts/SubmissionCounts';
import {AtCoderClient, AizuOnlineJudgeClient, CodeForcesClient, yukicoderClient} from "../../modules/baseClient";
import {submissions} from "../../modules/submit";
import UserNames from "../UserNames/UserNames";
import HeatMap from "../HeatMap/HeatMap";
import Filter from "../Filter/Filter";
import {Conditions} from "../../modules/condition";

import './App.css';
export default class App extends Component{

    constructor(){
        super();
        this.state = {
            submiss: new submissions(),
            cfuser : "",
            acuser : "",
            aojuser : "",
            ycuser : "",
        }
    }

    handleClick = () => {
        const submiss = new submissions()

        //codeforces
        const cf = new CodeForcesClient(this.state.cfuser)
        cf.fetch().then(json => {
            const subs = cf.toSubmissions(json['result'])
            submiss.merge(subs)
            this.setState({
                submiss: submiss
            })
        }).catch()

        //atcoder
        const ac = new AtCoderClient(this.state.acuser)
        ac.fetch().then(json => {
            const subs = ac.toSubmissions(json)
            submiss.merge(subs)
            this.setState({
                submiss: submiss
            })
        }).catch()

        //aoj
        const aojc = new AizuOnlineJudgeClient(this.state.aojuser)
        aojc.fetch().then(json => {
            console.log(json)
            const subs = aojc.toSubmissions(json)
            submiss.merge(subs)
            this.setState({
                submiss: submiss
            })
        }).catch()

        //ycuser
        const ycc = new yukicoderClient(this.state.ycuser)
        ycc.fetch().then(json => {
            const subs = ycc.toSubmissions(json)
            submiss.merge(subs)
            this.setState({
                submiss: submiss
            })
        }).catch()
    }

    handleChange = (e) => {
        switch(e.target.name){
            case "cfuser" :
                this.setState({cfuser : e.target.value})
                break
            case "acuser" :
                this.setState({acuser : e.target.value})
                break
            case "aojuser" :
                this.setState({aojuser : e.target.value})
                break
            case "ycuser" :
                this.setState({ycuser : e.target.value})
                break
            default:
                break
        }
    }

    update = (conddto) => {
         const filtered =  this.state.submiss.filter(new Conditions(conddto))
         this.setState({
            submiss: new submissions(filtered)
         })
    }


    render(props, state){
        return (
            <div>
                <UserNames handleChange={this.handleChange} handleClick={this.handleClick}></UserNames>
                <Filter update = {this.update}></Filter>

                <SubmissionCounts data = {this.state.submiss}></SubmissionCounts>
                <HeatMap data = {this.state.submiss.getAll()}></HeatMap>
                <SubmissionHistories data = {this.state.submiss.getAll()} />
            </div>
        )
    }
}
