import React from "react";
import PageContent from "../PageContent";
import Analytics from "../../Pages/Analytics";
import RawData from "../../Pages/RawData";

function Page({ currentPage }) {
  const renderPage = () => {
    switch (currentPage.name) {
      case "raw data":
        return <RawData />;
      case "analytics":
        return <Analytics />;
      default:
        return <RawData />;
    }
  };

  return (
    <section>
      <PageContent>{renderPage()}</PageContent>
    </section>
  );
}
export default Page;
