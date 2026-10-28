import { onBeforeUnmount, onMounted, ref } from 'vue'

const ACTIVITY = ['scroll', 'wheel', 'pointermove', 'pointerdown', 'touchstart', 'keydown']

/** 使用者超過 ms 毫秒沒有任何操作時 idle 變成 true，一有操作就恢復。 */
export function useIdle(ms = 1000) {
  const idle = ref(false)
  let timer

  function wake() {
    idle.value = false
    clearTimeout(timer)
    timer = setTimeout(() => { idle.value = true }, ms)
  }

  onMounted(() => {
    ACTIVITY.forEach(e => window.addEventListener(e, wake, { passive: true }))
    wake()
  })

  onBeforeUnmount(() => {
    ACTIVITY.forEach(e => window.removeEventListener(e, wake))
    clearTimeout(timer)
  })

  return { idle, wake }
}
