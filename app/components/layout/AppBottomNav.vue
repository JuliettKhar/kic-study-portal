<template>
  <nav class="app-bottom-nav" :aria-label="$t('common.tabNavigation')">
    <ul class="app-bottom-nav__list">
      <li v-for="item in NAV_ITEMS" :key="item.to" class="app-bottom-nav__cell">
        <component
          :is="item.disabled ? 'span' : NuxtLink"
          :to="item.disabled ? undefined : item.to"
          class="app-bottom-nav__item"
          :class="{
            'app-bottom-nav__item--active': isNavItemActive(item, route.path),
            'app-bottom-nav__item--disabled': item.disabled,
          }"
          :aria-disabled="item.disabled ? 'true' : undefined"
          :aria-current="isNavItemActive(item, route.path) ? 'page' : undefined"
        >
          <Icon :name="item.icon" class="app-bottom-nav__icon" aria-hidden="true" />
          {{ $t(item.shortLabelKey ?? item.labelKey) }}
        </component>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
// Auto-import does not cover `:is="'NuxtLink'"` — the string renders an unknown element.
import { NuxtLink } from '#components'

const route = useRoute()
</script>

<style scoped lang="scss">
.app-bottom-nav {
  border-top: 1px solid var(--color-outline-subtle);
  background: var(--color-surface-lowest);
  padding-bottom: env(safe-area-inset-bottom);

  &__list {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    height: var(--app-bottom-nav-height);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__cell {
    display: flex;
  }

  &__item {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    min-width: 0;
    color: var(--color-on-surface-variant);
    font-family: var(--font-ui);
    font-size: var(--font-size-badge);
    font-weight: 500;
    text-decoration: none;

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: -2px;
    }

    &--active {
      color: var(--color-primary);
      font-weight: 600;
    }

    &--disabled {
      color: var(--color-on-surface-faint);
      cursor: default;
    }
  }

  &__icon {
    flex-shrink: 0;
    font-size: 1.125rem;
  }
}
</style>
