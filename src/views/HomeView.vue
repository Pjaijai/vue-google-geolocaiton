<template>
  <main>
    <button @click="changeTemp('asdasd')">123</button>
    <button @click.prevent="handleGetLocation">search your location</button>
    <h1>{{ temp }}</h1>
    <h2>latitude:{{ center.lat }}</h2>
    <h2>longitude:{{ center.lng }}</h2>
    <GMapAutocomplete placeholder="This is a placeholder" @place_changed="setPlace">
    </GMapAutocomplete>
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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const temp = ref<string>('temp1')
    const changeTemp = (value: string) => {
      temp.value = value
    }
    const center = ref<{ lat: number | undefined; lng: number | undefined }>({
      lat: undefined,
      lng: undefined
    })
    const markers = ref([
      {
        position: {
          lat: center.value.lat,
          lng: center.value.lng
        }
      }
    ])

    const handleGetLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          center.value.lat = position.coords.latitude
          center.value.lng = position.coords.longitude

          markers.value = [
            {
              position: {
                lat: center.value.lat,
                lng: center.value.lng
              }
            }
          ]
        },
        (error) => {
          console.error(error.message)
        }
      )
    }

    const setPlace = (e) => {}
    return { temp, changeTemp, handleGetLocation, center, markers, setPlace }
  }
})
</script>
