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
            href="https://www.dropbox.com/scl/fi/wyhv9rvgdj056w1il8yyl/01-You-Are-Not-Alone.pptx?rlkey=9qln2h4fe5x6oa10081f0yfq0&dl=1"
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
            href="https://www.dropbox.com/scl/fi/p4fhm9ostk3gucfwdweji/02-Denial.pptx?rlkey=3ax99wupbrlce7sdr7z3934ur&dl=1"
          >
            Lesson 2: Denial | Last Downloaded:{' '}
            {
              activityLogs.find(
                (log: ActivityLog) => log.lessonId === 'lesson2'
              )?.date
            }
          </a>
          <a
            className="hover:underline"
            onClick={() => handleClick('lesson3')}
            href="https://www.dropbox.com/scl/fi/l3lknj1hchi9ueda1g00u/03-Anger.pptx?rlkey=yc53ww4kjj1bjy6gxg88t8k85&dl=1"
          >
            Lesson 3: Anger | Last Downloaded:{' '}
            {
              activityLogs.find(
                (log: ActivityLog) => log.lessonId === 'lesson3'
              )?.date
            }
          </a>
          <a
            className="hover:underline"
            onClick={() => handleClick('lesson4')}
            href="https://www.dropbox.com/scl/fi/l25tjtkoy6wxp937a67ad/04-Bargaining.pptx?rlkey=ep8p5dxkqbyqf4avuqkm8ndff&dl=1"
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
            href="https://www.dropbox.com/scl/fi/zrksfcqx12r3dv64x8c8c/05-Depression.pptx?rlkey=0ar7azpxyagiw75p2pirqu9d7&dl=1"
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
            href="https://www.dropbox.com/scl/fi/nyd09rth3selmwlq9ykn4/06-Acceptance.pptx?rlkey=vzxej9huuyh1o9b1ya2h66ga8&dl=1"
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
            href="https://www.dropbox.com/scl/fi/4fxv353tbhwrgp3gcoeny/07-Assigning-Meaning.pptx?rlkey=o4pag1zm1v4vxn4hkf2j5cz1s&dl=1"
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
            href="https://www.dropbox.com/scl/fi/7fvp3vgmew4rxv192ao88/08-Gratitude.pptx?rlkey=x7jz4iuqqhww6enzwr3v97x3x&dl=1"
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
            href="https://www.dropbox.com/scl/fi/d0yv4x0eiqfcw54082q64/09-Boundaries.pptx?rlkey=qquaeblpm6lad6fwtedg8c2ge&dl=1"
          >
            Lesson 9: Boundaries | Last Downloaded:{' '}
            {
              activityLogs.find(
                (log: ActivityLog) => log.lessonId === 'lesson9'
              )?.date
            }
          </a>
          <a
            className="hover:underline"
            onClick={() => handleClick('lesson10')}
            href="https://www.dropbox.com/scl/fi/5n970tb3o0s4u4z882p10/10-Friendship.pptx?rlkey=df1ybb7oib906p0bhx5g7y7bx&dl=1"
          >
            Lesson 10: Friendship | Last Downloaded:{' '}
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
