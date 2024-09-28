import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import "../Style/RegisterLogin.css";
import "../../App.css";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import Footer from "../HomePage/Footer";
import { Field, Form, Formik } from "formik";
import ShowError from "../Common/ShowError";
import {
  RegisterInitialValue,
  RegisterSchema,
} from "../ValidationSchema/RegisterSchema";
import Cookies from "js-cookie";
import { APIUrl } from "../../API/EndPoint";
import { APIEmailRegister, APIRegister } from "../../API/CommonApiCall";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (payload) => {
    setLoading(true);
    APIRegister(APIUrl.REGISTER, payload)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === 1000) {
          Cookies.set("token", response.data.token, {
            expires: 7,
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
          toast.success("Your Account created Successfully", {
            theme: "colored",
            autoClose: 2000,
          });
          navigate("/");
        } else if (response.data.code === 1001) {
          toast.warn("Email is Already Registered", {
            theme: "colored",
            autoClose: 3000,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.warn("Server is not running", {
          theme: "colored",
          autoClose: 2000,
        });
        setLoading(false);
      });
  };

  // LOGIN WITH GOOGLE

  const RegisterByEmail = (email) => {
    setLoading(true);
    APIEmailRegister(`${APIUrl.REGISTER_EMAIL}/${email}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === 1000) {
          Cookies.set("token", response.data.token, {
            expires: 7,
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
          toast.success("Your Account created Successfully", {
            theme: "colored",
            autoClose: 2000,
          });
          navigate("/");
        } else if (response.data.code === 1001) {
          toast.warn("Email is Already Registered", {
            theme: "colored",
            autoClose: 3000,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.warn("Server is not running", {
          theme: "colored",
          autoClose: 2000,
        });
        setLoading(false);
      });
  };

  const onSuccess = (response) => {
    console.log("response==>", response);
    if (response.email) {
      RegisterByEmail(response.email);
    }
  };
  const onError = (error) => {
    console.log("error==>", error);
  };
  return (
    <div>
      <div className="row mx-0">
        <div className="col RegisterLeftStyle">
          <h5 className="text-center my-5 text-info">REGISTER WITH US</h5>
        </div>
        <div className="col RegisterLeftRight">
          <div className="text-center text-info my-4">
            <FaUserAlt size={30} />
            <h4>REGISTER</h4>
          </div>
          <Formik
            initialValues={RegisterInitialValue}
            validationSchema={RegisterSchema}
            onSubmit={(payload) => onSubmit(payload)}
          >
            <Form>
              <div>
                <b>
                  Full Name<span className="text-danger"> *</span>
                </b>
                <Field placeholder="Full NAME" name="name" className="GInput" />
                <ShowError name="name" />
              </div>
              <div className="my-2">
                <b>
                  Email<span className="text-danger"> *</span>
                </b>
                <Field placeholder="Email" name="email" className="GInput" />
                <ShowError name="email" />
              </div>
              <div className="my-2">
                <b>
                  Phone Number<span className="text-danger"> *</span>
                </b>
                <Field
                  placeholder="Phone Number"
                  name="phone"
                  className="GInput"
                />
                <ShowError name="phone" />
              </div>
              <div className="my-2">
                <b>
                  Set Password <span className="text-danger"> *</span>
                </b>
                <div className="d-flex">
                  <Field
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                    className="GInput"
                    name="password"
                  />
                  <span className="border-bottom">
                    {passwordShown ? (
                      <FaRegEye
                        size={20}
                        cursor="pointer"
                        onClick={() => setPasswordShown(!passwordShown)}
                        style={{
                          marginTop: 15,
                        }}
                      />
                    ) : (
                      <FaRegEyeSlash
                        size={20}
                        cursor="pointer"
                        onClick={() => setPasswordShown(!passwordShown)}
                        style={{ marginTop: 15 }}
                      />
                    )}
                  </span>
                </div>
                <ShowError name="password" />
              </div>
              <div className="d-flex justify-content-end mx-2 my-3">
                <button type="submit" className="CButton">
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="sr-only">REGISTER</span>
                  )}
                </button>
              </div>
            </Form>
          </Formik>
          <div className="d-flex justify-content-center">
            <GoogleLogin onSuccess={onSuccess} onError={onError} />
          </div>
        </div>
      </div>
      <div className="footerStyle">
        <Footer />
      </div>
    </div>
  );
};

export default Register;
