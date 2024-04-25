import React from 'react';
import { Archivo_Black, Manrope, Roboto } from 'next/font/google';
import aboutPhoto from '../../../public/Second Photo About Page.png';
import Image from 'next/image';
import { Button } from '@mui/material';

const archivo = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const manrope = Manrope({ subsets: ['latin'] });

const page = () => {
  return (
    <div>
      <div className="aboutPageBannerImage w-full md:h-48 ">
        <div className="my-auto flex flex-col items-center h-full justify-center">
          <h1
            className={
              archivo.className + ' text-center text-white m-2 md:mb-2'
            }
          >
            About
          </h1>
          <h3 className={manrope.className + ' text-white text-center m-2'}>
            Social Emotional Learning and Character Ed Resources that Challenge
            Students Through Compassion and Hope
          </h3>
        </div>
      </div>
      <div className="md:flex md:flex-row">
        <div className="md:w-2/6 md:mb-5">
          <Image src={aboutPhoto} alt="about page photo" />
        </div>
        <div className="mt-4 md:w-4/6">
          <h2 className="text-center font-semibold md:mt-10">Our Mission</h2>
          <p className="m-2">
            Bringing a message of Hope and Compassion to students has the power
            to change the future. If the generation of students today can grab
            ahold of hope and treat the people in their lives with respect and
            compassion then we will have more conversations that have the power
            to effect lasting changes. We strive to create opportunities for
            these conversations through powerful, engaging, and innovative
            resources.
          </p>
          <h2 className="text-center font-semibold mt-8">Our History</h2>
          <p className="m-2">
            A team of school speakers and trainers from across the nation came
            together to create engaging and challenging content to have a
            lasting impact on students, teachers, and families. After meeting
            with some mental health professionals, we chose to create our first
            project: Healthy Conversations About Loss. We called on some of the
            best speakers to students from across the nation to join us and
            create powerful video content to supplement the lessons from the
            mental health professionals that we partnered with.
          </p>
        </div>
      </div>
      <div
        className={
          manrope.className + ' bottomAboutPageBanner text-white py-2 md:mt-10'
        }
      >
        <h2 className="text-center m-2">Contact us</h2>
        <div>
          <div className="text-center">
            <Button
              color="secondary"
              variant="contained"
              size="small"
              href="mailto:jason@studenthealthyconversations.com"
            >
              jason@studenthealthyconversations.com
            </Button>
          </div>
          <p className="text-center m-2 md:text-xl">(989) 498-9924</p>
        </div>
      </div>
      <div className="bg-[#13938C] p-2">
        <p className="text-white m-2 text-center">
          Student Healthy Conversations
        </p>
      </div>
    </div>
  );
};

export default page;
