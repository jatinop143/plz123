"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'

const AddIT = () => {
  const {user}=useUser();
  return (
    <div className='flex justify-between items-center'>
      <div>
      <h2 className='text-3xl'>Hello,<span className='font-bold'>{user?.fullName}</span></h2>
      <p className='text-sm text-gray-500'>Create Courses with AI,Manage,Share and Learn</p>
      </div>
      <Link href={'/create-courseIt'}>
      <Button>+ Create Courses</Button>
      </Link>
    </div>
  )
}

export default AddIT