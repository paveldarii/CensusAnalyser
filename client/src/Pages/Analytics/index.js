import React, { useState, useEffect } from "react";
import AnalyticsModal from "../../Components/AnalyticsModal";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
export default function ApexChart(props) {
  const [options] = useState({
    chart: {
      height: "100%",
      type: "scatter",
      zoom: {
        enabled: true,
        type: "xy",
      },
    },
    xaxis: {
      tickAmount: 15,
      labels: {
        formatter: function (val) {
          return parseInt(val);
        },
      },
    },
    yaxis: {
      tickAmount: 7,
    },
  });
  const [series, setSeries] = useState([]);
  // useEffect(() => {
  //   axios.get("/api/census-data").then((res) => {
  //     const series = res.data;
  //     setSeries(series.data);
  //   });
  // }, []);

  const fetchSelectedCountries = () => {
    axios.get("/api/census/analytics/scatter").then((res) => {
      const series = res.data;
      setSeries(series.data);
    });
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="scatter"
        height={750}
      />
      <AnalyticsModal fetchSelectedCountries={fetchSelectedCountries} />
    </div>
  );
}
