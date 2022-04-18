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
} from '@chakra-ui/react';
import { BsListCheck } from 'react-icons/bs';
import { FaRegChartBar, FaHammer, FaFire } from 'react-icons/fa';

const SecondSection = () => {
    useEffect(() => {
        AOS.init({ duration: 1200 });
    }, []);

    const FeatureComponent = ({ title, description, icon, aosAnim }) => (
        <Box
            data-aos={aosAnim}
            bg="transparent"
            height={{ md: '14rem', lg: '22rem' }}
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
                    alignSelf={{ base: 'center', md: 'start' }}
                >
                    <Text color="#fff" fontSize="2.75rem">
                        {icon}
                    </Text>
                </Center>
                <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color={useColorModeValue('#031e49', 'gray.200')}
                    textAlign={{ base: 'center', md: 'justify' }}
                >
                    {title}
                </Text>
                <Text
                    color={useColorModeValue('gray.600', 'gray.200')}
                    fontSize="sm"
                    textAlign={{ base: 'center', md: 'justify' }}
                >
                    {description}
                </Text>
            </Flex>
        </Box>
    );
    return (
        <Flex
            transition="all 0.4s linear"
            bg={useColorModeValue('#fff', '#031e49')}
            direction="column"
            alignItems="center"
            justifyContent="center"
            py="2rem"
            style={{
                '-moz-user-select': 'none',
                '-khtml-user-select': 'none',
                '-webkit-user-select': 'none',
                '-ms-user-select': 'none',
                'user-select': 'none',
            }}
        >
            <Text
                fontWeight="bold"
                fontSize={{ base: '1rem', md: 'lg' }}
                color={useColorModeValue(
                    'rgba(235, 5, 70, 0.8)',
                    'rgba(247, 59, 112, 1)'
                )}
                letterSpacing="2px"
            >
                WHATS THE FUNCTION
            </Text>
            <Text
                color={useColorModeValue('#031e49', 'gray.200')}
                fontSize={{ base: '1.25rem', md: '2rem', lg: '2.6rem' }}
                mb="5rem"
                fontWeight="bold"
            >
                Meet the features of the product
            </Text>

            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 4 }}
                spacing={{ md: '3rem', lg: '2rem' }}
                px={{ base: 0, md: '2rem', lg: '6rem' }}
                bg={useColorModeValue('#fff', '#031e49')}
                transition="all 0.4s linear"
            >
                <FeatureComponent
                    aosAnim="fade-left"
                    title="Core Principle"
                    description="Beginner learning curve project manangement with discipline, 
                    flexibility, and customization"
                    icon={<FaFire />}
                />
                <FeatureComponent
                    aosAnim="fade-down"
                    title="Backlog"
                    description=" Easy user stories management with drag and drop
                    functionalities and objective project scale points"
                    icon={<BsListCheck />}
                />
                <FeatureComponent
                    aosAnim="fade-up"
                    title="Roadmap"
                    description="Comprehensive timeline in Gnatt Chart style to keep
                    track of sprints overal duration"
                    icon={<FaRegChartBar />}
                />
                <FeatureComponent
                    aosAnim="fade-right"
                    title="Active Sprints"
                    description="Easy and disciplined sprints life cycle management
                    with drag and drop functionalities"
                    icon={<FaHammer />}
                />
            </SimpleGrid>
        </Flex>
    );
};

export default SecondSection;
