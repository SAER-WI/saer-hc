import prisma from '@/lib/prisma';

interface RequestBody {
  userId: number;
  date: Date;
  lessonId: string;
} 

export async function PUT(request: Request) {
  const body:RequestBody = await request.json();
  console.log(body)
  const existingLog = await prisma.activityLoghc.findFirst({
    where: {
      lessonId: body.lessonId,
      userId: body.userId
    },
  })

  if (existingLog != null) {
    const updatedLog = await prisma.activityLoghc.update({
      where: {
        id: existingLog.id
      },
      data: {
        date: body.date
      }
    })
    return new Response(JSON.stringify(updatedLog))
  } else {
    const createdLog = await prisma.activityLoghc.create({
      data: {
        userId: body.userId,
        lessonId: body.lessonId,
        date: body.date
      }
    })
    return new Response(JSON.stringify(createdLog))
  }
}

export async function POST(request: Request) {
  const body:RequestBody = await request.json();
  try {
    const logs = await prisma.activityLoghc.findMany({
      select: {
        id: true,
        lessonId: true,
        date: true,
      },
      where: {
        userId: body.userId
      }
    })

    const dateLogs = logs.map(log => {
      return (
        {
          ...log,
          date: new Date(log.date).toLocaleDateString(),
        }
      )
    })

    return new Response(JSON.stringify(dateLogs))
  } catch {
    const response = new Response(null, {status: 400, statusText: 'BAD REQUEST'});
    return response;
  }
}