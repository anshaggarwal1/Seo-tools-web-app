import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
      <ScrollToTop />
      <div className="left-20 fixed bottom-20 w-48 h-40 -z-50  blur-[120px]  opacity-90  dark:bg-opacity-10  to-emerald-800 via-transparent  bg-gradient-to-r from-primary" />
    </Fragment>
  );
};

export default RootLayout;
