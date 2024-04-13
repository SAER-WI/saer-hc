import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export {default} from 'next-auth/middleware';

const requireAuth: string[] = ['/dashboard', '/admin', '/facilitator']

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  
  if (requireAuth.some(path => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
      secret: process.env.SECRET_KEY
    });
    
    if (!token) {
      const url = new URL('/signIn', request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    
    if (token!.expires as number  < Date.now()) {
      const url = new URL('/signIn', request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/admin') && token.admin !== true) {
      const url = new URL('/', request.url)
      return NextResponse.rewrite(url)
    }
  }
  return res;
}