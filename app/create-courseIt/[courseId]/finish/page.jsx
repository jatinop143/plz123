'use client';

import { db } from '@/configs/DB';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { ITList } from '@/configs/Schema';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';

const FinishScreen = ({ params }) => {
  const { user } = useUser();
  const [sessionData, setSessionData] = useState(null);
  const [hasFetched, setHasFetched] = useState(false); // To differentiate between fetching and no data.

  useEffect(() => {
    if (params?.courseId && user?.primaryEmailAddress?.emailAddress) {
      fetchCourse();
    }
  }, [params, user]);

  const fetchCourse = async () => {
    try {
      const result = await db
        .select()
        .from(ITList)
        .where(
          and(
            eq(ITList?.CourseId, params?.courseId),
            eq(ITList?.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );

      setSessionData(result?.[0] || null);
    } catch (error) {
      console.error('Error fetching course data:', error);
    } finally {
      setHasFetched(true); // Indicate that fetching has completed.
    }
  };

  if (!hasFetched) {
    return null; // Render nothing until data fetching completes.
  }

  if (!sessionData) {
    return (
      <div className="text-center text-gray-500 my-10">
        No course information found.
      </div>
    );
  }

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className='text-center font-bold text-3xl my-3 text-primary'>Congrats! Your Sessions are ready.</h2>
      <CourseBasicInfo session={sessionData} refreshData={fetchCourse} />
      <h2 className='md:text-center text-sm md:text-lg text-gray-400 border p-2 rounded-md md:flex md:items-center md:gap-5 mt-2'>{process.env.NEXT_PUBLIC_HOST_URL}/courseIt/{sessionData?.CourseId}/start
      <HiOutlineClipboardDocumentCheck className='h-5 w-5 cursor-pointer' onClick={async ()=> await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_URL+'/courseIt/'+sessionData?.CourseId+'/start')} /></h2>
    </div>
  );
};

export default FinishScreen;
