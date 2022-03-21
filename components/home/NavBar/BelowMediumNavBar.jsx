import NextLink from 'next/link';
import {
  Flex,
  Center,
  IconButton,
  Text,
  SlideFade,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const BelowMediumNavBar = ({ isOpen, initNavBg, onToggle }) => {
  return (
    <SlideFade in={isOpen} offsetY="-10px" style={{ transition: 'all 0.2s' }}>
      <Flex
        w="100vw"
        display={{ md: 'none' }}
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
            fontSize="lg"
            size="lg"
            bg="none"
            _hover={{ backgroundColor: 'none' }}
            onClick={onToggle}
            icon={<CloseIcon color="#4599fe" _hover={{ color: '#eb0546' }} />}
          />
        </Flex>

        {/* Nav content */}
        <Flex flexDir="column" align="center" mt={8} gap={8} w="full">
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
        </Flex>
      </Flex>
    </SlideFade>
  );
};

export default BelowMediumNavBar;
