'use client';
import {
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
} from '@mui/material';
import React, { ChangeEventHandler, useRef, useState } from 'react';
import { Archivo_Black, Manrope } from 'next/font/google';
import SuccessCheck from '@/components/SuccessCheck';
import FailedCheck from '@/components/FailedCheck';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PasswordConfirm from '@/components/PasswordConfirm';
import withSnackbar from '@/components/withSnackbar';
import { useRouter } from 'next/navigation';

const archivo = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const manrope = Manrope({ subsets: ['latin'] });

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

const Page = ({ props, params }: { props: any; params: { token: string } }) => {
  const password = useRef('');
  const passwordConfirm = useRef('');
  const [matchCheck, setMatchCheck] = useState(false);
  const [upperCheck, setUpperCheck] = useState(false);
  const [specialCheck, setSpecialCheck] = useState(false);
  const [numberCheck, setNumberCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      password: password.current,
      token: params.token,
    };

    const options = {
      body: JSON.stringify(data),
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch('/api/resetpassword', options);
    if (response.status === 200) {
      props.showSnackbar('Password successfully reset', 'success');
      setTimeout(() => {
        router.push('/signIn');
      }, 5000);
    } else {
      props.showSnackbar('Failed to reset password', 'error');
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? <LinearProgress /> : <div className="w-full h-[4px]"></div>}
      <PasswordConfirm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleConfirmChange={handleConfirmChange}
        specialCheck={specialCheck}
        matchCheck={matchCheck}
        upperCheck={upperCheck}
        numberCheck={numberCheck}
      />
    </>
  );
};

export default withSnackbar(Page);
