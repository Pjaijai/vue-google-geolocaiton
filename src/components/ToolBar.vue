<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

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
  <div
    class="rounded-lg absolute left-1/2 transform -translate-x-1/2 top-[7%] md:top-2 transition-all z-10 bg-white text-black px-4 w-full md:w-fit py-2"
  >
    <div class="flex flex-row justify-center items-center w-full gap-4">
      <button @click.prevent="handleGetLocation">locate</button>
      <GMapAutocomplete
        placeholder="Search"
        @place_changed="setPlace"
        class="focus:ring-none focus:outline-none"
      />
      <div>
        <div v-if="utcTime" class="">{{ utcTime }}</div>
        <div v-else class="text-gray-500">Local Time</div>
      </div>

      <div v-if="currentTimeZone">{{ currentTimeZone }}</div>
      <div v-else class="text-gray-500">Time Zone</div>
    </div>
  </div>
</template>
