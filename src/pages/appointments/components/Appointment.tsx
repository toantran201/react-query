import dayjs from 'dayjs'
import { Box, HStack, Text } from '@chakra-ui/react'
//
import { Appointment as AppointmentType, User } from '~/types'
import { useReserveAppointment, useUser } from '~/hooks'
//
import { appointmentInPast, getAppointmentColor } from '../helpers/index'

type AppointmentProps = {
  appointment: AppointmentType
}

function isClickable(user: User | null, appointmentData: AppointmentType): boolean {
  return !!(
    user?.id &&
    (!appointmentData.userId || appointmentData.userId === user?.id) &&
    !appointmentInPast(appointmentData)
  )
}

const Appointment = ({ appointment }: AppointmentProps) => {
  const { user } = useUser()
  const reserveAppointment = useReserveAppointment()
  const [textColor, bgColor] = getAppointmentColor(appointment, user?.id)

  const clickable = isClickable(user, appointment)
  let onAppointmentClick: undefined | (() => void)
  let hoverCss = {}

  if (clickable) {
    onAppointmentClick = user ? () => reserveAppointment(appointment) : undefined
    hoverCss = {
      transform: 'translateY(-1px)',
      boxShadow: 'md',
      cursor: 'pointer',
    }
  }

  const appointmentHour = dayjs(appointment.dateTime).format('h a')
  return (
    <Box
      borderRadius="lg"
      px={2}
      bgColor={bgColor}
      color={textColor}
      as={clickable ? 'button' : 'div'}
      onClick={onAppointmentClick}
      _hover={hoverCss}
    >
      <HStack justify="space-between">
        <Text as="span" fontSize="xs">
          {appointmentHour}
        </Text>
        <Text as="span" fontSize="xs">
          {appointment.treatmentName}
        </Text>
      </HStack>
    </Box>
  )
}

export default Appointment
