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

  const setMap = ({ latitude, longitude }: ICoordinate) => {
    center.value.lat = latitude
    center.value.lng = longitude
    markers.value[0] = {
      position: {
        lat: latitude,
        lng: longitude
      }
    }
  }

  return { center, markers, setMap }
}
