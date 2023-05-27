import React, {Component, useState} from 'react';
import SubmissionHistories from '../SubmissionHistories/SubmissionHistories';
import SubmissionCounts from '../SubmissionCounts/SubmissionCounts';
import UserNames from "../UserNames/UserNames";
import HeatMap from "../HeatMap/HeatMap";
import Filter from "../Filter/Filter";
import {Submissions} from "../../modules/submit";
import {Conditions, conditionsDTO} from "../../modules/condition";
import {Clients} from "../../modules/client";

import './App.css';
const App = () => {
    const [submiss, setSubmiss] = useState(new Submissions(null))
    const [view, setView] = useState(new Submissions(null))

    const setSubmissions = (submiss: Submissions) => {
        setSubmiss(submiss)
        setView(submiss)
    }

    const handleClick = (acuser: String, cfuser: String, aojuser: String, ycuser: String) => {
        const c = new Clients(acuser, cfuser, aojuser, ycuser)
        c.fetch(setSubmissions)
    }

    const update = (conddto: conditionsDTO) => {
         const filtered =  submiss.filter(new Conditions(conddto))
         setView(new Submissions(filtered))
    }

        return (
            <div className = "app">
                <div className="sidebar">
                    <UserNames handleClick={handleClick}></UserNames>
                    <Filter update = {update}></Filter>
                </div>
                <div className="content">
                    <SubmissionCounts data = {view}></SubmissionCounts>
                    <HeatMap data = {view.getAll()}></HeatMap>
                    <SubmissionHistories data = {view.getAll()} />
                </div>

            </div>
        )
}
export default App
