import { Chart } from "react-google-charts";
import React from "react";
import { useColorModeValue } from "@chakra-ui/react";
import styles from "./GanttChart.module.scss";

const GanttChart = ({ data }) => {
  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percentage done" },
    { type: "string", lable: "Dependencies" },
  ];
  console.log(data);

  const chartData = [];
  data.forEach((sprint) => {
    let row = [
      "" + sprint.id,
      "Sprint " + sprint.goal,
      null,
      new Date(sprint.startDate * 1000),
      new Date(sprint.endDate * 1000),
      null,
      sprint.completePercentage,
      null,
    ];
    chartData.push(row);
  });
  const chartHeight = data ? (data.length + 1) * 40 : 500;

  const options = {
    height: chartHeight,
    gantt: {
      trackHeight: 40,
      criticalPathEnabled: false,
      innerGridTrack: { fill: useColorModeValue("white", "#031d46") },
      // palette: palette,
    },
    backgroundColor: {
      fill: useColorModeValue("white", "#031d46"),
    },
  };

  return (
    <div className={useColorModeValue(styles.lightChart, styles.darkChart)}>
      <Chart
        chartType="Gantt"
        width="100%"
        height="50%"
        data={[columns, ...chartData]}
        options={options}
      />
    </div>
  );
};

export default GanttChart;
