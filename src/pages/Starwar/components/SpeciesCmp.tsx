import { Species } from '~/types'

type SpeciesProps = {
  species: Species
}

const SpeciesCmp = ({ species }: SpeciesProps) => {
  return (
    <li>
      {species.name}
      <ul>
        <li>Language: {species.language}</li>
        <li>Average lifespan: {species.average_lifespan}</li>
      </ul>
    </li>
  )
}

export default SpeciesCmp
