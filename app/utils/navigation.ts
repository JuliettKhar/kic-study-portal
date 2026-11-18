export interface NavItem {
  /** Message key under `nav.*`, translated where the item is rendered. */
  labelKey: string
  /** Shorter label for the mobile tab bar, also under `nav.*`; falls back to `labelKey`. */
  shortLabelKey?: string
  /** Lucide icon name. */
  icon: string
  to: string
  /** Shown, but not a link: the page does not exist yet. */
  disabled?: boolean
}

/** Sidebar, drawer and mobile tab bar navigation from the dashboard mockups. */
export const NAV_ITEMS: NavItem[] = [
  {
    labelKey: 'nav.dashboard',
    shortLabelKey: 'nav.short.dashboard',
    icon: 'lucide:layout-dashboard',
    to: '/',
  },
  { labelKey: 'nav.classSchedule', icon: 'lucide:calendar-days', to: '/schedule', disabled: true },
  { labelKey: 'nav.announcements', icon: 'lucide:bell', to: '/announcements', disabled: true },
  {
    labelKey: 'nav.learningResources',
    shortLabelKey: 'nav.short.learningResources',
    icon: 'lucide:book-open',
    to: '/resources',
    disabled: true,
  },
]

/** The dashboard matches the root exactly; sections also match their nested routes. */
export function isNavItemActive(item: NavItem, path: string): boolean {
  if (item.to === '/') return path === '/'

  return path === item.to || path.startsWith(`${item.to}/`)
}
