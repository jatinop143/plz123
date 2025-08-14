import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
import Load from "./load.gif"
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog'
const LoadingScreen = ({load}) => {
  return (
    <div>
        <AlertDialog open={load}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle></AlertDialogTitle>
      <AlertDialogDescription>
        <div className='flex flex-col items-center py-10'>
        <Image src={Load} width={100} height={100}/>
        <h2>Please Wait... Ai working on your course</h2>
        </div>
      </AlertDialogDescription>
    </AlertDialogHeader>
  </AlertDialogContent>
</AlertDialog>

    </div>
  )
}

export default LoadingScreen