import { ReactNode } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Box, Button, Flex, HStack, Icon, Link } from '@chakra-ui/react'
import { GiFlowerPot } from 'react-icons/all'
//
import { useUser } from '~/hooks'
import { useAuth } from '~/auth/useAuth'

const LINKS = ['Treatments', 'Staff', 'Calendar']

const NavLink = ({ to, children }: { to: string; children: ReactNode }) => {
  return (
    <Link
      as={RouterLink}
      px={2}
      py={1}
      rounded="md"
      color="olive.200"
      _hover={{
        textDecoration: 'none',
        color: 'olive.500',
      }}
      to={to}
    >
      {children}
    </Link>
  )
}

const NavBar = () => {
  const { user } = useUser()
  const { signout } = useAuth()
  const navigate = useNavigate()

  return (
    <Box>
      <Flex h={16} alignItems="center" justify="space-between">
        <HStack spacing={8} alignItems="center">
          <NavLink to="/">
            <Icon w={8} h={8} as={GiFlowerPot} />
          </NavLink>
          <HStack as="nav" spacing={4}>
            {LINKS.map((link) => (
              <NavLink key={link} to={`/${link}`}>
                {link}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <HStack>
          {user ? (
            <>
              <NavLink to={`/user/${user.id}`}>{user.name}</NavLink>
              <Button onClick={() => signout()}>Sign out</Button>
            </>
          ) : (
            <Button onClick={() => navigate('/signin')}>Sign in</Button>
          )}
        </HStack>
      </Flex>
    </Box>
  )
}

export default NavBar
