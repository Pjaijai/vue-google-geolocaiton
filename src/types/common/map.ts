interface ICenter {
  lat: undefined | number
  lng: undefined | number
}

interface IMarkers {
  position: ICenter
  id: string
}

interface ICoordinate {
  longitude: undefined | number
  latitude: undefined | number
}

export type { ICenter, IMarkers, ICoordinate }
