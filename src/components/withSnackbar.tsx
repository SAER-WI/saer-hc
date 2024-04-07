/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { Alert, AlertColor, Slide, Snackbar } from '@mui/material';

const withSnackbar = (WrappedComponent: any) => {
  return (props: any) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [duration, setDuration] = useState(6000);
    const [severity, setSeverity] = useState<AlertColor>('info');

    const showSnackbar = (
      message: string,
      severity: AlertColor = 'info',
      duration = 6000
    ) => {
      setMessage(message);
      setSeverity(severity);
      setDuration(duration);
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <WrappedComponent {...props} showSnackbar={showSnackbar} />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          autoHideDuration={duration}
          open={open}
          onClose={handleClose}
          TransitionComponent={Slide}
        >
          <Alert variant="filled" onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </>
    );
  };
};

export default withSnackbar;
