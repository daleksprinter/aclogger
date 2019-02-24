import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Hoge from './Hoge';


var cfsub = new XMLHttpRequest();
var acsub = new XMLHttpRequest();
var acprob = new XMLHttpRequest();

function getdate(millisec){
    const date = new Date(millisec);
    const d = date.getFullYear() + "-" + String(Number(date.getMonth()) + 1) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    return d;
}

var subs = {};
var dailyCount = {};

function addCount(d){
    if(isNaN(dailyCount[d])){
        dailyCount[d] = 1;
    }else{
        dailyCount[d]++;
    }
}

export default class Inputs extends Component{

    load(){
        if(cfsub.readyState === 4 && acsub.readyState === 4 && acprob.readyState === 4){
            if(cfsub.status === 200 && acsub.status === 200 && acprob.status === 200){

                //parse codeforces submission
                const codeforces = JSON.parse(cfsub.responseText).result;
            
                for(const e in codeforces){
                    const data = codeforces[e];
                    if(data['verdict'] === 'OK'){
                        const subtime = data['creationTimeSeconds'] * 1000;

                        const tmp = {
                            'site' : 'codeforces',
                            'subtime' : subtime,
                            'contestId' : data['problem']['contestId'],
                            'title' : data['problem']['index'] + '. ' + data['problem']['name'],
                            'point' : data['problem']['rating']
                        }

                        subs[subtime] = tmp;

                        addCount(getdate(subtime));

                    }
                }

                //parse atcoder submission
                const atcoder = JSON.parse(acsub.responseText);

                for(const e in atcoder){
                    const data = atcoder[e];
                    if(data['result'] === 'AC'){
                        const subtime = data['epoch_second'] * 1000;

                        const tmp = {
                            'site' : 'atcoder',
                            'subtime' : subtime,
                            'contestId' : data['contest_id'],
                            'title' : data['id'],
                            'point' : data['point']
                        }

                        subs[subtime] = tmp;

                        addCount(getdate(subtime));
                    }
                }

                console.log(subs);
                console.log(Object.keys(subs).length);
                console.log(dailyCount);

            }else{
                console.log('load failed');
            }
        }else{
            console.log('loading');
        }
    }

    send(){

        const cfuser = document.getElementById('cfid').value;
        const acuser = document.getElementById('acid').value;

        cfsub.onreadystatechange = this.load;
        acsub.onreadystatechange = this.load;
        acprob.onreadystatechange = this.load;

        var cf_url = "http://codeforces.com/api/user.status?handle=" + cfuser + "&from=1&count=100";
        cfsub.open('Get', cf_url, true);
        cfsub.send(null);

        var ac_url = "https://kenkoooo.com/atcoder/atcoder-api/results?user=" + acuser;
        acsub.open('Get', ac_url, true);
        acsub.send(null);

        var ac_prob_url = "https://kenkoooo.com/atcoder/resources/problems.json";
        acprob.open('Get', ac_prob_url,true);
        acprob.send(null);

    }

    render(){
        return (
            <div>
                <h3>codeforces id</h3><hr/>
                <input type = "text" id = "cfid" value = "b1015120"></input>
                <div>atcoder id</div>
                <input type = "text" id = "acid" value = "daleksprinter"></input>
                <button type = "button" onClick = {() => this.send()}>getData</button>
            </div>
        )   
    }
}