import React from "react";
import PageContent from "../PageContent";

function Page({ currentPage }) {
  const renderPage = () => {
    switch (currentPage.name) {
      case "raw data":
        return <p>Raw Data</p>;
      case "analytics":
        return <p>Analytics</p>;
      default:
        return <p>Raw Data</p>;
    }
  };

  return (
    <section>
      <PageContent>{renderPage()}</PageContent>
    </section>
  );
}
export default Page;
