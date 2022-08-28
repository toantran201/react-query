import dayjs from 'dayjs'

export type MonthYear = {
  startDate: dayjs.Dayjs // first day of the month
  firstDOW: number // day of week; 0 === Sunday
  lastDate: number // last date of the month
  monthName: string // name of the month
  month: string // two digits month number
  year: string // four digit year
}
