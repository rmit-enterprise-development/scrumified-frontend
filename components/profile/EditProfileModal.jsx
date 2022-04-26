/* eslint-disable react-hooks/rules-of-hooks */
import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRef } from "react";
import * as Yup from "yup";
import userAPI from "../../api/services/userAPI";

const EditProfileModal = ({ id, fname, lname, email, bio }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = useRef();
  const finalRef = useRef();
  const initialValues = {
    fname: fname,
    lname: lname,
    email: email,
    password: "",
  };

  const onSubmit = async (values, actions) => {
    try {
      // get password confirm value from user -> verify with login method
      const verifyData = {email : email, password: values.password};
      const loginServiceStatus = await userAPI.login(verifyData);

      // successfully verify password
      if (loginServiceStatus.data.isSuccess) {
        // update new user info
        const updateData = {email : values.email,
                          firstName : values.fname,
                          lastName: values.lname};
        const updateServiceStatus = await userAPI.putUser(id, updateData);

        // successfully changed data
        if (updateServiceStatus.status === 200) {
          toast({
            title: 'Successfully Edited',
            description: "Your information has been edited",
            status: 'success',
            duration: 9000,
            isClosable: false,
          })
          onClose();
        }
        else {
          toast({
            title: 'Service Failure',
            description: "Application failed to perform task!",
            status: 'error',
            duration: 9000,
            isClosable: false,
          })
          throw new Error(
            `Login service failed, msg: ${updateServiceStatus.statusText}`
          );
        }
      }
      else {
        alert("Incorrect password confirmation!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    fname: Yup.string()
      .min(2, "Must be more than 1 character")
      .required("Required"),
    lname: Yup.string()
      .min(2, "Must be more than 1 character")
      .required("Required"),
    email: Yup.string()
      .min(2, "Must be more than 1 character")
      .required("Required")
      .email("Invalid email"),
    password: Yup.string()
      .required("Please confirm your password")
  });

  return (
    <>
      <Button
        leftIcon={<EditIcon />}
        size="sm"
        colorScheme="teal"
        onClick={onOpen}
      >
        Edit Profile
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}fg
      >
        <ModalOverlay backdropFilter="blur(10px)"/>
        <ModalContent>
          <ModalHeader color={useColorModeValue("#031e49", "gray.200")}>
            Edit Profile
          </ModalHeader>
          <ModalCloseButton color={useColorModeValue("#031e49", "gray.200")} />
          <ModalBody pb={6}>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {(props) => (
                <Form>
                  <Field name="fname">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.fname && form.touched.fname}
                      >
                        <FormLabel
                          htmlFor="fname"
                          pt={2}
                          color={useColorModeValue("#031d46", "#fffdfe")}
                        >
                          First name
                        </FormLabel>
                        <Input
                          {...field}
                          id="fname"
                          placeholder="Name"
                          color={useColorModeValue("#031e49", "#fffdfe")}
                        />
                        <FormErrorMessage>{form.errors.fname}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="lname">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.lname && form.touched.lname}
                      >
                        <FormLabel
                          htmlFor="lname"
                          pt={2}
                          color={useColorModeValue("#031e49", "#fffdfe")}
                        >
                          Last name
                        </FormLabel>
                        <Input
                          {...field}
                          id="lname"
                          placeholder="Last Name"
                          color={useColorModeValue("#031e49", "#fffdfe")}
                        />
                        <FormErrorMessage>{form.errors.lname}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel
                          htmlFor="email"
                          pt={2}
                          color={useColorModeValue("#031e49", "#fffdfe")}
                        >
                          Email
                        </FormLabel>
                        <Input
                          {...field}
                          id="email"
                          placeholder="Email"
                          color={useColorModeValue("#031e49", "#fffdfe")}
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel
                          pt={2}
                          color={useColorModeValue("#031e49", "#fffdfe")}
                        >
                          Password
                        </FormLabel>
                        <Input
                          {...field}
                          type="password"
                          id="password"
                          placeholder="Password"
                          color={useColorModeValue("#031e49", "#fffdfe")}
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Flex mt={4} justifyContent="space-between">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
