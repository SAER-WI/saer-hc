import NextAuth, { DefaultSession } from "next-auth";

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id:number;
      name:string;
      email:string;
      accessToken:string;
      admin:boolean;
    }
  }
  interface User {
    id:number;
    name:string;
    email:string;
    accessToken:string;
    admin:boolean;
  }
}