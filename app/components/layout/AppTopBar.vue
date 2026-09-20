<template>
  <header class="app-top-bar">
    <UiSkeleton class="app-top-bar__search" height="2.5rem" radius="var(--radius-lg)" />

    <div class="app-top-bar__actions">
      <UiSkeleton width="1.5rem" circle />
      <UiSkeleton width="2.25rem" circle />
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-top-bar {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--color-outline-variant);
  background: var(--color-surface-lowest);

  &__search {
    max-width: 20rem;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    margin-left: auto;
  }
}
</style>
