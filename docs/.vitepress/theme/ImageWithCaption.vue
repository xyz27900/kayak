<template>
  <figure
    :style="{
      margin: '16px 0'
    }"
  >
    <img :src="src" :alt="alt">
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
defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  }
})
</script>
