import { Box, Heading, RadioGroup, Radio, HStack } from '@chakra-ui/react'
//
import { useStaff, useTreatments } from '~/hooks'
import Staff from './components/Staff'

const Staffs = () => {
  const { staffs, filter, setFilter } = useStaff()
  const treatments = useTreatments()
  return (
    <Box>
      <Heading mt={10}>Our Staff</Heading>
      <HStack m={10} spacing={8} justify="center">
        {staffs.map((staffData) => (
          <Staff key={staffData.id} staff={staffData} />
        ))}
      </HStack>
      <RadioGroup onChange={setFilter} value={filter}>
        <HStack my={10} spacing={8} justify="center">
          <Heading size="md">Filter by treatment:</Heading>
          <Radio value="all">All</Radio>
          {treatments.map((t) => (
            <Radio key={t.id} value={t.name}>
              {t.name}
            </Radio>
          ))}
        </HStack>
      </RadioGroup>
    </Box>
  )
}

export default Staffs
