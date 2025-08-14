import { UserInputContext } from '@/app/_context/UserInputContext';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'

const TopicDescription = () => {
  const {userCourseInput,setCourseInput}= useContext(UserInputContext);
  const handleChangeInput=(fieldname,value)=>{
    setCourseInput((prev)=>({
      ...prev,
      [fieldname]:value
    }))
  }
  return (
    <div className='mx-10 lg:mx-34'>
        {/* Input Topic */}
        <div className='mt-5'>
            <label>💡Write why do you want to take advice from us.</label>
            <Input placeholder="Enter Topic" defaultValue={userCourseInput?.topic} onChange={(e)=>handleChangeInput('topic',e.target.value)}/>
        </div>
        {/* Description area */}
        <div className='mt-5'>
            <label>📝Tell us more about yourself,What do you want to include(optional)</label>
            <Textarea placeholder="About your course." defaultValue={userCourseInput?.description} onChange={(e)=>handleChangeInput('description',e.target.value)}/>
        </div>
    </div>
  )
}

export default TopicDescription