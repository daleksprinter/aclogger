import React from 'react';
import {Paper, TextField, Button} from "@material-ui/core";

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
});

export default class UserNames extends React.Component{
    render(){
        return (
             <Paper className = 'inputbar'>
                    <TextField
                        id="cfid"
                        label="Codeforces ID"
                        className={styles.textField}
                        margin="normal"
                        onChange = {this.props.handleChange}
                        name = 'cfuser'
                    />
                    <div></div>
                    <TextField
                        id="acid"
                        label="AtCoder ID"
                        className={styles.textField}
                        margin="normal"
                        onChange = {this.props.handleChange}
                        name = 'acuser'
                    />
                    <div></div>
                    <TextField
                        id="aojid"
                        label="Aizu Online Judge ID"
                        className={styles.textField}
                        margin="normal"
                        onChange = {this.props.handleChange}
                        name = 'aojuser'
                    />
                    <div></div>
                    <TextField
                        id="ycid"
                        label="yukicoder ID"
                        className={styles.textField}
                        margin="normal"
                        onChange = {this.props.handleChange}
                        name = 'ycuser'
                    />
                    <div></div>
                    <br></br>
                    <div id = 'status'>
                        <Button
                            variant="outlined"
                            color="primary"
                            className={styles.button}
                            onClick = {this.props.handleClick}
                        >
                            Search
                        </Button>
                    </div>
                </Paper>
        );
    }
}
