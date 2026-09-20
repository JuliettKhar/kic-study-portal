<template>
  <nav class="app-sidebar" aria-label="Main navigation">
    <div class="app-sidebar__brand">
      <UiSkeleton width="11rem" height="1.25rem" />
      <UiSkeleton width="7rem" height="0.75rem" />
    </div>

    <ul class="app-sidebar__nav">
      <li v-for="item in NAV_ITEM_COUNT" :key="item" class="app-sidebar__item">
        <UiSkeleton width="1.25rem" circle />
        <UiSkeleton :width="item === 1 ? '6.5rem' : '8.5rem'" />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const NAV_ITEM_COUNT = 4
</script>

<style scoped lang="scss">
.app-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  padding: var(--space-lg) var(--space-md);
  border-right: 1px solid var(--color-outline-variant);
  background: var(--color-surface-low);

  &__brand {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding-inline: var(--space-sm);
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-lg);
  }

  &__item:first-child {
    background: var(--color-surface-container);
  }
}
</style>
