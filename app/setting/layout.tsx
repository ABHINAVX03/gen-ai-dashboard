import { AppShell } from '@/components/layout/AppShell'

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppShell>{children}</AppShell>
}
