import React, { useState } from "react";
import { useMatch } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownLink,
  MDBCollapse,
} from "mdb-react-ui-kit";

function Nav() {
  const isHomeMatch = useMatch({ path: "/", exact: true });
  const isAnalyticsTableMatch = useMatch({
    path: "/analytics/table",
    exact: true,
  });
  const isAnalyticsScatterMatch = useMatch({
    path: "/analytics/scatter",
    exact: true,
  });
  const [showBasic, setShowBasic] = useState(false);
  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">
          <strong>
            <span className="text-primary">Census</span>Analytics
          </strong>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" className="fas" />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink
                active={isHomeMatch ? true : false}
                aria-current="page"
                href="/"
              >
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem active={isAnalyticsTableMatch ? true : false}>
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="div"
                  className={
                    isAnalyticsTableMatch || isAnalyticsScatterMatch
                      ? "active nav-link"
                      : "nav-link"
                  }
                  data-active={
                    isAnalyticsTableMatch || isAnalyticsScatterMatch
                      ? true
                      : false
                  }
                >
                  Analytics
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBNavbarItem
                    style={
                      isAnalyticsTableMatch
                        ? { background: "#eee" }
                        : { background: "inherit" }
                    }
                  >
                    <MDBDropdownLink href="/analytics/table">
                      Table
                    </MDBDropdownLink>
                  </MDBNavbarItem>

                  <MDBNavbarItem
                    style={
                      isAnalyticsScatterMatch
                        ? { background: "#eee" }
                        : { background: "inherit" }
                    }
                    className="active"
                  >
                    <MDBDropdownLink href="/analytics/scatter">
                      Scatter
                    </MDBDropdownLink>
                  </MDBNavbarItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Nav;
