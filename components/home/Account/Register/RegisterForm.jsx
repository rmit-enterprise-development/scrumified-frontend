import {
  Button,
  chakra,
  Container,
  Flex,
  FormControl,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NameInput from './NameInput';
import OthersInput from './OthersInput';
import InputLabel from './InputLabel';
import FormButton from './FormButton';
import React, { useState } from 'react';
import userAPI from '../../../../api/services/userAPI';

const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionInputGroup = motion(InputGroup);
const MotionChakraDiv = motion(chakra.div);

const RegisterForm = ({
  inputControls,
  setTypedEmail,
  typedEmail,
  typedEmailRef,
  openPopUp,
  closePopUp,
  setIsSigningIn,
  setIsRegistering,
}) => {
  // handle submit
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  // error state containers
  const [firstNameValidate, setFirstNameValidate] = useState(true);
  const [lastNameValidate, setLastNameValidate] = useState(true);
  const [emailValidate, setEmailValidate] = useState(true);
  const [pwdValidate, setPwdValidate] = useState(true);

  // handle password toggle
  const [show, setShow] = useState(false);
  const handlePwdToggleClick = () => setShow(!show);

  // sign up button loading state
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

  // toast for notifications
  const toast = useToast();

  // handle sign up data submit
  const handleSubmit = async (e) => {
    // prevent default nature of html form
    e.preventDefault();
    setIsSignUpLoading(true);

    // call method to fetch POST API and create new user on database
    try {
      // sign up service usage
      const signupServiceStatus = await userAPI.register(registerData);

      // if login service failed
      if (signupServiceStatus.status !== 200)
        throw `There has been an error creating an account: ${signupServiceStatus.statusText}`;

      // detach data from successful signup service connection to db
      const { message, firstName, lastName } = await signupServiceStatus.data;

      // error handling
      if (message) throw message;

      // reset form state
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

      // off laoding
      await setIsSignUpLoading(false);

      // toast msg
      await toast({
        title: 'Registration',
        description: `Signed up successfully. Welcome, ${firstName} ${lastName}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // redirect to sign in page
      await closePopUp();
      await setIsRegistering(false);
      await setIsSigningIn(true);
      await openPopUp();
    } catch (error) {
      // off laoding
      await setIsSignUpLoading(false);

      // toast msg
      await toast({
        title: 'Registration',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
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
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&])[A-Za-z\d_@$!%*?&]{8,}$/.test(
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
        fontSize={{ base: '0.9rem', md: '1.2rem' }}
        fontWeight="bold"
        color="#031e49"
        mt="2rem"
        mb="2rem"
        letterSpacing="2px"
        initial={{ opacity: 0 }}
        animate={inputControls}
      >
        CREATE AN ACCOUNT
      </MotionText>

      {/* Form content */}
      <form style={{ height: '100%', width: '100%' }} onSubmit={handleSubmit}>
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
              setFirstNameValidate(validateNames(e.target.value).value);
            }}
            msgComponent={
              !firstNameValidate && (
                <CustomErrorMsg>
                  {validateNames(registerData.firstName).msg}
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

              setLastNameValidate(validateNames(e.target.value).value);
            }}
            msgComponent={
              !lastNameValidate && (
                <CustomErrorMsg>
                  {validateNames(registerData.lastName).msg}
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
              setEmailValidate(validateEmail(e.target.value).value);
            }}
          />

          {!emailValidate && (
            <CustomErrorMsg>{validateEmail(typedEmail).msg}</CustomErrorMsg>
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

          <MotionInputGroup initial={{ opacity: 0 }} animate={inputControls}>
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
                setPwdValidate(validatePassword(e.target.value).value);
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
              {validatePassword(registerData.password).msg}
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
              boxShadow: '10px 10px 15px #c5cad1, -10px -10px 15px #ffffff',
            }}
            textContent="Register"
            isLoading={isSignUpLoading}
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
              boxShadow: '6px 6px 12px #c5cad1, -6px -6px 12px #ffffff',
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
          onClick={() => {
            closePopUp()
              .then(() => {
                setIsRegistering(false);
                openPopUp();
              })
              .then(() => setIsSigningIn(true));
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
            Already have an account?
          </MotionText>
        </MotionFlex>
      </form>
    </>
  );
};

export default RegisterForm;
