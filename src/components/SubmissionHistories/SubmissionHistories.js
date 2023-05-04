import React, {Component} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, Paper} from '@material-ui/core';
import './App.css';

export default class SubmissionHistories extends Component {
  render() {
    var keys = Object.keys(this.props.data);
    keys.sort();
    keys.reverse();

    return (
      <Paper className = 'log'>
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
                <TableCell align="left">{submit.getDate()}</TableCell>
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


