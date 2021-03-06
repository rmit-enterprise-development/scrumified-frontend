import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  Flex,
  chakra,
  IconButton,
  Button,
  Switch,
  Text,
  Image,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Images from '../../../assets/images';
import { motion } from 'framer-motion';

const AboveMedium = ({
  isOpen,
  onToggle,
  initNavBg,
  colorMode,
  toggleColorMode,
  setIsSigningIn,
  setIsRegistering,
}) => {
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

  const handleSectionClick = (e) => {
    e.preventDefault();
    const targetHref = e.target.hash;
    const location = document.querySelector(targetHref).offsetTop;
    const offsetFinal = targetHref === '#features' ? 120 : 64;
    window.scrollTo({
      left: 0,
      top: location - offsetFinal,
    });
  };

  return (
    <Flex
      zIndex={200}
      position="fixed"
      display={isOpen ? 'none' : 'flex'}
      top="0"
      align="center"
      px={{ base: '1rem', md: '2rem', lg: '5rem' }}
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
        gap="3rem"
        mx={{ md: '2rem', lg: '1rem' }}
      >
        <chakra.a
          href="#home"
          onClick={handleSectionClick}
          style={{ transition: 'all 0.5s' }}
          cursor="pointer"
          color={useColorModeValue('gray.500', '#fff')}
          _hover={{
            color: '#eb0546',
            textDecoration: 'underline',
            textDecorationStyle: 'wavy',
            textUnderlineOffset: '8px',
            textDecorationThickness: '1.5px',
          }}
          aria-label="Home"
          fontSize="md"
          w="100%"
        >
          Home
        </chakra.a>

        <chakra.a
          href="#features"
          onClick={handleSectionClick}
          style={{ transition: 'all 0.5s' }}
          cursor="pointer"
          color={useColorModeValue('gray.500', '#fff')}
          _hover={{
            color: '#eb0546',
            textDecoration: 'underline',
            textDecorationStyle: 'wavy',
            textUnderlineOffset: '8px',
            textDecorationThickness: '1.5px',
          }}
          aria-label="Features"
          fontSize="md"
          w="100%"
        >
          Features
        </chakra.a>

        <chakra.a
          target="_blank"
          href="https://www.youtube.com/watch?v=SbXFLn_g1xU"
          style={{ transition: 'all 0.5s' }}
          cursor="pointer"
          color={useColorModeValue('gray.500', '#fff')}
          _hover={{
            color: '#eb0546',
            textDecoration: 'underline',
            textDecorationStyle: 'wavy',
            textUnderlineOffset: '8px',
            textDecorationThickness: '1.5px',
          }}
          aria-label="Tutorial"
          fontSize="md"
          w="100%"
        >
          Tutorial
        </chakra.a>
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

      <Button
        onClick={() => {
          setIsRegistering(false);
          setIsSigningIn(true);
        }}
        as="button"
        display={{ base: 'none', md: 'flex' }}
        justify={{ lg: 'center' }}
        align={{ lg: 'center' }}
        py="1.5rem"
        minW={{ md: '6rem', lg: '7rem' }}
        ml="2rem"
        bg="none"
        color={useColorModeValue('#eb0546', '#fff')}
        border="2px solid #eb0546"
        transition="all 0.4s linear"
        _hover={{
          backgroundColor: '#eb0546',
          color: '#fff',
          border: '2px solid #eb0546',
          shadow: '7px 7px 0 0 #4599fe',
        }}
      >
        <Text fontSize={{ base: '0.75rem', lg: '1rem' }}>Sign In</Text>
      </Button>

      {/* Open mobile menu icon */}
      <IconButton
        aria-label="Open Menu"
        fontSize="md"
        ml={6}
        icon={<HamburgerIcon w="30px" h="30px" color="#4599fe" />}
        bg="none"
        _hover={{ backgroundColor: 'none' }}
        onClick={onToggle}
        display={['flex', 'flex', 'none', 'none']}
      />
    </Flex>
  );
};

export default AboveMedium;
