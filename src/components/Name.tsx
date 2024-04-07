import { Button, TextField } from '@mui/material';
import React, { ChangeEventHandler, Dispatch, SetStateAction } from 'react';

interface props {
  onFirstnameChange: ChangeEventHandler;
  onLastnameChange: ChangeEventHandler;
  setStep: Dispatch<SetStateAction<number>>;
  disabled: boolean;
}

const Name = ({
  onFirstnameChange,
  onLastnameChange,
  setStep,
  disabled,
}: props) => {
  return (
    <div>
      <form onSubmit={() => setStep((prevStep) => prevStep + 1)}>
        <div className="w-5/6 lg:w-[70%] lg:my-20 mx-auto my-10 flex flex-col md:flex-row">
          <div className="md:w-3/6 lg:justify-start">
            <h2 className="mb-4">Create account</h2>
            <h5 className="mb-8">Enter your first and last name</h5>
          </div>
          <div className="md:w-3/6 flex flex-col lg:justify-end">
            <div className="mt-2 mb-8">
              <TextField
                variant="filled"
                label="First name"
                fullWidth
                type="text"
                onChange={onFirstnameChange}
              />
            </div>
            <div className="mt-2 mb-8">
              <TextField
                variant="filled"
                label="Last name"
                fullWidth
                type="text"
                onChange={onLastnameChange}
              />
            </div>
            <div className="flex flex-row justify-between">
              <Button onClick={() => setStep((prevStep) => prevStep - 1)}>
                Back
              </Button>
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

export default Name;
