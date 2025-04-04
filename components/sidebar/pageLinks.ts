import {
  Search,
  Settings,
  Users,
  BoxIcon,
  Store,
  FileSignature,
  LayoutDashboardIcon,
  ListIcon,
  BarChartIcon,
  FolderIcon
} from 'lucide-react'

export const workspaceLinks = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/protected',
      icon: LayoutDashboardIcon
    },
    {
      title: 'Products',
      url: '/products',
      icon: BoxIcon
    },
    {
      title: 'Sales',
      url: '#',
      icon: FileSignature
    },
    {
      title: 'Store',
      url: '#',
      icon: Store
    },
    {
      title: 'Lifecycle',
      url: '#',
      icon: ListIcon
    },
    {
      title: 'Analytics',
      url: '#',
      icon: BarChartIcon
    },
    {
      title: 'Projects',
      url: '#',
      icon: FolderIcon
    }
  ],
  moreLinks: [
    {
      name: 'Users',
      url: '/protected/users',
      icon: Users
    },
    {
      name: 'Search',
      url: '#',
      icon: Search
    },
    {
      name: 'Settings',
      url: '#',
      icon: Settings
    }
  ]
}
