import * as React from "react";
import AnalyticsModal from "../../Components/AnalyticsModal";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
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
      },
    };
  }
  componentDidMount() {
    axios.get("/api/census-data").then((res) => {
      const series = res.data;
      this.setState({ ...this.state, series: series.data });
    });
  }
  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="scatter"
          height={750}
        />
        <AnalyticsModal />
      </div>
    );
  }
}
export default ApexChart;
