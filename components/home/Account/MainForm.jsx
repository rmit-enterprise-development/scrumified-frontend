import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import RegisterForm from './Register/RegisterForm';

// integrate Chakra Components with framer motion
const MotionFlex = motion(Flex);

const MainForm = ({
    isRegistering,
    setIsRegistering,
    typedEmail,
    setTypedEmail,
    typedEmailRef,
    setIsSigningIn,
}) => {
    // control animation object
    const popUpControls = useAnimation();
    const formControls = useAnimation();
    const inputControls = useAnimation();

    // handle form anim changes based on screen breakpoints
    const formAnimWidth = useBreakpointValue({ base: '100%', md: '600px' });
    const formAnimPadding = useBreakpointValue({
        base: '1.5rem',
        md: '2rem 3.5rem',
    });

    // async functions to toggle pop up display
    const closePopUp = async () => {
        await inputControls.start({
            opacity: 0,
            transition: {
                duration: 0.4,
            },
        });

        await formControls.start({
            height: 0,
            width: 0,
            padding: 0,
            backgroundImage: '#E2E8F0',
            boxShadow: '0 0 0 #c5cad1, 0 0 0 #ffffff',
            transition: {
                duration: 0.6,
            },
        });

        await popUpControls.start({
            height: 0,
            backgroundColor: 'rgba(226, 232, 240, 0)',
            transition: {
                duration: 0.4,
            },
        });

        await setIsRegistering(false);
    };

    // start open animation when Register Now  is clicked
    useEffect(() => {
        const openPopUp = async () => {
            await popUpControls.start({
                height: '100vh',
                backgroundColor: 'rgba(226, 232, 240, 1)',
                transition: {
                    duration: 0.75,
                },
            });

            await formControls.start({
                height: '100%',
                width: formAnimWidth,
                padding: formAnimPadding,
                backgroundImage: '#E2E8F0',
                boxShadow: '30px 30px 50px #c5cad1, -30px -30px 50px #ffffff',
                transition: {
                    duration: 0.75,
                },
            });

            await inputControls.start({
                opacity: 1,
                transition: {
                    duration: 0.75,
                },
            });
        };

        // if Register Now is clicked
        if (isRegistering) {
            openPopUp();
        }
    }, [
        isRegistering,
        popUpControls,
        formControls,
        inputControls,
        formAnimWidth,
        formAnimPadding,
    ]);

    // render account pop up
    return (
        <MotionFlex
            p={{ base: '2rem', md: '3rem' }}
            zIndex="400"
            position="fixed"
            top="0"
            left="0"
            maxW="full"
            w="full"
            justify="center"
            align="center"
            display={isRegistering ? 'flex' : 'none'}
            animate={popUpControls}
            flexDir="column"
        >
            {/* Form container */}
            <MotionFlex
                borderRadius="1rem"
                flexDir="column"
                align="center"
                overflow="scroll"
                initial={{
                    padding: '0 0',
                    backgroundImage: '#E2E8F0',
                    boxShadow: '0 0 0 #c5cad1, 0 0 0 #ffffff',
                }}
                animate={formControls}
                css={{
                    '&::-webkit-scrollbar': {
                        width: 0,
                    },
                    '&::-webkit-scrollbar-track': {
                        width: 0,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'transparent',
                    },
                }}
            >
                <RegisterForm
                    inputControls={inputControls}
                    setIsSigningIn={setIsSigningIn}
                    setTypedEmail={setTypedEmail}
                    typedEmail={typedEmail}
                    typedEmailRef={typedEmailRef}
                    closePopUp={closePopUp}
                />
            </MotionFlex>
        </MotionFlex>
    );
};

export default MainForm;
