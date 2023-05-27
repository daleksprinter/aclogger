import React, { Component } from 'react';

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

import {Paper} from '@mui/material';
import {Tooltip as ReactTooltip} from 'react-tooltip';

import './HeatMap.css';
import {Submit} from "../../modules/submit";

interface AppProps{
    data: Submit[]
}
interface AppState{}

interface CountMap{
    [index: string]: number
}
export default class Hoge extends Component<AppProps, AppState> {
    dataToValues(data: Submit[]){
        let m: CountMap = {};
        for(const sub of data) {
            const d = sub.getDateString()
            const cnt = m[d] ? m[d] + 1 : 1
            m[d] = cnt
        }
        let ret = []
        for(const date in m) {
            const val = {date: date, count: m[date]}
            ret.push(val)
        }
        return ret
    }
  render() {
      const s = new Date()
      s.setFullYear(s.getFullYear() - 1)
    return (
      <Paper className = "heatmap">
        <CalendarHeatmap
            showOutOfRangeDays={true}
          startDate={s}
          endDate={new Date()}
          values={this.dataToValues(this.props.data)}
          classForValue={(value: any) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-github-${Math.min(4, value.count)}`;
          }}
          tooltipDataAttrs={(value: any) => {
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


