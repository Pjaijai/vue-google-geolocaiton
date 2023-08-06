<template>
  <main>
    <button @click="changeTemp('asdasd')">123</button>
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

import { defineComponent, ref } from 'vue'
import useMap from '../hooks/useMap'
export default defineComponent({
  name: 'HomeView',
  setup() {
    const temp = ref<string>('temp1')

    const { center, markers, setMap } = useMap()
    const changeTemp = (value: string) => {
      temp.value = value
    }

    const handleGetLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMap(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error(error.message)
        }
      )
    }

    const setPlace = (value: IGMapAutoCompleteReplyResponse) => {
      setMap(value.geometry.location.lat(), value.geometry.location.lng())
    }

    return { temp, changeTemp, handleGetLocation, center, markers, setPlace }
  }
})
</script>
