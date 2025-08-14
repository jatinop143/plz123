import Image from 'next/image';
import React from 'react';
import { HiAcademicCap, HiDotsVertical } from 'react-icons/hi';
import DropDownOption from './DropDownOption';
import { db } from '@/configs/DB';
import { eq } from 'drizzle-orm';
import { ITList } from '@/configs/Schema';
import Link from 'next/link';



const CourseCard = ({course,refreshData,display=false}) => {
  const handleOnDelete=async()=>{
    const resp=await db.delete(ITList)
    .where(eq(ITList.id,course?.id))
    .returning({id:ITList?.id})
    if(resp){
      refreshData()
      window.location.reload()
    }
  }
  

  return (
    <div className="shadow-lg mt-3 rounded-lg border p-2 hover:scale-105 transition-all cursor-pointer">
      <Link href={'/courseIt/'+course?.CourseId}>
      <Image
        src={course?.courseBanner}
        width={300}
        height={200}
        className="rounded-lg w-full h-[200px] object-fill"
        alt={course?.name || 'Course Banner'}
      />
      </Link>
      <div className="p-2">
        <h2 className="font-medium text-lg flex justify-between items-center">
          {course?.name}
         {!display&&<div><DropDownOption handleOnDelete={()=>handleOnDelete()}>
            <HiDotsVertical />
          </DropDownOption>
          </div>}
        </h2>
        <div>
          <h2 className="text-primary bg-purple-50 flex items-center p-1 gap-2">
            <HiAcademicCap />
            {course?.courseOutput?.course?.noOfSessions} Chapters
          </h2>
          {display&&<div className='flex gap-2 items-center mt-2'>
            <Image src={course?.userProfileImage} width={35} height={35} className='rounded-full'/>
            <h2 className='text-sm'>{course?.Username}</h2>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
