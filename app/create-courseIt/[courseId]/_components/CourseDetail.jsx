import React from 'react';

import { FaRulerVertical } from "react-icons/fa";
import { FaWeight } from "react-icons/fa";
import { HiAdjustmentsHorizontal, HiBookOpen, HiMiniClock } from 'react-icons/hi2';

const CourseDetail = ({ session,edit=true }) => {
  

  return (<>
   {edit&&<div className='p-6 rounded-xl border shadow-sm mt-3'>
      <div className='grid grid-cols-3 gap-x-9 text-center'>
        {/* BMI Item */}
        <div className='flex flex-col items-center space-y-1'>
          <HiAdjustmentsHorizontal
          size={28} className='text-secondary' />
          <h2 className='font-semibold text-primary'>Skill Level</h2>
          <h2 className='text-sm mt-1'>{session?.Difficulty_level}</h2>
        </div>

        {/* Height Item */}
        <div className='flex flex-col items-center space-y-1'>
          <HiMiniClock size={28} className='text-secondary' />
          <h2 className='font-semibold text-primary'>Duration</h2>
          <h2 className='text-sm mt-1'>{session?.courseOutput?.course?.duration}</h2>
        </div>

        {/* Weight Item */}
        <div className='flex flex-col items-center space-y-1'>
          <HiBookOpen size={28} className='text-secondary'/>
          <h2 className='font-semibold text-primary'>No of Chapters</h2>
          <h2 className='text-sm mt-1'>{session?.courseOutput?.course?.numberOfSessions}</h2>
        </div>
      </div>
    </div>}
    </>
  );
};

export default CourseDetail;
