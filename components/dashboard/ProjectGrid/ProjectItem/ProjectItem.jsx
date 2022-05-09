import {
  Box,
  Flex,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Avvvatars from 'avvvatars-react';
import Router from 'next/router';
import { useContext } from 'react';
import { RouterPage } from '../../../../config/router';
import { LoggedUserContext } from '../../../common/LoggedUserProvider';
import ModifyButton from './ModifyProject/ModifyButton';
import NumberButton from './NumberButton';

const ProjectItem = ({ project, color, openTasks, fetchUpdate }) => {
  const handlePushProjectDetail = () => {
    Router.push({
      pathname: `${RouterPage.PROJECT}/${project.id}${RouterPage.BACKLOG}`,
    });
  };
  const colorScheme = color + '.500';

  const user = useContext(LoggedUserContext);
  return (
    <Flex
      borderColor="#2d4046"
      borderWidth="1px"
      borderRadius="1rem"
      _hover={{
        boxShadow:
          '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)',
      }}
      transition="all 0.2s linear"
      overflow="hidden"
      cursor="pointer"
      onClick={handlePushProjectDetail}
    >
      <Box w="5%" bg={colorScheme} />
      <Flex
        py={3}
        px={5}
        flexDir="column"
        justifyContent="space-between"
        w="100%"
      >
        <Box>
          <Flex pb={2} justifyContent="space-between">
            <Flex alignItems="center" flexWrap="wrap">
              <Avvvatars style="shape" value={project.id} />
              <Text
                fontWeight="bold"
                pl={2}
                color={useColorModeValue('#031d46', '#fffdfe')}
              >
                {project.title}
              </Text>
            </Flex>

            {user.logUserId === project.ownerId && (
              <ModifyButton
                id={project.id}
                name={project.title}
                participants={project.participants}
                fetchUpdate={fetchUpdate}
              />
            )}
          </Flex>

          <Text color={useColorModeValue('#031d46', '#fffdfe')}>
            Created at:
            {new Date(project.createdDate * 1000).toLocaleDateString('en-IN')}
          </Text>
          <Text color={useColorModeValue('#031d46', '#fffdfe')}>
            Owned by: {project.owner.firstName + ' ' + project.owner.lastName}
          </Text>
        </Box>

        <Flex alignItems="center" pt={4}>
          <Text pr={2} color={useColorModeValue('#031d46', '#fffdfe')}>
            My task
          </Text>

          <NumberButton>0</NumberButton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProjectItem;
