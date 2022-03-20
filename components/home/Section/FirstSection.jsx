import NextLink from 'next/link';
import {
  Flex,
  Image as ChakraImage,
  Text,
  Button,
  chakra,
  Input,
} from '@chakra-ui/react';
import Images from '../../../assets/images';
import { motion } from 'framer-motion';

// integrate Chakra Flex with framer motion
const MotionFlex = motion(Flex);

const FirstSection = () => {
  return (
    <Flex
      // bg="#031e49"
      as="section"
      p={0}
      maxW="full"
      w="100vw"
      h="100vh"
      style={{
        '-moz-user-select': 'none',
        '-khtml-user-select': 'none',
        '-webkit-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
      }}
    >
      {/* First section: left image container */}
      <LeftPart />
      {/* First section: right textual content */}
      <RightPart />
    </Flex>
  );
};

const LeftPart = () => (
  <MotionFlex
    flex="1"
    flexDir="column"
    align="flex-end"
    justify="flex-end"
    pr="1.5rem"
    pb="2.25rem"
    initial={{ x: -500, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{
      duration: 1,
    }}
  >
    <ChakraImage
      src={Images.LeaningBusinessMan.src}
      alt="Leaning business man"
      w="425px"
    />
  </MotionFlex>
);

const RightPart = () => (
  <MotionFlex
    flex="1.5"
    flexDir="column"
    justify="flex-end"
    pl="1rem"
    pr="5rem"
    initial={{ x: 500, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{
      duration: 1,
    }}
  >
    {/* Main title */}
    <Text
      fontSize="5.75rem"
      fontWeight="bold"
      lineHeight="8rem"
      // style={{
      //   textShadow: '4px 2px 2px #eb0546',
      // }}
    >
      Great{' '}
      <chakra.span
        transition="all 0.2s linear"
        _hover={{
          color: '#4599fe',
          textDecoration: 'underline',
          textDecorationStyle: 'wavy',
          textUnderlineOffset: '1rem',
        }}
      >
        teamwork
      </chakra.span>{' '}
      Great product
    </Text>

    {/* Secondary title */}
    <Text fontSize="1.4rem" mt="2rem" color="gray.600">
      We make project management never been so{' '}
      <strong
        style={{
          textDecoration: 'underline',
          textUnderlineOffset: '0.5rem',
        }}
      >
        SIMPLE
      </strong>
      {' and '}
      <strong
        style={{
          textDecoration: 'underline',
          textUnderlineOffset: '0.5rem',
        }}
      >
        EASY
      </strong>
      !
    </Text>

    {/* Register part */}
    <Flex align="center" justify="flex-start" mt="3rem" gap="1rem" pr="4rem">
      <Input
        variant="outline"
        placeholder="Your lovely email"
        py="1.75rem"
        px="2rem"
        htmlSize={30}
        width="auto"
        fontSize="1rem"
        _placeholder={{
          opacity: 1,
          color: 'gray.500',
          fontSize: '1rem',
        }}
        focusBorderColor="#4599fe"
      />

      <Button
        py="1.75rem"
        w="12rem"
        bg="#eb0546"
        color="#fff"
        border="2px solid #eb0546"
        transition="all 0.4s linear"
        _hover={{
          backgroundColor: '#fff',
          color: '#eb0546',
          border: '2px solid #eb0546',
          shadow: '0 5px 5px 2px #eb0546',
        }}
      >
        <NextLink href="/" passHref>
          <Text fontSize="1rem">Register Now</Text>
        </NextLink>
      </Button>
    </Flex>

    {/* Minor product owner description */}
    <Flex
      align="center"
      mt="10rem"
      mb="1.5rem"
      borderTop="0.5px solid #d1d2d4"
      justify="center"
    >
      <Text color="gray.400">A product of</Text>
      <ChakraImage
        src={Images.RmitSponsorLogo.src}
        alt="RMIT sponsor logo"
        w="60px"
      />
      <Text
        fontSize="1rem"
        color="#d1d2d4"
        fontStyle="italic"
        fontWeight="bold"
      >
        RMIT University SGS Engineering Students
      </Text>
    </Flex>
  </MotionFlex>
);

export default FirstSection;
