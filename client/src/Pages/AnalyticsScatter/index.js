import React, { useState } from "react";
import AnalyticsModal from "../../Components/SelectCountriesModal";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
export default function AnalyticsScatter({ countries }) {
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
        formatter: function(val) {
          return parseInt(val);
        },
      },
    },
    yaxis: {
      tickAmount: 7,
    },
  });
  const [series, setSeries] = useState([]);
  const fetchSelectedCountries = (ids) => {
    axios.get(`/api/census/analytics/scatter/${ids}`).then((res) => {
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
      <AnalyticsModal
        fetchSelectedCountries={fetchSelectedCountries}
        countries={countries}
      />
    </div>
  );
}
