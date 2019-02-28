import React, {Component} from 'react';
import './account.css'
export default class ACData extends Component{

    render(){
        return(
            <div className = 'account'>
                <div>{this.props.site}</div>
                <div className = 'count'>{this.props.count}</div>
            </div>
        )
    }
}