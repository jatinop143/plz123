'use client'
import { db } from '@/configs/DB';
import { ChapterITs, ITList } from '@/configs/Schema';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import ChapterCardList from './_components/ChapterCardList';
import ChapterContent from './_components/ChapterContent';
import { HiBars3 } from 'react-icons/hi2';
import Link from 'next/link';

const CourseStart = ({ params }) => {
  const [clicked, setClick] = useState(false);
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [ChapterContents, setChapterContent] = useState();
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(null);

  const getSelectedContent = async (sessionId) => {
    const result = await db
      .select()
      .from(ChapterITs)
      .where(and(eq(ChapterITs.chapter, sessionId), eq(ChapterITs.course, course?.CourseId)));
    setChapterContent(result[0]);
    setShow(true);
  };

  useEffect(() => {
    GetCourse();
  }, []);

  const GetCourse = async () => {
    const result = await db.select().from(ITList).where(eq(ITList?.CourseId, params?.courseId));
    setCourse(result[0]);
  };

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className='fixed md:w-64 bg-white shadow-sm border-r hidden md:block h-screen'>
        <h2 className='font-medium text-lg bg-primary p-4  text-white'>
          {course?.name}
          <Link href={'/dashboard'}>
          <button className='border p-2 rounded-md m-2 left-1'>Home</button></Link>
        </h2>
        <div>
          {course?.courseOutput?.course?.sessions.map((session, index) => (
            <div
              key={index}
              className={`cursor-pointer`}
              onClick={() => {
                setSelectedChapter(session);
                getSelectedContent(index);
                setActive(session?.name); // Set active by name
              }}
            >
              <ChapterCardList chapter={session} index={index} active={active} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed md:w-64 bg-white shadow-sm border-r h-screen ${clicked ? 'block' : 'hidden'} md:hidden`}>
        <h2 className='font-medium text-lg bg-primary p-4 text-white'>{course?.name}</h2>
        <Link href={'/dashboard'}>
          <button className='border p-2 rounded-md m-2 left-1'>Home</button></Link>
        <div>
          {course?.courseOutput?.course?.sessions.map((session, index) => (
            <div
              key={index}
              className={`cursor-pointer ${
                active === session.name ? 'bg-purple-200' : 'hover:bg-purple-50'
              }`}
              onClick={() => {
                setSelectedChapter(session);
                getSelectedContent(index);
                setActive(session.name); // Ensure state is set here
                setClick(false);
              }}
            >
              <ChapterCardList chapter={session} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className='md:ml-64 p-4'>
        <HiBars3 size={35} onClick={() => setClick(!clicked)} className='sm:block md:hidden' />
        {ChapterContents?.name}
        <ChapterContent chapter={selectedChapter} content={ChapterContents} />
      </div>
    </div>
  );
};

export default CourseStart;
