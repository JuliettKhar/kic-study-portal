/** A single entry of the sidebar navigation. */
export interface NavItem {
  label: string
  /** Lucide icon name. */
  icon: string
  to: string
  /** Pages that do not exist yet are shown, but render as non-interactive. */
  disabled?: boolean
}

/**
 * Sidebar navigation, as laid out in the dashboard mockup.
 *
 * Labels are English in the mockup even on the Japanese screens; translating them
 * is covered by #20.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: 'lucide:layout-dashboard', to: '/' },
  { label: 'Class Schedule', icon: 'lucide:calendar-days', to: '/schedule', disabled: true },
  { label: 'Announcements', icon: 'lucide:bell', to: '/announcements', disabled: true },
  { label: 'Learning Resources', icon: 'lucide:book-open', to: '/resources', disabled: true },
]

/**
 * Whether a nav item matches the current path. The dashboard lives at the root, so it
 * only matches exactly; sections also match their nested routes.
 */
export function isNavItemActive(item: NavItem, path: string): boolean {
  if (item.to === '/') return path === '/'

  return path === item.to || path.startsWith(`${item.to}/`)
}
