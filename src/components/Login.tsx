'use client';
import { Button, TextField, Alert, Slide, Snackbar } from '@mui/material';
import { signIn } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const Login = (props: Props) => {
  const email = useRef('');
  const password = useRef('');
  const [open, setOpen] = useState(!!props.error);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn('credentials', {
      username: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: props.callbackUrl ?? '/',
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div
      className={props.className + ' flex flex-col align-center text-center'}
    >
      {!!props.error && (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          autoHideDuration={6000}
          open={open}
          onClose={handleClose}
          TransitionComponent={Slide}
        >
          <Alert variant="filled" onClose={handleClose} severity="error">
            Incorrect username or password
          </Alert>
        </Snackbar>
      )}
      <form onSubmit={onSubmit} className="flex flex-col my-4">
        <div className="my-2">
          <TextField
            variant="filled"
            label="Email"
            onChange={({ target }) => (email.current = target.value)}
          />
        </div>
        <div className="my-2">
          <TextField
            variant="filled"
            type="password"
            label="Password"
            onChange={({ target }) => (password.current = target.value)}
          />
        </div>

        <div className="flex flex-row mx-auto">
          <div className="m-2">
            <Button variant="contained" type="submit">
              Sign In
            </Button>
          </div>
          <div className="m-2">
            <Button variant="outlined" color="primary" href="/register">
              Register
            </Button>
          </div>
        </div>
        <div>
          <Button color="error" href={props.callbackUrl ?? '/'}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
