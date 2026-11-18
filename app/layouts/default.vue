<template>
  <div class="app-layout">
    <LayoutAppSidebar class="app-layout__sidebar" />

    <div class="app-layout__main">
      <LayoutAppTopBar
        :menu-open="isDrawerOpen"
        :menu-controls="drawerId"
        @toggle-menu="isDrawerOpen = !isDrawerOpen"
      />

      <main class="app-layout__content">
        <slot />
      </main>
    </div>

    <!-- Tablet: the sidebar navigation, opened from the top bar menu button. -->
    <LayoutAppNavDrawer :id="drawerId" v-model:open="isDrawerOpen" />

    <!-- Mobile: the same destinations as the sidebar. -->
    <LayoutAppBottomNav class="app-layout__bottom-nav" />
  </div>
</template>

<script setup lang="ts">
const drawerId = useId()
const isDrawerOpen = ref(false)
</script>

<style scoped lang="scss">
@use '~/assets/styles/tokens/breakpoints' as bp;

.app-layout {
  --app-bottom-nav-height: 3rem;
  display: grid;
  // 256px matches the sidebar column in the mockup (Figma 90:219).
  grid-template-columns: 256px minmax(0, 1fr);
  min-height: 100vh;

  &__sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
  }

  &__main {
    min-width: 0;
  }

  &__content {
    width: 100%;
    max-width: var(--container-max);
    margin-inline: auto;
    padding: var(--space-lg);
  }

  &__bottom-nav {
    display: none;
  }

  // Tablet and mobile: no sidebar column (Figma 303:239, 303:2).
  @media (max-width: bp.$tablet - 0.02px) {
    grid-template-columns: minmax(0, 1fr);

    // The sidebar root sets its own `display`; the child combinator keeps this ahead of it.
    > .app-layout__sidebar {
      display: none;
    }
  }

  @media (max-width: bp.$mobile - 0.02px) {
    &__content {
      // design.md: 16px side margins; the bottom padding keeps content clear of the tab bar.
      padding: var(--space-md) var(--space-md)
        calc(var(--app-bottom-nav-height) + env(safe-area-inset-bottom) + var(--space-lg));
    }

    &__bottom-nav {
      display: block;
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      // Under the profile menu panel (z-index 10), above the page content.
      z-index: 5;
    }
  }
}
</style>
