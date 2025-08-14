"use client";
import React, { useEffect, useState } from "react";
import logo from "../../_components/logo.svg";
import Image from "next/image";
import { HiOutlineDatabase, HiOutlineHome, HiOutlineLogout,HiAnnotation, HiOutlineShieldCheck } from "react-icons/hi";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideBarresp = ({ click, setClick }) => {
  const [open, setOpen] = useState(click);

  useEffect(() => {
    setOpen(click);
  }, [click]);

  const Menu = [
    { id:1,name:"Home",icon:<HiOutlineHome />,path:"/dashboard/home"},
    {id: 2, name: "Sessions", icon: <HiAnnotation/>, path: "/dashboard" },
    { id: 3, name: "Explore", icon: <HiOutlineDatabase />, path: "/dashboard/explore" },
    { id: 4, name: "Course", icon: <HiOutlineShieldCheck />, path: "/dashboard/createIt" },
    { id: 5, name: "Logout", icon: <HiOutlineLogout />, path: "/dashboard/logout" },
  ];

  const path = usePathname();

  const handleMenuClick = () => {
    setClick(false); // Close the sidebar on menu click
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-full p-5 bg-primary shadow-md transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Image src={logo} alt="logo" width={150} height={300} />
        <hr className="my-5" />
        <ul>
          {Menu.map((item, index) => (
            <Link href={item.path} key={index} onClick={handleMenuClick}>
              <div
                className={`flex items-center gap-2 text-gray-600 p-3 font-medium cursor-pointer hover:bg-gray-100 hover:text-black rounded-md mb-3 ${
                  item.path === path && "bg-gray-100 text-black"
                }`}
              >
                <div className="text-2xl">{item.icon}</div>
                <h2>{item.name}</h2>
              </div>
            </Link>
          ))}
        </ul>
        <div>
          <button className="bg-sky-50 border rounded-md p-4 cursor-pointer" onClick={() => setClick(false)}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBarresp;
