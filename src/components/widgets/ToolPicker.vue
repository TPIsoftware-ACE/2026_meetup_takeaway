<script setup>
import { ref } from 'vue'
import TabList from '../common/TabList.vue'
import { TOOLS } from '../../data/content.js'

const tab = ref(TOOLS[0].id)
</script>

<template>
  <div class="card" style="display:grid;gap:16px">
    <TabList v-model="tab" :tabs="TOOLS" />
    <div>
      <div v-for="t in TOOLS" v-show="t.id === tab" :key="t.id" class="grid g2" :data-panel="t.id"><div><div class="eyebrow">{{ t.en }}</div><p>{{ t.work }}</p></div><div><div class="eyebrow">建議工具</div><p class="num" style="font-size:28px">{{ t.tool }}</p></div></div>
    </div>
  </div>
</template>
