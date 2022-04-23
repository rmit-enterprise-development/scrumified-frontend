import { Button } from '@chakra-ui/react';
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { RouterPage } from "../../config/router";

const LogOutButton = ({id}) => {
    const router = useRouter();
    const onClick = (e) => {
        router.push(RouterPage.HOME);
    };

    return (
        <>
            <Button 
                id={id}
                leftIcon={<FiLogOut />}
                size="sm"
                colorScheme="red"
                onClick={onClick}
            >
                Log Out
            </Button>
        </>
    );
};

export default LogOutButton