import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import MultiRangeSlider from "../../Components/MultiRangeSlider";
import "rsuite-table/dist/css/rsuite-table.css";

const RawData = ({ countries, censusData }) => {
  // slider selector initialize values
  const [initMin, initMax, maxYearRange, min, max] = [1850, 2018, 200, 1, 2018];
  const [filteredCensusData, setFilteredCensusData] = useState([]);
  const [errorColor, setErrorColor] = useState("#1266f1");

  //debounce for 0.75 second on range change
  const debouncedRangeChange = useDebouncedCallback(({ min, max }) => {
    setFilteredCensusData(() => {
      return censusData.filter(
        (year) => (parseInt(year.Year) >= min) & (parseInt(year.Year) <= max)
      );
    });
  }, 750);

  useEffect(() => {
    setErrorColor("#1266f1");
  }, []);

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
      setErrorColor("#1266f1");
      debouncedRangeChange({ min, max });
    } else {
      setErrorColor("#cc0000");
    }
  };
  return (
    <section>
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
          <HeaderCell className="text-primary" style={{ background: "#fff" }}>
            Year
          </HeaderCell>
          <Cell
            dataKey="Year"
            style={{ background: "#F5F5F5" }}
            className="text-primary"
          />
        </Column>
        {countries.map((country) => {
          return (
            <Column width={100} resizable key={country.name}>
              <HeaderCell
                className="text-white"
                style={{ background: "#1266f1" }}
              >
                {country.name}
              </HeaderCell>
              <Cell dataKey={country.name} />
            </Column>
          );
        })}
      </Table>
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
    </section>
  );
};

export default RawData;
