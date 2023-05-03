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
    constructor(t, result, contest, title, point, url) {
        this.t = t
        this.result = result
        this.contest  = contest
        this.title = title
        this.point = point
        this.url = url
    }
}

class acsubmit extends submit {
    getSite() {
        return "AtCoder"
    }
}
class cfsubmit extends submit {
    getSite() {
        return "CodeForces"
    }
}
class aojsubmit extends submit {
     getSite() {
        return "AizuOnlineJudge"
    }
}
class ycsubmit extends submit {
     getSite() {
        return "yukicoder"
    }
}

class submissions {
    constructor() {
        this.subs = []
    }

    add(submission) {
        this.subs.push(submission)
    }

    count() {
        return this.subs.length
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

    getTodayAC() {
        return [new acsubmit('', 'AC', '', '', '', '')]
    }

    getAll()  {
        return this.subs
    }

    merge(submissions){
        submissions.getAll().map(sub => {
            this.add(sub)
        })
    }
}

class client{}
class acclient extends client{
    constructor(user) {
        super();
        this.user = user
        this.url = "https://kenkoooo.com/atcoder/atcoder-api/results?user=" + user
    }
    fetch() {
        return fetch(this.url).then((res) => {
            return res.json()
        })
    }

    resToSub(res) {
        const subtime = res['epoch_second'] * 1000;
        const result = res['result']
        const contestid =  res['contest_id'].toUpperCase()
        const title = res['problem_id']
        const point = res['point']
        const url =  "https://atcoder.jp/contests/" + res['contest_id'] + "/submissions/" + res['id']

        const s = new acsubmit(subtime, result, contestid, title, point, url)
        return s
    }

    toSubmissions(results) {
        const subs = new submissions()
        for(const res of results){
            subs.add(this.resToSub(res))
        }
        return subs
    }
}

class cfclient extends client {
    constructor(user) {
        super();
        this.user = user
        this.url = "https://codeforces.com/api/user.status?handle=" + this.user + "&from=1&count=1000"
    }

    fetch() {
        return fetch(this.url).then((res) => {
            return res.json()
        })
    }

    resToSub(res) {
          const subtime = res['creationTimeSeconds'] * 1000;
          const result = res['verdict']
          const contestid = res['problem']['contestId']
          const title = res['problem']['index'] + '. ' + res['problem']['name']
          const point = res['problem']['rating']
          const url = "https://codeforces.com/contest/" + res['problem']['contestId'] + "/submission/" + res['id']
          const sub = new cfsubmit(subtime, result, contestid, title, point, url)
          return sub
    }

    toSubmissions(results) {
        const subs = new submissions()
        for(const res of results){
            subs.add(this.resToSub(res))
        }
        return subs
    }

}

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
        const cf = new cfclient(this.state.cfuser)
        cf.fetch().then(json => {
            const subs = cf.toSubmissions(json['result'])
            submiss.merge(subs)
            this.setState({
                isloaded: true,
                submiss: submiss
            })
        })

        //atcoder
        const ac = new acclient(this.state.acuser)
        ac.fetch().then(json => {
            const subs = ac.toSubmissions(json)
            submiss.merge(subs)
            this.setState({
                isloaded: true,
                submiss: submiss
            })
        })

        //aoj
        if(this.state.aojuser !== ""){
            const url = "https://judgeapi.u-aizu.ac.jp/submission_records/users/" + this.state.aojuser + "?page=0&size=10000";
            fetch(url).then(res => {
                return res.json()
            }).then(aoj => {
                this.setState({isloaded : true});
                for(const e in aoj){
                    const data = aoj[e];
                    const subtime = data['submissionDate'];
                    const title = data['problemId']
                    const url = "http://judge.u-aizu.ac.jp/onlinejudge/review.jsp?rid=" + data['judgeId']
                    const s = new aojsubmit(subtime, 'AC', '', title, null, url)
                    submiss.add(s)
                }
                this.setState({
                    submiss: submiss
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
                for(const e in yc){
                    const data = yc[e];
                    if(data["Level"] >= 3) continue;
                    const subtime = new Date(data['Date']).getTime();
                    const title = data['Title']
                    const point =  data['Level']
                    const url  = "https://yukicoder.me/"
                    const s = new ycsubmit(subtime, null, title, point, url)
                    submiss.add(s)
                }
                this.setState({
                    submiss: submiss
                })
            })
        }

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
