import { Flex, useBreakpointValue, IconButton, Icon } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';

import { useDrawer } from '../../hooks/drawer';

import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';

export function Header() {
  const isWideVersion = useBreakpointValue({ base: false, lg: true });
  const { onOpen } = useDrawer();

  return (
    <Flex
      as="header"
      maxWidth={1480}
      w="100%"
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        />
      )}

      <Logo />

      {isWideVersion && <SearchBar />}

      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
