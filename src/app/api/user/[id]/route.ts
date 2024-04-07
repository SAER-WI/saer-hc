import { verifyJwt } from '@/lib/jwt';
import prisma from '@/lib/prisma';

interface RequestBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  admin: boolean;
} 

export async function GET(request: Request, {params}: {params: {id: string}}) {
  try {
    const user = await prisma.userhc.findUniqueOrThrow({
      where:{
        email: params.id,
      }
    });
    const {password, ...res} = user;
    return new Response(JSON.stringify(res));
  } catch (err) {
    const response = new Response(null, {status: 404, statusText: 'Account not found'});
    return response;
  }
}

export async function PUT(request: Request, {params}: {params: {id: string}}) {
  const accessToken = request.headers.get("Authorization")

  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({error: 'Unauthorized'}), {
      status: 401
    })
  }
  const body:RequestBody = await request.json();
  try {
    const user = await prisma.userhc.findUniqueOrThrow({
      where:{
        email: params.id,
      }
    });

    console.log(user)
    const userToUpdate = {
      email: !!body.email ? body.email : user.email,
      firstname: !!body.firstname ? body.firstname : user.firstname,
      lastname: !!body.lastname ? body.lastname : user.lastname,
      admin: body.admin,
    }

    const updatedUser = await prisma.userhc.update({
      where: {
        email: userToUpdate.email,
      },
      data: {
        email: userToUpdate.email,
        firstname: userToUpdate.firstname,
        lastname: userToUpdate.lastname,
        admin: userToUpdate.admin
      }
    })
    
    const {password, ...res} = updatedUser;
    return new Response(JSON.stringify(res));
  } catch (err) {
    const response = new Response(null, {status: 400, statusText: 'BAD REQUEST'});
    return response;
  }
}
