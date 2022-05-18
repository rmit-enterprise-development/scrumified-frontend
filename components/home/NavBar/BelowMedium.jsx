import NextLink from 'next/link';
import {
  chakra,
  Flex,
  Center,
  IconButton,
  Text,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const MotionFlex = motion(Flex);

const BelowMedium = ({
  isOpen,
  initNavBg,
  onToggle,
  setIsRegistering,
  setIsSigningIn,
}) => {
  const hidNavControls = useAnimation();

  // methods to handle navbar display
  const openHidNav = async () => {
    await hidNavControls.start({
      display: 'flex',
      transition: {
        duration: 0.1,
      },
    });

    await hidNavControls.start({
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    });
  };

  const handleSectionClick = (e) => {
    e.preventDefault();
    const targetHref = e.target.firstChild.hash || e.target.hash;
    const location = document.querySelector(targetHref).offsetTop;
    const offsetFinal = targetHref === '#features' ? 120 : 64;
    window.scrollTo({
      left: 0,
      top: location - offsetFinal,
    });
    onToggle();
  };

  const closeHidNav = async () => {
    await hidNavControls.start({
      opacity: 0.2,
      transition: {
        duration: 0.4,
      },
    });

    await hidNavControls.start({
      display: 'none',
      transition: {
        duration: 0.1,
      },
    });
  };

  // toggle navbar depending on isIOpen status
  useEffect(() => {
    if (isOpen) openHidNav();
    else closeHidNav();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <MotionFlex
      w="100vw"
      initial={{ display: 'none', opacity: 0.2 }}
      animate={hidNavControls}
      bg={`${initNavBg}, 1)`}
      zIndex={201}
      h="100vh"
      pos="fixed"
      top="0"
      left="0"
      overflowY="hidden"
      flexDir="column"
    >
      {/* Close Mobile Menu icon */}
      <Flex justify="flex-end">
        <IconButton
          mt={5}
          mr={5}
          aria-label="Close Menu"
          fontSize="lg"
          size="lg"
          bg="none"
          _hover={{ backgroundColor: 'none' }}
          onClick={onToggle}
          icon={<CloseIcon color="#4599fe" _hover={{ color: '#eb0546' }} />}
        />
      </Flex>

      {/* Nav content */}
      <Flex flexDir="column" align="center" mt="1rem" gap={8} w="full">
        {/* Page sections */}
        <Center
          h="55px"
          w="90%"
          bg="gray.100"
          borderRadius="40px"
          cursor="pointer"
          onClick={handleSectionClick}
        >
          <chakra.a
            href="#home"
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
            fontSize="lg"
          >
            Home
          </chakra.a>
        </Center>

        <Center
          h="55px"
          w="90%"
          bg="gray.100"
          borderRadius="40px"
          cursor="pointer"
          onClick={handleSectionClick}
        >
          <chakra.a
            href="#features"
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
            fontSize="lg"
          >
            Features
          </chakra.a>
        </Center>

        {/* 'Or' Divider */}
        <Flex h="50px" w="full" align="center" px="5rem">
          <Container
            flex="1"
            p={0}
            h="50%"
            borderTop="2px solid #CBD5E0"
            alignSelf="end"
          />
          <Text mx="10px" color="#718096">
            OR
          </Text>
          <Container
            flex="1"
            p={0}
            h="50%"
            borderTop="2px solid #CBD5E0"
            alignSelf="end"
          />
        </Flex>

        {/* Sign In and Register Buttons */}
        <Flex
          flexDir="column"
          w="full"
          align="center"
          justify="center"
          gap="1.5rem"
        >
          <Center
            onClick={() => {
              setIsSigningIn(true);
              onToggle();
            }}
            h="45px"
            w="50%"
            bg="#eb0546"
            borderRadius="40px"
            cursor="pointer"
          >
            <Text
              fontWeight="bold"
              color="#fff"
              aria-label="Sign in"
              fontSize="md"
            >
              Sign In
            </Text>
          </Center>

          <Center
            onClick={() => {
              setIsRegistering(true);
              onToggle();
            }}
            h="45px"
            w="50%"
            bg="#fff"
            borderRadius="40px"
            cursor="pointer"
            border={useColorModeValue('2px solid #eb0546', '')}
          >
            <Text
              fontWeight="bold"
              color="#eb0546"
              aria-label="Register Now"
              fontSize="md"
            >
              Register Now
            </Text>
          </Center>
        </Flex>
      </Flex>
    </MotionFlex>
  );
};

export default BelowMedium;
