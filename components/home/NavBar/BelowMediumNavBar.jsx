import NextLink from 'next/link';
import {
  Flex,
  Center,
  IconButton,
  Text,
  SlideFade,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const BelowMediumNavBar = ({
  isOpen,
  initNavBg,
  onToggle,
  setIsRegistering,
}) => {
  return (
    <SlideFade in={isOpen} display={isOpen ? 'flex' : 'none'}>
      <Flex
        w="100vw"
        display={isOpen ? 'flex' : 'none'}
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
          <NextLink href="/" passHref>
            <Center
              h="55px"
              w="90%"
              bg="gray.100"
              borderRadius="40px"
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
                fontSize="lg"
              >
                Home
              </Text>
            </Center>
          </NextLink>

          <NextLink href="/" passHref>
            <Center
              h="55px"
              w="90%"
              bg="gray.100"
              borderRadius="40px"
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
                fontSize="lg"
              >
                Features
              </Text>
            </Center>
          </NextLink>

          <NextLink href="/" passHref>
            <Center
              h="55px"
              w="90%"
              bg="gray.100"
              borderRadius="40px"
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
                fontSize="lg"
              >
                Instructions
              </Text>
            </Center>
          </NextLink>

          <NextLink href="/" passHref>
            <Center
              h="55px"
              w="90%"
              bg="gray.100"
              borderRadius="40px"
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
                fontSize="lg"
              >
                Testinomial
              </Text>
            </Center>
          </NextLink>

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
            <NextLink href="/" passHref>
              <Center
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
            </NextLink>

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
      </Flex>
    </SlideFade>
  );
};

export default BelowMediumNavBar;
