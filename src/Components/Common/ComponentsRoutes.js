import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../HomePage/Home";
import NoPage from "../HomePage/NoPage";
import Register from "../User/Register";
import Login from "../User/Login";
import ForgetPassword from "../User/ForgetPassword";
import Translate from "../Translate/Translate";
import PrivateComponent from "./PrivateComponent";
import UserDetail from "../User/UserDetail";
import Profile from "../User/Profile";
import About from "./About";
import Products from "../Products/Products";
import AddUser from "../User/AddUser";
import UpdateUser from "../User/UpdateUser";

export const ComponentsRoutes = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget/password" element={<ForgetPassword />} />
          <Route element={<PrivateComponent />}>
            <Route path="/translator" element={<Translate />} />
            <Route path="/user" element={<UserDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Products />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/update/user/:id" element={<UpdateUser />} />
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  );
};
