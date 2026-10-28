import { onBeforeUnmount, onMounted } from 'vue'

export const REVEAL_SELECTOR = '.hero .wrap > *, .chap-head, .block, .closing .wrap > *'

/**
 * 捲動進入畫面時淡入。只在支援 IntersectionObserver 且未要求減少動態時啟用；
 * 未啟用時內容維持原樣顯示。
 */
export function useReveal(selector = REVEAL_SELECTOR) {
  let io

  onMounted(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!('IntersectionObserver' in window) || reduced) return

    const els = Array.from(document.querySelectorAll(selector))
    document.querySelectorAll('.hero .wrap > *').forEach((el, i) => el.style.setProperty('--d', `${i * 0.08}s`))
    els.forEach(el => el.classList.add('rv'))
    document.documentElement.classList.add('rv-on')

    io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in')
        io.unobserve(en.target)
      }
    }), { rootMargin: '0px 0px -6% 0px' })
    els.forEach(el => io.observe(el))
  })

  onBeforeUnmount(() => io?.disconnect())
}
