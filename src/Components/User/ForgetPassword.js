// /*eslint-disable-next-line react-hooks/exhaustive-deps*/
import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import ShowError from "../Common/ShowError";
import "../Style/Forgot.css";
import { FaLockOpen, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  forgotSchema,
  ForgotInitialValue,
} from "../ValidationSchema/ForgotSchema";
import { HOST_URL } from "../../API/Host";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmPasswordShown, setConPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);

  const ForgotPassword = (payload) => {
    setLoading(true);
    const forgot = {
      email: payload.email,
      conPassword: payload.conPassword,
    };
    axios
      .put(`${HOST_URL}/forgot/password`, forgot)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === 1000) {
          toast.success("Your Password Reset successfully", {
            theme: "colored",
            autoClose: 1000,
          });
          navigate("/login");
        } else if (response.data.code === 1001) {
          toast.error("User Not Found", { theme: "colored", autoClose: 1000 });
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
    <div className="container my-5 d-flex-justify-content-center">
      <div className="container forgotFormStyle">
        <div className="text-center text-info my-4">
          <FaLockOpen size={30} />
          <h4>RESET PASSWORD</h4>
        </div>
        <Formik
          initialValues={ForgotInitialValue}
          validationSchema={forgotSchema}
          onSubmit={(payload) => ForgotPassword(payload)}
        >
          <Form>
            <div className="my-2">
              <b>
                Registered Email <span className="text-danger"> *</span>
              </b>
              <Field placeholder="Email" name="email" className="GInput" />
              <ShowError name="email" />
            </div>
            <div className="my-2">
              <b>
                New Password <span className="text-danger"> *</span>
              </b>
              <div className="d-flex">
                <Field
                  type={newPasswordShown ? "text" : "password"}
                  placeholder="New Password"
                  className="GInput"
                  name="newPassword"
                />
                <span className="border-bottom">
                  {newPasswordShown ? (
                    <FaRegEye
                      size={20}
                      cursor="pointer"
                      onClick={() => setNewPasswordShown(!newPasswordShown)}
                      style={{ marginTop: 15 }}
                    />
                  ) : (
                    <FaRegEyeSlash
                      size={20}
                      cursor="pointer"
                      onClick={() => setNewPasswordShown(!newPasswordShown)}
                      style={{ marginTop: 15 }}
                    />
                  )}
                </span>
              </div>
              <ShowError name="newPassword" />
            </div>
            <div className="my-2">
              <b>
                Confirm Password <span className="text-danger"> *</span>
              </b>
              <div className="d-flex">
                <Field
                  type={confirmPasswordShown ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="GInput"
                  name="conPassword"
                />
                <span className="border-bottom">
                  {confirmPasswordShown ? (
                    <FaRegEye
                      size={20}
                      cursor="pointer"
                      onClick={() => setConPasswordShown(!confirmPasswordShown)}
                      style={{ marginTop: 15 }}
                    />
                  ) : (
                    <FaRegEyeSlash
                      size={20}
                      cursor="pointer"
                      onClick={() => setConPasswordShown(!confirmPasswordShown)}
                      style={{ marginTop: 15 }}
                    />
                  )}
                </span>
              </div>
              <ShowError name="conPassword" />
            </div>
            <div className="d-flex justify-content-end my-4 mx-2">
              <button type="submit" className="CButton">
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <span className="sr-only">RESET</span>
                )}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ForgetPassword;
