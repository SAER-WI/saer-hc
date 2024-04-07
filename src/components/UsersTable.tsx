'use client';
import { Button } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React from 'react';
import withSnackbar from './withSnackbar';

interface User {
  firstname: string;
  lastname: string;
  email: string;
}

interface Props {
  users: User[];
  showSnackbar: any;
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', maxWidth: 200, flex: 1 },
  { field: 'email', headerName: 'Email', maxWidth: 250, flex: 1 },
];

const UsersTable = (props: Props) => {
  const rows: GridRowsProp = props.users.map((user, index) => ({
    id: index,
    name: `${user.firstname} ${user.lastname}`,
    email: user.email,
  }));

  return (
    <div className="w-[95%] mx-auto">
      <DataGrid columns={columns} rows={rows} />
      <div className="mt-2">
        <Button
          variant="contained"
          onClick={() => {
            navigator.clipboard.writeText(
              props.users.map((user: any) => user.email).join(', ')
            );
            props.showSnackbar('Emails copied to clipboard', 'info');
          }}
        >
          Copy user emails
        </Button>
      </div>
    </div>
  );
};

export default withSnackbar(UsersTable);
