'use client';
import {
  Button,
  TextField,
  Alert,
  Slide,
  Snackbar,
  LinearProgress,
} from '@mui/material';
import { signIn } from 'next-auth/react';
import React, {
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import Email from './Email';
import Password from './Password';
import { useRouter } from 'next/navigation';
import Name from './Name';
import PasswordConfirm from './PasswordConfirm';
import withSnackbar from './withSnackbar';

function containsSpecialCharacter(input: string): boolean {
  const pattern = /[~`!@#$%^&*()\-_+={}[\]\\|;:"<>,./?]/;
  return pattern.test(input);
}
function containsUppercase(input: string): boolean {
  const pattern = /[A-Z]/;
  return pattern.test(input);
}

function containsNumber(input: string): boolean {
  const pattern = /[0-9]/;
  return pattern.test(input);
}

function passwordsMatch(input: string, inputTwo: string): boolean {
  return input === inputTwo;
}

function validateEmail(email: string) {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
  showSnackbar: any;
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

const Register = (props: Props) => {
  const password = useRef('');
  const passwordConfirm = useRef('');
  const firstname = useRef('');
  const lastname = useRef('');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [nameDisabled, setNameDisabled] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [step, setStep] = useState(0);
  const [matchCheck, setMatchCheck] = useState(false);
  const [upperCheck, setUpperCheck] = useState(false);
  const [specialCheck, setSpecialCheck] = useState(false);
  const [numberCheck, setNumberCheck] = useState(false);

  const passwordValidation = (pw: string) => {
    setSpecialCheck(containsSpecialCharacter(pw));
    setUpperCheck(containsUppercase(pw));
    setNumberCheck(containsNumber(pw));
    setMatchCheck(passwordsMatch(password.current, passwordConfirm.current));
  };

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    password.current = value;
    passwordValidation(value);
  };

  const handleConfirmChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    passwordConfirm.current = value;
    passwordValidation(value);
  };
  const onEmailChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(value);

    if (value.length === 0 || !validateEmail(value)) {
      if (!validateEmail(value)) {
        setEmailError('Please enter a valid email address');
      }
      setEmailDisabled(true);
    } else {
      if (validateEmail(value)) {
        setEmailError('');
      }
      setEmailDisabled(false);
    }
  };

  const onFirstnameChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    firstname.current = value;
    if (firstname.current.length === 0 || lastname.current.length === 0) {
      setNameDisabled(true);
    } else {
      setNameDisabled(false);
    }
  };

  const onLastnameChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    lastname.current = value;
    if (firstname.current.length === 0 || lastname.current.length === 0) {
      setNameDisabled(true);
    } else {
      setNameDisabled(false);
    }
  };

  const onEmailSubmit: FormEventHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
      setEmailError('That email is taken.');
    } else {
      setStep((prevStep) => prevStep + 1);
    }
    setLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email: email,
      password: password.current,
      firstname: firstname.current,
      lastname: lastname.current,
    };

    const options = {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch('/api/user', options);

    if (response?.status === 200) {
      router.push('/signIn');
    } else {
      props.showSnackbar('Failed to create an account', 'error');
    }
    setLoading(false);
  };

  let content;

  switch (step) {
    case 0:
      content = (
        <Email
          disabled={emailDisabled}
          error={emailError}
          onEmailChange={onEmailChange}
          onEmailSubmit={onEmailSubmit}
          email={email}
        />
      );
      break;
    case 1:
      content = (
        <Name
          disabled={nameDisabled}
          onFirstnameChange={onFirstnameChange}
          onLastnameChange={onLastnameChange}
          setStep={setStep}
        />
      );
      break;
    case 2:
      content = (
        <PasswordConfirm
          handleChange={handleChange}
          handleSubmit={handlePasswordSubmit}
          handleConfirmChange={handleConfirmChange}
          specialCheck={specialCheck}
          matchCheck={matchCheck}
          upperCheck={upperCheck}
          numberCheck={numberCheck}
        />
      );
  }

  return (
    <>
      {loading ? <LinearProgress /> : <div className="w-full h-[4px]"></div>}
      {content}
    </>
  );
};

export default withSnackbar(Register);
