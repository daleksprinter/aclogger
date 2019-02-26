import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import './userdata.css';
export default class UserData extends Component{

    render(){
        return(
            <Paper className = 'userdata'>

                {Object.keys(this.props.data).map((key) => (
                    <div>{key} : {this.props.data[key]}</div>
                ))}
            </Paper>
        )
    }
    
}