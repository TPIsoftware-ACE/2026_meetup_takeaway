import { onBeforeUnmount, onMounted, ref } from 'vue'
import { scrollEdges } from '../utils/logic.js'

/** 追蹤元素水平捲動的兩端，決定左右箭頭是否顯示。 */
export function useScrollEdges(elRef) {
  const edges = ref({ overflow: false, canLeft: false, canRight: false })
  let ro

  function update() {
    const el = elRef.value
    if (el) edges.value = scrollEdges(el.scrollLeft, el.scrollWidth, el.clientWidth)
  }

  /** 往左（-1）或往右（1）捲動約 60% 的可視寬度。 */
  function scrollByPage(dir) {
    const el = elRef.value
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: 'smooth' })
  }

  onMounted(() => {
    elRef.value?.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    if ('ResizeObserver' in window && elRef.value) {
      ro = new ResizeObserver(update)
      ro.observe(elRef.value)
    }
    update()
  })

  onBeforeUnmount(() => {
    elRef.value?.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
    ro?.disconnect()
  })

  return { edges, update, scrollByPage }
}
