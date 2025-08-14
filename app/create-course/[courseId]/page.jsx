'use client';
import { db } from '@/configs/DB';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import List from './_components/List';
import { Chapter, CourseList } from '@/configs/Schema';
import { Button } from '@/components/ui/button';
import { GenrateSessionLayout_Ai } from '@/configs/AiModal';
import LoadingScreen from '../_components/LoadingScreen';
import Service from '@/configs/Service';
import { useRouter } from 'next/navigation';

const CoursePage = ({ params }) => {
  const { user } = useUser();
  const [sessions, setSession] = useState([]);
  const [Loading, setLoading] = useState(false);
  const router=useRouter();
  useEffect(() => {
    if (params?.courseId && user?.primaryEmailAddress?.emailAddress) {
      getCourse();
    }
  }, [params, user]);

  const getCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList?.CourseId, params?.courseId),
            eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      if (result.length > 0) {
        setSession(result[0]);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const generateAdviceLayout = async () => {
    setLoading(true);
    const chapters = sessions?.courseOutput?.course?.sessions || [];
    const number = sessions?.courseOutput?.course?.noOfSessions || 0;
  
    try {
      // Process each chapter asynchronously
      const promises = chapters.map(async (chapter, index) => {
        if (index < number) {
          const PROMPT = ` Explain the concept in Detail on Topic: ${sessions?.name}, Chapter: ${chapter?.name} in JSON Format eg:{
  "topic": "About Relationship",
  "chapter": "Understanding Yourself in Relationships",
  "concept": {
    "title": "Understanding Yourself to Build Better Relationships",
    "description": "Before you can build healthy and fulfilling relationships with others, you must first understand yourself. This involves understanding your emotions, needs, values, and behaviors, and how they influence your interactions with others.  Self-awareness is the cornerstone of successful relationships.",
    "sections": [
      {
        "title": "Understanding Your Emotional Landscape",
        "content": "Identifying and naming your emotions is crucial.  Are you prone to anger, anxiety, or sadness? Understanding your emotional triggers and responses will help you manage conflict and communicate effectively with others.  Journaling, mindfulness practices, and therapy can assist in this process."
      },
      {
        "title": "Recognizing Your Needs and Values",
        "content": "What are your core values? What do you need in a relationship to feel secure and happy?  Honesty and open communication about your needs is vital.  Are you looking for companionship, intimacy, intellectual stimulation, or something else?  Understanding these needs clarifies what you’re looking for and allows you to communicate those desires effectively."
      },
      {
        "title": "Identifying Your Attachment Style",
        "content": "Your attachment style, formed in early childhood, significantly influences how you approach relationships.  Understanding whether you have a secure, anxious, avoidant, or disorganized attachment style can provide insights into your relationship patterns and help you break unhealthy cycles.  Learn to identify your triggers and adapt your behavior to build healthier connections."
      },
      {
        "title": "Analyzing Your Communication Style",
        "content": "How do you communicate your thoughts and feelings? Are you direct and assertive, or passive and indirect?  Understanding your communication style helps you identify potential areas for improvement, such as learning active listening skills or expressing your needs more clearly. Recognizing your communication patterns is a vital aspect of conflict resolution."
      },
      {
        "title": "Recognizing Your Behavioral Patterns",
        "content": "Do you tend to repeat negative relationship patterns? Recognizing unhealthy behaviors, such as controlling behavior, codependency, or people-pleasing, allows you to address them and cultivate healthier habits.  Identifying these patterns enables you to make conscious choices to act differently in your relationships."
      },
      {
        "title": "Embracing Self-Compassion",
        "content": "Be kind to yourself.  Recognize that you are not perfect, and that’s okay.  Self-compassion allows you to approach relationships with greater empathy and understanding, both for yourself and your partner."
      },
      {
        "title": "The Importance of Self-Reflection",
        "content": "Regular self-reflection through journaling, therapy, or mindfulness practices is key to continuous growth and understanding. Reflecting on your interactions and your reactions within relationships can illuminate areas where you can grow and strengthen your relationships.  Continuous self-reflection is critical for building healthy relationships."
      }
    ],
    "conclusion": "Understanding yourself is an ongoing journey. The more you learn about your emotional world, needs, and behaviors, the better equipped you’ll be to build strong, healthy, and fulfilling relationships with others.  This self-awareness is not just beneficial for you, but it improves your relationship dynamics and ultimately fosters greater happiness."
  }
}`;
  
          try {
            // Send the prompt to the AI and parse the result
            const result = await GenrateSessionLayout_Ai.sendMessage(PROMPT);
            const responseText = await result?.response?.text();
            const jsonResponse = JSON.parse(responseText);
  
            // Fetch the video ID asynchronously
            const videoResponse = await Service.getVideos(`${sessions?.name}:${chapter?.name}`);
            const videoId = videoResponse?.[0]?.id?.videoId || '';
  
            // Insert the data into the database
            await db.insert(Chapter).values({
              chapter: index,
              course: sessions?.CourseId,
              content: jsonResponse,
              videoId: videoId,
            });
            router.replace(`/create-course/${sessions?.CourseId}/finish`);
          } catch (error) {
            console.error(`Error generating advice layout for session ${index + 1}:`, error);
          }
        }
      });
  
      // Wait for all promises to complete
      await Promise.all(promises);
      await db.update(CourseList).set({
        publsh:true
      })
      
    } catch (error) {
      console.error('Error in generateAdviceLayout:', error);
    } finally {
      setLoading(false);
    }
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
