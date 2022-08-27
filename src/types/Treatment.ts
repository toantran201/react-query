import { Image } from '~/types/Image'

export type Treatment = {
  id: number
  name: string
  durationInMinutes: number
  image: Image
  description: string
}
