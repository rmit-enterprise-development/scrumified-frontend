import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { SidebarContent } from './SidebarContent';

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();

  return (
    <Box
      minH={useBreakpointValue({ base: '0.5rem', md: '100vh' })}
      bg={useColorModeValue('#FFFDFE', '#031E49')}
    >
      <SidebarContent
        onClose={() => onClose}
        toggleColorMode={toggleColorMode}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        bg="#031d46"
      >
        <DrawerContent>
          <SidebarContent toggleColorMode={toggleColorMode} onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <Box>
        {/* mobilenav */}
        <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }}>{children}</Box>
      </Box>
    </Box>
  );
}

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      position="absolute"
      top="-5px"
      right="5px"
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-end"
      {...rest}
    >
      <IconButton
        // variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        color="grey"
        icon={<FiMenu />}
      />
    </Flex>
  );
};
