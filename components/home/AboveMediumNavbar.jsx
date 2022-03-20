import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  Flex,
  IconButton,
  Switch,
  Text,
  Image,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Images from '../../assets/images';
import { motion } from 'framer-motion';

const AboveMediumNavbar = ({
  isOpen,
  onToggle,
  initNavBg,
  colorMode,
  toggleColorMode,
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

  return (
    <Flex
      zIndex={200}
      position="fixed"
      display={isOpen ? 'none' : 'flex'}
      top="0"
      align="center"
      px={['1rem', '2rem', '6rem']}
      py={navbarPy}
      w="full"
      backgroundColor={navbarBg}
      backdropFilter={navbarFilter}
      boxShadow={navbarShadow}
      _hover={{ backgroundColor: `${initNavBg}, 1)` }}
      style={{
        transition: 'all 0.4s linear',
        scrollBehavior: 'smooth',
        '-moz-user-select': 'none',
        '-khtml-user-select': 'none',
        '-webkit-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
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
        gap="3rem"
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
            fontSize="md"
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
            fontSize="md"
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
            fontSize="md"
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
            fontSize="md"
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

export default AboveMediumNavbar;
