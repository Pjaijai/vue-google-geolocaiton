import { ref } from 'vue'
import { ICenter, IMarkers, ICoordinate } from '@/types/common/map'

interface IAddMarker extends ICoordinate {
  id: string
}
export default function useMap() {
  // The initial center is Toronto
  const center = ref<ICenter>({ lat: 43.6532, lng: -79.3832 })
  const markers = ref<IMarkers[]>([])

  const setCenter = ({ latitude, longitude }: ICoordinate) => {
    center.value.lat = latitude
    center.value.lng = longitude
  }

  const addMarker = ({ latitude, longitude, id }: IAddMarker) => {
    markers.value.push({
      position: {
        lat: latitude,
        lng: longitude
      },
      id: id
    })
  }

  const removeMarkers = ({ ids }: { ids: Set<string> }) => {
    markers.value = markers.value.filter((marker) => {
      return !ids.has(marker.id)
    })
  }
  return { center, markers, addMarker, setCenter, removeMarkers }
}
