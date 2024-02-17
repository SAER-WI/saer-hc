'use client';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React from 'react';

interface User {
  firstname: string;
  lastname: string;
  email: string;
}

interface Props {
  users: User[];
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', maxWidth: 200, flex: 1 },
  { field: 'email', headerName: 'Email', maxWidth: 250, flex: 1 },
];

const UsersTable = (props: Props) => {
  //add a copy to clipboard button
  const rows: GridRowsProp = props.users.map((user, index) => ({
    id: index,
    name: `${user.firstname} ${user.lastname}`,
    email: user.email,
  }));

  return (
    <div className="w-[95%] mx-auto">
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
};

export default UsersTable;
