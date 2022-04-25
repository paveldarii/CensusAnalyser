import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//components
import Nav from "./Components/Nav";

//pages
import AnalyticsTable from "./Pages/AnalyticsTable";
import AnalyticsScatter from "./Pages/AnalyticsScatter";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <MDBContainer className="mt-4">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/analytics/table" element={<AnalyticsTable />} />
            <Route
              exact
              path="/analytics/scatter"
              element={<AnalyticsScatter />}
            />
            <Route element={<Home />} />
          </Routes>
        </MDBContainer>
      </Router>
    </div>
  );
}

export default App;
