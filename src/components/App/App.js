import React, { Component } from 'react';
import SubmissionHistories from '../SubmissionHistories/SubmissionHistories';
import SubmissionCounts from '../SubmissionCounts/SubmissionCounts';
import UserNames from "../UserNames/UserNames";
import HeatMap from "../HeatMap/HeatMap";
import Filter from "../Filter/Filter";
import {Submissions} from "../../modules/submit";
import {Conditions} from "../../modules/condition";
import {Clients} from "../../modules/client";

import './App.css';
export default class App extends Component{

    constructor(){
        super();
        this.state = {
            submiss: new Submissions(),
        }
    }

    setSubmissions = (submiss) => {
        this.setState({
            submiss:  submiss
        })
    }

    handleClick = (acuser, cfuser, aojuser, ycuser) => {
        const c = new Clients(acuser, cfuser, aojuser, ycuser)
        c.fetch(this.setSubmissions)
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
                <UserNames handleClick={this.handleClick}></UserNames>
                <Filter update = {this.update}></Filter>
                <SubmissionCounts data = {this.state.submiss}></SubmissionCounts>
                <HeatMap data = {this.state.submiss.getAll()}></HeatMap>
                <SubmissionHistories data = {this.state.submiss.getAll()} />
            </div>
        )
    }
}
