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
            {keys.map((key) => (
              <TableRow className = "subdet" key = {key} onClick = {() => window.open(this.props.data[key]['detail'], "_blank")}>
                <TableCell align="left">Today</TableCell>
                <TableCell align="center" >{this.props.data[key]['site']}</TableCell>
                <TableCell align="center">{this.props.data[key]['contestId']}</TableCell>
                <TableCell align="center">{this.props.data[key]['title']}</TableCell>
                <TableCell align="center">{this.props.data[key]['point']}</TableCell>
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


