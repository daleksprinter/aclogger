import React, { Component } from 'react';
import SubmissionHistories from '../SubmissionHistories/SubmissionHistories';
import SubmissionCounts from '../SubmissionCounts/SubmissionCounts';
import {AtCoderClient, AizuOnlineJudgeClient, CodeForcesClient, yukicoderClient} from "../../modules/client";
import {Submissions} from "../../modules/submit";
import UserNames from "../UserNames/UserNames";
import HeatMap from "../HeatMap/HeatMap";
import Filter from "../Filter/Filter";
import {Conditions} from "../../modules/condition";
import {Clients} from "../../modules/client";

import './App.css';
export default class App extends Component{

    constructor(){
        super();
        this.state = {
            submiss: new Submissions(),
            cfuser : "",
            acuser : "",
            aojuser : "",
            ycuser : "",
        }
    }

    setSubmissions = (submiss) => {
        this.setState({
            submiss:  submiss
        })
    }

    handleClick = () => {
        const c = new Clients(this.state.acuser, this.state.cfuser, this.state.aojuser, this.state.ycuser)
        c.fetch(this.setSubmissions)
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
            submiss: new Submissions(filtered)
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
