import React, { ReactNode } from 'react';
import {
  IconButton,Box,Flex,useColorModeValue,useColorMode,
  Drawer,DrawerContent,Text,useDisclosure,FlexProps,Switch
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { SidebarContent } from './SidebarContent.tsx';

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();    
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box minH="100vh" >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        bg={useColorModeValue('#fffdfe', '#031d46')}
        size='full'>
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Switch
          isChecked={colorMode === 'dark'}
          onChange={() => {
            toggleColorMode();
          }}
          colorScheme="green"
          size="lg"
        />
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('#fffdfe', '#031d46')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Scrumified
      </Text>
    </Flex>
  );
};