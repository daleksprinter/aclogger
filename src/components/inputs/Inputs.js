import React, { Component } from 'react';
import App from '../achistory/App';
import UserData from '../userdata/userdata';
import TodaysAC from '../todaysac/TodaysAC';
import './inputs.css';
import {AtCoderClient, AizuOnlineJudgeClient, CodeForcesClient, yukicoderClient} from "../../modules/baseClient";
import {submissions} from "../../modules/submit";
import UserNames from "../UserNames/UserNames";

export default class Inputs extends Component{

    constructor(){
        super();
        this.state = {
            submiss: new submissions(),
            isloaded : false,
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
                isloaded: true,
                submiss: submiss
            })
        }).catch()

        //atcoder
        const ac = new AtCoderClient(this.state.acuser)
        ac.fetch().then(json => {
            const subs = ac.toSubmissions(json)
            submiss.merge(subs)
            this.setState({
                isloaded: true,
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
                isloaded: true,
                submiss: submiss
            })
        }).catch()

        //ycuser
        const ycc = new yukicoderClient(this.state.ycuser)
        ycc.fetch().then(json => {
            const subs = ycc.toSubmissions(json)
            submiss.merge(subs)
            this.setState({
                isloaded: true,
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


    render(props, state){
        if(this.state.isloaded){
            return (
                <div>
                    <UserData 
                        data = {
                            {
                                'Codeforces' : this.state.submiss.cfcount(),
                                'AtCoder' : this.state.submiss.account(),
                                'Aizu Online Judge' : this.state.submiss.aojcount(),
                                'yukicoder' : this.state.submiss.ykcount(),
                                'Sum' : this.state.submiss.count(),
                            }
                        }
                    ></UserData>
                    <TodaysAC data = {this.state.submiss.getTodayAC()} />
                    <App data = {this.state.submiss.getAll()} />
                </div>
            )
        }else{
            return (
                <UserNames handleChange={this.handleChange} handleClick={this.handleClick}></UserNames>
            )   
        }
  
    }
}
