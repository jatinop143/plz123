import React from 'react'
import { HiOutlineClock } from "react-icons/hi2";
const ChapterCardList = ({chapter,index,active}) => {
  return (
    <>
    <div className={`grid grid-cols-5 p-3 items-center border-b bg-white hover:bg-purple-50 ${active === chapter?.name?'bg-purple-100':''}`}>
        <div>
            <h2 className='p-1 text-center rounded-full bg-primary w-8 h-8 text-white'>{index+1}</h2>
        </div>
        <div className='col-span-4'>
            <h2 className='font-medium'>{chapter?.name}</h2>
            <h2 className='flex items-center gap-2 text-sm text-primary'><HiOutlineClock/>{chapter?.duration}</h2>
        </div>
    </div></>
  )
}

export default ChapterCardList