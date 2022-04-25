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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRef } from "react";
import * as Yup from "yup";
import userAPI from "../../api/services/userAPI";

const EditPasswordModal = ({ id, fname, lname, email, bio }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();
  const initialValues = {
  };

  const onSubmit = (values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
    console.log(values);
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
        .required("Required"),
    newPassword: Yup.string()
      .min(8, "Must be more than 8 characters")
      .required("Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&])[A-Za-z\d_@$!%*?&]{8,}$/,
        "At least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      ),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("newPassword"), null], "Passwords do not match"),
  });

  return (
    <>
      <Button
        leftIcon={<EditIcon />}
        size="sm"
        colorScheme="teal"
        onClick={onOpen}
      >
        Change Password
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
                  <Field name="oldPassword">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel
                          htmlFor="oldPassword"
                          pt={2}
                          color={useColorModeValue("#031e49", "#fffdfe")}
                        >
                          Old Password
                        </FormLabel>
                        <Input
                          {...field}
                          type="password"
                          id="oldPassword"
                          placeholder="Old Password"
                          color={useColorModeValue("#031e49", "#fffdfe")}
                        />
                        <FormErrorMessage>{form.errors.oldPassword}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="newPassword">
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
                          New Password
                        </FormLabel>
                        <Input
                          {...field}
                          type="password"
                          id="newPassword"
                          placeholder="Password"
                          color={useColorModeValue("#031e49", "#fffdfe")}
                        />
                        <FormErrorMessage>
                          {form.errors.newPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="confirmPassword">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.confirmPassword &&
                          form.touched.confirmPassword
                        }
                      >
                        <FormLabel
                          pt={2}
                          color={useColorModeValue("#031e49", "#fffdfe")}
                        >
                          Confirm Password
                        </FormLabel>
                        <Input
                          {...field}
                          type="password"
                          id="confirmPassword"
                          placeholder="Confirm password"
                          color={useColorModeValue("#031e49", "#fffdfe")}
                        />
                        <FormErrorMessage>
                          {form.errors.confirmPassword}
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

export default EditPasswordModal;
