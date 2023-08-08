import type IGetLocationByCoordinateResponse from '@/types/api/response/GetLocationByCoordinate'
import type { ICoordinate } from '@/types/common/map'

const getLocationByCoordinate = async (arg: ICoordinate) => {
  const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
  const url = `${GOOGLE_API_URL}${arg.latitude},${arg.longitude}&key=${
    import.meta.env.VITE_GOOGLE_API_KEY
  }`
  const res = await fetch(url)
  const data: IGetLocationByCoordinateResponse = await res.json()
  return data
}

export default getLocationByCoordinate
