import React, { useContext } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { UserInputContext } from '@/app/_context/UserInputContext';

const SelectOptions = () => {
    const {userCourseInput,setCourseInput}= useContext(UserInputContext);

    const handleChangeInput=(fieldname,value)=>
      setCourseInput((prev)=>({
        ...prev,
        [fieldname]:value
      }))
    return (
        <div className='px-10 md:px-20 lg:px-44'>
            <div className='grid grid-cols-2 gap-10'>
                <div>
                    <label className='text-sm'>⚖️Weight(In kg)</label>
                    <Input type="number" defaultValue={userCourseInput?.Weight} onChange={(e)=>handleChangeInput('Weight',e.target.value)}/>
                </div>
                <div>
                    <label className='text-sm'>📏Height(In cm)</label>
                    <Input type="number" defaultValue={userCourseInput?.Height} onChange={(e)=>handleChangeInput('Height',e.target.value)}/>
                </div>
                <div>
                    <label className='text-sm'>⏱️Session Duration</label>
                    <Select defaultValue={userCourseInput?.duration} onValueChange={(value)=>handleChangeInput('duration',value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1 Hour">1 Hour</SelectItem>
                            <SelectItem value="3 Hour">3 Hour</SelectItem>
                            <SelectItem value="More Than 3 Hour">More Than 3 Hour</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>▶️Add a Video</label>
                    <Select defaultValue={userCourseInput?.add_a_video} onValueChange={(value)=>handleChangeInput('add_a_video',value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>📖No of Sessions</label>
                    <Input type="number" defaultValue={userCourseInput?.noOfCh} onChange={(e)=>handleChangeInput('noOfCh',e.target.value)}/>
                </div>
                <div>
                    <label className='text-sm'>Are You happy </label>
                    <Select defaultValue={userCourseInput?.are_u_happy} onValueChange={(value)=>handleChangeInput('are_u_happy',value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
        </div>
    )
}

export default SelectOptions