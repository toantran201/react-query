import { Link } from 'react-router-dom'
import { Box, Center, Heading, IconButton, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { ImCancelCircle } from 'react-icons/all'
//
import { useCancelAppointment, useUser, useUserAppointments } from '~/hooks'
import { Appointment } from '~/types'

type AppointmentsTableProps = {
  userAppointments: Appointment[]
}

const AppointmentsTable = ({ userAppointments }: AppointmentsTableProps) => {
  const cancelAppointment = useCancelAppointment()
  return (
    <Table variant="simple" m={10} maxWidth="500px">
      <Tbody>
        {userAppointments.map((appointment) => (
          <Tr key={appointment.id}>
            <Td>
              <Text>{dayjs(appointment.dateTime).format('MMM D')}</Text>
            </Td>
            <Td>
              <Text>{dayjs(appointment.dateTime).format('h a')}</Text>
            </Td>
            <Td>
              <Text>{appointment.treatmentName}</Text>
            </Td>
            <Td>
              <IconButton
                aria-label="cancel appointment"
                onClick={() => {
                  cancelAppointment(appointment)
                }}
                icon={<ImCancelCircle />}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

const UserAppointments = () => {
  const { user } = useUser()
  const userAppointments = useUserAppointments()

  if (!user) return null

  return (
    <Box>
      <Heading mt={10} textAlign="center">
        Your appointments
      </Heading>
      <Center>{userAppointments.length > 0 ? <></> : <Link to="/Calendar">Book an appointment</Link>}</Center>
    </Box>
  )
}

export default UserAppointments
