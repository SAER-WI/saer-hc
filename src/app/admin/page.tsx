'use client';
import UsersTable from '@/components/UsersTable';
import {
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { Archivo_Black } from 'next/font/google';
import withSnackbar from '@/components/withSnackbar';

const archivo = Archivo_Black({ subsets: ['latin'], weight: ['400'] });

interface props {
  showSnackbar: any;
}

interface User {
  firstname: string;
  lastname: string;
  email: string;
  admin: boolean;
}

const Page = ({ showSnackbar }: props) => {
  const [users, setUsers] = useState<User[]>([]);
  const { data: session, status } = useSession();
  const [admin, setAdmin] = useState<string>('false');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      admin: admin === 'true' ? true : false,
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: session!.user.accessToken,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(`/api/user/${email}`, options);

    if (response.status === 200) {
      showSnackbar(`${email}'s admin status set to ${admin}`, 'success');
    } else {
      showSnackbar(`Failed to updated ${email}'s admin status`, 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: session!.user.accessToken,
        },
      };
      const response = await fetch('/api/user', options);
      const result = await response.json();
      setUsers(result.filter((user: User) => !user.admin));
      setLoading(false);
    };
    loadUsers();
  }, [session]);

  if (status === 'unauthenticated') {
    return (
      <div className={archivo.className}>
        <h2 className="text-center mt-3">
          You must be an administrator to visit this page
        </h2>
      </div>
    );
  } else if (status === 'loading') {
    return <LinearProgress />;
  } else {
    return (
      <>
        {loading ? <LinearProgress /> : <div className="w-full h-[4px]"></div>}
        <div className="md:flex md:flex-row">
          <div className="md:w-4/6 md:mt-5">
            {users.length ? <UsersTable users={users} /> : null}
          </div>
          <div className="md:w-2/6 m-3 md:mt-5 md:mr-3">
            <form onSubmit={handleSubmit}>
              <h3 className={archivo.className + ' md:mt-0 mt-5 mb-2'}>
                Edit user
              </h3>
              <TextField
                variant="filled"
                fullWidth
                onChange={({ target }) => setEmail(target.value)}
                value={email}
                label="Email"
              />
              <div className="h-[15px]"></div>
              <FormControl variant="filled" fullWidth>
                <InputLabel>Admin</InputLabel>
                <Select
                  value={admin}
                  label="Admin"
                  onChange={({ target }) => setAdmin(target.value)}
                >
                  <MenuItem value={'false'}>False</MenuItem>
                  <MenuItem value={'true'}>True</MenuItem>
                </Select>
              </FormControl>

              <div className="mt-3">
                <Button
                  variant="contained"
                  type="submit"
                  disabled={email.length === 0}
                >
                  Update user
                </Button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default withSnackbar(Page);
