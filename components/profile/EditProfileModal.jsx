/* eslint-disable react-hooks/rules-of-hooks */
import { EditIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useRef } from 'react';
import * as Yup from 'yup';
import userAPI from '../../api/services/userAPI';

import { sign } from 'jsonwebtoken';
import md5 from 'md5';
import { useRouter } from 'next/router';

const EditProfileModal = ({ id, fname, lname, email, description }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = useRef();
  const finalRef = useRef();
  const initialValues = {
    fname: fname,
    lname: lname,
    email: email,
    description: description,
    password: '',
  };

  const onSubmit = async (values, actions) => {
    try {
      // get password confirm value from user -> verify with login method
      const verifyData = { email: email, password: values.password };
      const loginServiceStatus = await userAPI.login(verifyData);

      // successfully verify password
      if (!loginServiceStatus.data.isSuccess)
        throw `Incorrect confirm password`;

      // update new user info
      const updateData = {
        email: values.email,
        firstName: values.fname,
        lastName: values.lname,
      };
      const updateServiceStatus = await userAPI.putUser(id, updateData);

      // update data failure
      if (updateServiceStatus.status !== 200)
        throw `There has been an error updating your profile: ${updateServiceStatus.statusText}`;

      // handle jwt authentication if login is successful
      const claims = await {
        logUserId: id,
        firstName: values.fname,
        lastName: values.lname,
        email: values.email,
      };
      const jwt = await sign(claims, md5('EmChiXemAnhLa_#BanNhauMaThoi'), {
        expiresIn: '1h',
      });

      // login with current sign in data
      await fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: jwt }),
      });

      await toast({
        title: 'Update Profile',
        description: 'Your profile has been updated. Refreshing ...',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      await onClose();
      setTimeout(() => {
        router.reload();
      }, 2000);
    } catch (error) {
      await toast({
        title: 'Update Profile',
        description:
          typeof error !== 'string'
            ? 'Server error, cannot update profile info'
            : error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const validationSchema = Yup.object({
    fname: Yup.string()
      .min(2, 'Must be more than 1 character')
      .required('Required'),
    lname: Yup.string()
      .min(2, 'Must be more than 1 character')
      .required('Required'),
    email: Yup.string()
      .min(2, 'Must be more than 1 character')
      .required('Required')
      .email('Invalid email'),
    password: Yup.string().required('Please confirm your password'),
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
        onClose={onClose}
        fg
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader color={useColorModeValue('#031e49', 'gray.200')}>
            Edit Profile
          </ModalHeader>
          <ModalCloseButton color={useColorModeValue('#031e49', 'gray.200')} />
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
                          color={useColorModeValue('#031d46', '#fffdfe')}
                        >
                          First Name
                        </FormLabel>
                        <Input
                          {...field}
                          id="fname"
                          placeholder="Name"
                          color={useColorModeValue('#031e49', '#fffdfe')}
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
                          color={useColorModeValue('#031e49', '#fffdfe')}
                        >
                          Last Name
                        </FormLabel>
                        <Input
                          {...field}
                          id="lname"
                          placeholder="Last Name"
                          color={useColorModeValue('#031e49', '#fffdfe')}
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
                          color={useColorModeValue('#031e49', '#fffdfe')}
                        >
                          Email
                        </FormLabel>
                        <Input
                          {...field}
                          id="email"
                          placeholder="Email"
                          color={useColorModeValue('#031e49', '#fffdfe')}
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="description">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel
                          htmlFor="lname"
                          pt={2}
                          color={useColorModeValue('#031e49', '#fffdfe')}
                        >
                          Description
                        </FormLabel>
                        <Input
                          {...field}
                          id="Description"
                          placeholder="Description"
                          color={useColorModeValue('#031e49', '#fffdfe')}
                        />
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
                          color={useColorModeValue('#031e49', '#fffdfe')}
                        >
                          Current Password
                        </FormLabel>
                        <Input
                          {...field}
                          type="password"
                          id="password"
                          placeholder="Password"
                          color={useColorModeValue('#031e49', '#fffdfe')}
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
