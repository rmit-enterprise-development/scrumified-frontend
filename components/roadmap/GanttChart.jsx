import { Chart } from 'react-google-charts';
import React from 'react';
import { useColorModeValue } from "@chakra-ui/react";

const GanttChart = ({data}) => {
  const chartHeight = data ? data.length * 40 : 500;
  const options = {
      height: chartHeight,
      gantt: {
        labelStyle: {
          fontName: 'Arial',
          fontSize: "md"
        },
        trackHeight: 40,
        criticalPathEnabled: false,
        innerGridTrack: { fill: useColorModeValue("white","#031d46") },
      },
      backgroundColor: {
        fill: useColorModeValue("white", 'yellow')
      },
      hAxis: {
        titleTextStyle: {
          color: "red"
        }
      }
  };

  return (
      <Chart
      chartType="Gantt"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
};

export default GanttChart;