import NextLink from 'next/link';
import NextImage from 'next/image';
import {
  Flex,
  Image as ChakraImage,
  Text,
  Button,
  chakra,
  Input,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Images from '../../../assets/images';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

// integrate Chakra Flex with framer motion
const MotionFlex = motion(Flex);

const FirstSection = () => {
  return (
    <Flex
      transition="all 0.4s linear"
      bg={useColorModeValue('#fff', '#031e49')}
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

const LeftPart = () => {
  const { colorMode } = useColorMode();
  const leftPartControls = useAnimation();
  const mainImageWidth = useColorModeValue('475px', '380px');

  useEffect(() => {
    leftPartControls.start({
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
      },
    });
  });

  return (
    <MotionFlex
      flex="1"
      flexDir="column"
      align="flex-end"
      justify="flex-end"
      pr={useColorModeValue('1.5rem', '1.75rem')}
      pb="2.25rem"
      initial={{ x: -500, opacity: 0 }}
      animate={leftPartControls}
    >
      {colorMode === 'dark' ? (
        <NextImage
          src={Images.PairStanding.src}
          alt="A standing pair"
          width={mainImageWidth}
          height="600px"
          priority
        />
      ) : (
        <NextImage
          src={Images.LeaningBusinessMan.src}
          alt="Leaning to right business man"
          width={mainImageWidth}
          height="600px"
          priority
        />
      )}
    </MotionFlex>
  );
};

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
      color={useColorModeValue('#031e49', 'gray.200')}
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
    <Text
      fontSize="1.4rem"
      mt="2rem"
      color={useColorModeValue('gray.600', 'gray.200')}
    >
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
        color={useColorModeValue('#2d4046', '#fff')}
        width="auto"
        fontSize="1rem"
        _placeholder={{
          opacity: 0.6,
          color: useColorModeValue('gray.600', 'gray.200'),
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
