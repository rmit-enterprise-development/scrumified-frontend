import React from 'react';
import { Button, Text } from '@chakra-ui/react';

const FormButton = ({
  handleOnClick,
  btnType,
  hoverStylesContent,
  textContent,
  btnBg,
  btnTextColor,
  isLoading,
}) => {
  return (
    <Button
      cursor="pointer"
      onClick={handleOnClick}
      w="10rem"
      py={{ base: '1.25rem', md: '1.5rem' }}
      px="2rem"
      value="Register"
      bg={btnBg}
      color={btnTextColor}
      transition="all 0.4s linear"
      _hover={hoverStylesContent}
      type={btnType ? btnType : null}
      isLoading={isLoading}
    >
      <Text fontSize={{ base: '0.9rem', md: '1rem' }}>{textContent}</Text>
    </Button>
  );
};

export default FormButton;
