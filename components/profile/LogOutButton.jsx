import { Button } from '@chakra-ui/react';
import { FiLogOut } from "react-icons/fi";


const LogOutButton = ({id}) => {
    return (
        <>
            <Button 
                leftIcon={<FiLogOut />}
                size="sm"
                colorScheme="red"
            >
                Log Out
            </Button>
        </>
    );
};

export default LogOutButton