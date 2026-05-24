'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, BookOpen, BarChart2, Settings, GraduationCap, ChevronLeft } from 'lucide-react'

const navItems = [
  { id: 'dashboard', href: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'courses', href: 'courses', icon: BookOpen, label: 'Courses' },
  { id: 'analytics', href: 'analytics', icon: BarChart2, label: 'Analytics' },
  { id: 'setting', href: 'setting', icon: Settings, label: 'Settings' },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const showDesktopLabels = !collapsed
  const [section = 'dashboard', student = 'alex'] = pathname.split('/').filter(Boolean)
  const activeId = section === 'settings' ? 'setting' : section

  return (
    <nav
      className={`hidden md:flex flex-col relative bg-bg-surface border-r border-border-subtle transition-all duration-300 ease-in-out w-[64px] ${collapsed ? 'lg:w-[64px]' : 'lg:w-[220px]'} shrink-0 min-h-screen`}
    >
      <div className="flex items-center justify-center lg:justify-start gap-3 px-4 py-5 border-b border-border-subtle overflow-hidden">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center shrink-0">
          <GraduationCap size={16} className="text-bg-base" />
        </div>
        <AnimatePresence>
          {showDesktopLabels && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="hidden lg:block font-semibold text-sm tracking-wide text-white whitespace-nowrap overflow-hidden"
            >
              LearnOS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <ul className="flex-1 p-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeId === item.id
          return (
            <li key={item.id}>
              <Link
                href={`/${item.href}/${student}`}
                prefetch
                className={`relative w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group ${collapsed ? 'lg:justify-center' : 'lg:justify-start'}`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-bg-hover rounded-lg border border-border"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={17}
                  className={`relative z-10 shrink-0 transition-colors ${isActive ? 'text-accent-cyan' : 'text-[#8b949e] group-hover:text-white'}`}
                />
                <AnimatePresence>
                  {showDesktopLabels && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className={`hidden lg:block relative z-10 whitespace-nowrap overflow-hidden font-medium transition-colors ${isActive ? 'text-white' : 'text-[#8b949e] group-hover:text-white'}`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="hidden lg:block p-3 border-t border-border-subtle">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-bg-hover transition-colors text-[#8b949e] hover:text-white"
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronLeft size={16} />
          </motion.div>
        </button>
      </div>
    </nav>
  )
}
