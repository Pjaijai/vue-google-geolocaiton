<script lang="ts">
import { PropType } from 'vue'
export default {
  props: {
    handleGetLocation: {
      required: true,
      type: Function as PropType<(e: MouseEvent) => void>
    },
    setPlace: {
      required: true,
      type: Function as () => void
    }
  }
}
</script>

<template>
  <button @click.prevent="handleGetLocation">search your location</button>
  <GMapAutocomplete
    placeholder="This is a placeholder"
    @place_changed="setPlace"
    :options="{ fields: ['geometry', 'formatted_address', 'utc_offset_minutes'] }"
  />
</template>
