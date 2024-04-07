'use client';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import React, {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { Archivo_Black, Manrope } from 'next/font/google';
import SuccessCheck from '@/components/SuccessCheck';
import FailedCheck from '@/components/FailedCheck';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { usePathname } from 'next/navigation';

const manrope = Manrope({ subsets: ['latin'] });

interface props {
  handleChange: ChangeEventHandler;
  handleConfirmChange: ChangeEventHandler;
  handleSubmit: FormEventHandler;
  upperCheck: boolean;
  matchCheck: boolean;
  numberCheck: boolean;
  specialCheck: boolean;
  setStep?: Dispatch<SetStateAction<number>>;
}

const PasswordConfirm = ({
  handleSubmit,
  handleConfirmChange,
  handleChange,
  upperCheck,
  matchCheck,
  numberCheck,
  specialCheck,
  setStep,
}: props) => {
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  let submitControls;

  switch (pathname) {
    case '/register':
      submitControls = (
        <div className="flex flex-row justify-between">
          <Button onClick={() => setStep!((prevStep) => prevStep - 1)}>
            Back
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={
              !matchCheck || !specialCheck || !numberCheck || !upperCheck
            }
          >
            Create account
          </Button>
        </div>
      );
      break;
    default:
      submitControls = (
        <div className="my-2 mx-auto flex w-full justify-end">
          <Button
            type="submit"
            variant="contained"
            disabled={
              !matchCheck || !specialCheck || !numberCheck || !upperCheck
            }
          >
            Reset Password
          </Button>
        </div>
      );
      break;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="md:w-4/6 w-5/6 mx-auto my-10 flex flex-col md:flex-row">
          <div className={manrope.className + ' m-3 md:w-3/6'}>
            <h3 className="text-center">
              Choose a new password that meets the following requirements:
            </h3>
            <div className="flex flex-row">
              <div className="w-[18px] mt-1">
                {upperCheck ? <SuccessCheck /> : <FailedCheck />}
              </div>
              <p className="test-sm ml-2">
                Password must include one Uppercase letter
              </p>
            </div>
            <div className="flex flex-row">
              <div className="w-[18px] mt-1">
                {numberCheck ? <SuccessCheck /> : <FailedCheck />}
              </div>
              <p className="test-sm ml-2">
                Password must include at least one number
              </p>
            </div>
            <div className="flex flex-row">
              <div className="w-[18px] mt-1">
                {specialCheck ? <SuccessCheck /> : <FailedCheck />}
              </div>
              <p className="test-sm ml-2">
                {
                  'Password must include a minimum of 1 special character: ~`!@#$%^&*()-_+={}[]|;:"<>,./?'
                }
              </p>
            </div>
            <div className="flex flex-row">
              <div className="w-[18px] mt-1">
                {matchCheck ? <SuccessCheck /> : <FailedCheck />}
              </div>
              <p className="test-sm ml-2">Passwords must match</p>
            </div>
          </div>
          <div className="flex flex-col m-3 md:w-3/6">
            <div className="my-2">
              <TextField
                variant="filled"
                label="Password"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
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
            </div>
            <div className="my-2">
              <TextField
                variant="filled"
                label="Confirm Password"
                type={showPasswordConfirm ? 'text' : 'password'}
                onChange={handleConfirmChange}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConfirm}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPasswordConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            {submitControls}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordConfirm;
