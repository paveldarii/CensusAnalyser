import React, { useEffect } from "react";
import { Tabs, Tab } from "@mui/material";

function Nav({ pages, setCurrentPage, currentPage, ...props }) {
  useEffect(() => {
    document.title = currentPage.name;
  }, [currentPage]);
  return (
    <Tabs centered>
      {pages.map((page) => (
        <Tab onClick={() => setCurrentPage(page)} label={page.name} />
      ))}
    </Tabs>
  );
}

export default Nav;
