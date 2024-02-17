import prisma from '@/lib/prisma';

interface RequestBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  admin: boolean;
  approved: boolean;
  blocked: boolean;
} 

export async function PUT(request: Request, {params}: {params: {id: string}}) {
  const body:RequestBody = await request.json();
  try {
    console.log(params.id)
    const user = await prisma.userhc.findUniqueOrThrow({
      where:{
        email: params.id,
      }
    });
    const userToUpdate = {
      email: !!body.email ? body.email : user.email,
      firstname: !!body.firstname ? body.firstname : user.firstname,
      lastname: !!body.lastname ? body.lastname : user.lastname,
      admin: body.admin,
      approved: body.approved,
      blocked: body.blocked
    }

    const updatedUser = await prisma.userhc.update({
      where: {
        email: body.email,
      },
      data: {
        ...userToUpdate
      }
    })
    console.log()
    const {password, ...res} = updatedUser;
    return new Response(JSON.stringify(res));
  } catch {
    const response = new Response(null, {status: 400, statusText: 'BAD REQUEST'});
    return response;
  }
}
