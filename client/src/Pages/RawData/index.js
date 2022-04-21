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
    axios.get("/api/census/years").then((res) => {
      setYears(() => [...res.data.years]);
    });
  }, []);

  const handleYearChange = (min, max) => {
    if (max - min > maxYearRange) {
      setErrorColor("red");
      let timeout = setTimeout(function() {
        axios.get("/api/census/analytics/raw").then((res) => {
          setCensusData(() => [...res.data.censusData]);
          clearTimeout(timeout);
        });
      }, 3000);
    } else {
      setErrorColor("black");
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
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <span className="px-3 pt-2" style={{ color: errorColor }}>
          Select Max <b>{maxYearRange}</b> Years Range
        </span>
        <MultiRangeSlider
          min={1}
          max={2018}
          onChange={({ min, max }) => handleYearChange(min, max)}
        />
      </div>
    </>
  );
};

export default App;
