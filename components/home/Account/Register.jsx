import {
  Button,
  chakra,
  Container,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

// integrate Chakra Components with framer motion
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionFormLabel = motion(FormLabel);
const MotionInput = motion(Input);
const MotionInputGroup = motion(InputGroup);
const MotionChakraDiv = motion(chakra.div);

const AccountPopUp = ({
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

  // start animation when sign in is clicked
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
    typedEmail,
  ]);

  // handle submit
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(registerData);

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
    }, 1000);
  };

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

  // error state Container
  const [firstNameValidate, setFirstNameValidate] = useState(true);
  const [lastNameValidate, setLastNameValidate] = useState(true);
  const [emailValidate, setEmailValidate] = useState(true);

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
            <MotionFlex
              initial={{ opacity: 0 }}
              animate={inputControls}
              flexDir="column"
              flex="1"
            >
              <FormControl isRequired>
                <FormLabel
                  htmlFor="firstName"
                  color="#031e49"
                  fontSize={{ base: '0.6rem', md: '0.75rem' }}
                  style={{ letterSpacing: '3px' }}
                  pl="1.5rem"
                >
                  FIRST NAME
                </FormLabel>
                <Input
                  px="1.5rem"
                  py="1.4rem"
                  mt="0.25rem"
                  id="firstName"
                  type="text"
                  placeholder="John"
                  _placeholder={{
                    fontStyle: 'italic',
                  }}
                  style={{
                    fontSize: '0.95rem',
                    color: '#2D3748',
                    border: 'none',
                    backgroundImage: '#f2f8ff',
                    boxShadow: '6px 6px 12px #c5cad1, -6px -6px 12px #ffffff',
                  }}
                  value={registerData.firstName}
                  onChange={(e) => {
                    setRegisterData({
                      ...registerData,
                      firstName: e.target.value,
                    });

                    setFirstNameValidate(validateNames(e.target.value).value);
                  }}
                />
              </FormControl>
              {!firstNameValidate && (
                <CustomErrorMsg>
                  {validateNames(registerData.firstName).msg}
                </CustomErrorMsg>
              )}
            </MotionFlex>

            {/* Last name */}
            <MotionFlex
              initial={{ opacity: 0 }}
              animate={inputControls}
              flexDir="column"
              flex="1"
            >
              <FormControl isRequired>
                <FormLabel
                  htmlFor="lastName"
                  color="#031e49"
                  fontSize={{ base: '0.6rem', md: '0.75rem' }}
                  style={{ letterSpacing: '3px' }}
                  pl="1.5rem"
                >
                  LAST NAME
                </FormLabel>
                <Input
                  px="1.5rem"
                  py="1.4rem"
                  mt="0.25rem"
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  _placeholder={{
                    fontStyle: 'italic',
                  }}
                  style={{
                    fontSize: '0.95rem',
                    color: '#2D3748',
                    border: 'none',
                    backgroundImage: '#f2f8ff',
                    boxShadow: '6px 6px 12px #c5cad1, -6px -6px 12px #ffffff',
                  }}
                  value={registerData.lastName}
                  onChange={(e) => {
                    setRegisterData({
                      ...registerData,
                      lastName: e.target.value,
                    });

                    setLastNameValidate(validateNames(e.target.value).value);
                  }}
                />
              </FormControl>
              {!lastNameValidate && (
                <CustomErrorMsg>
                  {validateNames(registerData.lastName).msg}
                </CustomErrorMsg>
              )}
            </MotionFlex>
          </Flex>

          {/* Email */}
          <FormControl isRequired>
            <MotionFormLabel
              htmlFor="email"
              color="#031e49"
              fontSize={{ base: '0.6rem', md: '0.75rem' }}
              style={{ letterSpacing: '3px' }}
              initial={{ opacity: 0 }}
              animate={inputControls}
              pl="1.5rem"
            >
              EMAIL
            </MotionFormLabel>
            <MotionInput
              value={typedEmail}
              onChange={(e) => {
                setTypedEmail(e.target.value);
                setEmailValidate(validateEmail(e.target.value).value);
              }}
              px="1.5rem"
              py="1.4rem"
              mt="0.25rem"
              id="email"
              type="email"
              _hover={{ border: 'none' }}
              style={{
                fontSize: '0.95rem',
                color: '#2D3748',
                border: 'none',
                backgroundImage: '#f2f8ff',
                boxShadow: '6px 6px 12px #c5cad1, -6px -6px 12px #ffffff',
              }}
              initial={{ opacity: 0 }}
              animate={inputControls}
              placeholder="john.doe@email.com"
              _placeholder={{
                fontStyle: 'italic',
              }}
            />
            {!emailValidate && (
              <CustomErrorMsg>{validateEmail(typedEmail).msg}</CustomErrorMsg>
            )}
          </FormControl>

          {/* Password */}
          <FormControl isRequired>
            <MotionFormLabel
              mt="2rem"
              htmlFor="password"
              color="#031e49"
              fontSize={{ base: '0.6rem', md: '0.75rem' }}
              style={{ letterSpacing: '3px' }}
              initial={{ opacity: 0 }}
              animate={inputControls}
              pl="1.5rem"
            >
              PASSWORD
            </MotionFormLabel>
            <MotionInputGroup initial={{ opacity: 0 }} animate={inputControls}>
              <MotionInput
                px="1.5rem"
                py="1.4rem"
                mt="0.25rem"
                id="password"
                type={show ? 'text' : 'password'}
                _hover={{ border: 'none' }}
                style={{
                  fontSize: '0.95rem',
                  color: '#2D3748',
                  border: 'none',
                  backgroundImage: '#f2f8ff',
                  boxShadow: '6px 6px 12px #c5cad1, -6px -6px 12px #ffffff',
                }}
                value={registerData.password}
                onChange={(e) => {
                  setRegisterData({
                    ...registerData,
                    password: e.target.value,
                  });
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
            <Button
              onClick={() => {
                setRegisterData({
                  ...registerData,
                  email: typedEmailRef.current,
                });
              }}
              cursor="pointer"
              w="10rem"
              py={{ base: '1.25rem', md: '1.5rem' }}
              px="2rem"
              type="submit"
              value="Register"
              bg="#eb0546"
              color="#fff"
              // border="2px solid #eb0546"
              transition="all 0.4s linear"
              _hover={{
                backgroundColor: '#c70038',
                boxShadow: '10px 10px 15px #c5cad1, -10px -10px 15px #ffffff',
              }}
            >
              <Text fontSize={{ base: '0.75rem', md: '1rem' }}>Register</Text>
            </Button>

            <Button
              cursor="pointer"
              onClick={() => {
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
                });
              }}
              w="10rem"
              py={{ base: '1.25rem', md: '1.5rem' }}
              px="2rem"
              as="submit"
              bg="#fff"
              color="#eb0546"
              // border="2px solid #eb0546"
              transition="all 0.4s linear"
              _hover={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '6px 6px 12px #c5cad1, -6px -6px 12px #ffffff',
              }}
            >
              <Text fontSize={{ base: '0.75rem', md: '1rem' }}>Back Home</Text>
            </Button>
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

export default AccountPopUp;
