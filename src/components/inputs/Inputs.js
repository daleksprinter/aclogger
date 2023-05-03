import React, { Component } from 'react';

import App from '../achistory/App';
import UserData from '../userdata/userdata';
import TodaysAC from '../todaysac/TodaysAC';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './inputs.css';



function zeroPadding(num, len){
    return ('00000' + num).slice(-len);
}

function getdate(millisec){
    const date = new Date(millisec);
    return date.getFullYear() + "-" + zeroPadding(Number(date.getMonth()) + 1, 2) + "-" + zeroPadding(date.getDate(), 2);
}

const d = getdate(new Date().getTime());



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


class submit {
    constructor(time, result, contest, title, point, url) {
        this.time = time
        this.result = result
        this.contest  = contest
        this.title = title
        this.point = point
        this.url = url
    }
}

class acsubmit extends submit {}
class cfsubmit extends submit {}
class aojsubmit extends submit {}
class ycsubmit extends submit {}

class submissions {
    constructor() {
        this.submissions = []
    }

    add(submission) {
        this.submissions.push(submission)
    }

    count() {
        return this.submissions.length
    }

    account() {
        return 1
    }

    cfcount(){
        return 1
    }

    ykcount()  {
        return 1
    }

    aojcount() {
        return 1
    }
}

export default class Inputs extends Component{

    constructor(){
        super();
        this.state = {
            cfcount : 0,
            account : 0,
            aojcount : 0,
            yccount : 0,
            todaysac : {},
            submissions : {},
            submiss: new submissions(),
            isloaded : false,
            cfuser : "",
            acuser : "",
            aojuser : "",
            ycuser : "",
        }
    }

    handleClick = () => {
        //codeforces

        const submiss = new submissions()
        if(this.state.cfuser !== ""){
            const url = "https://codeforces.com/api/user.status?handle=" + this.state.cfuser + "&from=1&count=1000";
            fetch(url).then((res) => {
                return res.json()
            }).then((codeforces) => {
                this.setState({isloaded : true});
                let todaysac = this.state.todaysac;
                let subs = this.state.submissions;
                let cfcount = 0;
                for(const data of codeforces.result){
                    const contestid = data['problem']['contestId']
                    const title = data['problem']['index'] + '. ' + data['problem']['name']
                    const point = data['problem']['rating']
                    const url = "https://codeforces.com/contest/" + data['problem']['contestId'] + "/submission/" + data['id']
                    if(data['verdict'] === 'OK'){
                        const subtime = data['creationTimeSeconds'] * 1000;
                        const tmp = {
                            'site' : 'Codeforces',
                            'subtime' : subtime,
                            'contestId' : contestid,
                            'title' : title,
                            'point' : point,
                            'detail': url
                        }

                        const sub = new cfsubmit(subtime, "OK", contestid, title, point, url)
                        submiss.add(sub)

                        if(getdate(subtime) === d){
                            todaysac[subtime] = tmp;
                        }else{
                            subs[subtime] = tmp;
                        }
                        cfcount += 1;
//                        addCount(getdate(subtime));
                    }
                }
                this.setState({
                    cfcount : cfcount,
                    todaysac : todaysac,
                    submissions: subs,
                });
            })  
        }

        //atcoder
        if(this.state.acuser !== ""){
            const url = "https://kenkoooo.com/atcoder/atcoder-api/results?user=" + this.state.acuser;
            fetch(url).then(res => {
                return res.json()
            }).then(atcoder => {
                /*
                var prob_dic = {}
                    
                for(const e in acp){
                    prob_dic[acp[e]['id']] = acp[e]['title'];
                }
                */
                this.setState({isloaded : true});
                let todaysac = this.state.todaysac;
                let subs = this.state.submissions;
                let account = 0;
                for(const e in atcoder){
                    const data = atcoder[e];
                    const contestid =  data['contest_id'].toUpperCase()
                    const title = data['problem_id']
                    const point = data['point']
                    const url =  "https://atcoder.jp/contests/" + data['contest_id'] + "/submissions/" + data['id']
                    if(data['result'] === 'AC'){
                        const subtime = data['epoch_second'] * 1000;
                        const tmp = {
                            'site' : 'AtCoder',
                            'subtime' : subtime,
                            'contestId' : contestid,
                            'title' : title,//prob_dic[data['problem_id']],
                            'point' : point,
                            'detail' :url,
                        }

                        const s = new acsubmit(subtime, 'AC', contestid, title, point, url)
                        console.log('added')
                        submiss.add(s)

                        if(getdate(subtime) === d){
                            todaysac[subtime] = tmp;
                        }else{
                            subs[subtime] = tmp;
                        }
//                        addCount(getdate(subtime));
                        account += 1;
                    }
                }
                this.setState({
                    todaysac:todaysac,
                    submissions:subs,
                    account: account
                })
            })
        }
        //aoj
        if(this.state.aojuser !== ""){
            const url = "https://judgeapi.u-aizu.ac.jp/submission_records/users/" + this.state.aojuser + "?page=0&size=10000";
            fetch(url).then(res => {
                return res.json()
            }).then(aoj => {
                this.setState({isloaded : true});
                let todaysac = this.state.todaysac;
                let subs = this.state.submissions;
                let aojcount = 0;
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
                        if(getdate(subtime) === d){
                            todaysac[subtime] = tmp;
                        }else{
                            subs[subtime] = tmp;
                        }
//                        addCount(getdate(subtime));
                        aojcount += 1;
                    }
                }
                this.setState({
                    todaysac:todaysac,
                    submissions:subs,
                    aojcount: aojcount,
                })
            })
        }
        //ycuser
        if(this.state.ycuser !== ""){
            const url = "https://yukicoder.me/api/v1/solved/name/" + this.state.ycuser;
            fetch(url).then(res => {
                return res.json()
            }).then(yc => {
                this.setState({isloaded : true});
                let todaysac = this.state.todaysac;
                let subs = this.state.submissions;
                let yccount = 0;
                for(const e in yc){
                    const data = yc[e];
                    if(data["Level"] >= 3) continue;
                    const subtime = new Date(data['Date']).getTime();
                    const tmp = {
                        'site' : 'yukicoder',
                        'subtime' : subtime,
                        'contestId' : null,
                        'title' : data['Title'],
                        'point' : data['Level'],
                        'detail' : "https://yukicoder.me/"
                    }
//                    addCount(getdate(subtime));
                    if(getdate(subtime) === d){
                        todaysac[subtime] = tmp;
                    }else{
                        subs[subtime] = tmp;
                    }
                    yccount += 1
                }
                this.setState({
                    todaysac:todaysac,
                    submissions:subs,
                    yccount:yccount
                })
            })
        }
        this.setState({
            submiss: submiss
        })
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
                                'Sum' : this.state.account + this.state.cfcount + this.state.aojcount + this.state.syccount,
                            }
                        }
                    ></UserData>
                    <TodaysAC data = {this.state.todaysac} />
                    <App data = {this.state.submissions} />
                </div>
            )
        }else{
            return (
                <Paper className = 'inputbar'>
                    <TextField
                        id="cfid"
                        label="Codeforces ID"
                        className={styles.textField}
                        margin="normal"
                        onChange = {this.handleChange}
                        name = 'cfuser'
                    />
                    <div></div>
                    <TextField
                        id="acid"
                        label="AtCoder ID"
                        className={styles.textField}
                        margin="normal"
                        onChange = {this.handleChange}
                        name = 'acuser'
                    />
                    <div></div>
                    <TextField
                        id="aojid"
                        label="Aizu Online Judge ID"
                        className={styles.textField}
                        margin="normal"
                        onChange = {this.handleChange}
                        name = 'aojuser'
                    />
                    <div></div>
                    <TextField
                        id="ycid"
                        label="yukicoder ID"
                        className={styles.textField}
                        margin="normal"
                        onChange = {this.handleChange}
                        name = 'ycuser'
                    />
                    <div></div>
                    <br></br>
                    <div id = 'status'>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            className={styles.button} 
                            onClick = {this.handleClick}
                        >
                            Search
                        </Button>
                    </div>
                </Paper>
            )   
        }
  
    }
}
