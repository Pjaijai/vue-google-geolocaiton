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
  <div class="w-screen h-screen absolute z-0">
    <GMapMap :center="{ lat: center.lat, lng: center.lng }" :zoom="10" class="w-full h-full">
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
      />
    </GMapMap>
  </div>
</template>
