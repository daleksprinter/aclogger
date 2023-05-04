import React, {Component} from 'react';
import './SubmissionCount.css'
export default class SubmissionCount extends Component{

    render(){
        return(
            <div className = 'account'>
                <div>{this.props.site}</div>
                <div className = 'count'>{this.props.count}</div>
            </div>
        )
    }
}
