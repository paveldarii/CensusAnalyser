import React from "react";
import { Container } from "@mui/material";

const PageContent = (props) => {
  return <Container maxWidth="lg">{props.children}</Container>;
};

export default PageContent;
