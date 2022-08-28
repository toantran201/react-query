export type Appointment = {
  id: number
  dateTime: Date
  treatmentName: string
  userId?: number
}

export type AppointmentDateMap = Record<number, Appointment[]>
