import React, { Component } from 'react';

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

import Paper from '@material-ui/core/Paper';
import ReactTooltip from 'react-tooltip';

import './HeatMap.css';

export default class Hoge extends Component {
  render() {
    return (
      <Paper className = "heatmap">
        <CalendarHeatmap
          startDate={new Date('2022-01-01')}
          endDate={new Date()}
          values={this.props.data}
          classForValue={value => {
            if (!value) {
              return 'color-empty';
            }
            return `color-github-${Math.min(4, value.count)}`;
          }}
          tooltipDataAttrs={value => {
            return {
              'data-tip': `${value.date} : ${
                value.count
              } AC`,
            };
          }}
        />
        <ReactTooltip />
      </Paper>
    );
  }
}


