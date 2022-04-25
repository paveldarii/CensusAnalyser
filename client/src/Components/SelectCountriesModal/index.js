import React, { useState } from "react";

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

export default function SelectCountriesModal({
  fetchSelectedCountries,
  countries,
}) {
  const [basicModal, setBasicModal] = useState(true);

  const [selectedCountries, setSelectedCountries] = useState([]);
  const toggleShow = () => setBasicModal(!basicModal);

  const handleCompareSelected = (data) => {
    setBasicModal(false);
    fetchSelectedCountries(data.join(","));
  };
  const handleCheckboxChange = (isChecked, country_id) => {
    if (isChecked) {
      setSelectedCountries((prev) => {
        return [...prev, country_id];
      });
    } else {
      setSelectedCountries((prev) => {
        return prev.filter(function(id) {
          return id !== country_id;
        });
      });
    }
  };

  return (
    <>
      <MDBBtn onClick={toggleShow}>Compare Census</MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog className="modal-xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                Please select countries to compare census
              </MDBModalTitle>
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
                    onChange={(e) =>
                      handleCheckboxChange(e.target.checked, country.id)
                    }
                    label={country.name}
                    checked={
                      selectedCountries.includes(country.id) ? true : false
                    }
                    inline
                  />
                );
              })}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={() => setSelectedCountries([])}>Clear</MDBBtn>
              <MDBBtn onClick={() => handleCompareSelected(selectedCountries)}>
                Compare Selected
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
