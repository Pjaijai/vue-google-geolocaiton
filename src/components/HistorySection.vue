<script lang="ts">
import SearchHistoryTable from '@/components/SearchHistoryTable.vue'
import { PropType } from 'vue'
export default {
  props: {
    handleRemoveHistory: {
      required: true,
      type: Function as PropType<(e: MouseEvent) => void>
    }
  },
  components: { SearchHistoryTable }
}
</script>

<template>
  <div
    class="absolute right-[3%] top-[10%] text-black rounded-lg p-4 w-60 h-3/4 opacity-50 hover:opacity-100 transition-all bg-white"
  >
    <button @click.prevent="handleRemoveHistory">button</button>
    <SearchHistoryTable />
  </div>
</template>
