import { Bell, BookOpen, Clock3, Mail, Shield, UserRound } from 'lucide-react'
import { BentoCard } from '@/components/ui/Bento'
import { PageHeader } from '@/components/ui/PageHeader'
import { getStudentBySlug } from '@/lib/data'
import { formatStudentName } from '@/lib/students'
import { getErrorMessage } from '@/lib/errors'
import { pageSectionClass } from '@/lib/styles'

interface SettingStudentPageProps {
  params: {
    student: string
  }
}

export default async function SettingStudentPage({
  params,
}: SettingStudentPageProps) {
  const student = await loadStudent(params.student)
  const initials = getInitials(student.name)

  return (
    <section className={pageSectionClass}>
      <PageHeader eyebrow="Profile settings" title="Account preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <BentoCard className="lg:col-span-2" custom={0}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-cyan/25 to-accent-blue/20 border border-accent-cyan/20 flex items-center justify-center">
                <span className="text-lg font-semibold text-white">{initials}</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{student.name}</p>
                <p className="text-sm text-[#8b949e]">Student dashboard profile</p>
              </div>
            </div>
            <div className="rounded-full border border-accent-emerald/20 bg-accent-emerald/10 px-3 py-1 text-xs font-medium text-accent-emerald">
              Active
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-xl bg-bg-base border border-border-subtle p-4">
              <UserRound size={16} className="text-accent-cyan mb-3" />
              <p className="text-xs text-[#8b949e]">Display name</p>
              <p className="text-sm font-medium text-white mt-1">{student.name}</p>
            </div>
            <div className="rounded-xl bg-bg-base border border-border-subtle p-4">
              <Clock3 size={16} className="text-accent-amber mb-3" />
              <p className="text-xs text-[#8b949e]">Learning streak</p>
              <p className="text-sm font-medium text-white mt-1">{student.streak} days</p>
            </div>
            <div className="rounded-xl bg-bg-base border border-border-subtle p-4">
              <BookOpen size={16} className="text-accent-violet mb-3" />
              <p className="text-xs text-[#8b949e]">Workspace</p>
              <p className="text-sm font-medium text-white mt-1">LearnOS</p>
            </div>
          </div>
        </BentoCard>

        <aside className="space-y-4">
          {student.error && (
            <BentoCard custom={1}>
              <p className="text-sm font-medium text-red-300">Profile warning</p>
              <p className="text-sm text-[#8b949e] mt-1">{student.error}</p>
            </BentoCard>
          )}
          <BentoCard custom={student.error ? 2 : 1}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <Bell size={18} className="text-accent-amber mb-3" />
                <p className="text-sm font-medium text-white">Smart reminders</p>
                <p className="text-sm text-[#8b949e] mt-1">Course deadline nudges are on.</p>
              </div>
              <span className="rounded-full bg-accent-amber/10 px-2.5 py-1 text-[11px] font-medium text-accent-amber">
                On
              </span>
            </div>
          </BentoCard>
          <BentoCard custom={student.error ? 3 : 2}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <Mail size={18} className="text-accent-violet mb-3" />
                <p className="text-sm font-medium text-white">Weekly summary</p>
                <p className="text-sm text-[#8b949e] mt-1">Progress recap every Monday.</p>
              </div>
              <span className="rounded-full bg-accent-violet/10 px-2.5 py-1 text-[11px] font-medium text-accent-violet">
                On
              </span>
            </div>
          </BentoCard>
          <BentoCard custom={student.error ? 4 : 3}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <Shield size={18} className="text-accent-emerald mb-3" />
                <p className="text-sm font-medium text-white">Data access</p>
                <p className="text-sm text-[#8b949e] mt-1">Profile loaded on the server.</p>
              </div>
              <span className="rounded-full bg-accent-emerald/10 px-2.5 py-1 text-[11px] font-medium text-accent-emerald">
                Secure
              </span>
            </div>
          </BentoCard>
        </aside>
      </div>
    </section>
  )
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

async function loadStudent(slug: string) {
  try {
    const student = await getStudentBySlug(slug)
    if (student) {
      return {
        name: student.name,
        streak: student.streak,
        error: null,
      }
    }
  } catch (error) {
    return {
      name: formatStudentName(slug) || 'Student',
      streak: 0,
      error: getErrorMessage(error, 'Could not load student profile.'),
    }
  }

  return {
    name: formatStudentName(slug) || 'Student',
    streak: 0,
    error: null,
  }
}
