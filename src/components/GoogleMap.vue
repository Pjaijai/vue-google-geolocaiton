<script lang="ts">
import { PropType } from 'vue'
import { ICenter, IMarkers } from '@/types/common/map'
export default {
  props: {
    center: {
      required: true,
      type: Object as PropType<ICenter>
    },
    markers: {
      required: true,
      type: Array as PropType<IMarkers[]>
    }
  }
}
</script>

<template>
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
</template>
