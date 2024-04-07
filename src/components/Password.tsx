import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';

interface props {
  onPasswordChange: ChangeEventHandler;
  onPasswordSubmit: FormEventHandler;
  firstname: string;
  error: string | undefined;
  disabled: boolean;
}

const Password = ({
  firstname,
  onPasswordSubmit,
  onPasswordChange,
  error,
  disabled,
}: props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onPasswordSubmit}>
        <div className="w-5/6 lg:w-[70%] lg:my-20 mx-auto my-10 flex flex-col md:flex-row">
          <div className="md:w-3/6 lg:justify-start">
            <h1 className="mb-8">Hello {firstname}</h1>
          </div>
          <div className="md:w-3/6 flex flex-col lg:justify-end">
            <div className="mt-2 mb-8">
              <TextField
                variant="filled"
                label="Password"
                fullWidth
                error={!!error}
                helperText={error}
                type={showPassword ? 'text' : 'password'}
                onChange={onPasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {!error!.length ? <div className="h-[23px] w-full"></div> : null}
            </div>
            <div className="flex flex-row justify-between">
              <Button href="/reset">Forgot password?</Button>
              <Button variant="contained" type="submit" disabled={disabled}>
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Password;
