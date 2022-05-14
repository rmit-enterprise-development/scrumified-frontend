import { Chart } from 'react-google-charts';
import React from 'react';
import { useColorModeValue } from "@chakra-ui/react";

const GanttChart = ({data}) => {
  const chartHeight = data ? data.length * 40 : 500;
  const options = {
      height: chartHeight,
      gantt: {
        labelStyle: {
          fontName: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
          fontSize: "18px",
          fontWeight: "500"
        },
        trackHeight: 40,
        criticalPathEnabled: false,
        innerGridTrack: { fill: useColorModeValue("white","#354A6D") },
      },
      backgroundColor: {
        fill: useColorModeValue("white", '#354A6D')
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