import React from 'react';
import Image from 'next/image';
import { Archivo_Black, Manrope, Roboto } from 'next/font/google';
import facilitator from '../../../public/Photo for Facilitator Dashboard Page.png';

const archivo = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const manrope = Manrope({ subsets: ['latin'] });

const page = () => {
  return (
    <div className={manrope.className + ' md:flex md:flex-row'}>
      <div className="bg-[#1fd9d4] md:w-2/6 right-shadow">
        <div className={archivo.className + ' text-center text-semibold m-2'}>
          <h3>Course Files</h3>
          <h4>Click to download all course files</h4>
        </div>
        <div className="flex flex-col text-center m-2">
          <a href="/">Facilitator Training</a>
          <a>Lesson 1: Lesson Name</a>
          <a>Lesson 2: Lesson Name</a>
          <a>Lesson 3: Lesson Name</a>
          <a>Lesson 4: Lesson Name</a>
          <a>Lesson 5: Lesson Name</a>
          <a>Lesson 6: Lesson Name</a>
          <a>Lesson 7: Lesson Name</a>
          <a>Lesson 8: Lesson Name</a>
          <a>Lesson 9: Lesson Name</a>
          <a>Lesson 10: Lesson Name</a>
        </div>
      </div>
      <div className="md:w-2/6 right-shadow">
        <div className={archivo.className + ' text-center text-semibold m-2'}>
          <h3>Course Videos</h3>
        </div>
        <div className="flex flex-col text-center m-2">
          <a href="/">Facilitator Training</a>
          <a>Lesson 1: Lesson Name</a>
          <a>Lesson 2: Lesson Name</a>
          <a>Lesson 3: Lesson Name</a>
          <a>Lesson 4: Lesson Name</a>
          <a>Lesson 5: Lesson Name</a>
          <a>Lesson 6: Lesson Name</a>
          <a>Lesson 7: Lesson Name</a>
          <a>Lesson 8: Lesson Name</a>
          <a>Lesson 9: Lesson Name</a>
          <a>Lesson 10: Lesson Name</a>
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

export default page;
