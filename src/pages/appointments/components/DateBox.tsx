import { Box, Stack, Text } from '@chakra-ui/react'
//
import { Appointment as AppointmentType } from '~/types'
//
import Appointment from './Appointment'

type DateBoxProps = {
  date: number
  gridColumn?: number
  appointments?: AppointmentType[]
}
const DateBox = ({ date, gridColumn, appointments = [] }: DateBoxProps) => {
  return (
    <Box w="100%" h={20} bg="olive.50" gridColumnStart={gridColumn} boxShadow="md" rounded="md">
      <Stack m={2} spacing={1}>
        <Text fontSize="xs" textAlign="right">
          {date}
        </Text>
        {appointments.map((appointment) => (
          <Appointment key={appointment.id} appointment={appointment} />
        ))}
      </Stack>
    </Box>
  )
}

export default DateBox
