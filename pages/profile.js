import { Box, Flex, Button, Text, IconButton, useColorModeValue, Icon } from "@chakra-ui/react";
import { React, useState } from "react";
import Sidebar from "../components/dashboard/SideBar/SideBar";
import ProfileCard from "../components/profile/ProfileCard";

const Profile = () => {
    const user = useState(
        {
          id: "1",
          name: "Minh Pham",
          email: "pcminh0505@gmail.com",
          bio: "I am Minh"
        }
    );

    return (
        <Flex>
            <Sidebar />

            <Box>
                <Flex flexDir="column" m={10}>
                    <Text fontSize='2xl' color={useColorModeValue('#031d46', '#fffdfe')}>Profile</Text>

                    <Flex flexDir='row' justifyContent='center' mt={10} ml={5}>
                        <ProfileCard name={user.name} email={user.email} bio={user.bio}/>
                    </Flex>

                    <Text fontSize='2xl' mt={5}>My Projects</Text>
                </Flex>
            </Box>
        </Flex>
    );
};

export default Profile;
