import { onBeforeUnmount, onMounted, ref } from 'vue'
import { scrollThumb } from '../utils/logic.js'

/** 追蹤元素的水平捲動，供自訂捲軸（手機的原生捲軸會自動隱藏）。 */
export function useScrollThumb(elRef) {
  const thumb = ref({ overflow: false, size: 100, offset: 0 })
  let ro

  function update() {
    const el = elRef.value
    if (el) thumb.value = scrollThumb(el.scrollLeft, el.scrollWidth, el.clientWidth)
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

  return { thumb, update }
}
