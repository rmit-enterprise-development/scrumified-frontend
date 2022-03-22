import NextLink from 'next/link';
import NextImage from 'next/image';
import {
  Flex,
  Image as ChakraImage,
  Text,
  Button,
  chakra,
  Input,
  Spacer,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Images from '../../../assets/images';
import { motion } from 'framer-motion';

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
      justify="center"
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

  return (
    <MotionFlex
      flexDir="column"
      align="flex-end"
      justify={{ lg: 'center', xlg: 'flex-end' }}
      pr={useColorModeValue('1.5rem', '1.75rem')}
      pb="2.25rem"
      initial={{ x: -500, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          duration: 1,
        },
      }}
    >
      {colorMode === 'dark' ? (
        <ChakraImage
          src={'https://i.imgur.com/711WRvk.png'}
          alt="A standing pair"
          minW={{ lg: '70%', xlg: '70%' }}
          h={{ sm: 0, lg: '50%', xlg: '75%' }}
        />
      ) : (
        <ChakraImage
          src={'https://i.imgur.com/9CWMEmQ.png'}
          alt="Leaning to right business man"
          minW={{ lg: '70%', xlg: '70%' }}
          h={{ sm: 0, lg: '50%', xlg: '75%' }}
        />
      )}
    </MotionFlex>
  );
};

const RightPart = () => (
  <MotionFlex
    flexDir="column"
    justify={{ lg: 'center', xlg: 'flex-end' }}
    pl="1rem"
    initial={{ x: 500, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{
      duration: 1,
    }}
  >
    {/* Main title */}
    <Text
      fontSize={{ lg: '5rem', xlg: '7.5rem' }}
      fontWeight="bold"
      lineHeight={{ lg: '8rem', xlg: '9rem' }}
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
      <Text>Great product</Text>
    </Text>

    {/* Secondary title */}
    <Text
      fontSize="1.4rem"
      mt={{ lg: '2rem', xlg: '3.5rem' }}
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
      mt={{ lg: '10rem', xlg: '18rem' }}
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
