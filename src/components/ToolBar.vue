<script lang="ts">
import { defineComponent, ref, type PropType, watch } from 'vue'
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
    },
    isLoading: {
      required: true,
      type: Boolean
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
    class="rounded-lg absolute left-1/2 transform -translate-x-1/2 top-[7%] md:top-2 transition-all z-10 bg-white text-black px-4 w-full md:w-fit p-2"
  >
    <div class="flex flex-row justify-center items-center w-full gap-4 transition-all">
      <button v-if="!isLoading" @click.prevent="handleGetLocation" class="p-2 hover:bg-slate-50">
        <font-awesome-icon icon="map-location-dot" />
      </button>
      <div v-else class="p-2 animate-spin">
        <font-awesome-icon icon="spinner" />
      </div>

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
