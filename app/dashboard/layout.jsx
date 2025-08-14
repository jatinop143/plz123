"use client";
import React, { useState } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import { HiBars3 } from "react-icons/hi2";
import SideBarresp from "./_components/SideBarresp";

const DashboardLayout = ({ children }) => {
  const [clicked, setClick] = useState(false);

  return (
    <div>
      <div className="md:w-64 hidden md:block">
        <SideBar />
      </div>
      <SideBarresp click={clicked} setClick={setClick} />
      <div className="md:ml-64">
        <Header />
        <div className="p-10">
          <div className="sm:block md:hidden lg:hidden">
            <HiBars3 size={35} onClick={() => setClick(true)} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
