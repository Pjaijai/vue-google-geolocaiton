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
  <button @click="handleToPreviousPage">prev</button>
  <button @click="handleToNextPage">next</button>
  <h2>{{ currentPage }}/{{ maxPage }}</h2>
  <div v-for="item in displayedItems" :key="item.id">
    <input
      type="checkbox"
      @change="(e) => handleClick(e, item.id)"
      :checked="item.id in selectedHistoryId"
    />
    <div>
      {{ item.address }}
    </div>
  </div>
</template>
