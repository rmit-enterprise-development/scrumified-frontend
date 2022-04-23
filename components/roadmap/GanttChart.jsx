import { Chart } from 'react-google-charts';
import React from 'react';
import { data } from './ChartData'

const GanttChart = () => {
    const options = {
        height: 400,
        gantt: {
          trackHeight: 30,
        },
    };
    {console.log(data)};

    return (
        <Chart
        chartType="Gantt"
        width="100%"
        height="50%"
        data={data}
        options={options}
      />
    );
};

export default GanttChart;