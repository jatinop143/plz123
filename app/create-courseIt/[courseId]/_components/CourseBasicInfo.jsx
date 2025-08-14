import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HiOutlinePuzzle } from "react-icons/hi";
import { Button } from '@/components/ui/button';
import EditSession from './EditSession';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/configs/firebaseConfig';
import { db } from '@/configs/DB';
import { ITList } from '@/configs/Schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

const CourseBasicInfo = ({ session, refreshData ,edit=true}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('/placehold.png'); // Default placeholder image

  useEffect(() => {
    if (session) {
      setPreviewUrl(session?.courseBanner
        || '/placehold.png');
    }
  }, [session]);

  const onFileSelected = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const filename = `${Date.now()}.jpg`;
      const storageRef = ref(storage, `ai-advicer/${filename}`);

      // Show local preview of the file
      setPreviewUrl(URL.createObjectURL(file));

      try {
        // Upload file to Firebase Storage
        await uploadBytes(storageRef, file);
        console.log('File uploaded successfully');

        // Get the file's download URL
        const url = await getDownloadURL(storageRef);

        // Update the database with the new banner URL
        await db
          .update(ITList)
          .set({ courseBanner: url })
          .where(eq(ITList.id, session?.id));

        console.log('Banner updated in the database');

        // Trigger a data refresh
        refreshData(true);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="rounded-xl border shadow-sm mt-5 p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-3xl">
            {session?.name} 
            {edit&&<EditSession value={session} refreshData={refreshData} />}
          </h2>
          <h2 className="text-xs text-gray-400 mt-3">{session?.courseOutput?.course?.description}</h2>
          <h2 className="font-medium text-primary flex mt-2 gap-2 items-center">
            <HiOutlinePuzzle />
            {session?.session}
          </h2>
          <Link href={'/courseIt/'+session?.CourseId+'/start'} >
          {!edit&&<Button className="w-full mt-5" >Start</Button>}
          </Link>
        </div>
        <div>
          <label htmlFor="fileUpload">
            {edit&&<Image
              src={previewUrl}
              width={300}
              height={300}
              alt="Course Banner"
              className="w-full rounded-xl object-cover cursor-pointer hover:scale-105 transition-all"
            />||<Image
            src={previewUrl}
            width={300}
            height={300}
            alt="Course Banner"
            className="w-full rounded-xl object-cover "
          />}
          </label>
          {edit&&<input
            type="file"
            id="fileUpload"
            className="hidden"
            onChange={onFileSelected}
          />}
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
