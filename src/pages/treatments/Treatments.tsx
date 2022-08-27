import { Box, Heading, HStack } from '@chakra-ui/react'
//
import { useTreatments } from '~/hooks'
//
import TreatmentCmp from './components/TreatmentCmp'

const Treatments = () => {
  const treatments = useTreatments()
  return (
    <Box>
      <Heading mt={10}>Available Treatments</Heading>
      <HStack m={10} spacing={8} justify="center">
        {treatments.map((treatmentData) => (
          <TreatmentCmp key={treatmentData.id} treatment={treatmentData} />
        ))}
      </HStack>
    </Box>
  )
}

export default Treatments
