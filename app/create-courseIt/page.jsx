"use client";
import { Button } from '@/components/ui/button';
import React, { useContext, useState } from 'react';
import { HiMiniBookOpen, HiMiniInboxStack, HiMiniSquares2X2 } from "react-icons/hi2";
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import { UserInputContext } from '../_context/UserInputContext';
import Link from 'next/link';
import { IoArrowBack } from "react-icons/io5";
import { GenerateCourseLayout_Ai } from '@/configs/AiModal';
import LoadingScreen from './_components/LoadingScreen';
import SelectOptions from './_components/SelectOptions';
import { db } from '@/configs/DB';
import { ITList } from '@/configs/Schema';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const CreateCourse = () => {
  const [Loading, setLoading] = useState(false);
  const { userCourseInput } = useContext(UserInputContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const user = useUser();
  const router = useRouter();

  const Stepper = [
    { id: 1, name: 'Age', icon: <HiMiniInboxStack /> },
    { id: 2, name: 'Options', icon: <HiMiniSquares2X2 /> },
    { id: 3, name: 'Topic & Desc', icon: <HiMiniBookOpen /> }
  ];

  const check = () => {
    if (!userCourseInput?.session || userCourseInput.session.length === 0) return true;
    if (activeIndex === 1 && (!userCourseInput.duration || !userCourseInput.noOfCh)) return true;
    if (activeIndex === 2 && (!userCourseInput.topic || userCourseInput.topic.length < 4)) return true;
    return false;
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);
    try {
      const BASIC_PROMPT = "Generate a course based on these details: ";
      const USER_PROMPT = `Category: ${userCourseInput?.session}, name: ${userCourseInput?.topic}, Difficulty: ${userCourseInput?.Difficulty_level}, Duration: ${userCourseInput?.duration}, No. of sessions: ${userCourseInput?.noOfCh} And add description and sessions name`;
      const FINAL_PROMPT = BASIC_PROMPT + USER_PROMPT;

      const result = await GenerateCourseLayout_Ai.sendMessage(FINAL_PROMPT);

      let textResponse;
      if (typeof result.response === "string") {
        textResponse = result.response;
      } else if (result.response?.text) {
        textResponse = await result.response.text();
      } else {
        textResponse = result.text || "";
      }

      let parsedResult;
      try {
        parsedResult = JSON.parse(textResponse);
      } catch (err) {
        console.error("AI did not return valid JSON:", textResponse);
        setLoading(false);
        return;
      }

      SaveCourseLayout(parsedResult);

    } catch (error) {
      console.error("Error generating course layout:", error);
    } finally {
      setLoading(false);
    }
  };

  const SaveCourseLayout = async (courselayout) => {
    setLoading(true);
    try {
      const id = uuid4();
      await db.insert(ITList).values({
        CourseId: id,
        name: userCourseInput?.topic,
        course: userCourseInput?.session,
        Difficulty_level: userCourseInput?.Difficulty_level,
        courseOutput: JSON.stringify(courselayout), // FIX: serialize for Neon
        createdBy: user?.user?.primaryEmailAddress?.emailAddress,
        Username: user?.user?.fullName,
        userProfileImage: user?.user?.imageUrl,
      });
      router.replace("/create-courseIt/" + id);
    } catch (error) {
      console.error("Error saving course layout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex flex-col justify-center items-center mt-10'>
        <div>
          <Link href="/dashboard">
            <Button className="absolute left-1 w-[50px] text-[18px] md:text-md">
              <IoArrowBack />
            </Button>
          </Link>
          <h2 className='text-4xl text-primary font-medium'>Create Course</h2>
        </div>
        <div className='flex mt-10'>
          {Stepper.map((item, index) => (
            <div key={index} className='flex items-center'>
              <div className={`w-[50px] flex flex-col items-center md:w-[100px]`}>
                <div className={`rounded-full p-3 text-white ${activeIndex >= index ? 'bg-purple-500' : 'bg-gray-200'}`}>
                  {item.icon}
                </div>
                <div className='hidden md:block md:text-sm'>{item.name}</div>
              </div>
              {index !== Stepper.length - 1 && (
                <div className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] rounded-full ${activeIndex > index ? 'bg-blue-400' : 'bg-gray-300'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className='px-10 md:px-20 lg:px-44 mt-10'>
        {activeIndex === 0 ? (
          <SelectCategory />
        ) : activeIndex === 1 ? (
          <SelectOptions />
        ) : (
          <TopicDescription />
        )}
        <div className='flex justify-between mt-10'>
          <Button
            variant="outline"
            onClick={() => setActiveIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
          >
            Previous
          </Button>
          {activeIndex < 2 ? (
            <Button onClick={() => setActiveIndex(activeIndex + 1)} disabled={check()}>
              Next
            </Button>
          ) : (
            <Button onClick={GenerateCourseLayout} disabled={check()}>
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingScreen load={Loading} />
    </div>
  );
};

export default CreateCourse;
