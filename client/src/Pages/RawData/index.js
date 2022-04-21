import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import MultiRangeSlider from "../../Components/MultiRangeSlider";
import "rsuite-table/dist/css/rsuite-table.css";

const dataList = [
  { id: 1, name: "a", email: "a@email.com", avartar: "..." },
  { id: 2, name: "b", email: "b@email.com", avartar: "..." },
  { id: 3, name: "c", email: "c@email.com", avartar: "..." },
];

const App = () => {
  const maxYearRange = 200;
  const [countries, setCountries] = useState([]);
  const [years, setYears] = useState([]);
  const [censusData, setCensusData] = useState([]);
  const [errorColor, setErrorColor] = useState("black");
  useEffect(() => {
    axios.get("/api/census/countries").then((res) => {
      setCountries(() => [...res.data.countries]);
    });
  }, []);

  const handleRangeChange = (min, max) => {
    let timeout;
    if (max - min < maxYearRange) {
      clearTimeout(timeout);
      setErrorColor("black");
      timeout = setTimeout(function() {
        axios.get(`/api/census/analytics/raw/${min},${max}`).then((res) => {
          setCensusData(() => [...res.data.censusData]);
          clearTimeout(timeout);
        });
      }, 3000);
    } else {
      setErrorColor("red");
    }
  };
  return (
    <>
      <div>
        <Table
          virtualized
          height={700}
          style={{ marginTop: "50px" }}
          data={censusData}
          bordered
          cellBordered
          affixHeader
          affixHorizontalScrollbar
        >
          <Column width={70} fixed resizable>
            <HeaderCell>Year</HeaderCell>
            <Cell dataKey="Year" />
          </Column>
          {countries.map((country) => {
            return (
              <Column width={100} resizable key={country.name}>
                <HeaderCell>{country.name}</HeaderCell>
                <Cell dataKey={country.name} />
              </Column>
            );
          })}
        </Table>
      </div>
      <div
        style={{
          marginTop: "20px",
          float: "right",
        }}
      >
        <span className="p-3" style={{ color: errorColor }}>
          Select Max <b>{maxYearRange}</b> Years Range
        </span>
        <MultiRangeSlider
          min={1}
          max={2018}
          handleRangeChange={handleRangeChange}
        />
      </div>
    </>
  );
};

export default App;
