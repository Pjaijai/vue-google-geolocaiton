<template>
  <main>
    <button @click.prevent="handleGetLocation">search your location</button>
    <h1>{{ temp }}</h1>
    <h2>latitude:{{ center.lat }}</h2>
    <h2>longitude:{{ center.lng }}</h2>

    <GMapAutocomplete
      placeholder="This is a placeholder"
      @place_changed="setPlace"
      :options="{ fields: ['geometry', 'formatted_address', 'utc_offset_minutes'] }"
    />
    <GMapMap
      :center="{ lat: center.lat, lng: center.lng }"
      :zoom="10"
      style="width: 100vw; height: 20rem"
    >
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
      />
    </GMapMap>
  </main>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import IGMapAutoCompleteReplyResponse from '../types/api/response/GMapAutoCompleteReply'
import ILocationHistoryItem from '../types/common/locationHistoryItem'
import useMap from '../hooks/useMap'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const temp = ref<string>('temp1')
    const locationHistory = reactive<ILocationHistoryItem[]>([])
    const { center, markers, setMap } = useMap()

    const handleGetLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMap({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        },
        (error) => {
          console.error(error.message)
        }
      )
    }

    const setPlace = (value: IGMapAutoCompleteReplyResponse) => {
      setMap({ latitude: value.geometry.location.lat(), longitude: value.geometry.location.lng() })
    }

    return { temp, handleGetLocation, center, markers, setPlace }
  }
})
</script>
