import Login from '@/components/Login';
import React from 'react';

type Props = {
  searchParams?: Record<'callbackUrl' | 'error', string>;
};

const page = (props: Props) => {
  return (
    <div>
      <Login
        error={props.searchParams?.error}
        callbackUrl={props.searchParams?.callbackUrl}
      />
    </div>
  );
};

export default page;
