'use client';
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItemButton,
  Link,
  ListItemText,
  Button,
} from '@mui/material';
import Logo from '../../public/Banner-HC-Logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import SignInButton from './SignInButton';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <AppBar component="nav" position="relative" color="secondary">
      <Toolbar>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <List component="nav">
            <ListItemButton divider onClick={() => setOpen(false)} href="/">
              <ListItemText primary="Welcome" />
            </ListItemButton>
            <ListItemButton
              divider
              onClick={() => setOpen(false)}
              href="/about"
            >
              <ListItemText primary="About" />
            </ListItemButton>
            <ListItemButton
              divider
              onClick={() => setOpen(false)}
              href="/healthyconversations"
            >
              <ListItemText primary="Healthy Conversations" />
            </ListItemButton>
          </List>
        </Drawer>
        <div className="flex justify-between w-full">
          <Image src={Logo} alt="Banner-HC-Logo" width={125} className="m-1" />
          <IconButton
            onClick={() => setOpen(true)}
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="my-auto md:flex hidden flex-row">
            <div className="mx-2">
              <Button href="/">Welcome</Button>
            </div>
            <div className="mx-2">
              <Button href="/about">About</Button>
            </div>
            <div className="mx-2">
              <Button href="/healthyconversations">
                Healthy Conversations
              </Button>
            </div>
            {/* {session?.user ? ( */}
            <div className="mx-2">
              <Button href="/dashboard">Dashboard</Button>
            </div>
            {/* ) : null} */}

            <div className="mx-2">
              <SignInButton />
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
