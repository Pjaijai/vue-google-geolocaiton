<template>
  <main>
    <ToolBar
      v-bind:handle-get-location="handleGetLocation"
      v-bind:set-place="setPlace"
      v-bind:utc-offset="utcOffset"
      v-bind:current-time-zone="currentTimeZone"
    />
    <GoogleMap v-bind:center="center" v-bind:markers="markers" />
    <HistorySection v-bind:handle-remove-history="handleRemoveHistory" />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useMap from '@/hooks/useMap'
import useHistory from '@/hooks/useHistory'
import ToolBar from '@/components/ToolBar.vue'
import GoogleMap from '@/components/GoogleMap.vue'
import HistorySection from '@/components/HistorySection.vue'
import getLocationByCoordinate from '@/utils/api/getLocationByCoordinate'
import getTimeZoneByCoordinate from '@/utils/api/getTimeZoneByCoordinate'
import IGMapAutoCompleteReplyResponse from '@/types/api/response/GMapAutoCompleteReply'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
export default defineComponent({
  name: 'HomeView',
  setup() {
    const currentTimeZone = ref<string>('')
    const { center, markers, addMarker, setCenter, removeMarkers } = useMap()
    const { history, addHistory, removeSelectedHistory, selectedHistoryId } = useHistory()
    const utcOffset = ref<number>(0)

    const handleGetLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const res = await getLocationByCoordinate({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })

          const time = await getTimeZoneByCoordinate({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })

          const location = res.results[0]

          dayjs.extend(utc)
          dayjs.extend(timezone)

          const timeZoneId = 'Europe/London'
          const currentDate = dayjs()
          const timeZoneOffset = currentDate.tz(timeZoneId).utcOffset()

          currentTimeZone.value = time.timeZoneId
          utcOffset.value = timeZoneOffset

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
          alert('Please allow Geolocation')
          console.error(error.message)
        }
      )
    }

    const setPlace = async (value: IGMapAutoCompleteReplyResponse) => {
      utcOffset.value = value.utc_offset_minutes

      const time = await getTimeZoneByCoordinate({
        latitude: value.geometry.location.lat(),
        longitude: value.geometry.location.lng()
      })

      currentTimeZone.value = time.timeZoneId

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

    return {
      handleGetLocation,
      center,
      markers,
      setPlace,
      history,
      handleRemoveHistory,
      utcOffset,
      currentTimeZone
    }
  },
  components: { ToolBar, GoogleMap, HistorySection }
})
</script>
