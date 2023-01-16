<template>
  <figure class="docs-image">
    <img :src="srcWithBase" :alt="alt">
    <figcaption v-if="alt.length" class="docs-image__caption">
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

<style lang="scss">
.docs-image {
  margin: 16px 0;

  &__caption {
    margin-top: 4px;
    text-align: center;
    color: var(--vp-c-text-2);
    font-size: 0.875rem;
  }
}
</style>
