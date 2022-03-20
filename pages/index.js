import Image from 'next/image';
import NextLink from 'next/link';
import Head from 'next/head';

// import { Container, Flex, Text, Button, Link } from '@chakra-ui/react';
import NavBar from '../components/dashboard/NavBar';
// import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export default function Home() {
  // const navContent = ['Home', 'Features', 'How it works', 'Testinomial'];

  return (
    <>
      <Head>
        <title>Home - Scrumified</title>
      </Head>
      <NavBar />
    </>
  );
}

// const NavBar = ({ navContent }) => (
//   <Flex
//     alignItems="center"
//     justifyContent="space-between"
//     px={5}
//     py={3}
//     borderBottom="1px"
//     borderColor="gray.200"
//   >
//     {/* logo */}
//     <NextLink href="/" passHref>
//       <Link
//         _hover={{
//           color: '#4599fe',
//         }}
//         style={{ textDecoration: 'none' }}
//       >
//         <Flex alignItems="center">
//           <Image
//             src={ImageResrouces.MainLogo}
//             alt="App main logo"
//             width="50%"
//             height="50%"
//           />

//           <Text fontSize="3xl" fontWeight="bold" color="#031e49">
//             Scrumified
//           </Text>
//         </Flex>
//       </Link>
//     </NextLink>

//     {/* nav content */}
//     <Flex alignItems="center" gap="12">
//       {navContent.map((textContent) => (
//         <Link
//           key={textContent}
//           _hover={{
//             color: '#4599fe',
//           }}
//           style={{ textDecoration: 'none' }}
//         >
//           <Text fontSize="sm">{textContent}</Text>
//         </Link>
//       ))}
//     </Flex>

//     {/* buttons */}
//     <Flex alignItems="center" gap="5">
//       <DarkModeSwitch />

//       <Button>GET STARTED</Button>
//     </Flex>
//   </Flex>
// );
