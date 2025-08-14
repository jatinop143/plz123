import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { BiSolidEdit } from "react-icons/bi";
  import React, { useEffect, useState } from "react";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Textarea } from "@/components/ui/textarea";
  import { DialogClose } from "@radix-ui/react-dialog";
  import { db } from "@/configs/DB";
  import { CourseList } from "@/configs/Schema";
  import { eq } from "drizzle-orm";
  
  const EditChapters = ({ Course, index,refreshData}) => {
    const Chapters = Course?.courseOutput?.course?.sessions;
    const [name, setName] = useState();
    const [about, setAbout] = useState();
  
    const updateHandler = async () => {
        Chapters[index].name = name;
        Chapters[index].about = about;
  
        const result = await db
          .update(CourseList)
          .set({
            courseOutput: Course?.courseOutput,
          })
          .where(eq(CourseList?.id, Course?.id))
          .returning({ id: CourseList.id });
  
        refreshData(true)

    };
  
    useEffect(() => {
        setName(Chapters[index].name);
        setAbout(Chapters[index].about);
      
    }, [Course, index]);
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <BiSolidEdit className="cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="w-[400px] md:w-[800px] max-w-none">
          <DialogHeader>
            <DialogTitle>Edit Chapter topic and description</DialogTitle>
            <DialogDescription>
              Make changes to your Chapter here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <h2 className="text-right">Topic</h2>
              <Input
                id="Topic"
                defaultValue={Chapters[index].name}
                className="col-span-3 text-gray-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <h2 className="text-right">Description</h2>
              <Textarea
                id="description"
                defaultValue={Chapters[index].about}
                className="col-span-3 h-40 text-gray-500"
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
          </div>
          <DialogClose>
            <Button onClick={updateHandler}>Save changes</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default EditChapters;
  