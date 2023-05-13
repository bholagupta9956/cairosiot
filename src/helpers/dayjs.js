import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import isBetween from 'dayjs/plugin/isBetween'

const dayjsUTC = dayjs.extend(utc)

export default dayjsUTC.extend(isBetween)