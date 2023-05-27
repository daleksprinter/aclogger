import React, {Component, useState} from 'react';
import SubmissionHistories from '../SubmissionHistories/SubmissionHistories';
import SubmissionCounts from '../SubmissionCounts/SubmissionCounts';
import UserNames from "../UserNames/UserNames";
import HeatMap from "../HeatMap/HeatMap";
import Filter from "../Filter/Filter";
import {Submissions} from "../../modules/submit";
import {Conditions, conditionsDTO} from "../../modules/condition";
import {Clients} from "../../modules/client";
import {AtCoderClient} from "../../modules/clientImplements/atcoderClient";
import {CodeForcesClient} from "../../modules/clientImplements/codeforcesClient";
import {AizuOnlineJudgeClient} from "../../modules/clientImplements/aojClient";
import {yukicoderClient} from "../../modules/clientImplements/yukicoderClient";
const App = () => {
    const [submiss, setSubmiss] = useState(new Submissions(null))
    const [view, setView] = useState(new Submissions(null))

    const handleClick = (acuser: String, cfuser: String, aojuser: String, ycuser: String) => {
        const c = new Clients()
        c.add(new AtCoderClient(acuser))
        c.add(new CodeForcesClient(cfuser))
        c.add(new AizuOnlineJudgeClient(aojuser))
        c.add(new yukicoderClient(ycuser))
        c.fetch().then(subs => {
            setSubmiss(subs)
            setView(subs)
        })
    }

    const update = (conddto: conditionsDTO) => {
         const filtered =  submiss.filter(new Conditions(conddto))
         setView(new Submissions(filtered))
    }

    return (
        <div style={{display:'flex', margin:'1px'}}>
            <div style={{marginRight:'1%', width:'20%'}}>
                <UserNames handleClick={handleClick}></UserNames>
                <Filter update = {update}></Filter>
            </div>
            <div style={{width:'100%'}}>
                <SubmissionCounts data = {view}></SubmissionCounts>
                <HeatMap data = {view.getAll()}></HeatMap>
                <SubmissionHistories data = {view.getAll()} />
            </div>
        </div>
    )
}
export default App
