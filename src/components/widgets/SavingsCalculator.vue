<script setup>
import { computed, ref } from 'vue'
import TabList from '../common/TabList.vue'
import { CALC_TABS, SAVE } from '../../data/content.js'
import { formatHours, formatWorkDays, monthlyHours } from '../../utils/logic.js'

const kind = ref('pm')
const times = ref(5)
const people = ref(10)
const hours = computed(() => monthlyHours(SAVE[kind.value], times.value, people.value))
</script>

<template>
  <div class="card calc">
    <TabList v-model="kind" :tabs="CALC_TABS" />
    <div class="grid g2">
      <div class="field"><label for="calcTimes">每人每週次數 <output>{{ times }}</output></label><input id="calcTimes" v-model.number="times" type="range" min="1" max="20"></div>
      <div class="field"><label for="calcPeople">使用人數 <output>{{ people }}</output></label><input id="calcPeople" v-model.number="people" type="range" min="1" max="50"></div>
    </div>
    <div class="calc-out">
      <div><span class="small">每月省下</span><span class="num" data-out="month">{{ formatHours(hours) }}</span><span class="small">小時</span></div>
      <div><span class="small">約等於</span><span class="num" data-out="days">{{ formatWorkDays(hours) }}</span><span class="small">個工作天（8 小時／天）</span></div>
    </div>
  </div>
</template>
