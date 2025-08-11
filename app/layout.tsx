import './globals.css'

export const metadata = {
  title: 'Recreation Finder',
  description: 'Find recreational activities near you',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}