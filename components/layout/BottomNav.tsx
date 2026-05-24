'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, BookOpen, BarChart2, Settings } from 'lucide-react'

const navItems = [
  { id: 'dashboard', href: 'dashboard', icon: LayoutDashboard, label: 'Home' },
  { id: 'courses', href: 'courses', icon: BookOpen, label: 'Courses' },
  { id: 'analytics', href: 'analytics', icon: BarChart2, label: 'Stats' },
  { id: 'setting', href: 'setting', icon: Settings, label: 'Settings' },
]

export function BottomNav() {
  const pathname = usePathname()
  const [section = 'dashboard', student = 'alex'] = pathname.split('/').filter(Boolean)
  const activeId = section === 'settings' ? 'setting' : section

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-surface/90 backdrop-blur-md border-t border-border-subtle">
      <ul className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeId === item.id
          return (
            <li key={item.id}>
              <Link
                href={`/${item.href}/${student}`}
                prefetch
                className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl relative"
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-active"
                    className="absolute inset-0 bg-bg-hover rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={20} className={`relative z-10 transition-colors ${isActive ? 'text-accent-cyan' : 'text-[#8b949e]'}`} />
                <span className={`relative z-10 text-[10px] font-medium transition-colors ${isActive ? 'text-white' : 'text-[#8b949e]'}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
