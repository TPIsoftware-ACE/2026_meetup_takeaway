<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { showBackToTop } from '../../utils/logic.js'
import { useIdle } from '../../composables/useIdle.js'

const visible = ref(false)
// 靜置 1 秒後在手機版變淡（樣式見 main.css），避免擋住閱讀
const { idle } = useIdle(1000)

function update() { visible.value = showBackToTop(window.scrollY) }
// 捲動行為交給 html 的 scroll-behavior；系統要求減少動態時會直接跳回頂端
function toTop() { window.scrollTo({ top: 0 }) }

onMounted(() => {
  window.addEventListener('scroll', update, { passive: true })
  update()
})
onBeforeUnmount(() => window.removeEventListener('scroll', update))
</script>

<template>
  <button
    type="button"
    class="to-top"
    :class="{ show: visible, idle }"
    :tabindex="visible ? 0 : -1"
    :aria-hidden="!visible"
    aria-label="回到頁首"
    @click="toTop"
  ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></svg></button>
</template>
