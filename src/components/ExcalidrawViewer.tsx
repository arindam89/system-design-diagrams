'use client'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import type { ExcalidrawDiagramData } from '@/lib/diagrams'

const Excalidraw = dynamic(
  async () => {
    const { Excalidraw } = await import('@excalidraw/excalidraw')
    return Excalidraw
  },
  {
    ssr: false,
    loading: () => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
        Loading diagram...
      </div>
    )
  }
)

interface ExcalidrawViewerProps {
  data: ExcalidrawDiagramData
}

export default function ExcalidrawViewer({ data }: ExcalidrawViewerProps) {
  const initialData = useMemo(() => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elements: (data.elements || []) as any[],
    appState: {
      ...(data.appState || {}),
      viewModeEnabled: true,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    files: (data.files || null) as any,
  }), [data])

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Excalidraw
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        initialData={initialData as any}
        viewModeEnabled={true}
        zenModeEnabled={false}
      />
    </div>
  )
}
