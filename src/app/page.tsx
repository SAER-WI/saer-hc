'use client';
import SignInButton from '@/components/SignInButton';
import { TextField, Button, Typography } from '@mui/material';
import { Archivo_Black, Manrope } from 'next/font/google';
import Image from 'next/image';
import homeImage from '../../public/home page top picture.png';
import secondHomeImage from '../../public/Second Image Home Page.png';
import thirdHomeImage from '../../public/Third Photo Home Page.png';
import fourthHomeImage from '../../public/fourth photo for home page.png';
import bottomHomeImage from '../../public/bottom photo for home page.png';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';

const archivo = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const manrope = Manrope({ subsets: ['latin'] });

export default function Home() {
  const { data: session } = useSession();

  const href = useRef('/signIn');

  useEffect(() => {
    if (session?.user) {
      href.current = '/dashboard';
    }
  }, [session?.user]);
  return (
    <div>
      <div
        id="landingPage"
        className={archivo.className + ' flex flex-col md:flex-row'}
      >
        <div className=" m-2 md:my-auto md:mx-10 md:w-3/6">
          <h2 className={archivo.className + ' md:m-4'}>
            Healthy Conversations Help Your Students
          </h2>
          <p className={manrope.className + ' md:m-4'}>
            Healthy Conversations is a Social Emotional Learning (SEL) Resource
            that creates a space for students to discover healthy and productive
            ways to deal with loss and grief.
          </p>
          <div className="flex w-full justify-center my-3 md:m-4">
            <Button variant="contained" fullWidth href={href.current}>
              Get Started
            </Button>
          </div>
          <h4 className={manrope.className + ' text-white md:m-4'}>
            Click the Get Started button to sign up for a free account!
          </h4>
        </div>
        <div className="md:w-3/6">
          <Image src={homeImage} alt="First image on home page" />
        </div>
      </div>
      <div className="h-[50px] overflow-hidden">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M-0.84,0.52 C144.74,58.72 323.08,58.72 501.97,1.50 L519.47,-17.25 L-1.41,-2.44 Z"
            className="fill-[#1FD9D4] stroke-none"
          ></path>
        </svg>
      </div>
      <div
        id="home-second-section"
        className={
          manrope.className +
          ' secondSecondBackgroundImage md:bg-none relative md:flex md:flex-row-reverse'
        }
      >
        <div className="mx-2 py-2 md:w-4/6 md:m-4">
          <div className="bg-[#fff] absolute top-0 right-0 opacity-80 w-full h-full z-[0] md:hidden"></div>
          <div className="z-1 relative">
            <p className="m-1 md:text-lg">
              The world is full of loss for students. And the challenges they
              face often don’t show on the outside until lasting damage has been
              done. Falling grades, family problems, at-risk behavior, addiction
              – mental health challenges that few have faced before.
            </p>
            <p className="m-1 my-2 md:text-lg">
              Student Healthy Conversations is a powerful Social Emotional
              Learning (SEL) Resource specifically designed to give 6th to 12th
              grade students the space they need in order to discover healthy
              ways to deal with loss and grief, and thrive despite the setbacks
              that everyday life so often throws their way.
            </p>
            <p className="m-1 md:text-lg">
              This resource is designed in partnership with mental health
              experts and professional communicators who care about students.
              This highly effective program equips facilitators to engage
              students in real conversations that help students move through
              difficult situations. Healthy Conversations is available to public
              and private school districts in the US.
            </p>
          </div>
        </div>
        <div className="hidden md:block md:w-2/6">
          <Image src={secondHomeImage} alt="text" />
        </div>
      </div>
      <div className={manrope.className + ' bg-[#13938C] py-1'}>
        <h3 className="text-center text-white m-4 md:text-3xl">
          Conversations that Heal - Virtually or In Person
        </h3>
      </div>
      <div
        id="home-third-section"
        className={manrope.className + ' flex-col md:text-center'}
      >
        <div className="m-2 md:text-xl md:m-4">
          <p className="mx-1">
            Create your free account to access unlimited use of the
            Resource&apos;s ten segments. Each segment has been carefully
            designed to draw out strong emotions in a safe space, with
            comprehensive materials including a facilitator guide, a video
            message, an online lesson for students, and student take-home
            materials.
          </p>
          <p className="mx-1 my-2">
            The Ten Healthy Conversations Segments are suitable for group
            discussions or one on one sessions. Topics include:
          </p>
        </div>
        <div className="md:flex md:flex-row">
          <div className="m-2 text-center md:my-auto md:mx-auto">
            <div className="font-semibold md:text-xl">
              <p className="my-2">You Are Not Alone</p>
              <p className="my-2">Denial</p>
              <p className="my-2">Anger</p>
              <p className="my-2">Bargaining</p>
              <p className="my-2">Depression Related to Grieving</p>
            </div>
          </div>
          <div className="m-5 md:w-2/6 md:mx-auto">
            <Image src={thirdHomeImage} alt="third home image" />
          </div>
          <div className="m-2 text-center md:my-auto md:mx-auto">
            <div className="font-semibold md:text-xl">
              <p className="my-2">Acceptance & Adjustment</p>
              <p className="my-2">Assigning Meaning</p>
              <p className="my-2">Gratitude</p>
              <p className="my-2">Setting Healthy Boundaries</p>
              <p className="my-2">Be a Good Friend and Support</p>
            </div>
          </div>
        </div>

        <div className="m-2 md:text-xl md:m-4">
          <p className="m-1">
            Clear, kind and never condescending, Healthy Conversations are
            perfectly pitched to the age groups who need these exchanges most.
            They will go forward with tools and strategies to help them deal
            with difficult situations, learn to reach out and communicate with
            adults and each other, recognizing the goals of good mental health.
          </p>
        </div>
      </div>
      <div
        className={
          manrope.className +
          ' bg-[#13938C] text-white py-2 md:flex md:flex-row md:mt-20'
        }
      >
        <h2 className="font-extrabold mx-2 text-center md:w-2/6 md:my-auto">
          School Assemblies They&apos;ll Remember
        </h2>
        <div className="md:w-4/6">
          <p className="m-2 md:text-lg">
            Make your school’s Healthy Conversations Group Lessons even more
            impactful by presenting a Healthy Conversations Student Assembly to
            your student body. We’ll bring internationally recognized speakers
            to your school to share with students about dealing with loss and
            grief in a healthy way.
          </p>
          <p className="text-center">Contact us to learn more:</p>
          <div className="text-center">
            <Button color="secondary" size="small" variant="contained">
              jason@studenthealthyconversations.com
            </Button>
          </div>
          <p className="text-center m-2">(989) 498-9924</p>
        </div>
      </div>
      <div className="md:mt-20">
        <h2 className="font-bold text-center m-2">
          Healthy Conversations Speakers
        </h2>
        <p className="m-2">
          Our team is made up of men and women from across the United States who
          have been speaking in schools for 40 years. We have partnered with
          other speakers who speak to a combined over 1.5 million students every
          year. Our message is always one of Hope and Compassion.
        </p>
        <div
          id="home-video-player"
          className="mx-2 my-5 h-[175px] md:h-[350px] md:mx-auto md:w-auto"
        >
          <iframe
            src="https://player.vimeo.com/video/906105018?h=6a91fe1eab&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen={true}
            className="rounded-md w-full h-full"
          ></iframe>
        </div>
      </div>
      <div className="py-2 fourthSectionBackgroundImage md:bg-none relative md:flex md:flex-row-reverse md:bg-[#1DB669] md:py-0 md:mt-20">
        <div className="bg-[#1DB669] absolute top-0 right-0 opacity-80 w-full h-full z-[0] md:hidden"></div>
        <div className="z-[50] relative text-white  md:mx-auto md:my-auto md:w-4/6">
          <h2 className="font-bold text-center py-2 z-1">
            Ready to Get Started?
          </h2>
          <p className="m-2 z-1">
            Healthy Conversations includes Group Lessons, 10 segments with a
            complete package of materials, Facilitator Guides, and more.
          </p>
          <div className="m-2 z-1">
            <Button fullWidth variant="contained" href={href.current}>
              Get Started
            </Button>
          </div>
        </div>

        <Image
          className="hidden md:block md:w-2/6"
          src={fourthHomeImage}
          alt="fourth home image"
        />
      </div>
      <div className="md:mt-4 md:flex md:flex-row ">
        <div className="md:w-3/6 md:my-auto md:mx-20">
          <h2 className="font-bold text-center my-5 md:text-5xl">
            Healthy Conversations Help Your Students Face the World
          </h2>
          <p className="m-2 md:text-xl">
            Developed by expert communicators and mental health professionals,
            this program equips facilitators to engage students in meaningful
            conversations to help them move forward through difficult
            situations.
          </p>
        </div>

        <div className="md:w-3/6">
          <Image src={bottomHomeImage} alt="bottom home image" />
        </div>
      </div>
      <div className="bg-[#13938C] p-2">
        <p className="text-white m-2 text-center">
          Student Healthy Conversations
        </p>
      </div>
    </div>
  );
}
