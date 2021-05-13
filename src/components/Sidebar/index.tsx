import {
  Box,
  Drawer,
  DrawerCloseButton,
  useBreakpointValue,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';

import { useDrawer } from '../../hooks/drawer';

import { SidebarNav } from './SidebarNav';

export function Sidebar() {
  const { isOpen, onClose } = useDrawer();
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidebar) {
    return (
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg="gray.800" p="4">
          <DrawerCloseButton mt="6" onClick={onClose} />
          <DrawerHeader>Navegação</DrawerHeader>
          <DrawerBody>
            <SidebarNav />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  );
}