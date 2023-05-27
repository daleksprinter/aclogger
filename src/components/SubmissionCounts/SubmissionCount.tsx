import React from 'react';

interface AppProps{
    site: string
    count: number
}
const SubmissionCount = (props: AppProps) => {

    return(
        <div style={{display:'inline-block', margin:'20px 30px', color:'rgb(100, 100, 100)'}}>
            <div>{props.site}</div>
            <div style={{fontSize:'34px', fontWeight:'bold'}}>{props.count}</div>
        </div>
    )
}

export default SubmissionCount
