'use client'
import dynamic from 'next/dynamic'
import { useCallback, useMemo } from 'react'
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
      // Only keep theme from saved state; discard scroll/zoom so we auto-fit
      theme: (data.appState as Record<string, unknown>)?.theme ?? 'light',
      viewModeEnabled: true,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    files: (data.files || null) as any,
    scrollToContent: true,
  }), [data])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAPI = useCallback((api: any) => {
    if (!api) return
    // Ensure elements are visible after the canvas has rendered
    const fit = () => {
      const elements = api.getSceneElements()
      if (elements.length > 0) {
        api.scrollToContent(elements, { fitToContent: true, animate: false })
      }
    }
    setTimeout(fit, 150)
  }, [])

  return (
    <div className="excalidraw-wrapper" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Excalidraw
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        initialData={initialData as any}
        viewModeEnabled={true}
        zenModeEnabled={false}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        excalidrawAPI={handleAPI as any}
      />
    </div>
  )
}
