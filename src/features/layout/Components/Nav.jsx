import { Stack, Box, Link } from '@chakra-ui/react';
import React from 'react';
import NavItems from './NavItems';
import Profile from './Profile';

export default function Nav() {
  const navItems = [{ title: 'Projects', path: '/app/projects' }];
  return (
    <Stack direction="row" justifyContent="space-between" p="4" alignItems="center" boxShadow="md">
      <Stack direction="row" spacing="10" alignItems="center">
        <Box fontWeight="bold">
          Vizsite
        </Box>
        <NavItems navItems={navItems} />
        <Link href="https://www.veed.io/view/b4cbeec8-5ef2-41f1-b568-fc38d4e7fbe0" isExternal fontSize="sm">
          Demo video
        </Link>
      </Stack>
      <Profile />
    </Stack>
  );
}
