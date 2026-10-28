<script setup>
import logo from '../../assets/tpi-logo.png'
import { NAV } from '../../data/content.js'
import { useActiveSection } from '../../composables/useActiveSection.js'

const { active } = useActiveSection(NAV.map(n => n.id))
</script>

<template>
  <header class="top">
    <div class="wrap">
      <a class="brand" href="#overview"><img :src="logo" alt="TPIsoftware" width="1528" height="188"></a>
      <nav class="navlinks" aria-label="章節">
        <a v-for="(n, i) in NAV" :key="n.id" :href="'#' + n.id" :class="{ on: i === active }">{{ n.label }}</a>
      </nav>
    </div>
  </header>
</template>
