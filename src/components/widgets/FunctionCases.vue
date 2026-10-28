<script setup>
import { computed, ref } from 'vue'
import TabList from '../common/TabList.vue'
import { FN, FN_TABS } from '../../data/content.js'
import { formatDuration } from '../../utils/logic.js'

const tab = ref('pm')
const f = computed(() => FN[tab.value])
const after = computed(() => f.value.afterMin === undefined ? '' : formatDuration(f.value.afterMin))
const afterWidth = computed(() => `${Math.max(f.value.afterMin / f.value.beforeMin * 100, 0.8)}%`)
</script>

<template>
  <TabList v-model="tab" :tabs="FN_TABS" />
  <div class="split">
    <div class="card" style="display:grid;gap:12px;align-content:start;min-width:0">
      <b style="font-size:18px">{{ f.title }}</b>
      <span class="eyebrow">BEFORE</span>
      <p class="beforeline">{{ f.before }}</p>
      <span class="eyebrow">AFTER</span>
      <div class="flow">
        <template v-for="(n, i) in f.flow" :key="i">
          <span v-if="i" class="arrow" aria-hidden="true">→</span>
          <div class="node" :data-who="n[0]"><span class="who">{{ n[1] }}</span><span class="nm">{{ n[2] }}</span></div>
        </template>
      </div>
    </div>
    <div class="card" style="display:grid;gap:14px;align-content:start">
      <div v-if="f.beforeMin" class="metric">
        <span class="eyebrow">實際效益</span>
        <span class="num big">1 小時<small>→</small>{{ after }}</span>
        <span class="small">時間節省 {{ f.pct }}　效率提升 {{ f.x }}</span>
        <div class="timebar">
          <div class="r before"><span>Before</span><div class="t"><i style="width:100%"></i></div><span>60 分</span></div>
          <div class="r after"><span>After</span><div class="t"><i :style="{ width: afterWidth }"></i></div><span>{{ after }}</span></div>
        </div>
      </div>
      <div v-else class="metric">
        <span class="eyebrow">實際效益</span>
        <p style="font-size:18px;font-weight:700">將文件轉換成知識庫</p>
        <span class="small">簡報沒有提供這個案例的量化數字，效益以質化描述呈現。</span>
      </div>
      <p class="small">{{ f.focus }}</p>
    </div>
  </div>
</template>
