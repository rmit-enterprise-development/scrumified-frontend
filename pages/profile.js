import { Box, Flex, Button, Text, IconButton, useColorModeValue, Icon } from "@chakra-ui/react";
import { React, useState } from "react";
import Sidebar from "../components/dashboard/SideBar/SideBar";
import EditProfileModal from "../components/profile/EditProfileModal";
import ProfileCard from "../components/profile/ProfileCard";

const Profile = () => {
    const [user, setUser] = useState(
        {
          id: "1",
          fname: "Minh",
          lname: "Pham",
          email: "pcminh0505@gmail.com",
          bio: "Minh dep dzai"
        }
    );

    return (
        <Flex>
            <Sidebar />

            <Flex flexDir="column" m={10} w='full' h='full'>
                <Text fontSize='2xl' color={useColorModeValue('#031d46', '#fffdfe')}>Profile</Text>

                <Flex justifyContent="space-around" mt={10} >
                    <ProfileCard fname={user.fname} lname={user.lname} email={user.email} bio={user.bio}/>
                    <EditProfileModal id={user.id} fname={user.fname} lname={user.lname} email={user.email} bio={user.bio}/>
                </Flex>

                <Text fontSize='2xl' mt={10}>My Projects</Text>
            </Flex>
        </Flex>
    );
};

export default Profile;
