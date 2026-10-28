import { onBeforeUnmount, onMounted, ref } from 'vue'

/** 回傳目前捲動到的章節索引（章節頂端超過視窗頂端 120px 即視為進入）。 */
export function useActiveSection(ids, offset = 120) {
  const active = ref(0)

  function update() {
    const y = window.scrollY + offset
    let cur = 0
    ids.forEach((id, i) => {
      const el = document.getElementById(id)
      if (el && el.offsetTop <= y) cur = i
    })
    active.value = cur
  }

  onMounted(() => {
    window.addEventListener('scroll', update, { passive: true })
    update()
  })
  onBeforeUnmount(() => window.removeEventListener('scroll', update))

  return { active, update }
}
