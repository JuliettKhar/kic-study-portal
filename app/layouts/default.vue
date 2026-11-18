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

    <LayoutAppNavDrawer :id="drawerId" v-model:open="isDrawerOpen" />

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

  @media (max-width: bp.$tablet - 0.02px) {
    grid-template-columns: minmax(0, 1fr);

    // `>` outranks AppSidebar's own `display`.
    > .app-layout__sidebar {
      display: none;
    }
  }

  @media (max-width: bp.$mobile - 0.02px) {
    &__content {
      padding: var(--space-md) var(--space-md)
        calc(var(--app-bottom-nav-height) + env(safe-area-inset-bottom) + var(--space-lg));
    }

    &__bottom-nav {
      display: block;
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      // Below the top bar (z-index 10).
      z-index: 5;
    }
  }
}

// Keeps focus and anchors clear of the sticky top bar and the tab bar.
:global(html:has(.app-layout)) {
  scroll-padding-top: 5rem;
}

@media (max-width: bp.$mobile - 0.02px) {
  :global(html:has(.app-layout)) {
    scroll-padding-top: 4rem;
    // 3rem = --app-bottom-nav-height (not visible on html).
    scroll-padding-bottom: calc(3rem + env(safe-area-inset-bottom));
  }
}
</style>
