<script setup>
import { ref } from 'vue'
import TabList from '../common/TabList.vue'
import { ROLE_NOTES } from '../../data/content.js'

const tab = ref(ROLE_NOTES[0].id)
</script>

<template>
  <TabList v-model="tab" :tabs="ROLE_NOTES" />
  <div>
    <div v-for="r in ROLE_NOTES" v-show="r.id === tab" :key="r.id" class="notesheet" :data-panel="r.id">
      <div class="hd"><b>{{ r.title }}</b><span class="small">{{ r.purpose }}</span></div>
      <dl style="margin:0">
        <div v-for="row in r.rows" :key="row[0]" class="row"><dt>{{ row[0] }}</dt><dd>{{ row[1] }}<span v-if="row[2]" class="flag">需確認</span></dd></div>
      </dl>
    </div>
  </div>
</template>
