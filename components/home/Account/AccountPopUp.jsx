import { Flex, Button } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

// integrate Chakra Flex with framer motion
const MotionFlex = motion(Flex);

const AccountPopUp = ({ isSigningIn, setIsSigningIn }) => {
  // control animation object
  const popUpControls = useAnimation();

  // async function to toggle pop up display
  const closePopUp = async () => {
    await popUpControls.start({
      height: 0,
      backgroundColor: 'rgba(226, 232, 240, 0)',
      transition: {
        duration: 1,
      },
    });

    await setIsSigningIn(false);
  };

  // start animation when sign in is clicked
  useEffect(() => {
    if (isSigningIn) {
      popUpControls.start({
        height: '100%',
        backgroundColor: 'rgba(226, 232, 240, 0.9)',
        transition: {
          duration: 1,
        },
      });
    }
  }, [isSigningIn, popUpControls]);

  // render account pop up
  return (
    <MotionFlex
      p={0}
      zIndex="400"
      position="absolute"
      top="0"
      left="0"
      maxW="full"
      w="full"
      onClick={closePopUp}
      display={isSigningIn ? 'flex' : 'none'}
      animate={popUpControls}
    ></MotionFlex>
  );
};

export default AccountPopUp;
