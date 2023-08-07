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
  <SearchHistoryTable />
  <button @click.prevent="handleRemoveHistory">button</button>
</template>
