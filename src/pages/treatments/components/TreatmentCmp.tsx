import { Text } from '@chakra-ui/react'
//
import { Treatment } from '~/types'
import { Card } from '~/components'

type TreatmentProps = {
  treatment: Treatment
}

const TreatmentCmp = ({ treatment }: TreatmentProps) => {
  const cardContents = <Text>{treatment.description}</Text>

  return <Card itemName={treatment.name} image={treatment.image} cardContents={cardContents} />
}

export default TreatmentCmp
