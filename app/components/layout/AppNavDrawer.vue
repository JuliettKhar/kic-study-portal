<template>
  <dialog
    ref="dialog"
    class="app-nav-drawer"
    :aria-label="$t('common.menu')"
    @close="open = false"
    @click="onClick"
  >
    <LayoutAppSidebar class="app-nav-drawer__sidebar" />
  </dialog>
</template>

<script setup lang="ts">
// A modal <dialog> gives Esc, an inert page behind it and focus moving in on open
// and back to the opener on close, without custom focus management.
const open = defineModel<boolean>('open', { required: true })

const dialog = useTemplateRef('dialog')
const route = useRoute()

watch(open, (isOpen) => {
  if (!dialog.value) return

  if (isOpen && !dialog.value.open) dialog.value.showModal()
  if (!isOpen && dialog.value.open) dialog.value.close()
})

// The sidebar fills the dialog box, so a click that lands on the dialog itself
// came from the ::backdrop. A link closes it too, including one to the current page.
function onClick(event: MouseEvent) {
  const target = event.target
  if (target === dialog.value || (target instanceof Element && target.closest('a'))) {
    open.value = false
  }
}

// Following a link inside the drawer closes it.
watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)
</script>

<style scoped lang="scss">
.app-nav-drawer {
  // Slides in from the left. `display` and `overlay` switch at the end of the
  // close transition (allow-discrete), so the dialog stays visible while it leaves.
  --app-nav-drawer-duration: 0.25s;
  width: 16rem;
  max-width: calc(100vw - var(--space-xl));
  height: 100dvh;
  max-height: none;
  margin: 0;
  padding: 0;
  border: none;
  background: var(--color-surface-low);
  transform: translateX(-100%);
  transition:
    transform var(--app-nav-drawer-duration) ease-out,
    display var(--app-nav-drawer-duration) allow-discrete,
    overlay var(--app-nav-drawer-duration) allow-discrete;

  &[open] {
    transform: none;
  }

  &::backdrop {
    background: transparent;
    transition:
      background-color var(--app-nav-drawer-duration) ease-out,
      display var(--app-nav-drawer-duration) allow-discrete,
      overlay var(--app-nav-drawer-duration) allow-discrete;
  }

  &[open]::backdrop {
    background: color-mix(in srgb, var(--color-on-surface) 40%, transparent);
  }

  &__sidebar {
    min-height: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    &::backdrop {
      transition: none;
    }
  }
}

// Where the open transition starts from: the dialog has no previous style when it opens.
@starting-style {
  .app-nav-drawer[open] {
    transform: translateX(-100%);
  }

  .app-nav-drawer[open]::backdrop {
    background: transparent;
  }
}

// A modal dialog does not stop the page behind it from scrolling.
:global(html:has(.app-nav-drawer[open])) {
  overflow: hidden;
}
</style>
