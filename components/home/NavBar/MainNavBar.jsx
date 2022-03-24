import { Flex, useColorMode, useDisclosure } from '@chakra-ui/react';
import AboveMediumNavbar from './AboveMediumNavbar';
import BelowMediumNavbar from './BelowMediumNavbar';

const MainNavBar = () => {
  // keep track of app's color mode
  const { colorMode, toggleColorMode } = useColorMode();

  // keep track of opening state of Mobile Menu
  const { isOpen, onToggle } = useDisclosure();

  // keep track of initial background color of nav bar
  let initNavBg =
    colorMode === 'light' ? 'rgba(255, 255, 255' : 'rgba(3, 30, 73';

  // render()
  return (
    <Flex>
      {/* Nav bar content for Middle and Large screens */}
      <AboveMediumNavbar
        isOpen={isOpen}
        onToggle={onToggle}
        initNavBg={initNavBg}
        toggleColorMode={toggleColorMode}
        colorMode={colorMode}
      />

      {/* Nav bar content for Small screens */}
      <BelowMediumNavbar
        isOpen={isOpen}
        onToggle={onToggle}
        initNavBg={initNavBg}
      />
    </Flex>
  );
};

export default MainNavBar;