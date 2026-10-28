<script setup>
import { ref } from 'vue'
import { QUESTIONS } from '../../data/content.js'

const after = ref(false)
</script>

<template>
  <div class="card flip">
    <div class="btnrow" role="group" aria-label="切換問題">
      <button class="btn" :aria-pressed="!after" @click="after = false">Before</button>
      <button class="btn" :aria-pressed="after" @click="after = true">After · User Story</button>
    </div>
    <p class="qbox" :class="after ? 'a' : 'b'" aria-live="polite">{{ after ? QUESTIONS.after : QUESTIONS.before }}</p>
  </div>
</template>
