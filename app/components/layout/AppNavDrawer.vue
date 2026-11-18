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
// Native modal <dialog>: Esc, inert page and focus return come for free.
const open = defineModel<boolean>('open', { required: true })

const dialog = useTemplateRef('dialog')
const route = useRoute()

watch(open, (isOpen) => {
  if (!dialog.value) return

  if (isOpen && !dialog.value.open) dialog.value.showModal()
  if (!isOpen && dialog.value.open) dialog.value.close()
})

// A click on the dialog itself is the backdrop (the sidebar fills the box); links close it too.
function onClick(event: MouseEvent) {
  const target = event.target
  if (target === dialog.value || (target instanceof Element && target.closest('a'))) {
    open.value = false
  }
}

// Outside the tablet range the menu button is hidden, so close the modal there.
// Keep in sync with $mobile / $tablet in tokens/_breakpoints.scss.
const OUTSIDE_TABLET = '(max-width: 767.98px), (min-width: 1024px)'

function onRangeChange(event: MediaQueryListEvent) {
  if (event.matches) open.value = false
}

let outsideTablet: MediaQueryList | undefined

onMounted(() => {
  outsideTablet = window.matchMedia(OUTSIDE_TABLET)
  outsideTablet.addEventListener('change', onRangeChange)
})

onBeforeUnmount(() => outsideTablet?.removeEventListener('change', onRangeChange))

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)
</script>

<style scoped lang="scss">
.app-nav-drawer {
  // allow-discrete keeps the dialog visible until the close transition ends.
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

@starting-style {
  .app-nav-drawer[open] {
    transform: translateX(-100%);
  }

  .app-nav-drawer[open]::backdrop {
    background: transparent;
  }
}

:global(html:has(.app-nav-drawer[open])) {
  overflow: hidden;
}
</style>
