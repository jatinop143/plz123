import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { BiSolidEdit } from "react-icons/bi";
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { db } from "@/configs/DB";
import { CourseList } from "@/configs/Schema";
import { eq } from "drizzle-orm";
  
  const EditSession = ({value,refreshData}) => {
    const [name,setName]=useState();
    const [description,setDescription]=useState();
    const updateHandler= async ()=>{
      value.name=name;
      value.courseOutput.course.description=description;
      const result=await db.update(CourseList).set({
        courseOutput:value?.courseOutput,
        name:value?.name
      }).where(eq(CourseList?.id,value?.id))
      .returning({id:CourseList.id})
      refreshData(true)
    }
    useEffect(()=>{
      setName(value?.name)
      setDescription(value?.courseOutput?.course?.description)
    },[value])
    return (
       <Dialog >
      <DialogTrigger asChild><BiSolidEdit className="cursor-pointer"/></DialogTrigger>
      <DialogContent className="w-[400px] md:w-[800px] max-w-none">
        <DialogHeader>
          <DialogTitle>Edit Title and description</DialogTitle>
          <DialogDescription>
            Make changes to your Session here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4  py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <h2 className="text-right">
              Topic
            </h2>
            <Input
              id="Topic"
              defaultValue={value?.name}
              className="col-span-3 text-gray-500"
              onChange={(e)=>setName(e?.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <h2 className="text-right">
              Description
            </h2>
            <Textarea
              id="username"
              defaultValue={value?.courseOutput?.course.description}
              className="col-span-3 h-40 text-gray-500"
              onChange={(e)=>setDescription(e?.target.value)}
            />
          </div>
        </div>
        <DialogClose>
          <Button onClick={updateHandler} >Save changes</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
    )
  }
  
  export default EditSession
