import React from 'react';
import {Paper, TextField, Button} from "@mui/material";
import './usernames.css'

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
});

interface AppProps{
    handleClick:
}
interface AppState{
    cfuser: String
    acuser: String
    aojuser: String
    ycuser: String
}
export default class UserNames extends React.Component<AppProps, AppState>{

    constructor(props: AppProps){
        super(props);
        this.state = {
            cfuser : "",
            acuser : "",
            aojuser : "",
            ycuser : "",
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    handleClick = () => {
        this.props.handleClick(this.state.acuser, this.state.cfuser, this.state.aojuser, this.state.ycuser)
    }
    render(){
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
                           Refresh
                        </Button>
                    </div>
                </Paper>
        );
    }
}
