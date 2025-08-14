import React from 'react';
import { GiWeightScale } from "react-icons/gi";
import { FaRulerVertical } from "react-icons/fa";
import { FaWeight } from "react-icons/fa";

const CourseDetail = ({ session }) => {
  const heightInMeters = session?.Height / 100;
  const bmi = session?.Weight / (heightInMeters ** 2);

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    else if (bmi >= 18.5 && bmi < 24.9) return "Normal weight";
    else if (bmi >= 25 && bmi < 29.9) return "Overweight";
    else return "Obesity";
  };

  return (
    <div className='p-6 rounded-xl border shadow-sm mt-3'>
      <div className='grid grid-cols-3 gap-x-9 text-center'>
        {/* BMI Item */}
        <div className='flex flex-col items-center space-y-1'>
          <GiWeightScale size={28} className='text-secondary' />
          <h2 className='font-semibold text-primary'>BMI</h2>
          <h2 className='text-sm mt-1'>{bmi ? getBMICategory(bmi) : 'N/A'}</h2>
        </div>

        {/* Height Item */}
        <div className='flex flex-col items-center space-y-1'>
          <FaRulerVertical size={28} className='text-secondary' />
          <h2 className='font-semibold text-primary'>Height</h2>
          <h2 className='text-sm mt-1'>{session?.Height ? `${session.Height} cm` : 'N/A'}</h2>
        </div>

        {/* Weight Item */}
        <div className='flex flex-col items-center space-y-1'>
          <FaWeight size={28} className='text-secondary'/>
          <h2 className='font-semibold text-primary'>Weight</h2>
          <h2 className='text-sm mt-1'>{session?.Weight ? `${session.Weight} kg` : 'N/A'}</h2>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
