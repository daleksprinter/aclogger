import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

import './hoge.css';

export default class Hoge extends Component {
  render() {
    console.log(this.props.data);
    return (
      <CalendarHeatmap
        startDate={new Date('2018-01-01')}
        endDate={new Date()}
        values={this.props.data}
      />
    );
  }
}


