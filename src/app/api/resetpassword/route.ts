import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';

interface RequestBody {
  token: string,
  userId: number,
  password: string,
} 

export async function PUT(request: Request) {
  try {
    const body:RequestBody = await request.json();
    console.log(body)
    const resetToken = await prisma.passwordResetTokenhc.findUnique({
      where: {
        token: body.token,
        createdAt: {gt: new Date(Date.now() - 1000 * 60 * 60 * 1)},
        resetAt: null
      },
    })

    console.log(resetToken)


    if (!resetToken) {
      return new Response(null, {status: 400, statusText: 'Invalid token'})
    }

    const encrypted = await hash(body.password, 10);
    const updateUser = prisma.userhc.update({
      where: {id: resetToken.userId},
      data: {
        password: encrypted,
      }
    })

    const updateToken = prisma.passwordResetTokenhc.update({
      where: {
        id: resetToken.id,
      },
      data: {
        resetAt: new Date(Date.now()),
      }
    })

    await prisma.$transaction([updateToken, updateUser])
    return new Response(JSON.stringify(true))
  } catch {
    return new Response(null, {status: 400, statusText: 'Invalid token'})
  }
}

export async function POST(request: Request) {
  try {
    const body:RequestBody = await request.json();
    console.log(body)
    const randomtoken = `${randomUUID()}${randomUUID()}`.replace(/-/g, '')

    const token = await prisma.passwordResetTokenhc.create({
      data: {
        userId: body.userId,
        token: randomtoken
      }
    });
    
    return new Response(JSON.stringify(token))
  } catch (err){
    console.log(err)
    const response = new Response(null, {status: 400, statusText: 'BAD REQUEST'});
    return response;
  }
}