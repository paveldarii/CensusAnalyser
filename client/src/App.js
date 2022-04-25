import React, { useState, useEffect } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
//components
import Nav from "./Components/Nav";

//pages
import AnalyticsTable from "./Pages/AnalyticsTable";
import AnalyticsScatter from "./Pages/AnalyticsScatter";
import Home from "./Pages/Home";

function App() {
  const [countries, setCountries] = useState([]);
  const [censusData, setCensusData] = useState([]);
  useEffect(() => {
    axios.get("/api/census/countries").then((res) => {
      setCountries(() => [...res.data.countries]);
    });
    axios.get(`/api/census/analytics/raw/`).then((res) => {
      setCensusData(() => [...res.data.censusData]);
    });
  }, []);

  return (
    <div>
      <Router>
        <Nav />
        <MDBContainer className="mt-3">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/analytics/table"
              element={
                <AnalyticsTable countries={countries} censusData={censusData} />
              }
            />
            <Route
              exact
              path="/analytics/scatter"
              element={<AnalyticsScatter countries={countries} />}
            />
            <Route element={<Home />} />
          </Routes>
        </MDBContainer>
      </Router>
    </div>
  );
}

export default App;
