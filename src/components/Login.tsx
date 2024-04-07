'use client';
import { LinearProgress } from '@mui/material';
import { signIn } from 'next-auth/react';
import React, { FormEventHandler, useRef, useState } from 'react';
import Email from './Email';
import Password from './Password';
import { useRouter } from 'next/navigation';

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  admin: boolean;
}

const initialUser: User = {
  id: 0,
  firstname: '',
  lastname: '',
  email: '',
  admin: false,
};

const Login = (props: Props) => {
  const password = useRef('');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const [emailEntered, setEmailEntered] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [user, setUser] = useState(initialUser);
  const onEmailChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(value);
    if (value.length === 0) {
      setEmailDisabled(true);
    } else {
      setEmailDisabled(false);
    }
  };

  const onPasswordChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    password.current = value;
    if (password.current.length === 0) {
      setPasswordDisabled(true);
    } else {
      setPasswordDisabled(false);
    }
  };

  const onEmailSubmit: FormEventHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
      const user: User = await response.json();
      setUser(user);
      setEmailEntered(true);
    } else {
      setEmailError(response.statusText);
    }
    setLoading(false);
  };
  const onPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const response = await signIn('credentials', {
      username: email,
      password: password.current,
      redirect: false,
    });

    if (response?.status === 200) {
      router.push(props.callbackUrl ?? '/');
    } else if (response?.status === 401) {
      setPasswordError('Password incorrect');
    } else {
      if (props.error !== undefined) {
        setPasswordError(props.error!);
      } else {
        setPasswordError('An error occurred');
      }
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? <LinearProgress /> : <div className="w-full h-[4px]"></div>}
      {emailEntered && user?.id > 0 ? (
        <Password
          error={passwordError}
          firstname={user.firstname}
          onPasswordChange={onPasswordChange}
          onPasswordSubmit={onPasswordSubmit}
          disabled={passwordDisabled}
        />
      ) : (
        <Email
          disabled={emailDisabled}
          error={emailError}
          onEmailChange={onEmailChange}
          onEmailSubmit={onEmailSubmit}
          email={email}
        />
      )}
    </>
  );
};

export default Login;
