interface IGMapAutoCompleteReplyResponse {
  geometry: {
    location: {
      lat: () => number
      lng: () => number
    }
  }
  formatted_address: string
  utc_offset_minutes: number
}

export default IGMapAutoCompleteReplyResponse
