"use client"
import { Button } from '@/components/ui/button';
import React, { useContext, useState } from 'react'
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
import { CourseList } from '@/configs/Schema';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const CreateCourse = () => {
  const [Loading, setLoading] = useState(false);
  const { userCourseInput, setCourseInput } = useContext(UserInputContext);
  let [activeIndex, setActiveIndex] = useState(0);
  const user = useUser();
  const router = useRouter();
  const Stepper = [
    {
      id: 1,
      name: 'Age',
      icon: <HiMiniInboxStack />,
    }, {
      id: 2,
      name: 'Options',
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 3,
      name: 'Topic & Desc',
      icon: <HiMiniBookOpen />,
    }
  ]
  const check = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (activeIndex == 0 && (userCourseInput?.session?.length == 0 || userCourseInput?.session == undefined)) {
      return true;
    }
    if (activeIndex == 2 && (userCourseInput?.topic?.length < 4 || userCourseInput?.topic == undefined)) {
      return true;
    }
    if (activeIndex == 1 && (userCourseInput?.Height?.length == 0|| userCourseInput?.Height == undefined)) {
      return true;
    }
    if (activeIndex == 1 && (userCourseInput?.duration == undefined)) {
      return true;
    }
    if (activeIndex == 1 && (userCourseInput?.add_a_video == undefined)) {
      return true;
    }
    if (activeIndex == 1 && (userCourseInput?.noOfCh?.length == 0 || userCourseInput?.noOfCh == undefined)) {
      return true;
    }
    if (activeIndex == 1 && (userCourseInput?.Weight?.length == 0 || userCourseInput?.Weight == undefined)) {
      return true;
    }
    if (activeIndex == 1 && (userCourseInput?.are_u_happy?.length == 0 || userCourseInput?.are_u_happy == undefined)) {
      return true;
    }
    else return false;
  }
  const GenerateCourseLayout = async () => {
    setLoading(true);
    console.log(process.env.DB_URL)
    const BASIC_PROMPT = "Generate A advice course on Following Detail With field as Age , Description, Along with session Name, about,Duration:"
    const USER_PROMPT = ' Age:' + userCourseInput?.session + ', Topic:' + userCourseInput?.topic + ', are you happy or not:' + userCourseInput?.are_u_happy + ', Duration:' + userCourseInput?.duration + ', NoOf sessions:' + userCourseInput?.noOfCh + 'Height:'+userCourseInput?.Height+'Weight'+userCourseInput?.Weight+', in JSON format'
    const FINAL_PROMPT = BASIC_PROMPT + USER_PROMPT
    console.log(FINAL_PROMPT);
    const result = await GenerateCourseLayout_Ai.sendMessage(FINAL_PROMPT);
    console.log(JSON.parse(result.response?.text()))
    setLoading(false);

    SaveCourseLayout(JSON.parse(result.response?.text()))
  }
  const SaveCourseLayout = async (courselayout) => {
    var id = uuid4();
    setLoading(true)
    const result = await db.insert(CourseList).values({
      CourseId: id,
      name: userCourseInput?.topic,
      session: userCourseInput?.session,
      Height: userCourseInput?.Height,
      Weight: userCourseInput?.Weight,
      are_u_happy: userCourseInput?.are_u_happy ,
      courseOutput: courselayout,
      createdBy: user?.user?.primaryEmailAddress?.emailAddress,
      Username: user?.user?.fullName,
      userProfileImage: user?.user?.imageUrl
    })
    
    router.replace("/create-course/" + id)
    setLoading(false)
  }
  return (
    <div>
      <div className='flex flex-col justify-center items-center mt-10'>
        <div >
          <Link href="/dashboard"><Button className="absolute left-1 w-[50px] text-[18px] md:text-md "><IoArrowBack /></Button></Link>
          <h2 className='text-4xl text-primary font-medium '>Create Session</h2>
        </div>
        <div className='flex mt-10'>
          {Stepper.map((item, index) => (
            <div key={index} className='flex items-center'>
              <div className='w-[50px] flex flex-col items-center md:w-[100px]'>
                <div className={`bg-gray-200 text-white rounded-full p-3
              ${activeIndex >= index && 'bg-purple-500'}`
                }>
                  {item.icon}
                </div>
                <div className='hidden md:block md:text-sm'>
                  {item.name}
                </div>
              </div>
              {index != Stepper?.length - 1 && <div className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] rounded-full bg-gray-300 
                ${activeIndex - 1 >= index && 'bg-blue-400'}`}></div>}
            </div>
          ))}
        </div>
      </div>
      <div className='px-10 md:px-20 lg:px-44 mt-10'>
        {activeIndex == 0 ? <SelectCategory /> : activeIndex == 1 ? <SelectOptions /> :
          <TopicDescription />
        }
        <div className='flex justify-between mt-10'>
          <Button variant="outline" onClick={() => {
            setActiveIndex(activeIndex - 1)
          }} disabled={activeIndex == 0}>Previous</Button>
          {activeIndex < 2 && <Button onClick={() => {
            setActiveIndex(activeIndex + 1)
          }} disabled={check()}>Next</Button>}
          {activeIndex == 2 && <Button onClick={() => GenerateCourseLayout()} disabled={check()}>Generate Course Layout </Button>}
        </div>
      </div>
      <LoadingScreen load={Loading} />
    </div>
  )
}

export default CreateCourse