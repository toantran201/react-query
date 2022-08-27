import { Person } from '~/types'

type PersonProps = {
  person: Person
}
const PersonItem = ({ person }: PersonProps) => {
  return (
    <li>
      {person.name}
      <ul>
        <li>Hair: {person.hair_color}</li>
        <li>Eyes: {person.eye_color}</li>
      </ul>
    </li>
  )
}

export default PersonItem
