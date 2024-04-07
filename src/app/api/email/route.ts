import {resend } from '@/lib/resend';
import MagicLinkEmail from '@/emails/MagicLinkEmail';

interface RequestBody {
  token: string
  email: string
}
const DOMAIN = process.env.DOMAIN;
const PROTOCOL = process.env.PROTOCOL;

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const url = `${PROTOCOL}://${DOMAIN}/reset/${body.token}`;
  console.log(body)
  try {
    const {data, error} = await resend.emails.send({
      from: 'noreply@animalcrossingwtc.com',
      to: [body.email],
      subject: `Reset password for ${DOMAIN}`,
      react: MagicLinkEmail({ host: DOMAIN, url }),
    });

    console.log(data)
    console.log(error)
    if (error) {
      throw new Error();
    }

    return new Response(JSON.stringify(true))
  } catch (err) {
    const response = new Response(null, {status: 400, statusText: 'Failed to send email'});
    return response;
  }
}