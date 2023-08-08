<script lang="ts">
import SearchHistoryTable from '@/components/SearchHistoryTable.vue'
import type { PropType } from 'vue'

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
    <div class="w-full justify-end flex">
      <button @click.prevent="handleRemoveHistory">
        <font-awesome-icon :icon="['fas', 'trash-can']" size="lg" />
      </button>
    </div>

    <SearchHistoryTable />
  </div>
</template>
