<template>
  <div class="app-sidebar">
    <!-- Also points at the dashboard: kept outside <nav>, and the nav item marks the page. -->
    <NuxtLink to="/" class="app-sidebar__brand" aria-current-value="false">
      <span class="app-sidebar__brand-tile">
        <Icon name="lucide:graduation-cap" class="app-sidebar__brand-icon" aria-hidden="true" />
      </span>

      <span class="app-sidebar__brand-text">
        <span class="app-sidebar__brand-title">KIC Student Portal</span>
        <span class="app-sidebar__brand-subtitle">Academic Portal</span>
      </span>
    </NuxtLink>

    <nav aria-label="Main navigation">
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
            {{ item.label }}
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
  border-right: 1px solid var(--color-outline-variant);
  background: var(--color-surface-low);

  &__brand {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding-inline: var(--space-sm);
    border-radius: var(--radius-md);
    text-decoration: none;

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  // Same tile as the login screen, one step smaller.
  &__brand-tile {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: var(--radius-md);
    background: var(--color-primary);
    color: var(--color-on-primary);

    // The whole logo is one link.
    .app-sidebar__brand:hover & {
      background: color-mix(in srgb, var(--color-primary) 88%, var(--color-on-surface));
    }
  }

  &__brand-icon {
    font-size: 1rem;
  }

  &__brand-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
    line-height: 1.3;
  }

  &__brand-title {
    color: var(--color-on-surface-strong);
    font-family: var(--font-ui);
    // One step down from the mockup: the icon tile takes width the design did not budget for.
    font-size: var(--font-size-body-md);
    font-weight: 700;
    white-space: nowrap;
  }

  &__brand-subtitle {
    color: var(--color-on-surface-muted);
    font-family: var(--font-ui);
    font-size: var(--font-size-body-xs);
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
