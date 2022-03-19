import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  Flex,
  Center,
  IconButton,
  Switch,
  Text,
  Image,
  Spacer,
  SlideFade,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Images from '../../assets/images';
import { motion } from 'framer-motion';

const NavBar = () => {
  // keep track of app's color mode
  const { colorMode, toggleColorMode } = useColorMode();

  // keep track of opening state of Mobile Menu
  const { isOpen, onToggle } = useDisclosure();

  // keep track of initial background color of nav bar
  let initNavBg =
    colorMode === 'light' ? 'rgba(255, 255, 255' : 'rgba(3, 30, 73';

  // use state hooks to kepp track nav bar state on events
  const [navbarBg, setNavbarBg] = useState(`${initNavBg}, 1)`);
  const [navbarFilter, setNavbarFilter] = useState('');
  const [navbarPy, setNavbarPy] = useState(6);
  const [navbarShadow, setNavbarShadow] = useState('');

  // execute changes on events
  useEffect(() => {
    setNavbarBg(`${initNavBg}, 1)`);

    const handleScroll = () => {
      // change style depending on scroll position
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

    // attach listener to window
    window.addEventListener('scroll', handleScroll);

    // clean listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initNavBg]);

  // render()
  return (
    <Flex>
      {/* Nav bar content for Middle and Large screens */}
      <Flex
        zIndex={200}
        position="fixed"
        display={isOpen ? 'none' : 'flex'}
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
        {/* Logo and Logo text */}
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

        {/* Nav content */}
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

        {/* Color mode switch */}
        <Switch
          isChecked={colorMode === 'dark'}
          onChange={() => {
            toggleColorMode();
          }}
          colorScheme="green"
          size="lg"
        />

        {/* Open mobile menu icon */}
        <IconButton
          aria-label="Open Menu"
          ml={6}
          icon={<HamburgerIcon w="30px" h="30px" color="#4599fe" />}
          bg="none"
          _hover={{ backgroundColor: 'none' }}
          onClick={onToggle}
          display={['flex', 'flex', 'none', 'none']}
        />
      </Flex>

      {/* Nav bar content for Small screens */}
      <SlideFade in={isOpen} offsetY="-10px" style={{ transition: 'all 0.2s' }}>
        <Flex
          w="100vw"
          bgColor={`${initNavBg}, 1)`}
          zIndex={201}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          style={{}}
          overflowY="hidden"
          flexDir="column"
        >
          {/* Close Mobile Menu icon */}
          <Flex justify="flex-end">
            <IconButton
              mt={5}
              mr={5}
              aria-label="Open Menu"
              size="lg"
              bg="none"
              _hover={{ backgroundColor: 'none' }}
              onClick={onToggle}
              icon={<CloseIcon color="#4599fe" _hover={{ color: '#eb0546' }} />}
            />
          </Flex>

          {/* Nav content */}
          <Flex flexDir="column" align="center" mt={5} gap={8}>
            <NextLink href="/" passHref>
              <Center
                h="60px"
                w="90%"
                bg="gray.100"
                borderRadius="10px"
                cursor="pointer"
              >
                <Text
                  style={{ transition: 'all 0.5s' }}
                  color="gray.500"
                  _hover={{
                    color: '#eb0546',
                    textDecoration: 'underline',
                    textDecorationStyle: 'wavy',
                    textUnderlineOffset: '8px',
                    textDecorationThickness: '1.5px',
                  }}
                  aria-label="Home"
                >
                  Home
                </Text>
              </Center>
            </NextLink>

            <NextLink href="/" passHref>
              <Center
                h="60px"
                w="90%"
                bg="gray.100"
                borderRadius="10px"
                cursor="pointer"
              >
                <Text
                  style={{ transition: 'all 0.5s' }}
                  color="gray.500"
                  _hover={{
                    color: '#eb0546',
                    textDecoration: 'underline',
                    textDecorationStyle: 'wavy',
                    textUnderlineOffset: '8px',
                    textDecorationThickness: '1.5px',
                  }}
                  aria-label="Features"
                >
                  Features
                </Text>
              </Center>
            </NextLink>

            <NextLink href="/" passHref>
              <Center
                h="60px"
                w="90%"
                bg="gray.100"
                borderRadius="10px"
                cursor="pointer"
              >
                <Text
                  style={{ transition: 'all 0.5s' }}
                  color="gray.500"
                  _hover={{
                    color: '#eb0546',
                    textDecoration: 'underline',
                    textDecorationStyle: 'wavy',
                    textUnderlineOffset: '8px',
                    textDecorationThickness: '1.5px',
                  }}
                  aria-label="Instructions"
                >
                  Instructions
                </Text>
              </Center>
            </NextLink>

            <NextLink href="/" passHref>
              <Center
                h="60px"
                w="90%"
                bg="gray.100"
                borderRadius="10px"
                cursor="pointer"
              >
                <Text
                  style={{ transition: 'all 0.5s' }}
                  color="gray.500"
                  _hover={{
                    color: '#eb0546',
                    textDecoration: 'underline',
                    textDecorationStyle: 'wavy',
                    textUnderlineOffset: '8px',
                    textDecorationThickness: '1.5px',
                  }}
                  aria-label="Testinomial"
                >
                  Testinomial
                </Text>
              </Center>
            </NextLink>
          </Flex>
        </Flex>
      </SlideFade>
    </Flex>
  );
};

export default NavBar;
