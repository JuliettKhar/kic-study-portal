<template>
  <section class="placeholder-card">
    <header class="placeholder-card__header">
      <UiSkeleton width="1.25rem" circle />
      <div class="placeholder-card__title" :style="{ maxWidth: titleWidth }">
        <UiSkeleton height="1rem" />
      </div>
      <span class="placeholder-card__badge">{{ note }}</span>
    </header>

    <div class="placeholder-card__body">
      <slot>
        <UiSkeleton v-for="line in lines" :key="line" :width="lineWidth(line)" />
      </slot>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    titleWidth?: string
    note?: string
    lines?: number
  }>(),
  {
    titleWidth: '9rem',
    note: 'Coming soon',
    lines: 3,
  },
)

// Slightly uneven line widths read as text rather than as a solid block.
const lineWidth = (line: number) => `${[100, 82, 64, 90, 72][(line - 1) % 5]}%`
</script>

<style scoped lang="scss">
.placeholder-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-lg);
  border: 1px solid var(--color-outline-variant);
  border-radius: var(--radius-xl);
  background: var(--color-surface-lowest);

  &__header {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-width: 0;
  }

  // Wrapper, not the skeleton itself: UiSkeleton is `flex: none` and would not shrink.
  // The title yields first so the badge always stays inside the card.
  &__title {
    flex: 0 1 auto;
    width: 100%;
    min-width: 0;
  }

  &__badge {
    flex: none;
    margin-left: auto;
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-full);
    background: var(--color-surface-container);
    color: var(--color-on-surface-variant);
    font-family: var(--font-ui);
    font-size: var(--font-size-badge);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
}
</style>
