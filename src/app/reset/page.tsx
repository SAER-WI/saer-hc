'use client';
import withSnackbar from '@/components/withSnackbar';
import { TextField, Button, LinearProgress } from '@mui/material';
import React, { useRef, useState } from 'react';

interface props {
  showSnackbar: any;
}

const Page = ({ showSnackbar }: props) => {
  const email = useRef('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`/api/user/${email.current}`);
    if (response.status != 200) {
      setError(response.statusText);
    }
    const user = await response.json();
    const data = {
      userId: user.id,
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const tokenResponse = await fetch('/api/resetpassword', options);
    const resetToken = await tokenResponse.json();

    const emailData = {
      token: resetToken.token,
      email: user.email,
    };

    const emailOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData),
    };

    const emailResponse = await fetch('/api/email', emailOptions);

    if (emailResponse.status === 200) {
      showSnackbar(
        'Email sent. Please check your email for instructions',
        'success'
      );
    } else {
      showSnackbar('Failed to send email', 'error');
    }
    setLoading(false);
  };
  return (
    <div>
      {loading ? <LinearProgress /> : <div className="w-full h-[4px]"></div>}
      <form onSubmit={handleSubmit}>
        <div className="md:w-4/6 w-5/6 mx-auto my-10 flex flex-col md:flex-row">
          <div className="md:w-3/6">
            <h2 className="mb-4">Reset Password</h2>
            <h5 className="mb-8">
              Enter your email address to get instructions for resetting your
              password
            </h5>
          </div>
          <div className="md:w-3/6 flex flex-col">
            <div className="mt-2 mb-8">
              <TextField
                variant="filled"
                label="Email"
                fullWidth
                error={!!error.length}
                onChange={({ target }) => {
                  email.current = target.value;
                  if (target.value.length > 0) {
                    setDisabled(false);
                  } else {
                    setDisabled(true);
                  }
                }}
                helperText={error}
              />
              {!error.length ? <div className="h-[23px] w-full"></div> : null}
            </div>
            <div className="flex flex-row justify-between">
              <Button href="/" color="error">
                Cancel
              </Button>

              <Button variant="contained" type="submit" disabled={disabled}>
                Reset password
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withSnackbar(Page);
