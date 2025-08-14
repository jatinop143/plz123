"use client"
import React from 'react'
import logo from "../../_components/logo.svg"
import Image from 'next/image'
import { HiOutlineDatabase, HiOutlineHome, HiOutlineLogout,HiAnnotation, HiOutlineShieldCheck } from "react-icons/hi";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
const SideBar = () => {
    const Menu = [
        { id:1,name:"Home",icon:<HiOutlineHome />,path:"/dashboard/home"},
        {
            id: 1,
            name: "Session",
            icon: <HiAnnotation />,
            path: "/dashboard"
        }, {
            id: 2,
            name: "Explore",
            icon: <HiOutlineDatabase />,
            path: "/dashboard/explore"
        },
        {
            id: 3,
            name: "Courses",
            icon: <HiOutlineShieldCheck />,
            path: "/dashboard/createIt"
        },
        {
            id: 4,
            name: "Logout",
            icon: <HiOutlineLogout />,
            path: "/dashboard/logout"
        },
    ];
    const path=usePathname();
    return (
        <div className='fixed md:h-full w-64 p-5 shadow-md'>
            <Image src={logo} alt="logo" width={'150'} height={'300'} />
            <hr className='my-5' />
            <ul>
                {Menu.map((item,index)=>(
                    <Link href={item.path} key={index}>
                    <div  className={`flex items-center gap-2 
                    text-gray-600 p-3 font-medium cursor-pointer hover:bg-gray-100
                     hover:text-black rounded-md mb-3
                     ${item.path==path&&"bg-gray-100 text-black"}`}>
                        <div className='text-2xl' >
                            {item.icon}
                        </div>
                        <h2>{item.name}</h2>
                    </div>
                    </Link>
                ))}
            </ul>
            <div>
                
            </div>
        </div>
    )
}

export default SideBar