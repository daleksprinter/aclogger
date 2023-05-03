import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import './todaysac.css'

var sitedic = {
    'Codeforces' : 'CF',
    'AtCoder' : 'AC',
    'Aizu Online Judge' : "AOJ",
    'yukicoder' : "YC",
}

export default class TodaysAC extends Component {

  render() {
    var keys = Object.keys(this.props.data);
    keys.sort();
    keys.reverse();


    var tweet_text = "Today's AC%0A";

    for(const key of keys){
        tweet_text += sitedic[this.props.data[key]['site']] + " : " + this.props.data[key]['title'] + "%0A";
    }
    tweet_text += "Sum : " + keys.length + "%0A";
    tweet_text += "%23ACLogger";
    console.log(this.props.data)


    
    return (
      <Paper className = 'log'>
        <div className = 'todaysactitle'>Today's AC</div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Submission Date</TableCell>
              <TableCell align="center">Judge</TableCell>
              <TableCell align="center">Contest Name</TableCell>
              <TableCell align="center">Problem Name</TableCell>
              <TableCell align="center">Point</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {this.props.data.map((submit) => (
              <TableRow className = "subdet" key = {'hoge'} onClick = {() => window.open(submit.url, "_blank")}>
                <TableCell align="left">Today</TableCell>
                <TableCell align="center" >{submit.getSite()}</TableCell>
                <TableCell align="center">{submit.contestid}</TableCell>
                <TableCell align="center">{submit.title}</TableCell>
                <TableCell align="center">{submit.point}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          
                <div className = 'button'>
                    <Button color = "primary" variant = "contained"
                        onClick = {() => window.open('https://twitter.com/intent/tweet?text=' + tweet_text)}>tweet</Button>
                </div>
        </Table>
      </Paper>
    );
  }
}


