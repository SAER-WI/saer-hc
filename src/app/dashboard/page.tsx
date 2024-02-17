'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Archivo_Black, Manrope, Roboto } from 'next/font/google';
import facilitator from '../../../public/Photo for Facilitator Dashboard Page.png';
import { useSession } from 'next-auth/react';

const archivo = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const manrope = Manrope({ subsets: ['latin'] });

interface ActivityLog {
  userId: string;
  lessonId: string;
  date: string;
}

const Page = () => {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadActivityLogs = async () => {
      const data = {
        userId: session?.user.id,
      };
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const response = await fetch(`/api/activitylog`, options);
      const result = await response.json();
      setActivityLogs(result);
    };
    if (session?.user.id) {
      loadActivityLogs();
    }
  }, [session?.user.id, loading]);

  const handleClick = async (lessonId: string) => {
    const data = {
      userId: session?.user.id,
      lessonId: lessonId,
      date: new Date(Date.now()),
    };
    console.log(data);
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    const response = await fetch(`/api/activitylog`, options);
    const result = await response.json();
    setLoading(!loading);
  };

  return (
    <div className={manrope.className + ' md:flex md:flex-row'}>
      <div className="bg-[#1fd9d4] md:w-2/6 right-shadow">
        <div className={archivo.className + ' text-center text-semibold m-2'}>
          <h3>Course Files</h3>
          <h4>Click to download all course files</h4>
        </div>
        <div className="flex flex-col text-center m-2">
          <a href="/facilitator" className="hover:underline">
            Facilitator Training
          </a>
          <a
            onClick={() => handleClick('lesson1')}
            href="https://www.dropbox.com/scl/fo/xcw34q5g9fafjqjkzlkh9/h?rlkey=gc7i7j1k90i8i2adbdhhpqjhy&dl=1"
            className="hover:underline visited:text-white"
          >
            Lesson 1: You Are Not Alone | Last Downloaded:{' '}
            {
              activityLogs.find(
                (log: ActivityLog) => log.lessonId === 'lesson1'
              )?.date
            }
          </a>
          <a
            className="hover:underline"
            onClick={() => handleClick('lesson2')}
            href="https://www.dropbox.com/scl/fo/0v3v6g3nnkw46eayowzl8/h?rlkey=9ce27m3okcums59e1niu9fkoq&dl=1"
          >
            Lesson 2: Dealing With Denial | Last Downloaded:{' '}
            {
              activityLogs.find(
                (log: ActivityLog) => log.lessonId === 'lesson2'
              )?.date
            }
          </a>
          <a
            className="hover:underline"
            onClick={() => handleClick('lesson3')}
            href="https://www.dropbox.com/scl/fo/ktpwv5kpe8omtmafdpvcw/h?rlkey=v39d97m3jkksoe20mz692jce9&dl=1"
          >
            Lesson 3: Controlling Anger | Last Downloaded:{' '}
            {
              activityLogs.find(
                (log: ActivityLog) => log.lessonId === 'lesson3'
              )?.date
            }
          </a>
          <a
            className="hover:underline"
            onClick={() => handleClick('lesson4')}
            href="https://www.dropbox.com/scl/fo/8yd8hjxzvofnkchhdoiwi/h?rlkey=g97mojzhhjz8zakervzynlw9w&dl=1"
          >
            Lesson 4: Bargaining | Last Downloaded:{' '}
            {
              activityLogs.find(
                (log: ActivityLog) => log.lessonId === 'lesson4'
              )?.date
            }
          </a>
          <a
            className="hover:underline"
            onClick={() => handleClick('lesson5')}
            href="https://www.dropbox.com/scl/fo/rp2fwir4th0s5jifq4jye/h?rlkey=2tib6t4a2elntvjef9sthjnze&dl=1"
          >
            Lesson 5: Depression | Last Downloaded:{' '}
            {
              activityLogs.find(
                (log: ActivityLog) => log.lessonId === 'lesson5'
              )?.date
            }
          </a>
          <a
            className="hover:underline"
            onClick={() => handleClick('lesson6')}
            href="https://www.dropbox.com/scl/fo/u1qyp3dln822qmjf56n2e/h?rlkey=3awqyslhgqww8nu2bz7xj9ymm&dl=1"
          >
            Lesson 6: Acceptance | Last Downloaded:{' '}
            {
              activityLogs.find(
                (log: ActivityLog) => log.lessonId === 'lesson6'
              )?.date
            }
          </a>
          <a
            className="hover:underline"
            onClick={() => handleClick('lesson7')}
            href="https://www.dropbox.com/scl/fo/dmu34yac694iani61pd7n/h?rlkey=h11fvbuyku9qggg1shon2x24b&dl=1"
          >
            Lesson 7: Assigning Meaning | Last Downloaded:{' '}
            {
              activityLogs.find(
                (log: ActivityLog) => log.lessonId === 'lesson7'
              )?.date
            }
          </a>
          <a
            className="hover:underline"
            onClick={() => handleClick('lesson8')}
            href="https://www.dropbox.com/scl/fo/7d29tyl9jja10a6632ucq/h?rlkey=un2s14bnls0u59mm3l1n2olwq&dl=1"
          >
            Lesson 8: Gratitude | Last Downloaded:{' '}
            {
              activityLogs.find(
                (log: ActivityLog) => log.lessonId === 'lesson8'
              )?.date
            }
          </a>
          <a
            className="hover:underline"
            onClick={() => handleClick('lesson9')}
            href="https://www.dropbox.com/scl/fo/jthpx6jyb0g82l1tgpy4k/h?rlkey=q5554zv9dbxnqjzqohho044ge&dl=1"
          >
            Lesson 9: Healthy Boundaries | Last Downloaded:{' '}
            {
              activityLogs.find(
                (log: ActivityLog) => log.lessonId === 'lesson9'
              )?.date
            }
          </a>
          <a
            className="hover:underline"
            onClick={() => handleClick('lesson10')}
            href="https://www.dropbox.com/scl/fo/8xa61g1gkwalgy0asxxl2/h?rlkey=m3dnbzbctg639ovixujh2ujlo&dl=1"
          >
            Lesson 10: Friendship and Support | Last Downloaded:{' '}
            {
              activityLogs.find(
                (log: ActivityLog) => log.lessonId === 'lesson10'
              )?.date
            }
          </a>
        </div>
      </div>
      <div className="md:w-2/6 right-shadow">
        <div className={archivo.className + ' text-center text-semibold m-2'}>
          <h3>Course Videos</h3>
        </div>
        <div className="flex flex-col text-center m-2">
          <a className="hover:underline" href="/facilitator">
            Facilitator Training
          </a>
          <a
            className="hover:underline"
            href="https://vimeo.com/888880268?share=copy"
            target="_blank"
          >
            Lesson 1: You&apos;re Not Alone
          </a>
          <a
            className="hover:underline"
            href="https://vimeo.com/888881309?share=copy"
            target="_blank"
          >
            Lesson 2: Denial
          </a>
          <a
            className="hover:underline"
            href="https://vimeo.com/888882260?share=copy"
            target="_blank"
          >
            Lesson 3: Anger
          </a>
          <a
            className="hover:underline"
            href="https://vimeo.com/888883173?share=copy"
            target="_blank"
          >
            Lesson 4: Bargaining
          </a>
          <a
            className="hover:underline"
            href="https://vimeo.com/888884122?share=copy"
            target="_blank"
          >
            Lesson 5: Depression
          </a>
          <a
            className="hover:underline"
            href="https://vimeo.com/888884619?share=copy"
            target="_blank"
          >
            Lesson 6: Acceptance
          </a>
          <a
            className="hover:underline"
            href="https://vimeo.com/888884933?share=copy"
            target="_blank"
          >
            Lesson 7: Assigning Meaning
          </a>
          <a
            className="hover:underline"
            href="https://vimeo.com/888885432?share=copy"
            target="_blank"
          >
            Lesson 8: Gratitude
          </a>
          <a
            className="hover:underline"
            href="https://vimeo.com/888886334?share=copy"
            target="_blank"
          >
            Lesson 9: Boundaries
          </a>
          <a
            className="hover:underline"
            href="https://vimeo.com/888886775?share=copy"
            target="_blank"
          >
            Lesson 10: Friendship
          </a>
        </div>
      </div>
      <div className={manrope.className + ' bg-[#1db669] md:w-2/6 left-shadow'}>
        <h2
          className={
            archivo.className + ' text-center font-semibold m-4 text-white'
          }
        >
          Welcome, Facilitator!
        </h2>
        <div className="md:flex md:flex-row">
          <div className="md:w-3/6 m-2">
            <Image src={facilitator} alt="facilitator image" />
          </div>
          <div className="md:w-3/6 text-center text-white md:my-auto">
            <h3>
              Thank you for leading your students to better their mental health!
            </h3>
          </div>
        </div>
        <p className="text-white m-4 text-center">
          This is your Facilitator Dashboard. From here, you have access to
          downloading each lesson’s materials as well as view their
          corresponding videos. By clicking on a lesson, you will download all
          teaching materials, including: a PowerPoint presentation, a teacher’s
          lesson guide, and a student’s portfolio guide. Once a lesson has been
          downloaded, an indicator will show you that lesson has been interacted
          with to track your progress. Simply click on the corresponding lesson
          video to view while presenting the lesson.
        </p>
      </div>
    </div>
  );
};

export default Page;
