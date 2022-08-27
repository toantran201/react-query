import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
} from '@chakra-ui/react'
//
import { useUser } from '~/hooks'
import { useAuth } from '~/auth/useAuth'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dirty, setDirty] = useState({ email: false, password: false })
  const { user } = useUser()
  const auth = useAuth()

  const onSignIn = () => {
    auth.signin(email, password)
  }

  const onSignUp = () => {
    auth.signup(email, password)
  }

  if (user) {
    return <Navigate to={`/user/${user.id}`} />
  }

  return (
    <Flex minH="84vh" align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading>Sign in to your account</Heading>
        </Stack>
        <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired isInvalid={!email && dirty.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setDirty((prevDirty) => ({ ...prevDirty, email: true }))}
              />
              <FormErrorMessage>Email may not be blank</FormErrorMessage>
            </FormControl>
            <FormControl id="password" isRequired isInvalid={!password && dirty.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setDirty((prevDirty) => ({ ...prevDirty, password: true }))}
              />
              <FormErrorMessage>Password may not be blank</FormErrorMessage>
            </FormControl>
            <HStack spacing={2} width="100%">
              <Button variant="outline" type="submit" isDisabled={!email || !password} onClick={onSignUp}>
                Sign up
              </Button>
              <Button type="submit" isDisabled={!email || !password} onClick={onSignIn}>
                Sign in
              </Button>
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SignIn
