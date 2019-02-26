import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Paper from '@material-ui/core/Paper';
import Hoge from './Hoge';
import './inputs.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserData from './userdata';


var cfsub = new XMLHttpRequest();
var acsub = new XMLHttpRequest();
var acprob = new XMLHttpRequest();

function zeroPadding(num, len){
    return ('00000' + num).slice(-len);
}

function getdate(millisec){
    const date = new Date(millisec);
    return date.getFullYear() + "-" + zeroPadding(Number(date.getMonth()) + 1, 2) + "-" + zeroPadding(date.getDate(), 2);
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

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    button: {
        margin: theme.spacing.unit,
      },
    input: {
        display: 'none',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
  });
  

export default class Inputs extends Component{

    load(){
        if(cfsub.readyState === 4 && acsub.readyState === 4 && acprob.readyState === 4){
            if(cfsub.status === 200 && acsub.status === 200 && acprob.status === 200){

                //parse codeforces submission
                const codeforces = JSON.parse(cfsub.responseText).result;
                var cfcount = 0;
            
                for(const e in codeforces){
                    const data = codeforces[e];
                    if(data['verdict'] === 'OK'){
                        const subtime = data['creationTimeSeconds'] * 1000;

                        const tmp = {
                            'site' : 'Codeforces',
                            'subtime' : subtime,
                            'contestId' : data['problem']['contestId'],
                            'title' : data['problem']['index'] + '. ' + data['problem']['name'],
                            'point' : data['problem']['rating']
                        }

                        subs[subtime] = tmp;

                        addCount(getdate(subtime));
                        cfcount++;
                    }
                }

                //parse atcoder problem

                const acp = JSON.parse(acprob.responseText);
                var prob_dic = {}

                for(const e in acp){
                    prob_dic[acp[e]['contest_id'] + acp[e]['id']] = acp[e]['title'];
                }

                //parse atcoder submission
                const atcoder = JSON.parse(acsub.responseText);
                var account = 0;

                for(const e in atcoder){
                    const data = atcoder[e];
                    if(data['result'] === 'AC'){
                        const subtime = data['epoch_second'] * 1000;

                        const tmp = {
                            'site' : 'AtCoder',
                            'subtime' : subtime,
                            'contestId' : data['contest_id'].toUpperCase(),
                            'title' : prob_dic[data['contest_id'] + data['problem_id']],
                            'point' : data['point']
                        }

                        subs[subtime] = tmp;

                        addCount(getdate(subtime));
                        account++;
                    }
                }

                const calender = Object.keys(dailyCount).map((key) => (
                    {
                    'date' : key,
                    'count' : dailyCount[key],
                    }
                ))
                
                //load finished
                ReactDOM.render(<div></div>, document.getElementById('status'));
                ReactDOM.render(<UserData data = {{'Codeforces' : cfcount, 'AtCoder' : account, 'Sum' : account + cfcount}} />, document.getElementById('userdata'));
                ReactDOM.render(<App data = {subs} />, document.getElementById('app'));
                ReactDOM.render(<Hoge data = {calender} />, document.getElementById('hoge'));

            }else{
                ReactDOM.render(<div className = 'fail'>Loading Failed</div>, document.getElementById('status'));
            }
        }else{
            ReactDOM.render(<CircularProgress className={styles.progress} />, document.getElementById('status'));
        }
    }

    send(){

        const cfuser = document.getElementById('cfid').value;
        const acuser = document.getElementById('acid').value;

        cfsub.onreadystatechange = this.load;
        acsub.onreadystatechange = this.load;
        acprob.onreadystatechange = this.load;

        var cf_url = "http://codeforces.com/api/user.status?handle=" + cfuser + "&from=1&count=5000";
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
            
            <Paper className = 'inputbar'>
                <TextField
                    id="cfid"
                    label="Codeforces ID"
                    className={styles.textField}
                    margin="normal"
                />
                <div></div>
                <TextField
                    id="acid"
                    label="AtCoder ID"
                    className={styles.textField}
                    margin="normal"
                />
                <div></div>
                <br></br>
                <div id = 'status'>
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        className={styles.button} 
                        onClick = {() => this.send()}
                    >
                        Search
                    </Button>
                </div>
            </Paper>
        )   
    }
}