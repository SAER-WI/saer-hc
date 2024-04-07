'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Archivo_Black, Manrope, Roboto } from 'next/font/google';
import facilitator from '../../../public/Photo for Facilitator Dashboard Page.png';
import { signOut, useSession } from 'next-auth/react';
import { Button, Divider, Modal } from '@mui/material';
import { useRouter } from 'next/navigation';

const archivo = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const manrope = Manrope({ subsets: ['latin'] });

interface ActivityLog {
  userId: string;
  lessonId: string;
  date: string;
}

const srcLinks = [
  'https://player.vimeo.com/video/888880268?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
  'https://player.vimeo.com/video/888881309?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
  'https://player.vimeo.com/video/888882260?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
  'https://player.vimeo.com/video/888883173?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
  'https://player.vimeo.com/video/888884122?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
  'https://player.vimeo.com/video/888884619?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
  'https://player.vimeo.com/video/888884933?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
  'https://player.vimeo.com/video/888885432?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
  'https://player.vimeo.com/video/888886334?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
  'https://player.vimeo.com/video/888886775?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
];

const titles = [
  `Lesson 1: You're Not Alone`,
  'Lesson 2: Denial',
  'Lesson 3: Anger',
  'Lesson 4: Bargaining',
  'Lesson 5: Depression',
  'Lesson 6: Acceptance',
  'Lesson 7: Assigning Meaning',
  'Lesson 8: Gratitude',
  'Lesson 9: Boundaries',
  'Lesson 10: Friendship',
];

const Page = () => {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadActivityLogs = async () => {
      const data = {
        userId: session?.user.id,
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: session!.user.accessToken,
        },
        body: JSON.stringify(data),
      };
      console.log(options);
      const response = await fetch(`/api/activitylog`, options);
      if (response.status === 401) {
        try {
          signOut();
          router.push('/signIn');
        } catch {
          router.push('/signIn');
        }
      } else {
        const result = await response.json();
        setActivityLogs(result);
      }
    };
    if (session?.user.id) {
      loadActivityLogs();
    }
  }, [session?.user.id, session, loading, router]);

  const handleClick = async (lessonId: string) => {
    const data = {
      userId: session?.user.id,
      lessonId: lessonId,
      date: new Date(Date.now()),
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: session!.user.accessToken,
      },
      body: JSON.stringify(data),
    };
    await fetch(`/api/activitylog`, options);
    setLoading(!loading);
  };

  return (
    <div className={manrope.className + ' md:flex md:flex-row'}>
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
          Begin by Going Through Facilitator Training:
        </p>
        <div className="text-center mb-8">
          <Button color="secondary" variant="contained" href="/facilitator">
            Facilitator Training
          </Button>
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
      <div className="bg-[#1fd9d4] md:w-2/6">
        <div className={archivo.className + ' text-center text-semibold m-2'}>
          <h3>Course Files</h3>
          <h4>Click to Download All Course Files</h4>
        </div>
        <div className="flex flex-col text-center m-2">
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              onClick={() => handleClick('lesson1')}
              href="https://www.dropbox.com/scl/fo/tcjh4kuljp669tdv0ab9d/h?rlkey=si36x9xsosdljc8weg65l0b4l&dl=1"
              variant="contained"
              color={
                activityLogs.some((log) => log.lessonId === 'lesson1')
                  ? 'secondary'
                  : 'primary'
              }
            >
              Lesson 1: You Are Not Alone
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              onClick={() => handleClick('lesson2')}
              href="https://www.dropbox.com/scl/fo/9p2timpdxgphfmjs54i5a/h?rlkey=5kep6ste96ffzub0pczl2imnm&dl=1"
              variant="contained"
              color={
                activityLogs.some((log) => log.lessonId === 'lesson2')
                  ? 'secondary'
                  : 'primary'
              }
            >
              Lesson 2: Denial
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              onClick={() => handleClick('lesson3')}
              href="https://www.dropbox.com/scl/fo/svzcbtpl6y20jw3ftm6ih/h?rlkey=8qfqrn8ezzgx1usar9xej6aas&dl=1"
              variant="contained"
              color={
                activityLogs.some((log) => log.lessonId === 'lesson3')
                  ? 'secondary'
                  : 'primary'
              }
            >
              Lesson 3: Anger
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              onClick={() => handleClick('lesson4')}
              href="https://www.dropbox.com/scl/fo/72wp8n4hpejjp23gmpfri/h?rlkey=drnble4gkltyaovwhkroaloo6&dl=1"
              variant="contained"
              color={
                activityLogs.some((log) => log.lessonId === 'lesson4')
                  ? 'secondary'
                  : 'primary'
              }
            >
              Lesson 4: Bargaining
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              onClick={() => handleClick('lesson5')}
              href="https://www.dropbox.com/scl/fo/gi3gsp6h0z8oagq0x90bh/h?rlkey=2gswjruq9b08mcxmkyqkb3o1z&dl=1"
              variant="contained"
              color={
                activityLogs.some((log) => log.lessonId === 'lesson5')
                  ? 'secondary'
                  : 'primary'
              }
            >
              Lesson 5: Depression
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              onClick={() => handleClick('lesson6')}
              href="https://www.dropbox.com/scl/fo/c628p738jzqsa1od4mwy7/h?rlkey=dajltnx2xpuhu061om5lhzwn8&dl=1"
              variant="contained"
              color={
                activityLogs.some((log) => log.lessonId === 'lesson6')
                  ? 'secondary'
                  : 'primary'
              }
            >
              Lesson 6: Acceptance
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              onClick={() => handleClick('lesson7')}
              href="https://www.dropbox.com/scl/fo/owe78pwkriw9q2d5zuhcu/h?rlkey=cwbnl62v0m8ab1yt4is3dcnol&dl=1"
              variant="contained"
              color={
                activityLogs.some((log) => log.lessonId === 'lesson7')
                  ? 'secondary'
                  : 'primary'
              }
            >
              Lesson 7: Assigning Meaning
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              onClick={() => handleClick('lesson8')}
              href="https://www.dropbox.com/scl/fo/xsqxkcl3yf7menlcenz0n/h?rlkey=g9a6r7mld1jbnstqm4oxgvwrg&dl=1"
              variant="contained"
              color={
                activityLogs.some((log) => log.lessonId === 'lesson8')
                  ? 'secondary'
                  : 'primary'
              }
            >
              Lesson 8: Gratitude
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              onClick={() => handleClick('lesson9')}
              href="https://www.dropbox.com/scl/fo/tm3ncursjl7nl5go6u924/h?rlkey=t5z3r2amlzywvaxlknrvt6hhh&dl=1"
              variant="contained"
              color={
                activityLogs.some((log) => log.lessonId === 'lesson9')
                  ? 'secondary'
                  : 'primary'
              }
            >
              Lesson 9: Boundaries
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              onClick={() => handleClick('lesson10')}
              href="https://www.dropbox.com/scl/fo/8qld9sg3jszy8ehh7xof1/h?rlkey=zq3kf6fj0iz5cpinh2zxxq92t&dl=1"
              variant="contained"
              color={
                activityLogs.some((log) => log.lessonId === 'lesson10')
                  ? 'secondary'
                  : 'primary'
              }
            >
              Lesson 10: Friendship
            </Button>
          </div>
        </div>
      </div>
      <div className="md:w-2/6 right-shadow">
        <div className={archivo.className + ' text-center text-semibold m-2'}>
          <h3>Course Videos</h3>
          <h4>Click to Watch Course Videos</h4>
        </div>
        <div className="flex flex-col text-center m-2">
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setModalTitle(titles[0]);
                setLink(srcLinks[0]);
                setCurrentIndex(0);
                setOpen(true);
              }}
            >
              Lesson 1: You&apos;re Not Alone
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setModalTitle(titles[1]);
                setLink(srcLinks[1]);
                setCurrentIndex(1);
                setOpen(true);
              }}
            >
              Lesson 2: Denial
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setModalTitle(titles[2]);
                setLink(srcLinks[2]);
                setCurrentIndex(2);
                setOpen(true);
              }}
            >
              Lesson 3: Anger
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setModalTitle(titles[3]);
                setLink(srcLinks[3]);
                setCurrentIndex(3);
                setOpen(true);
              }}
            >
              Lesson 4: Bargaining
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setModalTitle(titles[4]);
                setLink(srcLinks[4]);
                setCurrentIndex(4);
                setOpen(true);
              }}
            >
              Lesson 5: Depression
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setModalTitle(titles[5]);
                setLink(srcLinks[5]);
                setCurrentIndex(5);
                setOpen(true);
              }}
            >
              Lesson 6: Acceptance
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setModalTitle(titles[6]);
                setLink(srcLinks[6]);
                setCurrentIndex(6);
                setOpen(true);
              }}
            >
              Lesson 7: Assigning Meaning
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setModalTitle(titles[7]);
                setLink(srcLinks[7]);
                setCurrentIndex(7);
                setOpen(true);
              }}
            >
              Lesson 8: Gratitude
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setModalTitle(titles[8]);
                setLink(srcLinks[8]);
                setCurrentIndex(8);
                setOpen(true);
              }}
            >
              Lesson 9: Boundaries
            </Button>
          </div>
          <div className="my-1 mx-auto md:w-[65%]">
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setModalTitle(titles[9]);
                setLink(srcLinks[9]);
                setCurrentIndex(9);
                setOpen(true);
              }}
            >
              Lesson 10: Friendship
            </Button>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col absolute top-[50%] left-[50%] p-3 bg-white rounded-md translate-x-[-50%] translate-y-[-50%] md:w-4/6">
          <h3 className="text-center mb-2">{modalTitle}</h3>
          <iframe
            src={link}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen={true}
            className="rounded-md w-full h-[150px] md:h-[350px]"
          />
          <br />
          <Divider variant="middle" />
          <div className="flex flex-row justify-between">
            <Button
              disabled={currentIndex <= 0}
              onClick={() => {
                setLink(srcLinks[currentIndex - 1]);
                setModalTitle(titles[currentIndex - 1]);
                setCurrentIndex((prevIndex) => prevIndex - 1);
              }}
            >
              Previous
            </Button>
            <Button
              disabled={currentIndex >= 9}
              onClick={() => {
                setLink(srcLinks[currentIndex + 1]);
                setModalTitle(titles[currentIndex + 1]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
