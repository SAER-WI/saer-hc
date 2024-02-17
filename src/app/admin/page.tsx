'use client';
import Register from '@/components/Register';
import UsersTable from '@/components/UsersTable';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [users, setUsers] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const loadUsers = async () => {
      const response = await fetch('/api/user');
      const result = await response.json();
      setUsers(result);
    };
    loadUsers();
  }, []);
  if (!session?.user.admin) {
    return (
      <div>
        <h2>You must be an administrator to visit this page</h2>
      </div>
    );
  } else {
    return (
      <div className="md:flex md:flex-row">
        <div className="md:w-4/6 md: mt-5">
          <UsersTable users={users} />
        </div>
        <div className="md:w-2/6">
          <Register />
        </div>
      </div>
    );
  }
};

export default Page;
