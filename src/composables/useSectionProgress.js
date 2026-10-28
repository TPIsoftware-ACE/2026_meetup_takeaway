import { onBeforeUnmount, onMounted, ref } from 'vue'
import { readingPosition, sectionProgress } from '../utils/logic.js'

/** 頁首下緣再往下多少 px 才算「進入」章節；需大於錨點的 scroll-padding-top。 */
const ENTER_OFFSET = 56

/**
 * 追蹤閱讀進度：目前章節、每個章節的填滿比例與長度，以及整體百分比。
 * 第一個章節從頁面頂端算起，最後一個章節延伸到頁面底部。
 */
export function useSectionProgress(ids) {
  const active = ref(0)
  const fills = ref(ids.map(() => 0))
  const lengths = ref(ids.map(() => 1))
  const percent = ref(0)
  let raf = 0
  let ro

  function update() {
    raf = 0
    const starts = []
    ids.forEach((id, i) => {
      const el = document.getElementById(id)
      starts.push(i === 0 ? 0 : el ? el.offsetTop : starts[i - 1])
    })
    const header = document.querySelector('header')
    const docHeight = document.documentElement.scrollHeight
    const pos = readingPosition(window.scrollY, window.innerHeight, docHeight, (header?.offsetHeight || 0) + ENTER_OFFSET)
    const r = sectionProgress(starts, docHeight, pos)
    active.value = r.active
    fills.value = r.fills
    lengths.value = r.lengths
    percent.value = r.percent
  }

  function schedule() {
    if (!raf) raf = requestAnimationFrame(update)
  }

  onMounted(() => {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    // 切換分頁等操作會改變章節高度
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(schedule)
      ro.observe(document.body)
    }
    update()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    ro?.disconnect()
    if (raf) cancelAnimationFrame(raf)
  })

  return { active, fills, lengths, percent, update }
}
