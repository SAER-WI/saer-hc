import Login from '@/components/Login';
import Register from '@/components/Register';
import React from 'react';

type Props = {
  searchParams?: Record<'callbackUrl' | 'error', string>;
};

const page = (props: Props) => {
  return (
    <div>
      <Register
        error={props.searchParams?.error}
        callbackUrl={props.searchParams?.callbackUrl}
      />
    </div>
  );
};

export default page;
