<template>
  <div class="app-sidebar">
    <LayoutAppBrand class="app-sidebar__brand" />

    <nav :aria-label="$t('common.mainNavigation')">
      <ul class="app-sidebar__nav">
        <li v-for="item in NAV_ITEMS" :key="item.to">
          <!-- Pages that do not exist yet are not links. -->
          <component
            :is="item.disabled ? 'span' : NuxtLink"
            :to="item.disabled ? undefined : item.to"
            class="app-sidebar__item"
            :class="{
              'app-sidebar__item--active': isNavItemActive(item, route.path),
              'app-sidebar__item--disabled': item.disabled,
            }"
            :aria-disabled="item.disabled ? 'true' : undefined"
            :aria-current="isNavItemActive(item, route.path) ? 'page' : undefined"
          >
            <Icon :name="item.icon" class="app-sidebar__item-icon" aria-hidden="true" />
            {{ $t(item.labelKey) }}
          </component>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
// Auto-import does not cover `:is="'NuxtLink'"` — the string renders an unknown element.
import { NuxtLink } from '#components'

const route = useRoute()
</script>

<style scoped lang="scss">
.app-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  padding: var(--space-lg) var(--space-md);
  border-right: 1px solid var(--color-outline-subtle);
  background: var(--color-surface-low);

  &__brand {
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
    color: var(--color-on-surface-variant);
    font-family: var(--font-ui);
    font-size: var(--font-size-body-sm);
    font-weight: 500;
    text-decoration: none;

    &:hover:not(&--active, &--disabled) {
      background: var(--color-surface-container);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: -2px;
    }

    &--active {
      background: color-mix(in srgb, var(--color-primary) 10%, transparent);
      color: var(--color-primary);
      font-weight: 600;
    }

    &--disabled {
      color: var(--color-on-surface-faint);
      cursor: default;
    }
  }

  &__item-icon {
    flex-shrink: 0;
    font-size: 1.125rem;
  }
}
</style>
