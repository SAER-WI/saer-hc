import React from 'react';
import { Archivo_Black, Manrope, Roboto } from 'next/font/google';
import Image from 'next/image';
import { Button, Card, CardContent } from '@mui/material';
import secondHealthyImage from '../../../public/Second Image Healthy Conversations Page.png';
import thirdHealthyImage from '../../../public/Third Image Healthy Conversations Page.png';

const archivo = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const manrope = Manrope({ subsets: ['latin'] });

const page = () => {
  return (
    <div>
      <div className={archivo.className + ' healthyConversationsBanner h-24'}>
        <div className="flex items-center h-full justify-center">
          <h2 className="text-white">Healthy Conversations</h2>
        </div>
      </div>
      <div className="m-2 md:flex md:flex-row md:mt-5">
        <Card className="md:w-3/6 md:m-4">
          <CardContent>
            <p className={manrope.className + ' md:text-xl'}>
              My students loved Healthy Conversations. Real topics with real
              tools offered to students to equip them today and for life. My
              students especially appreciated the discussion, videos, and
              portfolio. As a public school teacher leader, I recommend Healthy
              Conversations to any group of young people!
            </p>
            <br />
            <p className="text-[#13938C] italic font-semibold">
              Julie Laub - Davis High School
            </p>
          </CardContent>
        </Card>
        <div className="mx-auto my-4 md:w-3/6">
          <iframe
            src="https://player.vimeo.com/video/906105018?h=6a91fe1eab&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen={true}
            className="rounded-md w-full h-[175px] md:h-[350px]"
          ></iframe>
        </div>
      </div>
      <div className="healthyConversationsSecondImage md:bg-[#61CE70] md:bg-none relative p-2 md:flex md:flex-row md:p-0">
        <div className="bg-[#1DB669] absolute top-0 right-0 opacity-80 w-full h-full z-[0] md:hidden"></div>
        <div className="md:w-2/6">
          <Image
            src={secondHealthyImage}
            alt="second healthy conversations image"
          />
        </div>
        <div className="z-50 relative md:w-4/6 md:text-center md:my-auto">
          <h2 className={archivo.className + ' text-white'}>
            What mental health needs is more sunlight, more candor, and more
            unashamed conversation.
          </h2>
          <br />
          <p className={manrope.className + ' text-white'}>GLEN CLOSE</p>
        </div>
      </div>
      <div className="md:flex md:flex-row md:mt-10">
        <div className="m-2 md:w-4/6 md:m-10">
          <h2 className={archivo.className}>
            Multiple models to fit your school&apos;s needs
          </h2>
          <br />
          <p className={manrope.className + ' md:text-lg'}>
            Fully housed online course for instructors to use in virtual
            environment.
          </p>
          <br />
          <p className={manrope.className + ' md:text-lg'}>
            Downloadable for use in a brick and mortar setting with access to
            each video through the online platform.
          </p>
          <br />
          <p className={manrope.className + ' md:text-lg'}>
            Hybrid for online and in person group meetings.
          </p>
        </div>
        <div className="m-4 md:w-2/6 md:mr-20">
          <Image
            src={thirdHealthyImage}
            alt="healthy conversations image three"
          />
        </div>
      </div>
      <div className="m-2">
        <h2
          className={
            manrope.className +
            ' font-semibold text-center md:text-4xl md:font-bold md:mt-10'
          }
        >
          Healthy Conversations Supplemental Resource
        </h2>
        <div className="md:flex md:flex-row md:flex-wrap md:mt-2">
          <h4
            className={
              manrope.className +
              ' bg-[#61CE70] text-white text-center rounded-md shadow-md my-1 md:w-[45%] md:mx-[2.5%] md:p-1'
            }
          >
            All course lessons
          </h4>
          <h4
            className={
              manrope.className +
              ' bg-[#61CE70] text-white text-center rounded-md shadow-md my-1 md:w-[45%] md:mx-[2.5%] md:p-1'
            }
          >
            Student Guides
          </h4>
          <h4
            className={
              manrope.className +
              ' bg-[#61CE70] text-white text-center rounded-md shadow-md my-1 md:w-[45%] md:mx-[2.5%] md:p-1'
            }
          >
            Videos with helpful tips for teachers
          </h4>
          <h4
            className={
              manrope.className +
              ' bg-[#61CE70] text-white text-center rounded-md shadow-md my-1 md:w-[45%] md:mx-[2.5%] md:p-1'
            }
          >
            Parent Guides
          </h4>
        </div>
      </div>
      <div className="bg-[#13938C] p-2 md:mt-5">
        <p className="text-white m-2 text-center">
          Student Healthy Conversations
        </p>
      </div>
    </div>
  );
};

export default page;
