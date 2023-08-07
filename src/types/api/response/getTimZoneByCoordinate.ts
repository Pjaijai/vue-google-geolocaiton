export default interface IGetTimZoneByCoordinate {
  dstOffset: number
  rawOffset: number
  status: boolean
  timeZoneId: string
  timeZoneName: string
}
