import React, { Component } from 'react';
import App from '../achistory/App';
import UserData from '../userdata/userdata';
import TodaysAC from '../todaysac/TodaysAC';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './inputs.css';
import {AtCoderClient, AizuOnlineJudgeClient, CodeForcesClient, yukicoderClient} from "../../modules/client";
import {submissions} from "../../modules/submit";

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
