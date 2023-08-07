export default interface IGetLocationByCoordinateResponse {
  results: {
    formatted_address: string
    place_id: string
  }[]
}
