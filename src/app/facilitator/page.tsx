import Image from 'next/image';
import React from 'react';
import saerLogo from '../../../public/saerlogo copy.png';
import { Archivo_Black, Manrope } from 'next/font/google';
const archivo = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const manrope = Manrope({ subsets: ['latin'] });

const Page = () => {
  return (
    <div className={manrope.className}>
      <h2
        className={
          archivo.className + ' text-[#13938C] text-center m-2 md:my-5'
        }
      >
        Just For You
      </h2>
      <p className="m-2 md:m-5">
        Here are some videos and tips that are intended to help you as you walk
        through some of these difficult, but very healthy conversations with
        students. Thank you for caring about students enough to tackle these
        topics.
      </p>
      <p className="m-2 md:m-5">
        *Below are 3 videos that you can watch at your own pace. We hope you
        find them helpful.
      </p>
      <p className="m-2 md:m-5">
        As teachers, it&apos;s important to serve as an example for your
        students. Take a moment to reflect on the ideas in this video as you
        prepare to guide your students through healthy conversations.
      </p>
      <div className="mx-auto my-4">
        <iframe
          src="https://player.vimeo.com/video/906080826?h=cb5cd222ec"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen={true}
          className="rounded-md w-full h-[150px] md:h-[350px]"
        ></iframe>
      </div>
      <h2
        className={
          archivo.className + ' text-[#13938C] text-center m-2 md:my-5'
        }
      >
        Take a Moment to Reflect
      </h2>
      <ul className="m-2 list-inside list-disc md:m-5">
        <li className="my-1">
          What is one step you can take today to cultivate compassionate
          leadership?
        </li>
        <li className="my-1">
          What response would you adjust in your classroom to cultivate
          compassionate leadership?
        </li>
      </ul>
      <p className="m-2 md:m-5">
        When guiding students, it&apos;s important to demonstrate compassionate
        leadership. Take a few moments to review this video to learn specific
        techniques for cultivating compassionate leadership in your classroom.
      </p>
      <div className="mx-auto my-4">
        <iframe
          src="https://player.vimeo.com/video/906081568?h=adf6233573"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen={true}
          className="rounded-md w-full h-[150px] md:h-[350px]"
        ></iframe>
      </div>
      <h2
        className={
          archivo.className + ' text-[#13938C] text-center m-2 md:my-5'
        }
      >
        Take a Moment to Reflect
      </h2>
      <ul className="m-2 list-inside list-disc md:m-5">
        <li className="my-1">
          What are some strategies you can use to make time for rest, relief,
          and your relationships?
        </li>
        <li className="my-1">
          As a teacher, why is this important for your students&apos;
          well-being?
        </li>
      </ul>
      <p className="m-2 md:m-5">
        As a teacher, you may be experiencing grief as you guide your students
        through their grief. Take a moment to watch this video to learn more
        about resilient leadership.
      </p>
      <div className="mx-auto my-4">
        <iframe
          src="https://player.vimeo.com/video/906082043?h=27a306bbd9"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen={true}
          className="rounded-md w-full h-[150px] md:h-[350px]"
        ></iframe>
      </div>
      <h2
        className={
          archivo.className + ' text-[#13938C] text-center m-2 md:my-5'
        }
      >
        Take a Moment to Reflect
      </h2>
      <ul className="m-2 list-inside list-disc md:m-5">
        <li className="my-1">
          How can you be sure you are reaching out for support as you walk
          through your current season?
        </li>
        <li className="my-1">
          What are some ways you can think right and do right as you wait for
          your world to be all right?
        </li>
      </ul>
      <h2
        className={
          archivo.className + ' text-[#13938C] text-center m-2 md:mt-10 md:mb-5'
        }
      >
        Recommendations for Facilitating this Course
      </h2>
      <p className="m-2 md:m-5">
        In the teacher guide for each segment, there are recommended teacher
        scripts. We have provided questions for your students and reflection
        questions for you as a teacher to monitor your students&apos; learning.
        However, as a professional, it is best practice to adjust activities and
        provided materials to address the needs and current understanding of
        your students.
      </p>
      <div className={manrope.className + ' text-center'}>
        <Image
          src={saerLogo}
          alt="saer logo"
          className="m-[5%] mt-4 w-[90%] md:w-2/6 md:mx-auto md:mt-10"
        />
      </div>
    </div>
  );
};

export default Page;
