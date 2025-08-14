
import React from 'react'
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'


const Dashboard = () => {
  
  return (
    <div>
      <AddCourse/>
      {/* Display List of Course */}
      <UserCourseList/>
    </div>
  )
}

export default Dashboard