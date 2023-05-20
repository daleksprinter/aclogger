import React, {Component} from 'react';
import './SubmissionCount.css'

interface AppProps{
    site: string
    count: number
}
interface AppState{}
export default class SubmissionCount extends Component<AppProps, AppState>{

    render(){
        return(
            <div className = 'account'>
                <div>{this.props.site}</div>
                <div className = 'count'>{this.props.count}</div>
            </div>
        )
    }
}
