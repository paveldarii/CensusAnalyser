import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCheckbox,
} from "mdb-react-ui-kit";

export default function AnalyticsModal(props) {
  const [basicModal, setBasicModal] = useState(true);
  const [countries, setCountries] = useState([]);
  const toggleShow = () => setBasicModal(!basicModal);
  useEffect(() => {
    axios.get("/api/census/countries").then((res) => {
      setCountries(() => [...res.data.countries]);
    });
  }, []);
  const handleCompareSelected = (data) => {
    setBasicModal(false);
    props.fetchSelectedCountries(data);
  };

  return (
    <>
      <MDBBtn onClick={toggleShow}>Compare Census</MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog className="modal-xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Country List </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {countries.map((country) => {
                return (
                  <MDBCheckbox
                    key={country.id}
                    className="countryCheckbox"
                    value={country.id}
                    label={country.name}
                    inline
                  />
                );
              })}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={() => handleCompareSelected("1,2")}>
                Compare Selected
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
