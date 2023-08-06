import { ref } from 'vue'

interface ICenter {
  lat: undefined | number
  lng: undefined | number
}

interface IMarkers {
  position: ICenter
}
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

  const setMap = (latitude?: number, longitude?: number) => {
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
