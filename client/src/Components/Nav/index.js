import React, { useEffect } from "react";
import { Tabs, Tab } from "@mui/material";

function Nav({ pages, setCurrentPage, currentPage }) {
  useEffect(() => {
    document.title = currentPage.name;
  }, [currentPage]);

  return (
    <Tabs value={currentPage.value} centered>
      {pages.map((page) => (
        <Tab
          onClick={() => setCurrentPage(page)}
          label={page.name}
          key={page.name}
        />
      ))}
    </Tabs>
  );
}

export default Nav;
