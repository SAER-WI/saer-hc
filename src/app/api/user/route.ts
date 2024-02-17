import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt';

interface RequestBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  admin: boolean;
  approved: boolean;
  blocked: boolean;
} 

export async function POST(request:Request) {
  const body:RequestBody = await request.json();
  try {
      const user = await prisma.userhc.create({
        data:{
          firstname:body.firstname,
          lastname:body.lastname,
          email:body.email,
          password: await bcrypt.hash(body.password, 10),
          admin: body.admin,
          approved: body.approved,
          blocked: body.blocked
        }
      });
    
      const {password, ...res} = user;
      return new Response(JSON.stringify(res));
  } catch {
    const response = new Response(null, {status: 400, statusText: 'BAD REQUEST'});
    return response;
  }
}

export async function GET() {
  try {
    const users = await prisma.userhc.findMany({
      select: {
        firstname: true,
        lastname: true,
        email: true,
        admin: true,
        approved: true,
        blocked: true,
      }
    })

    return new Response(JSON.stringify(users))
  } catch {
    const response = new Response(null, {status: 400, statusText: 'BAD REQUEST'});
    return response;
  }
}