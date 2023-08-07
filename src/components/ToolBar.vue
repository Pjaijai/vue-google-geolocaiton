<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
export default defineComponent({
  props: {
    handleGetLocation: {
      required: true,
      type: Function as PropType<() => void>
    },
    setPlace: {
      required: true,
      type: Promise<void>
    },
    utcOffset: {
      required: true,
      type: Number
    },
    currentTimeZone: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const utcTime = ref('')

    dayjs.extend(utc)
    // dayjs.extend(timezone)
    watch(
      () => props.utcOffset,
      (newOffset) => {
        utcTime.value = dayjs().utcOffset(newOffset).format('HH:mm:ss')
      }
    )

    return {
      utcTime
    }
  }
})
</script>

<template>
  <button @click.prevent="handleGetLocation">search your location</button>
  <GMapAutocomplete placeholder="This is a placeholder" @place_changed="setPlace" />
  <div>{{ utcTime }}</div>
  <div>{{ currentTimeZone }}</div>
</template>
