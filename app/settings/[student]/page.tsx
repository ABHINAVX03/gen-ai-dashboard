import { redirect } from 'next/navigation'

export default function SettingsStudentPage({
  params,
}: {
  params: { student: string }
}) {
  redirect(`/setting/${params.student}`)
}
