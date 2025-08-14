'use client'

import Header from '@/app/_components/Header2'
import CourseBasicInfo from '@/app/create-courseIt/[courseId]/_components/CourseBasicInfo'
import CourseDetail from '@/app/create-courseIt/[courseId]/_components/CourseDetail'
import EditChapters from '@/app/create-course/[courseId]/_components/EditChapters'
import List from '@/app/create-courseIt/[courseId]/_components/List'
import { db } from '@/configs/DB'
import { ITList } from '@/configs/Schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

const Course = ({params}) => {
    const [course,setCourse]=useState();
    useEffect(()=>{
        params&&getCourse();
    },[params])
    const getCourse=async()=>{
        const result=await db.select().from(ITList)
        .where(eq(ITList?.CourseId,params?.courseId))

        setCourse(result[0])
    }
  return (
    <div>
        <Header/>
        <div className='px-10 p-10 md:px-20 lg:px-44'>
        <CourseBasicInfo session={course} edit={false}/>
        <CourseDetail session={course} edit={false}/>
        <List session={course} edit={false}/>
        </div>
    </div>
  )
}

export default Course