import { defaultPath } from '@/lib/curriculum'
import { routes } from '@/lib/routes'

export interface NavItem { label: string; to: string }

export const publicNav: NavItem[] = []

export const dashboardNav: NavItem = { label: 'Dashboard', to: routes.dashboard }
export const pathNav: NavItem = { label: defaultPath.title, to: routes.path(defaultPath.slug) }

/** Mobile bottom navigation: two destinations with clearly different purposes. */
export const mobileNav: NavItem[] = [dashboardNav, { label: 'Tədris yolu', to: pathNav.to }]
