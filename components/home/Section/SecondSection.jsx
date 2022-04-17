import React from 'react';
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
    const FeatureComponent = ({ title, description, icon }) => (
        <Box bg="transparent" height="18rem">
            <Flex
                p="15px"
                h="full"
                w="full"
                direction="column"
                gap="1.25rem"
                justifyContent="center"
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
                >
                    <Text color="#fff" fontSize="2.75rem">
                        {icon}
                    </Text>
                </Center>
                <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color={useColorModeValue('#031e49', 'gray.200')}
                >
                    {title}
                </Text>
                <Text
                    color={useColorModeValue('gray.600', 'gray.200')}
                    fontSize="sm"
                    style={{ textAlign: 'justify' }}
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
                fontSize="lg"
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
                fontSize="2.6rem"
                mb="5rem"
                fontWeight="bold"
            >
                Meet the features of the product
            </Text>

            <SimpleGrid
                columns={4}
                spacing="2rem"
                px="9rem"
                bg={useColorModeValue('#fff', '#031e49')}
                transition="all 0.4s linear"
            >
                <FeatureComponent
                    title="Overall Principle"
                    description="Beginner learning curve project manangement with discipline, 
                    flexibility, and customization"
                    icon={<FaFire />}
                />
                <FeatureComponent
                    title="Backlog"
                    description=" Easy user stories management with drag and drop
                    functionalities and objective project scale points"
                    icon={<BsListCheck />}
                />
                <FeatureComponent
                    title="Roadmap"
                    description="Comprehensive timeline in Gnatt Chart style to keep
                    track of sprints overal duration"
                    icon={<FaRegChartBar />}
                />
                <FeatureComponent
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
