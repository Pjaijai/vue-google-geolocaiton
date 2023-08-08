import type IGetTimZoneByCoordinate from '@/types/api/response/getTimZoneByCoordinate'
import type { ICoordinate } from '@/types/common/map'

const getTimeZoneByCoordinate = async (arg: ICoordinate) => {
  const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/timezone/json?location='
  const url = `${GOOGLE_API_URL}${arg.latitude},${arg.longitude}&timestamp=${1331161200}&key=${
    import.meta.env.VITE_GOOGLE_API_KEY
  }`
  const res = await fetch(url)
  const data: IGetTimZoneByCoordinate = await res.json()
  return data
}

export default getTimeZoneByCoordinate
