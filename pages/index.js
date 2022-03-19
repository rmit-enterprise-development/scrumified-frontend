import { useState, useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import NextImage from 'next/image';
import {
  Flex,
  Container,
  Button,
  IconButton,
  Switch,
  useColorMode,
  useColorModeValue,
  Text,
  Image,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Images from '../assets/images';
import { motion } from 'framer-motion';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [display, changeDisplay] = useState('none');

  let initNavBg =
    colorMode === 'light' ? 'rgba(255, 255, 255' : 'rgba(3, 30, 73';

  const [navbarBg, setNavbarBg] = useState(`${initNavBg}, 1)`);
  const [navbarFilter, setNavbarFilter] = useState('');
  const [navbarPy, setNavbarPy] = useState(6);
  const [navbarShadow, setNavbarShadow] = useState('');

  useEffect(() => {
    setNavbarBg(`${initNavBg}, 1)`);

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setNavbarBg(`${initNavBg}, 0.8)`);
        setNavbarFilter('saturate(120%) blur(5px)');
        setNavbarPy(4);
        setNavbarShadow('md');
      } else {
        setNavbarBg(`${initNavBg}, 1)`);
        setNavbarFilter('');
        setNavbarPy(6);
        setNavbarShadow('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initNavBg]);

  return (
    <>
      <Head>
        <title>Home - Scrumified</title>
      </Head>

      {/* Header with Nav Bar */}
      <Flex>
        <Flex
          zIndex={200}
          position="fixed"
          top="0"
          align="center"
          px={[5, 10, 30, 40]}
          py={navbarPy}
          w="full"
          backgroundColor={navbarBg}
          backdropFilter={navbarFilter}
          boxShadow={navbarShadow}
          _hover={{ backgroundColor: `${initNavBg}, 1)` }}
          style={{
            transition: 'all 0.4s linear',
            scrollBehavior: 'smooth',
          }}
        >
          {/* App logo */}
          <Flex align="center" cursor="pointer">
            <NextLink href="/" passHref>
              <motion.div
                style={{ height: '50px', width: '50px' }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  loop: Infinity,
                  ease: 'linear',
                  duration: 6,
                }}
              >
                <Image
                  src={Images.MainLogo.src}
                  alt="Main logo"
                  width="100%"
                  height="100%"
                />
              </motion.div>
            </NextLink>

            <NextLink href="/" passHref>
              <Text
                fontSize={{ base: '2xl', lg: '3xl' }}
                fontWeight="bold"
                color="#4599fe"
                ml={2}
              >
                Scrumified
              </Text>
            </NextLink>
          </Flex>

          <Spacer />

          {/* Desktop display for Nav Bar */}
          <Flex
            display={['none', 'none', 'flex', 'flex']}
            gap={10}
            px={{ md: 4 }}
          >
            <NextLink href="/" passHref>
              <Text
                style={{ transition: 'all 0.5s' }}
                cursor="pointer"
                color="gray.400"
                _hover={{
                  color: '#eb0546',
                  textDecoration: 'underline',
                  textDecorationStyle: 'wavy',
                  textUnderlineOffset: '8px',
                  textDecorationThickness: '1.5px',
                }}
                aria-label="Home"
                w="100%"
              >
                Home
              </Text>
            </NextLink>

            <NextLink href="/" passHref>
              <Text
                style={{ transition: 'all 0.5s' }}
                cursor="pointer"
                color="gray.400"
                _hover={{
                  color: '#eb0546',
                  textDecoration: 'underline',
                  textDecorationStyle: 'wavy',
                  textUnderlineOffset: '8px',
                  textDecorationThickness: '1.5px',
                }}
                aria-label="Features"
                w="100%"
              >
                Features
              </Text>
            </NextLink>

            <NextLink href="/" passHref>
              <Text
                style={{ transition: 'all 0.5s' }}
                cursor="pointer"
                color="gray.400"
                _hover={{
                  color: '#eb0546',
                  textDecoration: 'underline',
                  textDecorationStyle: 'wavy',
                  textUnderlineOffset: '8px',
                  textDecorationThickness: '1.5px',
                }}
                aria-label="Instructions"
                w="100%"
              >
                Instructions
              </Text>
            </NextLink>

            <NextLink href="/" passHref>
              <Text
                style={{ transition: 'all 0.5s' }}
                cursor="pointer"
                color="gray.400"
                _hover={{
                  color: '#eb0546',
                  textDecoration: 'underline',
                  textDecorationStyle: 'wavy',
                  textUnderlineOffset: '8px',
                  textDecorationThickness: '1.5px',
                }}
                aria-label="Testinomials"
                w="100%"
              >
                Testinomials
              </Text>
            </NextLink>
          </Flex>

          <Spacer />

          {/* Switch to change app's color mode */}
          <Switch
            isChecked={colorMode === 'dark'}
            onChange={() => {
              toggleColorMode();
            }}
            colorScheme="green"
            size="lg"
          />

          {/* Open menu for Mobile button */}
          <IconButton
            aria-label="Open Menu"
            size="lg"
            ml={8}
            icon={<HamburgerIcon />}
            onClick={() => changeDisplay('flex')}
            display={['flex', 'flex', 'none', 'none']}
          />
        </Flex>

        {/* Mobile Content */}
        <Flex
          w="100vw"
          display={display}
          bgColor="gray.50"
          zIndex={201}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
        >
          <Flex justify="flex-end">
            <IconButton
              mt={2}
              mr={2}
              aria-label="Open Menu"
              size="lg"
              icon={<CloseIcon />}
              onClick={() => changeDisplay('none')}
            />
          </Flex>

          <Flex flexDir="column" align="center">
            <NextLink href="/" passHref>
              <Button aria-label="Home" my={5} w="100%">
                Home
              </Button>
            </NextLink>

            <NextLink href="/about" passHref>
              <Button as="a" aria-label="About" my={5} w="100%">
                Features
              </Button>
            </NextLink>

            <NextLink href="/contact" passHref>
              <Button as="a" aria-label="Contact" my={5} w="100%">
                Instructions
              </Button>
            </NextLink>

            <NextLink href="/contact" passHref>
              <Button as="a" aria-label="Contact" my={5} w="100%">
                Testinomials
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>

      {/* Main content of Home Page */}
      <Container
        as="main"
        p={0}
        bg="#fff"
        maxW="full"
        w="100vw"
        h="100vh"
      ></Container>

      <Container
        as="main"
        p={0}
        bg="red.500"
        maxW="full"
        w="100vw"
        h="100vh"
      ></Container>
    </>
  );
}
