<template>
  <main>
    <ToolBar v-bind:handle-get-location="handleGetLocation" v-bind:set-place="setPlace" />
    <GoogleMap v-bind:center="center" v-bind:markers="markers" />
    <HistorySection v-bind:handle-remove-history="handleRemoveHistory" />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IGMapAutoCompleteReplyResponse from '../types/api/response/GMapAutoCompleteReply'
import useMap from '../hooks/useMap'
import useHistory from '../hooks/useHistory'
import ToolBar from '@/components/ToolBar.vue'
import GoogleMap from '@/components/GoogleMap.vue'
import HistorySection from '@/components/HistorySection.vue'
import { getLocationByCoordinate } from '../utils/api/getLocationByCoordinate'
export default defineComponent({
  name: 'HomeView',
  setup() {
    const temp = ref<string>('temp1')
    const { center, markers, addMarker, setCenter, removeMarkers } = useMap()
    const { history, addHistory, removeSelectedHistory, selectedHistoryId } = useHistory()
    const handleGetLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const res = await getLocationByCoordinate({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })

          const location = res.results[0]

          const matchedHistory = history.value.find((his) => his.id === location.place_id)

          if (matchedHistory) return

          addMarker({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            id: location.place_id
          })
          setCenter({ latitude: position.coords.latitude, longitude: position.coords.longitude })
          addHistory({
            address: location.formatted_address,
            id: location.place_id
          })
        },
        (error) => {
          console.error(error.message)
        }
      )
    }

    const setPlace = (value: IGMapAutoCompleteReplyResponse) => {
      const matchedHistory = history.value.find((his) => his.id === value.place_id)

      if (matchedHistory) return

      addMarker({
        latitude: value.geometry.location.lat(),
        longitude: value.geometry.location.lng(),
        id: value.place_id
      })
      setCenter({
        latitude: value.geometry.location.lat(),
        longitude: value.geometry.location.lng()
      })
      addHistory({ address: value.formatted_address, id: value.place_id })
    }

    const handleRemoveHistory = async () => {
      removeMarkers({ ids: selectedHistoryId })
      removeSelectedHistory()
    }

    return { temp, handleGetLocation, center, markers, setPlace, history, handleRemoveHistory }
  },
  components: { ToolBar, GoogleMap, HistorySection }
})
</script>
