import { Text } from '@chakra-ui/react'
import { Staff as StaffType } from '~/types'
import { Card } from '~/components'

type StaffProps = {
  staff: StaffType
}

const Staff = ({ staff }: StaffProps) => {
  const cardContents = <Text align="center">{staff.treatmentNames.join(', ')}</Text>

  return <Card itemName={staff.name} image={staff.image} cardContents={cardContents} />
}

export default Staff
