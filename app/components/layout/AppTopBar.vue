<template>
  <header class="app-top-bar">
    <!-- Tablet only: opens the sidebar navigation as a drawer. -->
    <button
      type="button"
      class="app-top-bar__icon-button app-top-bar__menu"
      :aria-label="$t('common.openMenu')"
      aria-haspopup="dialog"
      :aria-expanded="menuOpen"
      :aria-controls="menuControls"
      @click="emit('toggleMenu')"
    >
      <Icon name="lucide:menu" aria-hidden="true" />
    </button>

    <!-- The sidebar logo is hidden below desktop, so the top bar carries it. -->
    <LayoutAppBrand class="app-top-bar__brand app-top-bar__brand--full" />
    <LayoutAppBrand variant="short" class="app-top-bar__brand app-top-bar__brand--short" />

    <div class="app-top-bar__search">
      <Icon name="lucide:search" class="app-top-bar__search-icon" aria-hidden="true" />
      <input
        type="search"
        class="app-top-bar__search-input"
        :placeholder="$t('common.searchPlaceholder')"
        :aria-label="$t('common.search')"
      />
    </div>

    <div class="app-top-bar__actions">
      <button
        type="button"
        class="app-top-bar__icon-button"
        :aria-label="$t('common.notifications')"
      >
        <Icon name="lucide:bell" aria-hidden="true" />
      </button>
      <!-- Labelled in the target language, so it can be found without reading the current one. -->
      <button
        type="button"
        class="app-top-bar__icon-button"
        :aria-label="$t('common.switchLocale')"
        :lang="locale === 'ja' ? 'en' : 'ja'"
        @click="toggleLocale"
      >
        <Icon name="lucide:languages" aria-hidden="true" />
      </button>
      <LayoutAppProfileMenu />
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  /** Whether the navigation drawer is open, for the menu button state. */
  menuOpen: boolean
  /** Id of the drawer the menu button controls. */
  menuControls: string
}>()

const emit = defineEmits<{ toggleMenu: [] }>()

const { locale, setLocale } = useI18n()

// Two locales (ADR-0004), so the control toggles instead of opening a menu.
async function toggleLocale() {
  await setLocale(locale.value === 'ja' ? 'en' : 'ja')
}
</script>

<style scoped lang="scss">
@use '~/assets/styles/tokens/breakpoints' as bp;

.app-top-bar {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  // Wide screens: the page content is centred in --container-max with --space-lg padding,
  // so the bar's inner edges follow it. Below that width this is just --space-lg.
  padding: var(--space-md)
    max(var(--space-lg), calc((100% - var(--container-max)) / 2 + var(--space-lg)));
  // Figma: stroke #c3c6d7 at 30%, fill #faf8ff at 90%, shadow 0 1px 2px black at 5%,
  // background blur 12 (Figma's value is twice the CSS radius).
  border-bottom: 1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent);
  background: color-mix(in srgb, var(--color-surface) 90%, transparent);
  box-shadow: var(--shadow-chip);
  backdrop-filter: blur(6px);
  // backdrop-filter makes the bar a stacking context; lift it so the profile menu
  // panel inside it still overlaps the page content below.
  position: relative;
  z-index: 10;

  &__brand--full {
    --app-brand-tile-size: 2.25rem;
  }

  &__brand--short {
    --app-brand-tile-size: 1.75rem;
  }

  &__search {
    position: relative;
    width: 16rem;
  }

  &__search-icon {
    position: absolute;
    top: 50%;
    left: var(--space-sm);
    // Clicks pass through to the input underneath.
    pointer-events: none;
    color: var(--color-on-surface-muted);
    font-size: 1.125rem;
    transform: translateY(-50%);
  }

  &__search-input {
    width: 100%;
    appearance: none;
    padding: var(--space-sm) var(--space-md) var(--space-sm) var(--space-xl);
    border: 1px solid transparent;
    border-bottom-width: 2px;
    // design.md: input fields use 4px.
    border-radius: var(--radius-md);
    background: var(--color-surface-low);
    color: var(--color-on-surface);
    font-family: var(--font-ui);
    font-size: var(--font-size-body-sm);
    transition: border-bottom-color 0.2s;

    &::placeholder {
      color: var(--color-on-surface-muted);
    }

    // design.md: the bottom border turns primary on focus.
    &:focus {
      outline: none;
      border-bottom-color: var(--color-primary);
    }
  }

  &__icon-button {
    display: flex;
    padding: var(--space-sm);
    border: none;
    border-radius: var(--radius-xl);
    background: none;
    color: var(--color-on-surface-variant);
    font-size: 1.25rem;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    margin-left: auto;
  }

  // After __icon-button, which the menu button also carries.
  &__menu {
    display: none;
  }

  // The logo root sets its own `display` in AppBrand; the extra class keeps these
  // rules ahead of it whatever order the stylesheets load in.
  & &__brand {
    display: none;
  }

  // Tablet (Figma 303:239): menu button and full logo instead of search.
  @media (max-width: bp.$tablet - 0.02px) {
    &__menu,
    & &__brand--full {
      display: flex;
    }

    &__search {
      display: none;
    }
  }

  // Mobile (Figma 303:2): short logo, no menu button; the tab bar navigates.
  @media (max-width: bp.$mobile - 0.02px) {
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);

    &__menu,
    & &__brand--full {
      display: none;
    }

    & &__brand--short {
      display: flex;
    }

    &__actions {
      gap: var(--space-sm);
    }
  }
}
</style>
