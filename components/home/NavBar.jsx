import NextImage from 'next/image';
import NextLink from 'next/link';

import { Flex, Text, Button, Link } from '@chakra-ui/react';
import DarkModeSwitch from '../DarkModeSwitch';
import ImageResrouces from '../../assets/images';
import { HamburgerIcon } from '@chakra-ui/icons';

const NavBar = ({ navContent, getStartedTextColor, colorMode }) => {
  return (
    <Flex
      style={{ position: 'sticky', top: 0 }}
      alignItems="center"
      justifyContent="space-between"
      bg="white" // ! TEMPORARY FOR TESTING
      px={5}
      py={3}
      borderBottom="1px"
      borderColor="gray.200"
    >
      {/* logo */}
      <NextLink href="/" passHref>
        <Link
          _focus={{ border: 'none' }}
          _hover={{
            color: '#4599fe',
          }}
          style={{ textDecoration: 'none' }}
        >
          <Flex alignItems="center">
            <NextImage
              src={ImageResrouces.MainLogo}
              alt="App main logo"
              width="50%"
              height="50%"
            />

            <Text
              fontSize={['xl', '2xl', '3xl']}
              fontWeight="bold"
              color="#031e49"
            >
              Scrumified
            </Text>
          </Flex>
        </Link>
      </NextLink>

      {/* nav content */}
      <Flex alignItems="center" gap="12" display={{ base: 'none', md: 'flex' }}>
        {navContent.map((textContent) => (
          <Link
            key={textContent}
            _hover={{
              color: '#4599fe',
            }}
            style={{ textDecoration: 'none' }}
            color="gray.600"
          >
            <Text fontSize="sm">{textContent}</Text>
          </Link>
        ))}
      </Flex>

      {/* buttons */}
      <Flex alignItems="center" gap="5">
        <DarkModeSwitch />

        <Button px={6} bg={colorMode === 'dark' ? 'gray.200' : 'gray'}>
          <Text fontSize="sm" color={getStartedTextColor}>
            GET STARTED
          </Text>
        </Button>

        <HamburgerIcon
          color="black"
          display={{ base: 'block', md: 'none' }}
          w={[6, 8, 0]}
          h={[6, 8, 0]}
        ></HamburgerIcon>
      </Flex>
    </Flex>
  );
};

export default NavBar;
