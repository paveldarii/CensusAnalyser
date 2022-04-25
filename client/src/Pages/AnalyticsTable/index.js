import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import MultiRangeSlider from "../../Components/MultiRangeSlider";
import "rsuite-table/dist/css/rsuite-table.css";

const RawData = () => {
  // slider selector initialize values
  const [initMin, initMax, maxYearRange, min, max] = [1850, 2018, 200, 1, 2018];
  const [countries, setCountries] = useState([]);
  const [censusData, setCensusData] = useState([]);
  const [filteredCensusData, setFilteredCensusData] = useState([]);
  const [errorColor, setErrorColor] = useState("black");

  useEffect(() => {
    setErrorColor("black");
    axios.get("/api/census/countries").then((res) => {
      setCountries(() => [...res.data.countries]);
    });
    axios.get(`/api/census/analytics/raw/`).then((res) => {
      setCensusData(() => [...res.data.censusData]);
    });
  }, []);

  //debounce for 0.75 second on range change
  const debouncedRangeChange = useDebouncedCallback(({ min, max }) => {
    setFilteredCensusData(() => {
      return censusData.filter(
        (year) => (parseInt(year.Year) >= min) & (parseInt(year.Year) <= max)
      );
    });
  }, 750);

  useEffect(() => {
    setFilteredCensusData(() => {
      return censusData.filter(
        (year) =>
          (parseInt(year.Year) >= initMin) & (parseInt(year.Year) <= initMax)
      );
    });
  }, [censusData]);

  const handleRangeChange = (min, max) => {
    if (max - min < maxYearRange) {
      setErrorColor("black");
      debouncedRangeChange({ min, max });
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
          data={filteredCensusData}
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
          min={min}
          max={max}
          initMin={initMin}
          handleRangeChange={handleRangeChange}
        />
      </div>
    </>
  );
};

export default RawData;
