<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { FIELDS, PRESETS } from '../../data/content.js'
import { cardFields, cardText } from '../../utils/logic.js'

const preset = ref('pm')
const name = ref('')
const values = reactive({})
const copied = ref('')

const title = computed(() => name.value.trim() || '未命名的 Workflow')
const vals = computed(() => cardFields(FIELDS, values))
const filled = computed(() => vals.value.filter(v => v.v).length)
const missing = computed(() => vals.value.filter(v => !v.v))

function load(k) {
  const p = PRESETS[k]
  preset.value = k
  name.value = p.name || ''
  FIELDS.forEach(f => { values[f.k] = p[f.k] || '' })
}
load('pm')

watch([name, values], () => { copied.value = '' })

async function copy() {
  try {
    await navigator.clipboard.writeText(cardText(title.value, vals.value))
    copied.value = '已複製'
  } catch {
    copied.value = '無法複製，請手動選取卡片文字'
  }
}
</script>

<template>
  <div class="btnrow" role="group" aria-label="範例">
    <button v-for="(p, k) in PRESETS" :key="k" class="btn" :data-preset="k" :aria-pressed="preset === k" @click="load(k)">{{ p.label }}</button>
  </div>
  <div class="builder">
    <form class="card" autocomplete="off" @submit.prevent>
      <div class="fi"><label for="wf-name">Workflow 名稱</label><input id="wf-name" v-model="name" type="text" placeholder="例如：週會追蹤"></div>
      <div v-for="(f, i) in FIELDS" :key="f.k" class="fi"><label :for="'wf-' + f.k">{{ f.zh }}<span class="mono">0{{ i + 1 }} {{ f.en }}</span></label><input :id="'wf-' + f.k" v-model="values[f.k]" type="text"></div>
    </form>
    <div class="wcard">
      <div class="hd"><span class="mono">WORKFLOW LIBRARY · 組織資產卡</span><b>{{ title }}</b></div>
      <dl><div v-for="v in vals" :key="v.k"><dt>{{ v.en }}</dt><dd :class="{ empty: !v.v }">{{ v.v || '尚未填寫' }}</dd></div></dl>
      <div class="ft">
        <div class="progress"><div class="track"><i :style="{ width: filled / FIELDS.length * 100 + '%' }"></i></div><span class="mono">{{ filled }} / {{ FIELDS.length }}</span></div>
        <div v-if="missing.length" class="warn">
          <span v-for="m in missing.slice(0, 3)" :key="m.k">· {{ m.en }}：{{ m.warn }}</span>
          <span v-if="missing.length > 3">· 還有 {{ missing.length - 3 }} 個欄位待補</span>
        </div>
        <p v-else class="small" style="color:var(--ai);font-weight:700">七個欄位都有了，這個方法可以交給下一個人使用。</p>
        <div class="btnrow"><button class="btn" type="button" @click="copy">複製卡片文字</button><span class="small" aria-live="polite">{{ copied }}</span></div>
      </div>
    </div>
  </div>
</template>
