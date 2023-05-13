import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
// import * as Zoom from "chartjs-plugin-zoom";

const LineChartV3 = (props) => {
  const { labels, datasets } = props;

  const [chartDatasets, setChartDatasets] = useState(datasets[0].data);
  const [chartlabels, setChartlabels] = useState(labels);

  useEffect(() => {
    setChartDatasets(datasets[0].data);
    setChartlabels(labels);
  }, [datasets, labels]);

  const data = {
    labels: [...chartlabels],
    datasets: [
      {
        borderColor: "blue",
        data: [...chartDatasets],
        fill: false,
        label: "line",
      },
    ],
  };

  const options = {
    pan: {
      enabled: true,
      mode: "x",
      speed: 1,
      threshold: 1,
    },
    zoom: {
      enabled: true,
      drag: true,
      mode: "x",
    },
  };

  // useEffect(() => {
  //     debugger;
  //     setChartDatasets(datasets);
  //     setChartLabels(labels);
  // }, [datasets, labels])

  return <Line data={data} options={options} />;
};

LineChartV3.defaultProps = {
    
  labels: [
    "20-04-2021 22:30",
    "20-04-2021 22:35",
    "20-04-2021 22:40",
    "20-04-2021 22:45",
  ],
  datasets: [
    {
      label: "Dataset label",
      borderColor: "red",
      data: [5, 10, 17, 15],
      fill: false,
    },
    {
      label: "Dataset label",
      borderColor: "blue",
      data: [5, 10, 20, 12],
      fill: false,
    },
  ],
};

LineChartV3.propTypes = {
  labels: PropTypes.array,
  datasets: PropTypes.array,
};

export default LineChartV3;
