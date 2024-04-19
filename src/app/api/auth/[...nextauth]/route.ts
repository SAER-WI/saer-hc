import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id:number;
  name:string;
  email:string;
  accessToken:string;
  admin:boolean;
}

export const authOptions : NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // These are not used anywhere, besides sign in which takes a name argument 
      //to know to use this function to sign in, but the credentials config is not used
      //because a custom login page was created
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // this url needs to be changed once the domain is hooked up
        const res = await fetch("https://studenthealthyconversations/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password
          }),
        });

        const user : User = await res.json();
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
        }
      }
    })
  ],
  jwt: {
    maxAge: 60*60*12
  },
  callbacks: {
    async jwt({token, user}) {
      if (user){
        token.admin = user.admin;
        token.accessToken = user.accessToken;
        token.userId = user.id;
        token.expires = (1000 * 60 * 60 * 12) + Date.now()
      }
      return {...token, ...user};
    },

    async session({session, token, user}) {
      session.user.id = token.userId as number;
      session.user.email = token.email as string;
      session.user.admin = token.admin as boolean;
      session.user.accessToken = token.accessToken as string;
      return session;
    }
  },
  pages:{
    signIn: "/signIn"
  }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}