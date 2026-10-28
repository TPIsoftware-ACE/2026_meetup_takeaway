<script setup>
import { computed, ref } from 'vue'
import logo from '../../assets/tpi-logo.png'
import partnerBadge from '../../assets/OAI_PartnerNetwork_SelectPartner@3x.png'
import { NAV } from '../../data/content.js'
import { useSectionProgress } from '../../composables/useSectionProgress.js'
import { useScrollEdges } from '../../composables/useScrollEdges.js'

const { active, fills, lengths, percent } = useSectionProgress(NAV.map(n => n.id))
const navEl = ref(null)
const { edges, scrollByPage } = useScrollEdges(navEl)
const progressText = computed(() => `目前在「${NAV[active.value].label}」，已讀 ${percent.value}%`)
</script>

<template>
  <header class="top">
    <div class="wrap">
      <div class="brands">
        <a class="brand" href="#overview"><img :src="logo" alt="TPIsoftware" width="1528" height="188"></a>
        <img class="partner" :src="partnerBadge" alt="OpenAI Select Partner" width="1125" height="531">
      </div>
      <!-- 導覽放不下時（手機版），兩側出現箭頭提示還有其他章節 -->
      <div class="navbox" :class="{ 'can-left': edges.canLeft, 'can-right': edges.canRight }">
        <button type="button" class="nav-arrow prev" aria-label="往前捲動章節" :hidden="!edges.canLeft" @click="scrollByPage(-1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg></button>
        <nav ref="navEl" class="navlinks" aria-label="章節">
          <a v-for="(n, i) in NAV" :key="n.id" :href="'#' + n.id" :class="{ on: i === active }">{{ n.label }}</a>
        </nav>
        <button type="button" class="nav-arrow next" aria-label="往後捲動章節" :hidden="!edges.canRight" @click="scrollByPage(1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg></button>
      </div>
    </div>
    <div
      class="readbar"
      role="progressbar"
      aria-label="閱讀進度"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="percent"
      :aria-valuetext="progressText"
    >
      <!-- 鍵盤與螢幕閱讀器使用上方導覽；進度條本身只供滑鼠點擊跳段 -->
      <a
        v-for="(n, i) in NAV"
        :key="n.id"
        class="seg"
        :class="{ on: i === active, done: fills[i] >= 1 }"
        :href="'#' + n.id"
        :data-label="n.label"
        :style="{ flexGrow: lengths[i] }"
        tabindex="-1"
        aria-hidden="true"
      ><i :style="{ transform: `scaleX(${fills[i]})` }"></i></a>
    </div>
  </header>
</template>
