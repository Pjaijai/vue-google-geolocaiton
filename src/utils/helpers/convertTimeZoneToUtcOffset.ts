import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

const convertTimeZoneToUtcOffset = (timeZoneId: string) => {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const timeZoneOffset = dayjs.tz(timeZoneId).utcOffset()

  return timeZoneOffset
}

export default convertTimeZoneToUtcOffset
