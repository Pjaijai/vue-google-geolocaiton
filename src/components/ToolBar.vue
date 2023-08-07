<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
export default defineComponent({
  props: {
    handleGetLocation: {
      required: true,
      type: Function as PropType<() => void>
    },
    setPlace: {
      required: true,
      type: Function as () => void
    }
  },
  setup() {
    const timeZoneText = ref('')
    const handleClick = () => {
      const currentDate = new Date()

      // Get the time zone offset in minutes
      const timezoneOffset = currentDate.getTimezoneOffset()

      // Convert the time zone offset to hours
      const timezoneOffsetHours = timezoneOffset / 60

      // Convert the offset to UTC format
      const timezoneOffsetUTC = timezoneOffsetHours < 0 ? '+' : '-'
      const timezoneOffsetAbs = Math.abs(timezoneOffsetHours)
      timeZoneText.value = timezoneOffsetUTC + ('0' + timezoneOffsetAbs).slice(-2) + ':00'
    }
    return { handleClick, timeZoneText }
  }
})
</script>

<template>
  <button
    @click.prevent="
      () => {
        handleClick()
        handleGetLocation()
      }
    "
  >
    search your location
  </button>
  <GMapAutocomplete
    placeholder="This is a placeholder"
    @place_changed="setPlace"
    :options="{ fields: ['geometry', 'formatted_address', 'utc_offset_minutes', 'place_id'] }"
  />
  <div>{{ timeZoneText }}</div>
</template>
