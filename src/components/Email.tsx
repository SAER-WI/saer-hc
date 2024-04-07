'use client';
import React, { ChangeEventHandler, FormEventHandler } from 'react';
import { Button, TextField } from '@mui/material';
import { usePathname } from 'next/navigation';

interface props {
  onEmailChange: ChangeEventHandler;
  onEmailSubmit: FormEventHandler;
  error: string;
  disabled: boolean;
  email: string;
}

const Email = ({
  error,
  onEmailChange,
  onEmailSubmit,
  disabled,
  email,
}: props) => {
  const pathname = usePathname();
  return (
    <div>
      <form onSubmit={onEmailSubmit}>
        <div className="md:w-4/6 w-5/6 mx-auto my-10 flex flex-col md:flex-row">
          <div className="md:w-3/6">
            <h2 className="mb-4">
              {pathname === '/register' ? 'Create Account' : 'Sign In'}
            </h2>
            <h5 className="mb-8">
              to access all of the content on Healthy Conversations
            </h5>
          </div>
          <div className="md:w-3/6 flex flex-col">
            <div className="mt-2 mb-8">
              <TextField
                variant="filled"
                label="Email"
                fullWidth
                error={!!error.length}
                onChange={onEmailChange}
                helperText={error}
                value={email}
              />
              {!error.length ? <div className="h-[23px] w-full"></div> : null}
            </div>
            <div className="flex flex-row justify-between">
              {pathname === '/register' ? (
                <Button href="/" color="error">
                  Cancel
                </Button>
              ) : (
                <Button href="/register">Create Account</Button>
              )}
              <Button variant="contained" type="submit" disabled={disabled}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Email;
