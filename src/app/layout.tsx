import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import { getDiagramList } from '@/lib/diagrams'

export const metadata: Metadata = {
  title: 'System Design Diagrams',
  description: 'System design diagrams rendered with Excalidraw',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const diagrams = getDiagramList()
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <Sidebar diagrams={diagrams} />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
