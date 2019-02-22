import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Hoge from './Hoge';

var cfsub = new XMLHttpRequest();
var acsub = new XMLHttpRequest();
var acprob = new XMLHttpRequest();

export default class Inputs extends Component{

    load(){
        if(cfsub.readyState === 4 && acsub.readyState === 4 && acprob.readyState === 4){
            if(cfsub.status === 200 && acsub.status === 200 && acprob.status === 200){
                console.log(JSON.parse(cfsub.responseText));
                console.log(JSON.parse(acsub.responseText));
                console.log(JSON.parse(acprob.responseText));
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
                <div>codeforces id</div>
                <input type = "text" id = "cfid" value = "b1015120"></input>
                <div>atcoder id</div>
                <input type = "text" id = "acid" value = "daleksprinter"></input>
                <button type = "button" onClick = {() => this.send()}>getData</button>
            </div>
        )   
    }
}