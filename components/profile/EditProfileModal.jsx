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

const EditProfileModal = ({id, fname, lname, email, bio }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

  function validateFname(value) {
    let error
    if (!value) {
      error = 'First name is required'
    } 
    return error
  }

  function validateLname(value) {
    let error
    if (!value) {
      error = 'Last name is required'
    } 
    return error
  }

  function validateEmail(value) {
    let error
    if (!value) {
      error = 'Email is required'
    } 
    return error
  }

  function validatePassword(value) {
    let error = "";
    const passwordRegex = /(?=.*[0-9])/;
    if (!value) {
      error = "Password is required";
    } else if (value.length < 8) {
      error = "*Password must be 8 characters long.";
    } else if (!passwordRegex.test(value)) {
      error = "*Invalid password. Must contain one number.";
    }
    return error;
  }

  function confirmPassword(value, confirmValue) {
    let error = "";
    if (confirmValue && value) {
      if (confirmValue !== value) {
        error = "Password not matched";
      }
    } else {
      error = "Please confirm password";
    }
    return error;
  }

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
              initialValues={{ fname: fname, lname:lname, email:email}}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  // alert(JSON.stringify(values, null, 2))
                  actions.setSubmitting(false)
                }, 1000)
                console.log(values);
              }}
            >
              {(props) => (
                <Form>
                  <Field name='fname' validate={validateFname}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.fname && form.touched.fname}>
                        <FormLabel htmlFor='fname'>First name</FormLabel>
                        <Input {...field} id='fname' placeholder='Name' />
                        <FormErrorMessage>{form.errors.fname}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='lname' validate={validateLname}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.lname && form.touched.lname}>
                        <FormLabel htmlFor='lname'>Last name</FormLabel>
                        <Input {...field} id='lname' placeholder='Last Name' />
                        <FormErrorMessage>{form.errors.lname}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='email' validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.email && form.touched.email}>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input {...field} id='email' placeholder='Email' />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='password' validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.password && form.touched.password}>
                        <FormLabel>Password</FormLabel>
                        <Input {...field} type="password" id='password' placeholder='Password' />
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='confirmPassword' validate={value => confirmPassword(value.password, value)}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                        <FormLabel>Password</FormLabel>
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
{/*       
            <FormControl isRequired>
                <FormLabel color={useColorModeValue("#031e49", "gray.200")}>
                    First Name
                </FormLabel>
              <Input name="fname" placeholder="First Name" defaultValue={fname}/>
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel color={useColorModeValue("#031e49", "gray.200")}>
                    Last Name
                </FormLabel>
                <Input name="lname" placeholder="Last Name" defaultValue={lname}/>
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel color={useColorModeValue("#031e49", "gray.200")}>
                    Email
                </FormLabel>
                <Input name="email" type="email" placeholder="Email" defaultValue={email}/>
            </FormControl>

            <FormControl mt={4}>
                <FormLabel color={useColorModeValue("#031e49", "gray.200")}>
                    Biography
                </FormLabel>
                <Input name="bio" placeholder="Biography" defaultValue={bio}/>
            </FormControl>

            
            <FormControl mt={4} isRequired>
                <FormLabel color={useColorModeValue("#031e49", "gray.200")}>
                    Password
                </FormLabel>
                <Input name="password" type="password" placeholder="Password" />
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel color={useColorModeValue("#031e49", "gray.200")}>
                    Reconfirm Password
                </FormLabel>
                <Input name="re-password" type="password" placeholder="Password" />
            </FormControl>
          </ModalBody> */}

        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
