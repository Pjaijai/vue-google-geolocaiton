<template>
  <main>
    <SearchHistory />
    <button @click.prevent="handleGetLocation">search your location</button>
    <ToolBar v-bind:handle-get-location="handleGetLocation" v-bind:set-place="setPlace" />
    <button @click.prevent="remove">button</button>
    <GoogleMap v-bind:center="center" v-bind:markers="markers" />
    <SearchHistoryTable />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IGMapAutoCompleteReplyResponse from '../types/api/response/GMapAutoCompleteReply'
import useMap from '../hooks/useMap'
import useHistory from '../hooks/useHistory'
import SearchHistoryTable from '@/components/SearchHistoryTable.vue'
import ToolBar from '@/components/ToolBar.vue'
import GoogleMap from '@/components/GoogleMap.vue'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const temp = ref<string>('temp1')
    const { center, markers, addMarker, setCenter, removeMarkers } = useMap()
    const { history, addHistory, removeSelectedHistory, selectedHistoryId } = useHistory()
    const handleGetLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const id = Math.random()
          addMarker({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            id
          })
          setCenter({ latitude: position.coords.latitude, longitude: position.coords.longitude })
          addHistory({ address: `${position.coords.latitude},${position.coords.longitude}`, id })
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
  components: { SearchHistoryTable, ToolBar, GoogleMap }
})
</script>
