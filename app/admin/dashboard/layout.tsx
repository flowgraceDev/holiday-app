// app/admin/dashboard/layout.tsx
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <section className="min-h-screen flex bg-gray-50">
      <main className="flex-1 p-6">{children}</main>
    </section>
  )
}