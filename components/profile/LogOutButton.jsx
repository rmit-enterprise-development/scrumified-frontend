import { Button, useToast } from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/router';

const LogOutButton = ({ id }) => {
  const router = useRouter();
  const toast = useToast();

  return (
    <>
      <Button
        id={id}
        leftIcon={<FiLogOut />}
        size="sm"
        colorScheme="red"
        onClick={async () => {
          try {
            // logout with logout api
            await fetch('/api/logout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({}),
            });

            // toast msg
            await toast({
              title: 'Logging Out',
              description: `Signed out successfully. See you next time!`,
              status: 'success',
              duration: 3000,
              isClosable: true,
            });

            // redirect home
            setTimeout(() => {
              router.replace('/');
            }, 2000);
          } catch (error) {
            // toast error
            await toast({
              title: 'Logging Out',
              description: `There has been an error signing you out: ` + error,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
        }}
      >
        Log Out
      </Button>
    </>
  );
};

export default LogOutButton;
