import React, { useState } from "react";
import Nav from "./Components/Nav";
import Page from "./Components/Page";

function App() {
  const [pages] = useState([
    {
      name: "raw data",
    },
    { name: "analytics" },
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
