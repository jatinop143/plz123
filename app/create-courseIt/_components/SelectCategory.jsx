import { UserInputContext } from '@/app/_context/UserInputContext';
import Category2 from '@/app/_shared/Category2';
import Image from 'next/image';
import React, { useContext } from 'react';

const SelectCategory = () => {
  const {userCourseInput,setCourseInput}= useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setCourseInput((prev) => ({
      ...prev,
      session: category,
    }));
  };

  return (
    <div className="px-30 md:px-20">
      <h2 className="my-5">Select a Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {Category2.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col p-5 border items-center cursor-pointer rounded-xl hover:border-primary hover:bg-blue-50 ${
              userCourseInput?.session === item.name && 'border-primary bg-blue-50'
            }`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image src={item.icon} alt={item.name} width={100} height={100} />
            <h2 className="text-sm md:text-xl">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
