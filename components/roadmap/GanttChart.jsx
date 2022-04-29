import { Chart } from 'react-google-charts';
import React from 'react';
import { data } from './ChartData'
import { useColorModeValue } from "@chakra-ui/react";

const GanttChart = () => {
    const options = {
        height: 40*13,
        gantt: {
          trackHeight: 40,
          criticalPathEnabled: false,
          innerGridTrack: { fill: useColorModeValue("","#031d46") },
        },
        backgroundColor: {
          fill: useColorModeValue("#FFFDFE", "#031E49")
        },
        legend: {
          textStyle: {
            
          }
        }
    };

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