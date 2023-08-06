import { ref } from 'vue'
import { ICenter, IMarkers, ICoordinate } from '../types/common/map'

export default function useMap() {
  const center = ref<ICenter>({ lat: undefined, lng: undefined })
  const markers = ref<IMarkers[]>([
    {
      position: {
        lat: undefined,
        lng: undefined
      }
    }
  ])

  const setCenter = ({ latitude, longitude }: ICoordinate) => {
    center.value.lat = latitude
    center.value.lng = longitude
  }

  const addMarker = ({ latitude, longitude }: ICoordinate) => {
    markers.value.push({
      position: {
        lat: latitude,
        lng: longitude
      }
    })
  }

  return { center, markers, addMarker, setCenter }
}
