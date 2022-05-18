import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Avvvatars from 'avvvatars-react';
import textUtils from '../../utils/text';

const ProfileCard = ({ id, fname, lname, email, description }) => {
  return (
    <Flex>
      <Avvvatars
        shadow={true}
        size="150"
        value={textUtils.getFirstLetters(fname + ' ' + lname) + id}
      />

      <Flex flex="1" flexDir="row" ml={10} justifyContent="space-between">
        <Flex flexDir="column">
          <Text
            fontSize="2xl"
            fontWeight="medium"
            color={useColorModeValue('#031d46', '#fffdfe')}
          >
            {fname + ' ' + lname}
          </Text>
          <Text color={useColorModeValue('#031d46', '#fffdfe')}>{email}</Text>

          <Flex mt={10} flexDir="column">
            <Text
              style={{ textDecoration: 'underline', fontWeight: 'bold' }}
              color={useColorModeValue('#031d46', '#fffdfe')}
            >
              Biography
            </Text>

            <Text color={useColorModeValue('#031d46', '#fffdfe')}>
              {description ? description : '...'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfileCard;
