export interface Course {
  id: string
  student_slug: string
  title: string
  progress: number
  icon_name: string
  created_at: string
}

export interface Student {
  id: string
  name: string
  slug: string
  streak: number
  avatar_url?: string | null
  created_at: string
}
