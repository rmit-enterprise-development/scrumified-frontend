import { Flex, useColorMode, useDisclosure } from '@chakra-ui/react';
import AboveMedium from './AboveMedium.jsx';
import BelowMedium from './BelowMedium.jsx';

const MainNavBar = ({ setIsRegistering, setIsSigningIn }) => {
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
      <AboveMedium
        isOpen={isOpen}
        onToggle={onToggle}
        initNavBg={initNavBg}
        toggleColorMode={toggleColorMode}
        colorMode={colorMode}
        setIsSigningIn={setIsSigningIn}
        setIsRegistering={setIsRegistering}
      />

      {/* Nav bar content for Small screens */}
      <BelowMedium
        isOpen={isOpen}
        onToggle={onToggle}
        initNavBg={initNavBg}
        setIsRegistering={setIsRegistering}
        setIsSigningIn={setIsSigningIn}
      />
    </Flex>
  );
};

export default MainNavBar;
