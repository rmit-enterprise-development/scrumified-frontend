import { Box, Flex, Button, Text, IconButton, useColorModeValue, Icon } from "@chakra-ui/react";
import { useState } from "react";
import Sidebar from "../components/dashboard/SideBar/SideBar";
import Avvvatars from "avvvatars-react";

const Profile = () => {
  return (
    <Flex>
      <Sidebar />

      <Box>
        <Flex flexDir="column" m={10}>
            <Text fontSize='2xl' color={useColorModeValue('#031d46', '#fffdfe')}>Profile</Text>

            <Flex flexDir='row' justifyContent='center' alignItem='center' mt={10} ml={5}>
                <IconButton
                    aria-label="Profile"
                    isRound={true}
                    variant="outline"
                    size='150'
                    icon={
                    <Avvvatars shadow={true} size='150' value="Khang Nguyen" />
                    }
                />
                <Flex flexDir='row' ml={10} justifyContent="space-between" alignItem='center' w='full'>
                    <Flex flexDir='column'>
                        <Text fontWeight='medium' fontSize='lg'>Khang Nguyen</Text>
                        <Text >khangnguyen111101@gmail.com</Text>

                        <Flex mt={10} flexDir='column'>
                            <Text>My biography</Text>
                        </Flex>
                    </Flex>
                    <Button>Edit profile</Button>
                </Flex>
            </Flex>

            <Text fontSize='2xl' mt={5}>My Projects</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Profile;
