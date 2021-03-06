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

const FirstSection = ({
  setIsRegistering,
  setIsSigningIn,
  setTypedEmail,
  typedEmail,
}) => {
  return (
    <Flex
      id="home"
      justify="center"
      transition="all 0.4s linear"
      bg={useColorModeValue('#fff', '#031e49')}
      as="section"
      px="2rem"
      pt={{ base: 0, lg: '4.5rem' }}
      maxW="full"
      w="100vw"
      minH={{ base: '100vh', lg: '115vh' }}
    >
      <LeftPart />

      {/* First section: right textual content */}
      <RightPart
        setIsSigningIn={setIsSigningIn}
        setIsRegistering={setIsRegistering}
        setTypedEmail={setTypedEmail}
        typedEmail={typedEmail}
      />
    </Flex>
  );
};

const LeftPart = () => {
  const { colorMode } = useColorMode();
  const leftPartControls = useAnimation();

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
      display={{ base: 'none', md: 'none', lg: 'flex' }}
      minWidth="40%"
      flexDir="column"
      align="flex-end"
      justify="center"
      pb="2.25rem"
      initial={{ x: -500, opacity: 0 }}
      animate={leftPartControls}
    >
      {colorMode === 'dark' ? (
        <ChakraImage
          src={Images.PairStanding.src}
          alt="A standing pair"
          mr={{ base: 0, md: 0, lg: '2rem', xlg: '2rem' }}
          width={{ base: 0, md: 0, lg: '310px', xlg: '350px' }}
          height={{ base: 0, md: 0, lg: '520px', xlg: '580px' }}
          // priority
        />
      ) : (
        <ChakraImage
          src={Images.LeaningBusinessMan.src}
          alt="Leaning to right business man"
          mr={{ base: 0, md: 0, lg: '1rem', xlg: '2rem' }}
          width={{ base: 0, md: 0, lg: '375px', xlg: '400px' }}
          height={{ base: 0, md: 0, lg: '500px', xlg: '560px' }}
          // priority
        />
      )}
    </MotionFlex>
  );
};

const RightPart = ({
  setIsRegistering,
  setTypedEmail,
  typedEmail,
  setIsSigningIn,
}) => (
  <MotionFlex
    minWidth="50%"
    flexDir="column"
    justify={{ base: 'center' }}
    pl={{ base: 0, md: '1rem' }}
    initial={{ x: 500, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{
      duration: 1,
    }}
    gap={{ base: '6rem', lg: 0 }}
    pt={{ base: '5rem', lg: 0 }}
  >
    <chakra.div>
      {/* Main title */}
      <Text
        fontSize={{
          base: '2rem',
          md: '4.5rem',
          lg: '5rem',
          xlg: '6rem',
        }}
        fontWeight="bold"
        lineHeight={{
          base: '3.5rem',
          md: '5.75rem',
          lg: '6.25rem',
          xlg: '7.75rem',
        }}
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
      </Text>

      <Text
        fontSize={{
          base: '2rem',
          md: '4.5rem',
          lg: '5rem',
          xlg: '6rem',
        }}
        fontWeight="bold"
        lineHeight={{
          base: '3.5rem',
          md: '5.75rem',
          lg: '6.25rem',
          xlg: '7.75rem',
        }}
        color={useColorModeValue('#031e49', 'gray.200')}
      >
        Great product
      </Text>

      {/* Secondary title */}
      <Text
        fontSize={{
          base: '1rem',
          md: '1.25rem',
          lg: '1rem',
          xlg: '1.4rem',
        }}
        mt={{ base: '1rem', md: '2rem' }}
        color={useColorModeValue('gray.600', 'gray.200')}
        lineHeight={{
          base: '2rem',
          md: '2rem',
        }}
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
      <Flex
        align="center"
        justify="flex-start"
        flexDir={{ base: 'column', md: 'row' }}
        mt="3rem"
        gap={{ base: '1.5rem', md: '1rem' }}
        pr={{ base: 0, md: '4rem' }}
      >
        <Input
          value={typedEmail}
          onChange={(e) => {
            setTypedEmail(e.target.value);
          }}
          variant="outline"
          placeholder="Your lovely email"
          py={{ base: '1.25rem', md: '1.75rem' }}
          px="2rem"
          color={useColorModeValue('#2d4046', '#fff')}
          width={{ base: 'full', md: '60%' }}
          fontSize={{ base: '0.75rem', md: '1rem' }}
          _placeholder={{
            opacity: 0.8,
            color: useColorModeValue('gray.600', 'white'),
            fontSize: { base: '0.75rem', md: '1rem' },
          }}
          focusBorderColor="#4599fe"
        />

        <Button
          onClick={() => {
            setIsRegistering(true);
            setIsSigningIn(false);
          }}
          py={{ base: '1.25rem', md: '1.75rem' }}
          w={{ base: '10rem', md: '12rem' }}
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
          <Text fontSize={{ base: '0.75rem', md: '1rem' }}>Register Now</Text>
        </Button>
      </Flex>
    </chakra.div>

    {/* Minor product owner description */}
    <Flex
      align="center"
      mt={{ lg: '6rem', xlg: '8rem' }}
      mb="1.5rem"
      width={{ base: '100%', md: '100%', lg: '100%', xlg: '75%' }}
      borderTop="0.5px solid #d1d2d4"
      justify="center"
    >
      <Text
        color="gray.400"
        display={{ base: 'none', md: 'inline-block' }}
        fontSize={{ base: '0.75rem', md: '1rem' }}
      >
        A product of
      </Text>
      <ChakraImage
        src={Images.RmitSponsorLogo.src}
        alt="RMIT sponsor logo"
        w="60px"
      />
      <Text
        fontSize={{ base: '0.75rem', md: '1rem' }}
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
