import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider';
import { authOptions } from './api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Healthy Conversations',
  description: 'Healthy Conversations',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <title>Healthy Conversations</title>
      <body className={inter.className}>
        <Providers>
          <SessionProvider session={session}>
            <Navbar />
            {children}
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
