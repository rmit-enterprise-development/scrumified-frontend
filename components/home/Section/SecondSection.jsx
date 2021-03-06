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
import { BsListCheck } from 'react-icons/bs';
import { FaRegChartBar, FaHammer, FaFire } from 'react-icons/fa';

const SecondSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, mirror: true });
  }, []);

  // handle aos value responsively
  const responsiceAos = useBreakpointValue({
    base: 'fade-up',
    md: 'fade-down',
  });

  const FeatureComponent = ({ title, description, icon }) => (
    <Box
      data-aos={responsiceAos}
      bg="transparent"
      height={{ md: '16rem', lg: '22rem', xlg: '20rem' }}
    >
      <Flex
        p={{ base: '25px', md: '15px' }}
        h="full"
        w="full"
        direction="column"
        gap="1.25rem"
        transition="all 0.4s linear"
        _hover={{
          transform: 'scale(1.08)',
        }}
      >
        <Center
          style={{
            boxShadow: '0 8px 20px 2px rgba(255,0,93, 0.35)',
            background: 'rgb(235,5,70)',
            background:
              'linear-gradient(22deg, rgba(235,5,70,1) 21%, rgba(69,153,254,1) 71%)',
          }}
          h="4.5rem"
          w="4.5rem"
          borderRadius="30px"
          alignSelf="center"
        >
          <Text color="#fff" fontSize="2.75rem">
            {icon}
          </Text>
        </Center>
        <Text
          fontSize="xl"
          fontWeight="bold"
          color={useColorModeValue('#031e49', 'gray.200')}
          textAlign="center"
        >
          {title}
        </Text>
        <Text
          px={{ base: '10px', md: 0 }}
          color={useColorModeValue('gray.600', 'gray.200')}
          fontSize="sm"
          textAlign="center"
        >
          {description.trim().split(/\s+/).join(' ')}
        </Text>
      </Flex>
    </Box>
  );
  return (
    <Flex
      id="features"
      transition="all 0.4s linear"
      direction="column"
      alignItems="center"
      justifyContent="center"
      py="3rem"
      overflow="hidden"
      borderRadius="25px"
      boxShadow={useColorModeValue(
        '0px 31px 56px -22px rgba(184, 202, 209,0.51)',
        '0px 31px 56px -22px rgba(255,255,255,0.51)'
      )}
      mx={{ base: '1rem', md: '6rem' }}
      mb="4rem"
      data-aos="fade-up"
    >
      <Text
        bg="transparent"
        fontWeight="bold"
        fontSize={{ base: '0.8rem', md: 'lg' }}
        color={useColorModeValue(
          'rgba(235, 5, 70, 0.8)',
          'rgba(247, 59, 112, 1)'
        )}
        letterSpacing="2px"
      >
        WHATS THE FUNCTION
      </Text>
      <Text
        bg="transparent"
        color={useColorModeValue('#031e49', 'gray.200')}
        fontSize={{ base: '1rem', md: '2rem', lg: '2.6rem' }}
        mb={{ base: '2rem', md: '5rem' }}
        fontWeight="bold"
      >
        Meet the features of the product
      </Text>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        spacing={{ md: '3rem', lg: '2rem' }}
        px={{ base: 0, md: '2rem', lg: '6rem' }}
        bg="transparent"
        transition="all 0.4s linear"
      >
        <FeatureComponent
          title="Core Principle"
          description="Beginner learning curve project manangement with discipline, flexibility, and customization"
          icon={<FaFire />}
        />
        <FeatureComponent
          title="Backlog Board"
          description="Ease stories management with drag-and-drop and Agile-strict project scale points"
          icon={<BsListCheck />}
        />
        <FeatureComponent
          title="Roadmap Board"
          description="Comprehensive timeline in Gnatt Chart style to keep track of sprints overal duration"
          icon={<FaRegChartBar />}
        />
        <FeatureComponent
          title="Active Sprints"
          description="Easy and disciplined sprints life cycle management with drag and drop functionalities"
          icon={<FaHammer />}
        />
      </SimpleGrid>
    </Flex>
  );
};

export default SecondSection;
