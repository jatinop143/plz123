import React from 'react'
import { HiOutlineClock } from "react-icons/hi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import EditChapters from './EditChapters';
const List = ({session,refreshData,edit=true}) => {
  return (
    <div className='mt-3'>
      <h2>Chapters</h2>
      <div className='mt-2'>
        {session?.courseOutput?.course?.sessions.map((chapter,index)=>(
          <div className='border p-5 rounded-lg mb-2 flex items-center justify-between'> 
          <div className='flex gap-5 items-center'>
            <h2 className='bg-primary text-white rounded-full w-10 h-10 text-center p-2 float-none'>{index+1}</h2>
            <div>
              <h2 className='font-medium text-lg flex items-center'>{chapter?.name} {edit&&<EditChapters Course={session} index={index} refreshData={()=>refreshData(true)}/>}</h2>
              <p className='text-gray-500 text-sm'>{chapter?.description}</p>
              
            </div>
          </div>
          <IoCheckmarkCircleOutline className='text-4xl text-gray-300 flex-none'/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List