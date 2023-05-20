import React, { Component } from 'react';
import SubmissionHistories from '../SubmissionHistories/SubmissionHistories';
import SubmissionCounts from '../SubmissionCounts/SubmissionCounts';
import UserNames from "../UserNames/UserNames";
import HeatMap from "../HeatMap/HeatMap";
import Filter from "../Filter/Filter";
import {Submissions} from "../../modules/submit";
import {Conditions, conditionsDTO} from "../../modules/condition";
import {Clients} from "../../modules/client";

import './App.css';
interface AppProps{}
interface AppState{
    submiss: Submissions
}
export default class App extends Component<AppProps, AppState>{

    constructor(props: AppProps){
        super(props);
        this.state = {
            submiss: new Submissions(null),
        }
    }

    setSubmissions = (submiss: Submissions) => {
        this.setState({
            submiss:  submiss
        })
    }

    handleClick = (acuser: String, cfuser: String, aojuser: String, ycuser: String) => {
        const c = new Clients(acuser, cfuser, aojuser, ycuser)
        c.fetch(this.setSubmissions)
    }

    update = (conddto: conditionsDTO) => {
         const filtered =  this.state.submiss.filter(new Conditions(conddto))
         this.setState({
            submiss: new Submissions(filtered)
         })
    }

    render(){
        return (
            <div className = "app">
                <div className="sidebar">
                    <UserNames handleClick={this.handleClick}></UserNames>
                    <Filter update = {this.update}></Filter>
                </div>
                <div className="content">
                    <SubmissionCounts data = {this.state.submiss}></SubmissionCounts>
                    <HeatMap data = {this.state.submiss.getAll()}></HeatMap>
                    <SubmissionHistories data = {this.state.submiss.getAll()} />
                </div>

            </div>
        )
    }
}
