import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import projectAPI from '../../api/services/projectAPI';
import storyAPI from '../../api/services/storyAPI';

const CardModal = ({
  isOpen,
  onClose,
  projectId,
  participants,
  prevCard,
  isCard,
  disableModal,
}) => {
  let color = useColorModeValue('#031d46', '#fffdfe');
  let initCard = {
    userStory: '',
    point: '',
    category: '',
    defOfDone: '',
    assignId: '',
  };
  if (!!prevCard) {
    initCard = prevCard;
  }

  const isValidInput = (value) => value.length > 0;
  const toast = useToast();
  const router = useRouter();

  const [card, setCard] = useState(initCard);

  const [isValidUserStory, setIsValidUserStory] = useState(isCard);
  const [isValidPoint, setIsValidPoint] = useState(isCard);
  const [isValidDef, setIsValidDef] = useState(isCard);
  const [isValidCategory, setIsValidCategory] = useState(isCard);
  const [isValidAssignee, setIsValidAssignee] = useState(isCard);

  const createCard = async (card) => {
    try {
      const response = await projectAPI.postStory(projectId, card);
      if (response) {
        toast({
          title: 'Create card successfully!',
          status: 'success',
          duration: 1500,
          isClosable: true,
        });
      }
    } catch (error) {
      await console.log(error);
      await toast({
        title: 'Create card failed!',
        description: 'Please contact your administrator.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      await router.reload(router.asPath);
    }
  };

  const updateCard = async (card) => {
    try {
      const response = await storyAPI.putStory(card.id, card, {
        isDragged: false,
      });
      if (response) {
        toast({
          title: 'Update card successfully!',
          status: 'success',
          duration: 1500,
          isClosable: true,
        });
      }
    } catch (error) {
      await console.log(error);
      await toast({
        title: 'Update card failed!',
        description: 'Please contact your administrator.',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
      await router.reload(router.asPath);
    }
  };

  const deleteCard = async (id) => {
    try {
      const response = await storyAPI.deleteStory(id);
      if (response) {
        toast({
          title: 'Delete card successfully!',
          status: 'success',
          duration: 1500,
          isClosable: true,
        });
      }
    } catch (error) {
      await console.log(error);
      await toast({
        title: 'Delete card failed!',
        description: 'Please contact your administrator.',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
      await router.reload(router.asPath);
    }
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => {
        setCard(initCard);
        onClose();
      }}
      scrollBehavior={'inside'}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent borderRadius={'1rem'} padding={'1rem'}>
        <ModalHeader color={color}>Create User Story</ModalHeader>
        <ModalBody color={color}>
          <FormControl mt={4} isRequired isInvalid={!isValidUserStory}>
            <FormLabel htmlFor="userStory" fontSize={'lg'}>
              User Story
            </FormLabel>
            <Textarea
              id="userStory"
              defaultValue={card.userStory}
              placeholder="As a ... I need ... So that ..."
              resize={'none'}
              onChange={(e) => {
                setCard({ ...card, userStory: e.target.value });
                setIsValidUserStory(isValidInput(e.target.value));
              }}
              disabled={disableModal}
            />
            {!isValidUserStory ? (
              <FormErrorMessage>Must be defined</FormErrorMessage>
            ) : (
              <FormHelperText>
                In form of: &quot;As a ... I need ... So that ...&quot;
              </FormHelperText>
            )}
          </FormControl>

          <FormControl mt={4} isRequired isInvalid={!isValidDef}>
            <FormLabel htmlFor="definition" fontSize={'lg'}>
              Definition of Done
            </FormLabel>
            <Textarea
              id="definition"
              defaultValue={card.defOfDone}
              placeholder="Requirement to complete a task"
              resize={'none'}
              onChange={(e) => {
                setCard({ ...card, defOfDone: e.target.value });
                setIsValidDef(isValidInput(e.target.value));
              }}
              disabled={disableModal}
            />
            {!isValidDef ? (
              <FormErrorMessage>Must be defined</FormErrorMessage>
            ) : (
              <FormHelperText>Requirement to complete a task</FormHelperText>
            )}
          </FormControl>

          <FormControl mt={4} isRequired isInvalid={!isValidPoint}>
            <FormLabel htmlFor="point" fontSize={'lg'}>
              Story point:
            </FormLabel>
            <Select
              id="point"
              defaultValue={card.point}
              placeholder="Select point"
              onChange={(e) => {
                setCard({ ...card, point: e.target.value });
                setIsValidPoint(isValidInput(e.target.value));
              }}
              disabled={disableModal}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="8">8</option>
              <option value="13">13</option>
            </Select>

            {!isValidPoint ? (
              <FormErrorMessage>Must select one value</FormErrorMessage>
            ) : (
              <FormHelperText>
                <Link
                  href="https://www.productplan.com/glossary/fibonacci-agile-estimation/"
                  isExternal
                  color="blue.500"
                >
                  Fibonacci Rule <ExternalLinkIcon mx="2px" />
                </Link>
              </FormHelperText>
            )}
          </FormControl>

          <FormControl mt={4} isInvalid={!isValidCategory} isRequired>
            <FormLabel htmlFor="category" fontSize={'lg'}>
              Category:
            </FormLabel>
            <Select
              id="category"
              defaultValue={card.category}
              placeholder="Select category"
              onChange={(e) => {
                setCard({ ...card, category: e.target.value });
                setIsValidCategory(isValidInput(e.target.value));
              }}
              disabled={disableModal}
            >
              <option value="DESIGN">Design(UI/UX)</option>
              <option value="FRONTEND">Front-end</option>
              <option value="BACKEND">Back-end</option>
              <option value="DEVOPS">DevOps</option>
              <option value="TEST">Testing</option>
              <option value="OTHERS">Others</option>
            </Select>
            {!isValidCategory && (
              <FormErrorMessage>Must select one category</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={4} isInvalid={!isValidAssignee} isRequired>
            <FormLabel htmlFor="participant" fontSize={'lg'}>
              Assignee:
            </FormLabel>
            <Select
              id="participant"
              defaultValue={card.assignId}
              placeholder="Select participant"
              onChange={(e) => {
                setCard({
                  ...card,
                  assignId: e.target.value,
                });
                setIsValidAssignee(isValidInput(e.target.value));
              }}
              disabled={disableModal}
            >
              {participants &&
                participants.map((participant, idx) => (
                  <option key={idx} value={participant.id}>
                    {participant.firstName +
                      ' ' +
                      participant.lastName +
                      ' (' +
                      participant.email +
                      ')'}
                  </option>
                ))}
            </Select>
            {!isValidAssignee && (
              <FormErrorMessage>Must select one person</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter visibility={disableModal ? 'hidden' : 'visible'}>
          {isCard && (
            <Button
              colorScheme={'red'}
              variant={'outline'}
              onClick={() => {
                deleteCard(card.id);
                onClose();
              }}
              mr={4}
            >
              Delete
            </Button>
          )}
          <Button
            colorScheme={'gray'}
            variant={'outline'}
            onClick={onClose}
            mr={4}
          >
            Close
          </Button>
          <Button
            colorScheme={'telegram'}
            isDisabled={
              !(
                isValidUserStory &&
                isValidDef &&
                isValidPoint &&
                isValidAssignee &&
                isValidCategory
              )
            }
            onClick={() => {
              if (
                isValidUserStory &&
                isValidDef &&
                isValidPoint &&
                isValidAssignee &&
                isValidCategory
              ) {
                const result = isCard
                  ? {
                      id: card.id,
                      userStory: card.userStory,
                      point: card.point,
                      category: card.category,
                      defOfDone: card.defOfDone,
                      status: 'backlog',
                      assignId: card.assignId,
                    }
                  : {
                      userStory: card.userStory,
                      point: card.point,
                      category: card.category,
                      defOfDone: card.defOfDone,
                      status: 'backlog',
                      assignId: card.assignId,
                    };
                isCard ? updateCard(result) : createCard(result);
                if (!isCard) {
                  setCard({
                    userStory: '',
                    point: '',
                    category: '',
                    defOfDone: '',
                    assignId: '',
                  });

                  setIsValidUserStory(false);
                  setIsValidPoint(false);
                  setIsValidDef(false);
                  setIsValidAssignee(false);
                }
                onClose();
              }
            }}
          >
            {isCard ? 'Update' : 'Create'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CardModal;
