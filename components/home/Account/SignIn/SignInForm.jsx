import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  FormControl,
  Text,
  InputRightElement,
  InputGroup,
  Flex,
  Container,
  useToast,
} from '@chakra-ui/react';
import InputLabel from '../Register/InputLabel';
import OthersInput from '../Register/OthersInput';
import FormButton from '../Register/FormButton';
import { motion } from 'framer-motion';
import { sign } from 'jsonwebtoken';
import userAPI from '../../../../api/services/userAPI';
import md5 from 'md5';

// integrate Chakra Components with framer motion
const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionInputGroup = motion(InputGroup);

// methodto log in and create token on cookies
export async function loginCreateToken(dataObj) {
  // login service usage
  const loginServiceStatus = await userAPI.login(dataObj);

  // if login service failed
  if (loginServiceStatus.status !== 200)
    throw `There has been an error verifying your account: ${loginServiceStatus.statusText}`;

  // detach data from successful login service connection to db
  const {
    errorTarget,
    isSuccess,
    id,
    firstName,
    lastName,
    email,
    description,
  } = await loginServiceStatus.data;

  // handle cases for login input
  if (!isSuccess) {
    throw `Your ${errorTarget[0]} is incorrect`;
  }

  // handle jwt authentication if login is successful
  const claims = await {
    logUserId: id,
    firstName,
    lastName,
    email,
    description,
  };
  const jwt = await sign(claims, md5('EmChiXemAnhLa_#BanNhauMaThoi'), {
    expiresIn: '1d',
  });

  // login with current sign in data
  await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: jwt }),
  });

  return { logUserId: id, firstName, lastName, email };
}

const SignInForm = ({
  inputControls,
  openPopUp,
  closePopUp,
  setIsRegistering,
  setIsSigningIn,
}) => {
  // router to redirect
  const router = useRouter();

  // toast for notifications
  const toast = useToast();

  // state to track sign in email and password
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPwd, setSignInPwd] = useState('');

  // handle password toggle
  const [show, setShow] = useState(false);
  const handlePwdToggleClick = () => setShow(!show);

  // sign in button loading state
  const [isSignInLoading, setIsSignInLoading] = useState(false);

  // form subsmission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSignInLoading(true);

    // sign in data container
    const finalData = { email: signInEmail, password: signInPwd };

    try {
      const { firstName, lastName } = await loginCreateToken(finalData);

      // reset form data
      setSignInEmail('');
      setSignInPwd('');

      // off laoding
      await setIsSignInLoading(false);

      // toast msg
      await toast({
        title: 'Authentication',
        description: `Signed in successfully. Welcome back, ${firstName} ${lastName}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // redirect to dashboard page
      await router.replace('/dashboard');
    } catch (error) {
      // off laoding
      await setIsSignInLoading(false);

      // toast msg
      await toast({
        title: 'Authentication',
        description:
          typeof error !== 'string' ? 'Your account does not exist!' : error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form style={{ height: '100%', width: '100%' }} onSubmit={handleSubmit}>
      {/* Form title */}
      <MotionText
        fontSize={{ base: '1rem', md: '1.5rem' }}
        fontWeight="bold"
        color="#031e49"
        mb="2rem"
        align="center"
        letterSpacing="2px"
        initial={{ opacity: 0 }}
        animate={inputControls}
      >
        SIGN IN
      </MotionText>

      {/* Email */}
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
          }}
        />
      </FormControl>

      {/* Password */}
      <FormControl isRequired>
        <InputLabel
          htmlForContent="signInPassword"
          inputMarginTop="2rem"
          inputAnimateInit={{ opacity: 0 }}
          inputAnimateControls={inputControls}
        >
          PASSWORD
        </InputLabel>

        <MotionInputGroup initial={{ opacity: 0 }} animate={inputControls}>
          <OthersInput
            inputId="signInPassword"
            inputType={show ? 'text' : 'password'}
            placeholderContent="Your password"
            inputValue={signInPwd}
            handleInput={(e) => {
              setSignInPwd(e.target.value);
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
        direction={{ base: 'column', md: 'row' }}
        justify="center"
        align="center"
        mt="2.5rem"
        initial={{ opacity: 0 }}
        animate={inputControls}
        gap={{ base: '1rem', md: '2rem' }}
      >
        <FormButton
          isLoading={isSignInLoading}
          btnType="submit"
          btnBg="#eb0546"
          btnTextColor="#fff"
          hoverStylesContent={{
            backgroundColor: '#c70038',
            boxShadow: '10px 10px 15px #c5cad1, -10px -10px 15px #ffffff',
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
    </form>
  );
};

export default SignInForm;
