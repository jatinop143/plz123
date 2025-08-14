"use client";


import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCardIT";
import { ITList } from "@/configs/Schema";
import { db } from "@/configs/DB";


function Createiit() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

useEffect(() => {
  // Simulate API call
  getCourses().finally(() => setIsLoading(false)); // Set loading to false after fetch
}, []);


  useEffect(() => {
    if (user) {
      getCourses();
    }
  }, [user]);

  const getCourses = async () => {
    try {
      const result = await db
        .select()
        .from(ITList)
        .where(
          eq(ITList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        );
      setCourseList(result);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl">My AI Courses</h2>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
      {isLoading ? (
    // Show skeleton loaders when loading
    [1, 2, 3, 4].map((_, index) => (
      <div
        key={index}
        className="w-full bg-slate-200 animate-pulse h-[270px] mb-4 rounded-md"
      ></div>
    ))
  ) : courseList.length > 0 ? (
    // Show courses when available
    courseList.map((course) => (
      <CourseCard course={course} key={course.id} refreshData={getCourses} />
    ))
  ) : (
    // Show "No courses found" if no data exists after loading
    <p className="col-span-full text-center text-gray-500">No courses found.</p>
  )}
      </div>
    </div>
  );
}

export default Createiit;
