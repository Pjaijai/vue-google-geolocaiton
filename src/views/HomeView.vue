<template>
  <main>
    <SearchHistory />
    <button @click.prevent="handleGetLocation">search your location</button>
    <h1>{{ temp }}</h1>
    <h2>latitude:{{ center.lat }}</h2>
    <h2>longitude:{{ center.lng }}</h2>
    <button @click.prevent="remove">button</button>
    <GMapAutocomplete
      placeholder="This is a placeholder"
      @place_changed="setPlace"
      :options="{ fields: ['geometry', 'formatted_address', 'utc_offset_minutes'] }"
    />
    <GMapMap
      :center="{ lat: center.lat, lng: center.lng }"
      :zoom="10"
      style="width: 50vw; height: 20rem"
    >
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
      />
    </GMapMap>
    <SearchHistoryTable />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IGMapAutoCompleteReplyResponse from '../types/api/response/GMapAutoCompleteReply'
import useMap from '../hooks/useMap'
import useHistory from '../hooks/useHistory'
import SearchHistoryTable from '@/components/SearchHistoryTable.vue'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const temp = ref<string>('temp1')
    const { center, markers, addMarker, setCenter, removeMarkers } = useMap()
    const { history, addHistory, removeSelectedHistory, selectedHistoryId } = useHistory()
    const handleGetLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          addMarker({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            id: Math.random()
          })
          setCenter({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        },
        (error) => {
          console.error(error.message)
        }
      )
    }
    const setPlace = (value: IGMapAutoCompleteReplyResponse) => {
      const id = ref(Math.random())
      addMarker({
        latitude: value.geometry.location.lat(),
        longitude: value.geometry.location.lng(),
        id: id.value
      })
      setCenter({
        latitude: value.geometry.location.lat(),
        longitude: value.geometry.location.lng()
      })
      addHistory({ address: value.formatted_address, id: id.value })
    }

    const remove = async () => {
      removeMarkers({ ids: selectedHistoryId })
      removeSelectedHistory()
    }

    return { temp, handleGetLocation, center, markers, setPlace, history, remove }
  },
  components: { SearchHistoryTable }
})
</script>
