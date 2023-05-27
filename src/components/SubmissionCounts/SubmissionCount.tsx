import React, {Component} from 'react';

interface AppProps{
    site: string
    count: number
}
interface AppState{}
export default class SubmissionCount extends Component<AppProps, AppState>{

    render(){
        return(
            <div style={{display:'inline-block', margin:'20px 30px', color:'rgb(100, 100, 100)'}}>
                <div>{this.props.site}</div>
                <div style={{fontSize:'34px', fontWeight:'bold'}}>{this.props.count}</div>
            </div>
        )
    }
}
