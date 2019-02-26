import React, {Component} from 'react';
import './account.css'
export default class ACData extends Component{

    render(){
        return(
            <div className = 'account'>
                <div>{this.props.site}</div>
                <div>{this.props.username}</div>
                <div>
                    <h2>{this.props.count}</h2>
                </div>
            </div>
        )
    }
}