import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Hoge from './Hoge';

export default class Inputs extends Component{

    changestatus(req1, req2, req3){
        if(req1.readyState == 4 && req2.readyState == 4 && req3.readyState == 4){
            if(req1.status == 200 && req2.status == 200 && req3.status == 200){
                console.log("load finished");
            }else{
                console.log("load failed");
            }
        }else{
            console.log("now loading");
        }
    }

    
    func = () => {

        const cfuser = document.getElementById('cfid').value;
        const acuser = document.getElementById('acid').value;


        var cfsub = new XMLHttpRequest();
        var acsub = new XMLHttpRequest();
        var acprob = new XMLHttpRequest();



        



        

        //ReactDOM.render(<App id = {cfuser}/>, document.getElementById("app"));
        //ReactDOM.render(<Hoge id = {acuser}/>, document.getElementById("hoge"));
    }

    render(){
        return (
            <div>
                <div>codeforces id</div>
                <input type = "text" id = "cfid"></input>
                <div>atcoder id</div>
                <input type = "text" id = "acid"></input>
                <button type = "button" onClick = {() => this.func()}>getData</button>
            </div>
        )   
    }
}