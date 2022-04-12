import {
    Button,
    chakra,
    Container,
    Flex,
    FormControl,
    InputGroup,
    InputRightElement,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import NameInput from './NameInput';
import OthersInput from './OthersInput';
import InputLabel from './InputLabel';
import FormButton from './FormButton';

// integrate Chakra Components with framer motion
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionInputGroup = motion(InputGroup);
const MotionChakraDiv = motion(chakra.div);

const RegisterForm = ({
    isRegistering,
    setIsRegistering,
    typedEmail,
    setTypedEmail,
    typedEmailRef,
}) => {
    // control animation object
    const popUpControls = useAnimation();
    const formControls = useAnimation();
    const inputControls = useAnimation();

    // handle password toggle
    const [show, setShow] = useState(false);
    const handlePwdToggleClick = () => setShow(!show);

    // error state containers
    const [firstNameValidate, setFirstNameValidate] = useState(true);
    const [lastNameValidate, setLastNameValidate] = useState(true);
    const [emailValidate, setEmailValidate] = useState(true);
    const [pwdValidate, setPwdValidate] = useState(true);

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

    // errors validation methods
    const validateNames = (name) => {
        let rs = [];
        rs.push({
            value: name !== '',
            msg: 'Required',
        });
        rs.push({
            value: name.length >= 2,
            msg: 'At least 2 characters',
        });
        rs.push({
            value: /^[A-Z]+[a-z]+$/.test(name),
            msg: 'Only letters, capitalize first letter (only)',
        });

        let errorFilter = rs.filter((item) => item.value === false);

        return errorFilter.length > 0
            ? errorFilter[0]
            : { value: true, msg: 'Perfect ✅' };
    };
    const validateEmail = (email) => {
        return email === ''
            ? { value: false, msg: 'Required' }
            : { value: true, msg: 'Perfect ✅' };
    };
    const validatePassword = (pwd) => {
        let rs = [];
        rs.push({
            value: pwd !== '',
            msg: 'Required',
        });
        rs.push({
            value: pwd.length >= 8,
            msg: 'At least 8 characters',
        });
        rs.push({
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                pwd
            ),
            msg: 'At least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
        });

        let errorFilter = rs.filter((item) => item.value === false);

        return errorFilter.length > 0
            ? errorFilter[0]
            : { value: true, msg: 'Perfect ✅' };
    };

    // error message component
    const CustomErrorMsg = ({ children }) => (
        <MotionChakraDiv mt="0.75rem">
            <Text
                color="crimson"
                fontSize="0.7rem"
                fontWeight="bold"
                fontStyle="italic"
            >
                {children}
            </Text>
        </MotionChakraDiv>
    );

    // method to fetch POST API and create new user on database
    const createUserOnDatabase = (submitData) => {
        // POST request using fetch with async/await
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submitData),
        };

        fetch('http://localhost:8080/register', requestOptions)
            .then(async (response) => {
                const isJson = response.headers
                    .get('content-type')
                    ?.includes('application/json');
                const data = isJson && (await response.json());

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
            })
            .catch((error) => {
                console.error('There was an error: ', error);
            });
    };

    // handle submit
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        // prevent default nature of html form
        e.preventDefault();

        // call method to fetch POST API and create new user on database
        createUserOnDatabase(registerData);

        // reset form's state
        setTimeout(() => {
            setRegisterData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            });
            setTypedEmail('');
            setFirstNameValidate(true);
            setLastNameValidate(true);
            setEmailValidate(true);
            setPwdValidate(true);
        }, 1000);
    };

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
                {/* Form title */}
                <MotionText
                    fontSize={{ base: '0.75rem', md: '1.2rem' }}
                    fontWeight="bold"
                    color="#031e49"
                    mb="2rem"
                    letterSpacing="2px"
                    initial={{ opacity: 0 }}
                    animate={inputControls}
                >
                    CREATING AN ACCOUNT
                </MotionText>

                {/* Form content */}
                <form
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                    onSubmit={handleSubmit}
                >
                    {/* First name and last name */}
                    <Flex
                        w="full"
                        gap="2rem"
                        mb="1.75rem"
                        flexDir={{ base: 'column', md: 'row' }}
                    >
                        {/* First name */}
                        <NameInput
                            inputAnimateControls={inputControls}
                            htmlForContent="firstName"
                            labelText="FIRST NAME"
                            inputId="firstName"
                            placeholderContent="John"
                            inputValue={registerData.firstName}
                            handleInput={(e) => {
                                setRegisterData({
                                    ...registerData,
                                    firstName: e.target.value,
                                });

                                setFirstNameValidate(
                                    validateNames(e.target.value).value
                                );
                            }}
                            msgComponent={
                                !firstNameValidate && (
                                    <CustomErrorMsg>
                                        {
                                            validateNames(
                                                registerData.firstName
                                            ).msg
                                        }
                                    </CustomErrorMsg>
                                )
                            }
                        />

                        {/* Last name */}
                        <NameInput
                            inputAnimateControls={inputControls}
                            htmlForContent="lastName"
                            labelText="LAST NAME"
                            inputId="lastnName"
                            placeholderContent="Doe"
                            inputValue={registerData.lastName}
                            handleInput={(e) => {
                                setRegisterData({
                                    ...registerData,
                                    lastName: e.target.value,
                                });

                                setLastNameValidate(
                                    validateNames(e.target.value).value
                                );
                            }}
                            msgComponent={
                                !lastNameValidate && (
                                    <CustomErrorMsg>
                                        {
                                            validateNames(registerData.lastName)
                                                .msg
                                        }
                                    </CustomErrorMsg>
                                )
                            }
                        />
                    </Flex>

                    {/* Email */}
                    <FormControl isRequired>
                        <InputLabel
                            htmlForContent="email"
                            inputMarginTop="2rem"
                            inputAnimateInit={{ opacity: 0 }}
                            inputAnimateControls={inputControls}
                        >
                            EMAIL
                        </InputLabel>

                        <OthersInput
                            inputId="email"
                            inputValue={typedEmail}
                            inputType="email"
                            inputAnimateInit={{ opacity: 0 }}
                            inputAnimateControls={inputControls}
                            placeholderContent="john.doe@email.com"
                            handleInput={(e) => {
                                setTypedEmail(e.target.value);
                                setEmailValidate(
                                    validateEmail(e.target.value).value
                                );
                            }}
                        />

                        {!emailValidate && (
                            <CustomErrorMsg>
                                {validateEmail(typedEmail).msg}
                            </CustomErrorMsg>
                        )}
                    </FormControl>

                    {/* Password */}
                    <FormControl isRequired>
                        <InputLabel
                            htmlForContent="password"
                            inputMarginTop="2rem"
                            inputAnimateInit={{ opacity: 0 }}
                            inputAnimateControls={inputControls}
                        >
                            PASSWORD
                        </InputLabel>

                        <MotionInputGroup
                            initial={{ opacity: 0 }}
                            animate={inputControls}
                        >
                            <OthersInput
                                inputId="password"
                                inputValue={registerData.password}
                                inputType={show ? 'text' : 'password'}
                                placeholderContent="Make a good one!"
                                handleInput={(e) => {
                                    setRegisterData({
                                        ...registerData,
                                        password: e.target.value,
                                    });
                                    setPwdValidate(
                                        validatePassword(e.target.value).value
                                    );
                                }}
                            />

                            <InputRightElement
                                h="full"
                                display="flex"
                                align="center"
                                justify="center"
                                mt="0.2rem"
                                mx="1rem"
                            >
                                <Button
                                    _focus={{ border: 'none', outline: 'none' }}
                                    _hover={{ backgroundColor: 'none' }}
                                    w="full"
                                    h="full"
                                    size="md"
                                    bg="none"
                                    onClick={handlePwdToggleClick}
                                >
                                    <Text
                                        opacity="0.8"
                                        color="#031e49"
                                        fontSize="sm"
                                    >
                                        {show ? 'Hide' : 'Show'}
                                    </Text>
                                </Button>
                            </InputRightElement>
                        </MotionInputGroup>

                        {!pwdValidate && (
                            <CustomErrorMsg>
                                {validatePassword(registerData.password).msg}
                            </CustomErrorMsg>
                        )}
                    </FormControl>

                    {/* Buttons */}
                    <MotionFlex
                        justify="center"
                        align="center"
                        mt="2.5rem"
                        initial={{ opacity: 0 }}
                        animate={inputControls}
                        gap="2rem"
                    >
                        <FormButton
                            handleOnClick={() => {
                                setRegisterData({
                                    ...registerData,
                                    email: typedEmailRef.current,
                                });
                            }}
                            btnType="submit"
                            btnBg="#eb0546"
                            btnTextColor="#fff"
                            hoverStylesContent={{
                                backgroundColor: '#c70038',
                                boxShadow:
                                    '10px 10px 15px #c5cad1, -10px -10px 15px #ffffff',
                            }}
                            textContent="Register"
                        />

                        <FormButton
                            handleOnClick={() => {
                                closePopUp().then((res) => {
                                    setRegisterData({
                                        firstName: '',
                                        lastName: '',
                                        email: '',
                                        password: '',
                                    });
                                    setTypedEmail('');
                                    setFirstNameValidate(true);
                                    setLastNameValidate(true);
                                    setEmailValidate(true);
                                    setPwdValidate(true);
                                });
                            }}
                            btnType=""
                            btnBg="#fff"
                            btnTextColor="#eb0546"
                            hoverStylesContent={{
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                boxShadow:
                                    '6px 6px 12px #c5cad1, -6px -6px 12px #ffffff',
                            }}
                            textContent="Back Home"
                        />
                    </MotionFlex>

                    {/* 'Or' Divider */}
                    <MotionFlex
                        h="100px"
                        w="full"
                        align="center"
                        initial={{ opacity: 0 }}
                        animate={inputControls}
                    >
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
                    </MotionFlex>

                    {/* Already have an account? */}
                    <MotionFlex
                        justify="center"
                        w="full"
                        align="center"
                        pb="2rem"
                        initial={{ opacity: 0 }}
                        animate={inputControls}
                    >
                        <MotionText
                            fontWeight="bold"
                            fontSize="sm"
                            cursor="pointer"
                            style={{ transition: 'all 0.4s linear' }}
                            _hover={{ color: '#4599fe' }}
                        >
                            Already have an account?
                        </MotionText>
                    </MotionFlex>
                </form>
            </MotionFlex>
        </MotionFlex>
    );
};

export default RegisterForm;
