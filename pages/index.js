import Head from 'next/head';
import NextLink from 'next/link';
import {
  Flex,
  Container,
  Image as ChakraImage,
  Text,
  Button,
  chakra,
  Input,
} from '@chakra-ui/react';
import HomeNavBar from '../components/home/MainNavBar';
import Images from '../assets/images';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Scrumified</title>
      </Head>

      {/* Nav Bar */}
      <HomeNavBar />

      {/* Main content (currently testing only) */}
      <Flex as="main" p={0} maxW="full" w="100vw" h="100vh">
        <Flex
          flex="1"
          flexDir="column"
          align="flex-end"
          justify="flex-end"
          pr="1.75rem"
          pb="2.25rem"
        >
          <ChakraImage
            src={Images.LeaningBusinessMan.src}
            alt="Leaning business man"
            w="425px"
          />
        </Flex>

        <Flex
          flex="1.5"
          flexDir="column"
          justify="flex-end"
          pl="0.75rem"
          pr="5rem"
        >
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

          <Text fontSize="1.4rem" mt="2rem" color="gray.600">
            We make project management never been so{' '}
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

          <Flex
            align="center"
            justify="flex-start"
            mt="3rem"
            gap="1rem"
            pr="4rem"
          >
            <Input
              _before={{
                border: '2px solid red',
              }}
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
              alt="Leaning business man"
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
        </Flex>
      </Flex>

      <Container
        as="main"
        p={0}
        bg="red.500"
        maxW="full"
        w="100vw"
        h="100vh"
      ></Container>
    </>
  );
}
