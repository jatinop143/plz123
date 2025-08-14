import Image from 'next/image'
import React from 'react'
import logo from "./logo.svg"
import { UserButton } from '@clerk/nextjs'
function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-md'>
        <Image src={logo} alt="logo" width={40} height={40}/>
        <UserButton/>
    </div>
  )
}

export default Header