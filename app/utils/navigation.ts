export interface NavItem {
  label: string
  /** Lucide icon name. */
  icon: string
  to: string
  /** Shown, but not a link: the page does not exist yet. */
  disabled?: boolean
}

/** Sidebar navigation from the dashboard mockup. Labels stay English until #20. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: 'lucide:layout-dashboard', to: '/' },
  { label: 'Class Schedule', icon: 'lucide:calendar-days', to: '/schedule', disabled: true },
  { label: 'Announcements', icon: 'lucide:bell', to: '/announcements', disabled: true },
  { label: 'Learning Resources', icon: 'lucide:book-open', to: '/resources', disabled: true },
]

/** The dashboard matches the root exactly; sections also match their nested routes. */
export function isNavItemActive(item: NavItem, path: string): boolean {
  if (item.to === '/') return path === '/'

  return path === item.to || path.startsWith(`${item.to}/`)
}
