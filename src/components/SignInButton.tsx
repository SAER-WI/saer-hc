'use client';

import React from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';
import { Button } from '@mui/material';

const SignInButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <Button onClick={() => signOut()} variant="contained">
        Sign out
      </Button>
    );
  }
  return (
    <Button onClick={() => signIn()} variant="outlined">
      Sign in
    </Button>
  );
};

export default SignInButton;
