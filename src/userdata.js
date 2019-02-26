import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import './userdata.css';
import ACData from './acdata.js';
import { SocialIcon } from 'react-social-icons';


export default class UserData extends Component{

    render(){
        return(
            <Paper className = 'userdata'>

                {Object.keys(this.props.data).map((key) => (
                    <ACData className = "account" site = {key} count = {this.props.data[key]} />
                ))}
                <button className = 'tweetbutton' onClick = {() => (alert("未実装です。ごめんなさい。"))}>
                    <SocialIcon network = "twitter"/>
                </button>
            </Paper>
        )
    }
    
}