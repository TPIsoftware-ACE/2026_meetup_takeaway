<script setup>
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import HeroSection from './components/sections/HeroSection.vue'
import ThemesSection from './components/sections/ThemesSection.vue'
import KeynoteSection from './components/sections/KeynoteSection.vue'
import CaseOneSection from './components/sections/CaseOneSection.vue'
import CaseTwoSection from './components/sections/CaseTwoSection.vue'
import CaseThreeSection from './components/sections/CaseThreeSection.vue'
import AceSection from './components/sections/AceSection.vue'
import ClosingSection from './components/sections/ClosingSection.vue'
import { useReveal } from './composables/useReveal.js'

useReveal()
</script>

<template>
  <TheHeader />
  <main>
    <HeroSection />
    <ThemesSection />
    <KeynoteSection />
    <CaseOneSection />
    <CaseTwoSection />
    <CaseThreeSection />
    <AceSection />
    <ClosingSection />
  </main>
  <TheFooter />
</template>
