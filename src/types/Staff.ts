import { Image } from './Image'

export type Staff = {
  id: number
  name: string
  treatmentNames: string[] // in a more robust app, these might be treatment IDs
  image: Image
}
