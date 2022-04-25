import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import censusScatterImage from "../../assets/census-scatter.png";
import censusTableImage from "../../assets/census-table.png";
const Home = () => {
  return (
    <section className=" d-flex align-items-center justify-content-center">
      <MDBRow>
        <MDBCol size="12">
          <h1 className="text-center">
            Welcome to{" "}
            <strong>
              <span className="text-primary">Census</span>Analytics
            </strong>
            !
          </h1>
        </MDBCol>
        <MDBCol size="12" className="col-example">
          <h5 className="text-center">
            <strong>
              <span className="text-primary">Census</span>Analytics
            </strong>{" "}
            uses tables and graphs to analyze world countries population census
            for years 1-2018.
          </h5>
        </MDBCol>
        <MDBCol size="md-6">
          <MDBCard>
            <MDBCardImage
              src={censusTableImage}
              position="top"
              alt="census table image"
            />
            <MDBCardBody>
              <MDBCardTitle>Census Table</MDBCardTitle>
              <MDBCardText>
                Filter census by years and compare it between countries.
              </MDBCardText>
              <MDBBtn
                tag="a"
                href="/analytics/table"
                className="stretched-link"
              >
                See Census Table
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol size="md-6">
          <MDBCard>
            <MDBCardImage
              src={censusScatterImage}
              position="top"
              alt="census scatter graph image"
            />
            <MDBCardBody>
              <MDBCardTitle>Census Scatter Graph</MDBCardTitle>
              <MDBCardText>
                Compare visually census for selected countries and in a specific
                period of time.
              </MDBCardText>
              <MDBBtn
                tag="a"
                href="/analytics/scatter"
                className="stretched-link"
              >
                See Scatter Graph
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </section>
  );
};

export default Home;
