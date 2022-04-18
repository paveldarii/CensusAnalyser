import React, { useState } from "react";
import Nav from "./Components/Nav";
import Page from "./Components/Page";

function App() {
  const [pages] = useState([
    {
      name: "raw data",
      value: 0,
    },
    { name: "analytics", value: 1 },
  ]);
  const [currentPage, setCurrentPage] = useState(pages[0]);
  return (
    <div>
      <Nav
        pages={pages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <Page currentPage={currentPage} />
    </div>
  );
}

export default App;
