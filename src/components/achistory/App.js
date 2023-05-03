import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './App.css';


function zeroPadding(num, len){
  return ('00000' + num).slice(-len);
}

function getdate(millisec){
  const date = new Date(millisec);
  return date.getFullYear() + "-" + zeroPadding(Number(date.getMonth()) + 1, 2) + "-" + zeroPadding(date.getDate(), 2);
}

export default class App extends Component {

  render() {
    var keys = Object.keys(this.props.data);
    keys.sort();
    keys.reverse();

    console.log(this.props.data)
    
    return (
      <Paper className = 'log'>
        <div className = 'title'>Past AC History</div>
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
              <TableRow className = "subdet" key = 'hoge' onClick = {() => window.open(submit.url, "_blank")}>
                <TableCell align="left">{getdate(submit.t)}</TableCell>
                <TableCell align="center" >{submit.getSite()}</TableCell>
                <TableCell align="center">{submit.contest}</TableCell>
                <TableCell align="center">{submit.title}</TableCell>
                <TableCell align="center">{submit.point}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}


