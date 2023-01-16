<template>
  <div class="docs-frame">
    <div class="docs-frame__header">
      <div class="docs-frame__header-buttons">
        <div class="docs-frame__header-button docs-frame__header-button--red"></div>
        <div class="docs-frame__header-button docs-frame__header-button--yellow"></div>
        <div class="docs-frame__header-button docs-frame__header-button--green"></div>
      </div>
    </div>

    <slot />
  </div>
</template>

<style lang="scss">
.docs-frame {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 1rem .5rem rgba(0, 0, 0, 0.2);

  &__header {
    height: 32px;
    background-color: #2d2d2d;
    border-bottom: 1px solid #1e1e1e;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__header-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.5rem;
  }

  &__header-button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-left: 0.25rem;
    margin-right: 0.25rem;

    &--red {
      background-color: #ff5f56;
    }

    &--yellow {
      background-color: #ffbd2e;
    }

    &--green {
      background-color: #27c93f;
    }
  }
}
</style>
