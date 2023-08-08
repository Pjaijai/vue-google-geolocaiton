import type { ILocationHistoryItem } from '@/types/common/locationHistoryItem'
import { reactive, ref } from 'vue'
const history = ref<ILocationHistoryItem[]>([])
const selectedHistoryId = reactive<Set<string>>(new Set())
export default function useHistory() {
  const addHistory = ({ address, id }: { address: string; id: string }) => {
    history.value.unshift({
      address,
      id
    })
  }

  const removeAllSelectedHistoryIds = () => {
    selectedHistoryId.clear()
  }

  const addSelectedHistoryId = ({ id }: { id: string }) => {
    selectedHistoryId.add(id)
  }

  const removeSelectedHistoryId = ({ id }: { id: string }) => {
    selectedHistoryId.delete(id)
  }
  const removeSelectedHistory = () => {
    history.value = history.value.filter((his) => {
      return !selectedHistoryId.has(his.id)
    })
  }
  return {
    history,
    addHistory,
    addSelectedHistoryId,
    removeSelectedHistoryId,
    selectedHistoryId,
    removeSelectedHistory,
    removeAllSelectedHistoryIds
  }
}
