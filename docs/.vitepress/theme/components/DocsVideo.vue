<template>
  <video
    preload="auto"
    playsinline
    controls
  >
    <source
      :src="srcWithBase"
      :type="type"
    />
  </video>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'video/mp4'
  }
})

const srcWithBase = computed(() => {
  const base = __BASE__.replace(/\/$/, '')
  const src = props.src.replace(/^\//, '')
  return `${base}/${src}`
})
</script>
