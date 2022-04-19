import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Flex, Text } from '@chakra-ui/react';

const ThirdSection = () => {
    useEffect(() => {
        AOS.init({ duration: 1200, mirror: true });
    }, []);

    return (
        <>
            <Flex
                w="100vw"
                h="100vh"
                justifyContent="center"
                alignItems="center"
            >
                <Text
                    fontSize="30rem"
                    textAlign="center"
                    style={{
                        background:
                            'linear-gradient(22deg, rgba(235,5,70,0.9) 21%, rgba(69,153,254,0.9) 71%)',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color': 'transparent',
                    }}
                >
                    1
                </Text>

                <Flex bg="violet" h="full" w="35rem">
                    dfdf
                </Flex>
            </Flex>

            <Flex
                w="100vw"
                h="100vh"
                justifyContent="center"
                alignItems="center"
            >
                <Flex bg="violet" h="full" w="35rem">
                    dfdf
                </Flex>
                <Text
                    fontSize="30rem"
                    textAlign="center"
                    style={{
                        background:
                            'linear-gradient(22deg, rgba(235,5,70,0.9) 21%, rgba(69,153,254,0.9) 71%)',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color': 'transparent',
                    }}
                >
                    2
                </Text>
            </Flex>

            <Flex
                w="100vw"
                h="100vh"
                justifyContent="center"
                alignItems="center"
            >
                <Text
                    fontSize="30rem"
                    textAlign="center"
                    style={{
                        background:
                            'linear-gradient(22deg, rgba(235,5,70,0.9) 21%, rgba(69,153,254,0.9) 71%)',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color': 'transparent',
                    }}
                >
                    3
                </Text>

                <Flex bg="violet" h="full" w="35rem">
                    dfdf
                </Flex>
            </Flex>

            <Flex
                w="100vw"
                h="100vh"
                justifyContent="center"
                alignItems="center"
            >
                <Flex bg="violet" h="full" w="35rem">
                    dfdf
                </Flex>
                <Text
                    fontSize="30rem"
                    textAlign="center"
                    style={{
                        background:
                            'linear-gradient(22deg, rgba(235,5,70,0.9) 21%, rgba(69,153,254,0.9) 71%)',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color': 'transparent',
                    }}
                >
                    4
                </Text>
            </Flex>
        </>
    );
};

export default ThirdSection;
