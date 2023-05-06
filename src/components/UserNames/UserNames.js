import React from 'react';
import {Paper, TextField, Button} from "@mui/material";

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
});

export default class UserNames extends React.Component{

    constructor(){
        super();
        this.state = {
            cfuser : "",
            acuser : "",
            aojuser : "",
            ycuser : "",
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
