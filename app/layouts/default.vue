<template>
  <div class="app-layout">
    <LayoutAppSidebar class="app-layout__sidebar" />

    <div class="app-layout__main">
      <LayoutAppTopBar />

      <main class="app-layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-layout {
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
}
</style>
