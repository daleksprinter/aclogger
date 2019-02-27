import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import './userdata.css';
import ACData from './acdata.js';
import { SocialIcon } from 'react-social-icons';


export default class UserData extends Component{

    render(){
        var tweettext = "";
        for(const k in this.props.data){
            tweettext += k + " : " + this.props.data[k] + "AC" + "%0A";
        }
        tweettext += "Send by ACLogger";
        return(
            <Paper className = 'userdata'>

                {Object.keys(this.props.data).map((key) => (
                    <ACData className = "account" site = {key} count = {this.props.data[key]} />
                ))}
                <a className = 'tweetbutton' href={"https://twitter.com/intent/tweet?text=" + tweettext}>
                    <SocialIcon network = 'twitter' />
                </a>
            </Paper>
        )
    }
    
}