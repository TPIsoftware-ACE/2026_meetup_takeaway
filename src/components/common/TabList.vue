<script setup>
defineProps({
  tabs: { type: Array, required: true },
  label: { type: String, default: undefined }
})
const model = defineModel({ type: String, required: true })
</script>

<template>
  <div class="tablist" role="tablist" :aria-label="label">
    <button
      v-for="t in tabs"
      :key="t.id"
      class="btn"
      role="tab"
      :aria-selected="t.id === model"
      @click="model = t.id"
    >{{ t.label }}</button>
  </div>
</template>
