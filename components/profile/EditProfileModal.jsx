import { EditIcon } from "@chakra-ui/icons";
import { Form, Formik, Field } from 'formik'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import * as Yup from 'yup';

const EditProfileModal = ({id, fname, lname, email, bio }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();
  const initialValues = { 
    fname: fname, 
    lname:lname, 
    email:email,
    password: "",
    confirmPassword: ""
  };

  const onSubmit = (values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      actions.setSubmitting(false)
    }, 1000)
    console.log(values);
  }

  const validationSchema = Yup.object({
    fname: Yup.string().min(2, "Must be more than 1 character").required("Required"),
    lname: Yup.string().min(2, "Must be more than 1 character").required("Required"),
    email: Yup.string().min(2, "Must be more than 1 character").required("Required").email("Invalid email"),
    password: Yup.string().min(8, "Must be more than 8 characters").required("Required")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&])[A-Za-z\d_@$!%*?&]{8,}$/, "At least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"),
    confirmPassword: Yup.string().required("Please confirm your password").oneOf([Yup.ref('password'), null], "Passwords do not match")
  })

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
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={useColorModeValue("#031e49", "gray.200")}>
            Edit Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {(props) => (
                <Form>
                  <Field name='fname' >
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.fname && form.touched.fname}>
                        <FormLabel htmlFor='fname'>First name</FormLabel>
                        <Input {...field} id='fname' placeholder='Name' />
                        <FormErrorMessage>{form.errors.fname}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='lname' >
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.lname && form.touched.lname}>
                        <FormLabel htmlFor='lname'>Last name</FormLabel>
                        <Input {...field} id='lname' placeholder='Last Name' />
                        <FormErrorMessage>{form.errors.lname}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='email' >
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.email && form.touched.email}>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input {...field} id='email' placeholder='Email' />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='password' >
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.password && form.touched.password}>
                        <FormLabel>Password</FormLabel>
                        <Input {...field} type="password" id='password' placeholder='Password' />
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='confirmPassword' >
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input {...field} type="password" id='confirmPassword' placeholder='Password' />
                        <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  <Button
                    mt={4}
                    colorScheme='teal'
                    isLoading={props.isSubmitting}
                    type='submit'
                  >
                    Submit
                  </Button>

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