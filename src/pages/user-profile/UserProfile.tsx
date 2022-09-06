import { Formik, Form, Field } from 'formik'
import { Flex, Stack, Heading, Box, FormControl, FormLabel, Button, Input } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
//s
import { usePatchUser, useUser } from '~/hooks'
import { User } from '~/types'
import { UserAppointments } from '~/components'

interface FormValues {
  name: string
  address: string
  phone: string
}

const UserProfile = () => {
  const { user } = useUser()
  const patchUser = usePatchUser()

  if (!user) {
    return <Navigate to="/signin" />
  }

  const formElements = ['name', 'address', 'phone']

  return (
    <Flex minH="84vh" align="center" justify="center">
      <Stack spacing={8} mx="auto" w="xl" py={12} px={6}>
        <UserAppointments />
        <Stack align="center">
          <Heading>Your information</Heading>
        </Stack>
        <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
          <Formik
            enableReinitialize
            initialValues={{
              name: user?.name ?? '',
              address: user?.address ?? '',
              phone: user?.phone ?? '',
            }}
            onSubmit={(values: FormValues) => {
              patchUser({ ...user, ...values } as User)
            }}
          >
            <Form>
              {formElements.map((element) => (
                <FormControl key={element} id={element}>
                  <FormLabel>{element}</FormLabel>
                  <Field name={element} as={Input} />
                </FormControl>
              ))}
              <Button mt={6} type="submit">
                Update
              </Button>
            </Form>
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

export default UserProfile
