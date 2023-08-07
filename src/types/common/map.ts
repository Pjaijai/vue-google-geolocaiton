interface ICenter {
  lat: undefined | number
  lng: undefined | number
}

interface IMarkers {
  position: ICenter
  id: number
}

interface ICoordinate {
  longitude: undefined | number
  latitude: undefined | number
}

export { ICenter, IMarkers, ICoordinate }
