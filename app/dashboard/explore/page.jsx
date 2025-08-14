"use client";
import { db } from "@/configs/DB";
import { CourseList, ITList } from "@/configs/Schema";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";

const Explore = () => {
  const [selected, setSelected] = useState("course");
  const [CourseLIST, setList] = useState();

  useEffect(() => {
    getCourses();
  }, [selected]);

  const getCourses = async () => {
    if (selected === "advice") {
      const result = await db.select().from(CourseList);
      setList(result);
    }
    if (selected === "course") {
      const result = await db.select().from(ITList);
      setList(result);
    }
  };

  return (
    <div>
      <div className="flex gap-3 items-center">
        
        <button
          className={`border rounded-md p-2 ${
            selected === "course" ? "bg-purple-200" : ""
          }`}
          onClick={() => setSelected("course")} // Corrected here
        >
          Courses
        </button>
      </div>
      <h2 className="font-bold text-3xl">Explore more sessions</h2>
      <p>Explore more sessions with AI built by other Users</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {CourseLIST?.map((course, index) => (
          <div key={index}>
            <CourseCard course={course} display={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
