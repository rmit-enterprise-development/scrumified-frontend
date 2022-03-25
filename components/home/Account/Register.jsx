import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// integrate Chakra Flex with framer motion
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionFormLabel = motion(FormLabel);
const MotionInput = motion(Input);
const MotionInputGroup = motion(InputGroup);

const AccountPopUp = ({ isRegistering, setIsRegistering, typedEmail }) => {
  // control animation object
  const popUpControls = useAnimation();
  const formControls = useAnimation();
  const inputControls = useAnimation();

  // useForm hook from react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // handle password toggle
  const [show, setShow] = useState(false);
  const handlePwdToggleClick = () => setShow(!show);

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
        height: '600px',
        width: '600px',
        padding: '3.5rem',
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
  }, [isRegistering, popUpControls, formControls, inputControls]);

  // render account pop up
  return (
    <MotionFlex
      p={0}
      zIndex="400"
      position="fixed"
      top="0"
      left="0"
      maxW="full"
      w="full"
      justify="center"
      align="center"
      onClick={closePopUp}
      display={isRegistering ? 'flex' : 'none'}
      animate={popUpControls}
    >
      {/* Form container */}
      <MotionFlex
        borderRadius="1rem"
        flexDir="column"
        align="center"
        initial={{
          height: '600px',
          width: '600px',
          padding: '2rem',
          backgroundImage: '#E2E8F0',
          boxShadow: '0 0 0 #c5cad1, 0 0 0 #ffffff',
        }}
        animate={formControls}
      >
        {/* Form title */}
        <MotionText
          fontSize="1.2rem"
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
        >
          {/* First name and last name */}
          <Flex w="full" gap="1.75rem" mb="2.5rem">
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
                  style={{ fontSize: '0.75rem', letterSpacing: '3px' }}
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
                  _hover={{ border: 'none' }}
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
                  // value={input}
                  // onChange={handleInputChange}
                />
              </FormControl>
            </MotionFlex>

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
                  style={{ fontSize: '0.75rem', letterSpacing: '3px' }}
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
                  _hover={{ border: 'none' }}
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
                  // value={input}
                  // onChange={handleInputChange}
                />
              </FormControl>
            </MotionFlex>
          </Flex>

          {/* Email */}
          <FormControl isRequired>
            <MotionFormLabel
              htmlFor="email"
              color="#031e49"
              style={{ fontSize: '0.75rem', letterSpacing: '3px' }}
              initial={{ opacity: 0 }}
              animate={inputControls}
              pl="1.5rem"
            >
              EMAIL
            </MotionFormLabel>
            <MotionInput
              value={typedEmail}
              px="1.5rem"
              py="1.4rem"
              mt="0.25rem"
              mb="2.5rem"
              id="email"
              type="text"
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
              // value={input}
              // onChange={handleInputChange}
            />
          </FormControl>

          {/* Password */}
          <FormControl isRequired>
            <MotionFormLabel
              htmlFor="password"
              color="#031e49"
              style={{ fontSize: '0.75rem', letterSpacing: '3px' }}
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
                // value={input}
                // onChange={handleInputChange}
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

          <MotionFlex
            justify="center"
            align="center"
            mt="2.5rem"
            initial={{ opacity: 0 }}
            animate={inputControls}
          >
            <Button
              py="1.25rem"
              px="2rem"
              as="submit"
              bg="#eb0546"
              color="#fff"
              border="2px solid #eb0546"
              transition="all 0.4s linear"
              _hover={{
                backgroundColor: '#fff',
                color: '#eb0546',
                border: '2px solid #eb0546',
                shadow: '0 5px 5px 2px #eb0546',
              }}
            >
              <Text fontSize="1rem">Register</Text>
            </Button>
          </MotionFlex>
        </form>
      </MotionFlex>
    </MotionFlex>
  );
};

export default AccountPopUp;
