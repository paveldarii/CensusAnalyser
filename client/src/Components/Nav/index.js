import React from "react";
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
  MDBDropdownItem,
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
  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">
          <span className="text-primary">Census</span>Analytics
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar>
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
