import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quetta Arsalan Cafe - POS System',
  description: 'Point of Sale system for Quetta Arsalan Cafe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ur" dir="rtl">
      <body>{children}</body>
    </html>
  )
}


