import React, { useState } from 'react';
import {
    Button,
    chakra,
    FormControl,
    Text,
    InputRightElement,
    InputGroup,
    Flex,
    Container,
} from '@chakra-ui/react';
import InputLabel from '../Register/InputLabel';
import OthersInput from '../Register/OthersInput';
import { motion } from 'framer-motion';
import FormButton from '../Register/FormButton';

const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionInputGroup = motion(InputGroup);
const MotionChakraDiv = motion(chakra.div);

const SignInForm = ({
    inputControls,
    openPopUp,
    closePopUp,
    setIsRegistering,
    setIsSigningIn,
}) => {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPwd, setSignInPwd] = useState('');
    const [emailValidate, setEmailValidate] = useState(true);
    const [pwdValidate, setPwdValidate] = useState(true);

    // handle password toggle
    const [show, setShow] = useState(false);
    const handlePwdToggleClick = () => setShow(!show);

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
        <MotionChakraDiv mt="0.75rem" animate={inputControls}>
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

    return (
        <>
            {/* Form title */}
            <MotionText
                fontSize={{ base: '1rem', md: '1.5rem' }}
                fontWeight="bold"
                color="#031e49"
                mb="2rem"
                letterSpacing="2px"
                initial={{ opacity: 0 }}
                animate={inputControls}
            >
                SIGN IN
            </MotionText>

            <FormControl isRequired>
                <InputLabel
                    htmlForContent="signInEmail"
                    inputMarginTop="0"
                    inputAnimateInit={{ opacity: 0 }}
                    inputAnimateControls={inputControls}
                >
                    EMAIL
                </InputLabel>

                <OthersInput
                    inputId="signInEmail"
                    inputType="email"
                    placeholderContent="Your email"
                    inputAnimateInit={{ opacity: 0 }}
                    inputAnimateControls={inputControls}
                    inputValue={signInEmail}
                    handleInput={(e) => {
                        setSignInEmail(e.target.value);
                        setEmailValidate(validateEmail(e.target.value).value);
                    }}
                />
                {!emailValidate && (
                    <CustomErrorMsg>
                        {validateEmail(signInEmail).msg}
                    </CustomErrorMsg>
                )}
            </FormControl>

            <FormControl isRequired>
                <InputLabel
                    htmlForContent="signInPassword"
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
                        inputId="signInPassword"
                        inputType={show ? 'text' : 'password'}
                        placeholderContent="Your password"
                        inputValue={signInPwd}
                        handleInput={(e) => {
                            setSignInPwd(e.target.value);
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
                            <Text opacity="0.8" color="#031e49" fontSize="sm">
                                {show ? 'Hide' : 'Show'}
                            </Text>
                        </Button>
                    </InputRightElement>
                </MotionInputGroup>

                {!pwdValidate && (
                    <CustomErrorMsg>
                        {validatePassword(signInPwd).msg}
                    </CustomErrorMsg>
                )}
            </FormControl>

            {/* Buttons */}
            <MotionFlex
                direction={{ base: 'column', md: 'row' }}
                justify="center"
                align="center"
                mt="2.5rem"
                initial={{ opacity: 0 }}
                animate={inputControls}
                gap={{ base: '1rem', md: '2rem' }}
            >
                <FormButton
                    handleOnClick={() => {}}
                    btnType="submit"
                    btnBg="#eb0546"
                    btnTextColor="#fff"
                    hoverStylesContent={{
                        backgroundColor: '#c70038',
                        boxShadow:
                            '10px 10px 15px #c5cad1, -10px -10px 15px #ffffff',
                    }}
                    textContent="Sign In"
                />

                <FormButton
                    handleOnClick={() => {
                        closePopUp();
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

            {/* Not having an account yet? */}
            <MotionFlex
                onClick={() => {
                    closePopUp()
                        .then(() => {
                            setIsSigningIn(false);
                            openPopUp();
                        })
                        .then(() => setIsRegistering(true));
                }}
                justify="center"
                w="full"
                align="center"
                pb="2rem"
                initial={{ opacity: 0 }}
                animate={inputControls}
                cursor="pointer"
            >
                <MotionText
                    fontWeight="bold"
                    fontSize="sm"
                    style={{ transition: 'all 0.4s linear' }}
                    _hover={{ color: '#4599fe' }}
                >
                    Not having an account yet?
                </MotionText>
            </MotionFlex>
        </>
    );
};

export default SignInForm;
