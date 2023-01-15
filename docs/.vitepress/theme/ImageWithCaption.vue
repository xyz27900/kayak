<template>
  <figure
    :style="{
      margin: '16px 0'
    }"
  >
    <img :src="srcWithBase" :alt="alt">
    <figcaption
      :style="{
        marginTop: '4px',
        textAlign: 'center',
        color: 'var(--vp-c-text-2)',
        fontSize: '0.875rem'
      }"
    >
      {{ alt }}
    </figcaption>
  </figure>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  }
})

const srcWithBase = computed(() => {
  const base = __BASE__.replace(/\/$/, '')
  const src = props.src.replace(/^\//, '')
  return `${base}/${src}`
})
</script>
