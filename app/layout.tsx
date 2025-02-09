import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'exp-tracker',
  description: 'created by Prashant',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
