<template>
  <section
    class="ui-card"
    :class="`ui-card--${variant}`"
    :aria-labelledby="title ? titleId : undefined"
  >
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
/** The two surface levels defined in docs/design/design.md: bordered content, or raised. */
export type UiCardVariant = 'outlined' | 'raised'

withDefaults(
  defineProps<{
    title?: string
    /** Lucide icon name, rendered before the title. */
    icon?: string
    variant?: UiCardVariant
  }>(),
  {
    title: undefined,
    icon: undefined,
    variant: 'outlined',
  },
)

const titleId = useId()
</script>

<style scoped lang="scss">
@use '~/assets/styles/tokens/breakpoints' as bp;

.ui-card {
  padding: var(--space-lg);
  background: var(--color-surface-lowest);

  &--outlined {
    border: 1px solid var(--color-outline-subtle);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-surface);
  }

  &--raised {
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
  }

  &__header {
    display: flex;
    align-items: center;
    // Keeps actions on the right whether or not a title is present.
    justify-content: flex-end;
    gap: var(--space-md);
    margin-bottom: var(--space-md);
    // Figma 90:45: thin divider under the title row.
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent);
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

  // Mobile (Figma 303:2): section titles are Noto Sans JP Bold 14/20.
  @media (max-width: bp.$mobile - 0.02px) {
    &__title {
      font-family: var(--font-content);
      font-size: var(--font-size-body-sm);
      font-weight: 700;
      line-height: 1.25rem;
    }

    &__icon {
      font-size: 0.9375rem;
    }
  }
}
</style>
