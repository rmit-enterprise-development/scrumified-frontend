import { ExternalLinkIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import React, { useState } from "react";
import projectAPI from "../../api/services/projectAPI";
import storyAPI from "../../api/services/storyAPI";

const CardModal = ({
  isOpen,
  onClose,
  cards,
  setCards,
  color,
  bg,
  btnBg,
  btnColor,
  projectId,
  participants,
  prevCard,
  isCard,
}) => {
  console.log("participants: ", participants);
  let initCard = {
    userStory: "",
    point: "",
    category: "",
    defOfDone: "",
    assignId: "",
  };
  if (!!prevCard) {
    initCard = prevCard;
  }

  const isValidInput = (value) => value.length > 0;

  const [card, setCard] = useState(initCard);

  const [isValidUserStory, setIsValidUserStory] = useState(isCard);
  const [isValidPoint, setIsValidPoint] = useState(isCard);
  const [isValidDef, setIsValidDef] = useState(isCard);
  const [isValidCategory, setIsValidCategory] = useState(isCard);
  const [isValidAssignee, setIsValidAssignee] = useState(isCard);

  const createCard = (card) => {
    projectAPI
      .postStory(projectId, card)
      .then(async (response) => {
        if (response.status !== 200) {
          return Promise.reject(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateCard = (card) => {
    storyAPI
      .putStory(card.id, card, { isDragged: false })
      .then(async (response) => {
        if (response.status !== 200) {
          return Promise.reject(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteCard = (id) => {
    storyAPI
      .deleteStory(id)
      .then(async (response) => {
        if (response.status !== 200) {
          return Promise.reject(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => {
        setCard(initCard);
        onClose();
      }}
      scrollBehavior={"inside"}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent borderRadius={"1rem"} padding={"1rem"}>
        <ModalHeader color={color}>Create User Story</ModalHeader>
        <ModalBody color={color}>
          <FormControl mt={4} isRequired isInvalid={!isValidUserStory}>
            <FormLabel htmlFor="userStory" fontSize={"lg"}>
              User Story
            </FormLabel>
            <Textarea
              id="userStory"
              defaultValue={card.userStory}
              placeholder="As a ... I need ... So that ..."
              resize={"none"}
              onChange={(e) => {
                setCard({ ...card, userStory: e.target.value });
                setIsValidUserStory(isValidInput(e.target.value));
              }}
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
            <FormLabel htmlFor="definition" fontSize={"lg"}>
              Definition of Done
            </FormLabel>
            <Textarea
              id="definition"
              defaultValue={card.defOfDone}
              placeholder="Requirement to complete a task"
              resize={"none"}
              onChange={(e) => {
                setCard({ ...card, defOfDone: e.target.value });
                setIsValidDef(isValidInput(e.target.value));
              }}
            />
            {!isValidDef ? (
              <FormErrorMessage>Must be defined</FormErrorMessage>
            ) : (
              <FormHelperText>Requirement to complete a task</FormHelperText>
            )}
          </FormControl>

          <FormControl mt={4} isRequired isInvalid={!isValidPoint}>
            <FormLabel htmlFor="point" fontSize={"lg"}>
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
            <FormLabel htmlFor="category" fontSize={"lg"}>
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
            >
              <option value="Front-end">Front-end</option>
              <option value="Back-end">Back-end</option>
              <option value="Design(UI/UX)">Design (UI/UX)</option>
              <option value="DevOps">DevOps</option>
              <option value="Testing">Testing</option>
              <option value="Others">Others</option>
            </Select>
            {!isValidCategory && (
              <FormErrorMessage>Must select one category</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={4} isInvalid={!isValidAssignee} isRequired>
            <FormLabel htmlFor="participant" fontSize={"lg"}>
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
            >
              {participants &&
                participants.map((participant, idx) => (
                  <option key={idx} value={participant.id}>
                    {participant.firstName +
                      " " +
                      participant.lastName +
                      " (" +
                      participant.email +
                      ")"}
                  </option>
                ))}
            </Select>
            {!isValidAssignee && (
              <FormErrorMessage>Must select one person</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {isCard && (
            <Button
              colorScheme={"red"}
              variant={"outline"}
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
            colorScheme={"gray"}
            variant={"outline"}
            onClick={onClose}
            mr={4}
          >
            Close
          </Button>
          <Button
            colorScheme={"telegram"}
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
                      status: "backlog",
                      assignId: card.assignId,
                    }
                  : {
                      userStory: card.userStory,
                      point: card.point,
                      category: card.category,
                      defOfDone: card.defOfDone,
                      status: "backlog",
                      assignId: card.assignId,
                    };

                isCard ? updateCard(result) : createCard(result);
                if (!isCard) {
                  setCard({
                    userStory: "",
                    point: "",
                    category: "",
                    defOfDone: "",
                    assignId: "",
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
            {isCard ? "Update" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CardModal;
