<template>
  <section class="ui-card" :aria-labelledby="title ? titleId : undefined">
    <header v-if="title || $slots.actions" class="ui-card__header">
      <h2 v-if="title" :id="titleId" class="ui-card__title">
        <Icon v-if="icon" :name="icon" class="ui-card__icon" aria-hidden="true" />
        {{ title }}
      </h2>

      <slot name="actions" />
    </header>

    <slot />
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    /** Lucide icon name, rendered before the title. */
    icon?: string
  }>(),
  {
    title: undefined,
    icon: undefined,
  },
)

const titleId = useId()
</script>

<style scoped lang="scss">
.ui-card {
  padding: var(--space-lg);
  border: 1px solid var(--color-outline-variant);
  border-radius: var(--radius-xl);
  background: var(--color-surface-lowest);

  &__header {
    display: flex;
    align-items: center;
    // Keeps actions on the right whether or not a title is present.
    justify-content: flex-end;
    gap: var(--space-md);
    margin-bottom: var(--space-md);
  }

  &__title {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin: 0;
    margin-inline-end: auto;
    font-family: var(--font-ui);
    font-size: var(--font-size-headline-sm);
    font-weight: 600;
  }

  &__icon {
    flex-shrink: 0;
    color: var(--color-primary);
  }
}
</style>
