import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import Paper from '@material-ui/core/Paper';
import './hoge.css';

export default class Hoge extends Component {
  render() {
    console.log(this.props.data);
    return (
      <Paper className = "heatmap">
        <CalendarHeatmap
          startDate={new Date('2018-01-01')}
          endDate={new Date()}
          values={this.props.data}
          classForValue={value => {
            if (!value) {
              return 'color-empty';
            }
            return `color-github-${Math.min(4, value.count)}`;
          }}
        />
      </Paper>
    );
  }
}


