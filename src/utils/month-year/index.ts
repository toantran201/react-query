import { MonthYear } from '~/types/MonthYear'
import dayjs from 'dayjs'

export const getUpdatedMonthYear = (monthYear: MonthYear, monthIncrement: number): dayjs.Dayjs => {
  return monthYear.startDate.clone().add(monthIncrement, 'months')
}

export const getMonthYearDetails = (initialDate: dayjs.Dayjs): MonthYear => {
  const month = initialDate.format('MM')
  const year = initialDate.format('YYYY')
  const startDate = dayjs(`${year}${month}01`)
  const firstDOW = Number(startDate.format('d'))
  const lastDate = Number(startDate.clone().endOf('month').format('DD'))
  const monthName = startDate.format('MMMM')
  return { startDate, firstDOW, lastDate, monthName, month, year }
}

export function getNewMonthYear(prevData: MonthYear, monthIncrement: number): MonthYear {
  // update the monthYear by the specified increment
  const newMonthYear = getUpdatedMonthYear(prevData, monthIncrement)

  // return object with the details for the new monthYear
  return getMonthYearDetails(newMonthYear)
}
