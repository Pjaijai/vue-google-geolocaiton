<script lang="ts">
import useHistory from '@/hooks/useHistory'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SearchHistoryTable',

  setup() {
    const {
      addHistory,
      history,
      removeSelectedHistoryId,
      addSelectedHistoryId,
      selectedHistoryId
    } = useHistory()

    const handleClick = (e: Event, id: string) => {
      const target = e.target as HTMLInputElement
      if (target.value === 'on') {
        addSelectedHistoryId({ id })
      } else {
        removeSelectedHistoryId({ id })
      }
    }

    const currentPage = ref(1)
    const itemsPerPage = ref(10)

    const maxPage = computed(() => {
      const page = Math.ceil(history.value.length / itemsPerPage.value)
      return page > 0 ? page : 1
    })
    const handleToPreviousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value = currentPage.value - 1
      }
    }

    const handleToNextPage = () => {
      if (currentPage.value < maxPage.value) {
        currentPage.value = currentPage.value + 1
      }
    }

    const displayedItems = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value
      const endIndex = startIndex + itemsPerPage.value
      return history.value.slice(startIndex, endIndex)
    })

    return {
      removeSelectedHistoryId,
      addHistory,
      history,
      addSelectedHistoryId,
      handleClick,
      selectedHistoryId,
      displayedItems,
      handleToPreviousPage,
      handleToNextPage,
      maxPage,
      currentPage
    }
  }
})
</script>

<template>
  <div class="relative w-full h-full">
    <div v-if="displayedItems.length" class="w-full h-[90%] overflow-x-auto rounded-lg">
      <div
        v-for="item in displayedItems"
        :key="item.id"
        class="w-full flex flex-row items-center p-2 h-fit text-base border-b"
      >
        <input
          type="checkbox"
          @change="(e) => handleClick(e, item.id)"
          :checked="item.id in selectedHistoryId"
          class="flex-none rounded-sm border-2"
        />
        <div class="flex-1 text-center">
          {{ item.address }}
        </div>
      </div>
    </div>
    <div
      v-if="!displayedItems.length"
      class="text-gray-500 font-semibold absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      No Record
    </div>

    <div class="absolute bottom-5 w-full">
      <div class="flex flex-row items-center justify-around">
        <button @click="handleToPreviousPage">p</button>
        <h2>{{ currentPage }}/{{ maxPage }}</h2>
        <button @click="handleToNextPage">n</button>
      </div>
    </div>
  </div>
</template>
