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
import { useRouter } from 'next/router';
import { useRef } from 'react';
import * as Yup from 'yup';
import userAPI from '../../api/services/userAPI';
import { sha512_256 } from 'js-sha512';

const EditPasswordModal = ({ id, email }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const initialRef = useRef();
  const finalRef = useRef();
  const initialValues = {};

  const onSubmit = async (values, actions) => {
    try {
      // get password confirm value from user -> verify with login method
      const verifyData = {
        email: email,
        password: sha512_256(values.oldPassword),
      };
      const loginServiceStatus = await userAPI.login(verifyData);

      // successfully verify password
      if (!loginServiceStatus.data.isSuccess)
        throw `Incorrect confirm password`;

      // update new user info
      const updateData = { password: sha512_256(values.newPassword) };
      const updateServiceStatus = await userAPI.putUser(id, updateData);

      // update data failure
      if (updateServiceStatus.status !== 200)
        throw `There has been an error updating your password: ${updateServiceStatus.statusText}`;

      await toast({
        title: 'Update Password',
        description: 'Your password has been updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      await toast({
        title: 'Update Password',
        description:
          typeof error !== 'string'
            ? 'Server error, cannot update password'
            : error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Required'),
    newPassword: Yup.string()
      .min(8, 'Must be more than 8 characters')
      .required('Required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&])[A-Za-z\d_@$!%*?&]{8,}$/,
        'At least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
      ),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match'),
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
        onClose={onClose}
        fg
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader color={useColorModeValue('#031e49', 'gray.200')}>
            Change Password
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
                  <Field name="oldPassword">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.oldPassword && form.touched.oldPassword
                        }
                      >
                        <FormLabel
                          htmlFor="oldPassword"
                          pt={2}
                          color={useColorModeValue('#031e49', '#fffdfe')}
                        >
                          Current Password
                        </FormLabel>
                        <Input
                          {...field}
                          type="password"
                          id="oldPassword"
                          placeholder="Current Password"
                          color={useColorModeValue('#031e49', '#fffdfe')}
                        />
                        <FormErrorMessage>
                          {form.errors.oldPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="newPassword">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.newPassword && form.touched.newPassword
                        }
                      >
                        <FormLabel
                          pt={2}
                          color={useColorModeValue('#031e49', '#fffdfe')}
                        >
                          New Password
                        </FormLabel>
                        <Input
                          {...field}
                          type="password"
                          id="newPassword"
                          placeholder="New Password"
                          color={useColorModeValue('#031e49', '#fffdfe')}
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
                          color={useColorModeValue('#031e49', '#fffdfe')}
                        >
                          Confirm Password
                        </FormLabel>
                        <Input
                          {...field}
                          type="password"
                          id="confirmPassword"
                          placeholder="Confirm password"
                          color={useColorModeValue('#031e49', '#fffdfe')}
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
