import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import { occupationData } from "./UserListData";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import {
  addUserInitialValue,
  addUserSchema,
} from "../ValidationSchema/AddUserSchema";
import ShowError from "../Common/ShowError";
import Footer from "../HomePage/Footer";
import { APIAddUserInfo } from "../../API/CommonApiCall";
import { APIUrl } from "../../API/EndPoint";

const AddUser = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const navigate = useNavigate();

  const countryName = Country.getAllCountries();
  const handleCountryCode = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    const getState = State.getAllStates().filter(
      (state) => state.countryCode === countryCode
    );
    setSelectedState(getState);
  };
  const handleStateCode = (e) => {
    const stateCode = e.target.value;
    setState(stateCode);
    const getCity = City.getAllCities().filter(
      (city) => city.stateCode === stateCode
    );
    setSelectedCity(getCity);
  };
  const addUserInfo = async (payload) => {
    setLoading(true);
    const AddUserNinfo = {
      name: payload.name,
      occupation: payload.occupation,
      email: payload.email,
      phone: payload.phone,
      country: country,
      state: state,
      city: city,
      postalCode: payload.postalCode,
      address: payload.address,
    };
    APIAddUserInfo(APIUrl.ADD_USER, AddUserNinfo)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === 1002) {
          response.data.errors.forEach((err) => {
            if (!err.value) {
              toast.error(err.msg, {
                theme: "colored",
                autoClose: 3000,
              });
            }
          });
        } else if (response.data.code === 1000) {
          toast.success("User Details Inserted Successfully", {
            theme: "colored",
            autoClose: 1000,
          });
          navigate("/user");
        } else if (response.data.code === 1001) {
          toast.error("User Details Not Inserted", {
            theme: "colored",
            autoClose: 1000,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Internal Server Error", {
          theme: "colored",
          autoClose: 3000,
        });
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="container my-5">
        <h4 className="text-center text-info">ADD USER</h4>
        <Formik
          initialValues={addUserInitialValue}
          validationSchema={addUserSchema}
          onSubmit={(payload) => addUserInfo(payload)}
        >
          <Form>
            <div className="row">
              <div className="col-md my-2">
                <b>
                  Name <span className="text-danger"> *</span>
                </b>
                <Field
                  type="text"
                  className="GInput"
                  placeholder="Name"
                  name="name"
                />
                <ShowError name="name" />
              </div>
              <div className="col-md my-2">
                <b>
                  Occupation <span className="text-danger"> *</span>
                </b>
                <Field as="select" className="GSelect" name="occupation">
                  <option value="">Select</option>
                  {occupationData.map((item, i) => {
                    return (
                      <option key={i} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </Field>
                <ShowError name="occupation" />
              </div>
            </div>
            <div className="row">
              <div className="col-md my-2">
                <b>
                  Email Address <span className="text-danger"> *</span>
                </b>
                <Field
                  type="text"
                  className="GInput"
                  placeholder="Email address"
                  name="email"
                />
                <ShowError name="email" />
              </div>
              <div className="col-md my-2">
                <b>
                  Phone Number <span className="text-danger"> *</span>
                </b>
                <Field
                  type="text"
                  className="GInput"
                  placeholder="Phone Number"
                  name="phone"
                />
                <ShowError name="phone" />
              </div>
            </div>
            <h6
              className="bg-info text-white text-center my-3"
              style={{ padding: "8px" }}
            >
              ADDRESS DETAILS
            </h6>
            <div className="row">
              <div className="col-md my-2">
                <b>
                  Country <span className="text-danger"> *</span>
                </b>
                <select
                  className="GSelect"
                  onChange={(e) => handleCountryCode(e)}
                >
                  <option value="">Select Country</option>
                  {countryName.map((item, i) => {
                    return (
                      <option key={i} value={item.isoCode}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-md my-2">
                <b>
                  State <span className="text-danger"> *</span>
                </b>
                <select
                  className="GSelect"
                  onChange={(e) => handleStateCode(e)}
                >
                  <option value="">Select State</option>
                  {selectedState.map((item, i) => {
                    return (
                      <option key={i} value={item.isoCode}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md my-2">
                <b>
                  City <span className="text-danger"> *</span>
                </b>
                <select
                  className="GSelect"
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Select City</option>
                  {selectedCity.map((item, i) => {
                    return (
                      <option key={i} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-md my-2">
                <b>
                  Pin Code <span className="text-danger"> *</span>
                </b>
                <Field
                  type="text"
                  className="GInput"
                  placeholder="Pin Code"
                  name="postalCode"
                />
                <ShowError name="postalCode" />
              </div>
              <div className=" my-2">
                <b>
                  Address <span className="text-danger"> *</span>
                </b>
                <Field
                  component="textarea"
                  className="GTextArea"
                  rows={3}
                  placeholder="Address"
                  name="address"
                />
                <ShowError name="address" />
              </div>
            </div>
            <div className="d-flex justify-content-between my-3">
              <Link to="/user">
                <button className="CButton">GO BACK</button>
              </Link>
              <button type="submit" className="CButton">
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <span className="sr-only">SUBMIT</span>
                )}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <Footer />
    </div>
  );
};

export default AddUser;
