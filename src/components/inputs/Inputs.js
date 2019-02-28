import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import App from '../achistory/App';
import Hoge from '../heatmap/Hoge';
import UserData from '../userdata/userdata';
import TodaysAC from '../todaysac/TodaysAC';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import './inputs.css';


var cfsub = new XMLHttpRequest();
var acsub = new XMLHttpRequest();
var acprob = new XMLHttpRequest();
var aojsub = new XMLHttpRequest();


function zeroPadding(num, len){
    return ('00000' + num).slice(-len);
}

function getdate(millisec){
    const date = new Date(millisec);
    return date.getFullYear() + "-" + zeroPadding(Number(date.getMonth()) + 1, 2) + "-" + zeroPadding(date.getDate(), 2);
}

const d = getdate(new Date().getTime());

var subs = {};
var todaysac = {};
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
  

var loadac = false;
var loadcf = false;
var loadaoj = false;


export default class Inputs extends Component{

    load(){
        if((loadcf === false || cfsub.readyState === 4) && 
            (loadac === false || (acsub.readyState === 4 && acprob.readyState === 4)) &&
             (loadaoj === false || aojsub.readyState === 4)
            ){
            
                if((loadcf === false || cfsub.status === 200) && 
                    (loadac === false || (acsub.status === 200 && acprob.status === 200)) &&
                     (loadaoj === false || aojsub.status === 200)
                ){
                
                var cfcount = 0;
                var account = 0;
                var aojcount = 0;


                //Codeforces
                //parse codeforces submission
                if(loadcf){
                    const codeforces = JSON.parse(cfsub.responseText).result;
                    
                    for(const e in codeforces){
                        const data = codeforces[e];
                        if(data['verdict'] === 'OK'){
                            const subtime = data['creationTimeSeconds'] * 1000;

                            const tmp = {
                                'site' : 'Codeforces',
                                'subtime' : subtime,
                                'contestId' : data['problem']['contestId'],
                                'title' : data['problem']['index'] + '. ' + data['problem']['name'],
                                'point' : data['problem']['rating'],
                                'detail' : "https://codeforces.com/contest/" + data['problem']['contestId'] + "/submission/" + data['id']
                            }

                            if(getdate(subtime) == d){
                                todaysac[subtime] = tmp;
                            }else{
                                subs[subtime] = tmp;
                            }

                            addCount(getdate(subtime));
                            cfcount++;
                        }
                    }
                }
                

                //AtCoder 
                if(loadac){
                    //parse atcoder problem
                    const acp = JSON.parse(acprob.responseText);
                    var prob_dic = {}
                    
                    for(const e in acp){
                        prob_dic[acp[e]['contest_id'] + acp[e]['id']] = acp[e]['title'];
                    }

                    //parse atcoder submission
                    const atcoder = JSON.parse(acsub.responseText);
                    

                    for(const e in atcoder){
                        const data = atcoder[e];
                        if(data['result'] === 'AC'){
                            const subtime = data['epoch_second'] * 1000;

                            const tmp = {
                                'site' : 'AtCoder',
                                'subtime' : subtime,
                                'contestId' : data['contest_id'].toUpperCase(),
                                'title' : prob_dic[data['contest_id'] + data['problem_id']],
                                'point' : data['point'],
                                'detail' : "https://atcoder.jp/contests/" + data['contest_id'] + "/submissions/" + data['id']

                            }

                            if(getdate(subtime) == d){
                                todaysac[subtime] = tmp;
                            }else{
                                subs[subtime] = tmp;
                            }

                            addCount(getdate(subtime));
                            account++;
                        }
                    }
                }        
                
                //Aizu Online Judge
                if(loadaoj){
                    const aoj = JSON.parse(aojsub.responseText);
                    
                    for(const e in aoj){
                        const data = aoj[e];
                        if(data['status'] === 4){
                            const subtime = data['submissionDate'];
                            const tmp = {
                                'site' : "Aizu Online Judge",
                                'subtime' : subtime,
                                'contestId' : null,
                                'title' : data['problemId'],
                                'point' : null,
                                'detail' : "http://judge.u-aizu.ac.jp/onlinejudge/review.jsp?rid=" + data['judgeId']
                            }
                            aojcount++;
                            if(getdate(subtime) == d){
                                todaysac[subtime] = tmp;
                            }else{
                                subs[subtime] = tmp;
                            }
                            addCount(getdate(subtime));
                        }
                    }
                }


                const calender = Object.keys(dailyCount).map((key) => (
                    {
                    'date' : key,
                    'count' : dailyCount[key],
                    }
                ))
                
                //load finished
                document.getElementById('input').style.display = 'none';
                document.getElementById('status').style.display = 'none';
                
                ReactDOM.render(
                    <UserData 
                        data = {
                            {'Codeforces' : cfcount, 
                             'AtCoder' : account, 
                             'Aizu Online Judge' : aojcount, 
                             'Sum' : account + cfcount + aojcount
                            }
                        } />, 
                        document.getElementById('userdata')
                );
                
                ReactDOM.render(<TodaysAC data = {todaysac} />, document.getElementById('todaysac'));
                ReactDOM.render(<App data = {subs} />, document.getElementById('app'));
                ReactDOM.render(<Hoge data = {calender} />, document.getElementById('hoge'));

            }else{
                ReactDOM.render(
                    <div className = 'fail'>
                        <div>Loading Failed</div>
                        <div>Check your Handle</div>
                    </div>
                    , document.getElementById('status')
                );
            }
        }else{
            ReactDOM.render(<CircularProgress className={styles.progress} />, document.getElementById('status'));
        }
    }

    send(){

        const cfuser = document.getElementById('cfid').value;
        const acuser = document.getElementById('acid').value;
        const aojuser = document.getElementById('aojid').value;

        if(cfuser !== "") loadcf = true;
        if(acuser !== "") loadac = true;
        if(aojuser !== "") loadaoj = true;

        if(!loadac && !loadcf && !aojuser){
            alert('Enter your Handle at least One of Judge');
            return;
        }

        cfsub.onreadystatechange = this.load;
        acsub.onreadystatechange = this.load;
        acprob.onreadystatechange = this.load;
        aojsub.onreadystatechange = this.load;

        if(loadcf){     
            var cf_url = "https://codeforces.com/api/user.status?handle=" + cfuser + "&from=1&count=1000";
            cfsub.open('Get', cf_url, true);
            cfsub.send(null);
        }

        if(loadac){
            var ac_url = "https://kenkoooo.com/atcoder/atcoder-api/results?user=" + acuser;
            acsub.open('Get', ac_url, true);
            acsub.send(null);

            var ac_prob_url = "https://kenkoooo.com/atcoder/resources/problems.json";
            acprob.open('Get', ac_prob_url,true);
            acprob.send(null);
        }

        if(loadaoj){
            var aoj_url = "https://judgeapi.u-aizu.ac.jp/submission_records/users/" + aojuser + "?page=0&size=10000";
            aojsub.open('Get', aoj_url,true);
            aojsub.send(null);
        }

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
                <TextField
                    id="aojid"
                    label="Aizu Online Judge ID"
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