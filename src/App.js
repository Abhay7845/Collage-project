import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/HomePage/Navbar";
import SideNavbar from "./Components/HomePage/SideNavbar";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import { ToastContainer } from "react-toastify";
import { ComponentsRoutes } from "./Components/Common/ComponentsRoutes";
import { ThemeProvider, createTheme } from "@mui/material";
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ToastContainer />
        <BrowserRouter>
          <div className="NavbarShowStyle">
            <Navbar />
          </div>
          <div className="SideNavbarSwoStyle">
            <SideNavbar />
          </div>
          <ComponentsRoutes />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
