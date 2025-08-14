'use client';
import { db } from '@/configs/DB';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import List from './_components/List';
import { ChapterITs, ITList } from '@/configs/Schema';
import { Button } from '@/components/ui/button';
import { GenrateSessionLayout_Ai } from '@/configs/AiModal';
import LoadingScreen from '../_components/LoadingScreen';
import Service from '@/configs/Service';
import { useRouter } from 'next/navigation';

const CoursePage = ({ params }) => {
  const { user } = useUser();
  const [sessions, setSession] = useState([]);
  const [Loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (params?.courseId && user?.primaryEmailAddress?.emailAddress) {
      getCourse();
    }
  }, [params, user]);

  const getCourse = async () => {
    const result = await db
      .select()
      .from(ITList)
      .where(
        and(
          eq(ITList?.CourseId, params?.courseId),
          eq(ITList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    if (result.length > 0) {
      setSession(result[0]);
    }
  };

  const generateAdviceLayout = async () => {
    setLoading(true);
    const chapters = sessions?.courseOutput?.course?.sessions || [];
    const number = sessions?.courseOutput?.course?.numberOfSessions || 0;

    const promises = chapters.slice(0, number).map(async (chapter, index) => {
      const PROMPT = `Explain the concept in Detail on Topic: ${sessions?.name}, Chapter: ${chapter?.name} in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example (Code field in <precode> format) if applicable, in this format: {
        "topic": "About Relationship",
        "chapter": "Understanding Yourself in Relationships",
        "concept": {
          "title": "Understanding Yourself to Build Better Relationships",
          "description": "Before you can build healthy and fulfilling relationships with others, you must first understand yourself. This involves understanding your emotions, needs, values, and behaviors, and how they influence your interactions with others.",
          "sections": [
            {
              "title": "Understanding Your Emotional Landscape",
              "content": "Identifying and naming your emotions is crucial. Are you prone to anger, anxiety, or sadness?"
            }
          ],
          "conclusion": "Understanding yourself is an ongoing journey."
        }
      } and don't add anything by your own, with title and content field, also add code field and store code if needed else make it blank`;

      const result = await GenrateSessionLayout_Ai.sendMessage(PROMPT);
      const responseText = await result?.response?.text();
      const jsonResponse = JSON.parse(responseText);

      const videoResponse = await Service.getVideos(`${sessions?.name}:${chapter?.name}`);
      const videoId = videoResponse?.[0]?.id?.videoId || '';

      await db.insert(ChapterITs).values({
        chapter: index,
        course: sessions?.CourseId,
        content: jsonResponse,
        videoId: videoId,
      });
    });

    // Execute all promises concurrently
    await Promise.all(promises);

     db.update(ITList).set({ publsh: true });
    router.replace(`/create-courseIt/${sessions?.CourseId}/finish`);
  };

  return (
    <div className="mt-10 px-10 md:px-20 lg:px-44">
      <h2 className="text-2xl font-bold text-center">Course Layout</h2>
      <LoadingScreen load={Loading} />
      <CourseBasicInfo session={sessions} refreshData={() => getCourse()} />
      <CourseDetail session={sessions} />
      <List session={sessions} refreshData={() => getCourse()} />
      <Button className="my-10" onClick={generateAdviceLayout}>
        Confirm advice layout
      </Button>
    </div>
  );
};

export default CoursePage;
