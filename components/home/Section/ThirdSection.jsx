import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Flex,
  Box,
  Text,
  SimpleGrid,
  Center,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';

const ThirdSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, mirror: true });
  }, []);
  return (
    <Flex
      bg="cyan"
      w="100vw"
      h="100vh"
      direction="column"
      px={{ base: '1rem', md: '2rem' }}
    ></Flex>
  );
};

export default ThirdSection;
