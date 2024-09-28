import React, { useState } from "react";
import { FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "../Style/RegisterLogin.css";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../HomePage/Footer";
import { Form, Formik, Field } from "formik";
import { GoogleLogin } from "@react-oauth/google";
import {
  LoginInitialValue,
  LoginSchema,
} from "../ValidationSchema/LoginSchema";
import ShowError from "../Common/ShowError";
import Cookies from "js-cookie";
import { APIEmailLogin, APILogin } from "../../API/CommonApiCall";
import { APIUrl } from "../../API/EndPoint";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onLogin = (payload) => {
    setLoading(true);
    APILogin(APIUrl.LOGIN, payload)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === 1000) {
          Cookies.set("token", response.data.token, {
            expires: 7,
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
          navigate("/");
        } else if (response.data.code === 1001) {
          toast.error("Sorry! Please Registred With Us", {
            theme: "colored",
            autoClose: 1000,
          });
        } else if (response.data.code === 1002) {
          toast.error("Sorry! Password Dose Not Matched", {
            theme: "colored",
            autoClose: 1000,
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
  const LoginByEmail = (email) => {
    setLoading(true);
    APIEmailLogin(`${APIUrl.LOGIN_EMAIL}${email}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === 1000) {
          Cookies.set("token", response.data.token, {
            expires: 7,
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
          navigate("/");
        } else if (response.data.code === 1001) {
          toast.error("Sorry! Please Registred With Us", {
            theme: "colored",
            autoClose: 1000,
          });
        } else if (response.data.code === 1002) {
          toast.error("Sorry! Password Dose Not Matched", {
            theme: "colored",
            autoClose: 1000,
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
      LoginByEmail(response.email);
    }
  };

  const onError = (error) => {
    console.log("error==>", error);
  };

  return (
    <div>
      <div className="row mx-0">
        <div className="col RegisterLeftStyle">
          <h5 className="text-center my-5 text-info">LOGIN WITH US</h5>
        </div>
        <div className="col RegisterLeftRight">
          <div className="text-center text-info my-4">
            <FaLock size={30} />
            <h4>LOGIN</h4>
          </div>
          <Formik
            initialValues={LoginInitialValue}
            validationSchema={LoginSchema}
            onSubmit={(payload) => onLogin(payload)}
          >
            <Form>
              <div className="my-2">
                <b>
                  Email Address <span className="text-danger"> *</span>
                </b>
                <Field
                  placeholder="Email Address"
                  name="email"
                  className="GInput"
                />
                <ShowError name="email" />
              </div>
              <div className="my-2">
                <b>
                  Password <span className="text-danger"> *</span>
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
                        style={{ marginTop: 15 }}
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
                    <span className="sr-only">LOGIN</span>
                  )}
                </button>
              </div>
            </Form>
          </Formik>
          <hr className="mx-4" />
          <div className="text-center">
            <Link to="/forget/password" className="forgotPassStyle">
              Reset Password
            </Link>
          </div>
          <div className="d-flex justify-content-center mt-4">
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

export default Login;
