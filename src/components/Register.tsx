'use client';
import {
  Button,
  TextField,
  Alert,
  Slide,
  Snackbar,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const Register = (props: Props) => {
  const router = useRouter();
  const email = useRef('');
  const [password, setPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');
  const firstname = useRef('');
  const lastname = useRef('');
  const [disabled, setDisabled] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [open, setOpen] = useState(!!props.error);
  const { data: session } = useSession();
  console.log(session?.user?.admin);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: email.current,
      firstname: firstname.current,
      lastname: lastname.current,
      password: password,
      admin: admin,
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch('/api/user', options);
      if (session?.user?.admin) {
        //display success message;
      } else {
        router.push('/signIn');
      }
    } catch {
      //need better error handling
      props.error = 'An error occurred';
    }
  };

  useEffect(() => {
    if (
      lastname.current.length === 0 ||
      firstname.current.length === 0 ||
      email.current.length === 0 ||
      password.length === 0 ||
      passwordMatch.length === 0 ||
      passwordMatch != password
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email, firstname, lastname, password, passwordMatch]);

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
            {props.error}
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
            label="First Name"
            onChange={({ target }) => (firstname.current = target.value)}
          />
        </div>
        <div className="my-2">
          <TextField
            variant="filled"
            label="Last Name"
            onChange={({ target }) => (lastname.current = target.value)}
          />
        </div>
        <div className="my-2">
          <TextField
            variant="filled"
            type="password"
            label="Password"
            onChange={({ target }) => setPassword(target.value)}
            error={password === passwordMatch ? false : true}
          />
        </div>
        <div className="my-2">
          <TextField
            variant="filled"
            type="password"
            label="Password"
            onChange={({ target }) => setPasswordMatch(target.value)}
            error={password === passwordMatch ? false : true}
          />
        </div>
        {session?.user?.admin ? (
          <div className="my-2">
            <FormControl variant="filled" className="w-[208px]">
              <InputLabel>Admin</InputLabel>
              <Select
                label="Admin"
                onChange={({ target }) => {
                  target.value === 0 ? setAdmin(false) : setAdmin(true);
                }}
              >
                <MenuItem value={0}>False</MenuItem>
                <MenuItem value={1}>True</MenuItem>
              </Select>
            </FormControl>
          </div>
        ) : null}
        <div className="flex flex-row mx-auto">
          <div className="m-2">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={disabled}
            >
              Register
            </Button>
          </div>
        </div>
        {session?.user.admin ? null : (
          <div>
            <Button color="error" href={props.callbackUrl ?? '/'}>
              Cancel
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
