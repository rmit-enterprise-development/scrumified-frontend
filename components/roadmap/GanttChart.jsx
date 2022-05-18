import { Chart } from "react-google-charts";
import React from "react";
import { useColorModeValue } from "@chakra-ui/react";
import styles from "./GanttChart.module.scss";

const palette = [
  {
    color: "#db4437",
    dark: "#a52714",
    light: "#f4c7c3",
  },
  {
    color: "#f2a600",
    dark: "#ee8100",
    light: "#fce8b2",
  },
  {
    color: "#0f9d58",
    dark: "#0b8043",
    light: "#b7e1cd",
  },
  {
    color: "#ab47bc",
    dark: "#6a1b9a",
    light: "#e1bee7",
  },
  {
    color: "#00acc1",
    dark: "#00838f",
    light: "#b2ebf2",
  },
  {
    color: "#ff7043",
    dark: "#e64a19",
    light: "#ffccbc",
  },
  {
    color: "#9e9d24",
    dark: "#827717",
    light: "#f0f4c3",
  },
  {
    color: "#5c6bc0",
    dark: "#3949ab",
    light: "#c5cae9",
  },
  {
    color: "#f06292",
    dark: "#e91e63",
    light: "#f8bbd0",
  },
  {
    color: "#00796b",
    dark: "#004d40",
    light: "#b2dfdb",
  },
  {
    color: "#c2185b",
    dark: "#880e4f",
    light: "#f48fb1",
  },
];

const GanttChart = ({ data }) => {
  const columns = [
    { type: "string", label: "Sprint ID" },
    { type: "string", label: "Sprint Goal" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percentage done" },
    { type: "string", label: "Dependencies" },
  ];
  console.log(data);

  const chartData = [];
  data.forEach((sprint) => {
    let row = [
      "" + sprint.id,
      "Sprint " + sprint.goal,
      "Color palette " + (sprint.id % 11),
      new Date(sprint.startDate * 1000),
      new Date(sprint.endDate * 1000),
      null,
      sprint.completePercentage,
      null,
    ];
    chartData.push(row);
  });
  const chartHeight = data ? (data.length + 1) * 60 : 500;

  const options = {
    height: chartHeight,
    gantt: {
      trackHeight: 60,
      criticalPathEnabled: false,
      innerGridTrack: { fill: useColorModeValue("white", "#031d46") },
      palette: palette,
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
