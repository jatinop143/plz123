import Image from 'next/image'
import React from 'react'
import logo from './logo.svg'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const Header = () => {
  return (
    <div className="flex justify-between p-5 shadow-sm">
        <Image src={logo} width={'150'} height={'300'} className="image"/>
        <Link href="/dashboard/home"><Button>Home</Button></Link>
    </div>
  )
}

export default Header