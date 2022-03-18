import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = {
    light: 'white',
    dark: 'black',
  };

  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      bg={colorMode === 'dark' ? 'gray.200' : 'gray'}
      color={iconColor[colorMode]}
    />
  );
};

export default DarkModeSwitch;