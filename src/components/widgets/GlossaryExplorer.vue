<script setup>
import { computed, ref } from 'vue'
import { CATS, TERMS } from '../../data/content.js'
import { filterTerms } from '../../utils/logic.js'

const cat = ref('全部')
const query = ref('')
const selected = ref('Human Review')
const list = computed(() => filterTerms(TERMS, cat.value, query.value))
const current = computed(() => TERMS.find(x => x.t === selected.value))
</script>

<template>
  <div class="explorer">
    <div class="ex-tools">
      <label for="exSearch" class="sr">搜尋名詞</label>
      <input id="exSearch" v-model="query" type="search" placeholder="搜尋，例如 Review、種子、Shadow">
      <div class="btnrow" role="group" aria-label="分類">
        <button v-for="c in CATS" :key="c" class="btn" :data-cat="c" :aria-pressed="c === cat" @click="cat = c">{{ c }}</button>
      </div>
      <div class="ex-list" role="listbox" aria-label="名詞清單">
        <template v-if="list.length">
          <button v-for="x in list" :key="x.t" role="option" :data-term="x.t" :aria-selected="x.t === selected" @click="selected = x.t"><span>{{ x.t }}</span><span class="cat">{{ x.c }}</span></button>
        </template>
        <p v-else class="empty-note">沒有符合的名詞。試試其他關鍵字，或切回「全部」。</p>
      </div>
    </div>
    <div class="card ex-detail" aria-live="polite">
      <template v-if="current">
        <span class="pill ai" style="justify-self:start">{{ current.c }}</span>
        <h3>{{ current.t }}</h3>
        <p>{{ current.d }}</p>
        <p class="small">出處：{{ current.src }}　<a :href="current.href">前往段落 →</a></p>
      </template>
    </div>
  </div>
</template>
