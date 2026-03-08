import { getDiagramList, getDiagramData, slugToName } from '@/lib/diagrams'
import ExcalidrawViewer from '@/components/ExcalidrawViewer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const diagrams = getDiagramList()
  return diagrams.map(({ slug }) => ({ slug }))
}

export default async function DiagramPage({ params }: PageProps) {
  const { slug } = await params
  const data = getDiagramData(slug)
  const name = slugToName(slug)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '12px 20px', borderBottom: '1px solid #e0e0e0', background: '#fff' }}>
        <h1 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a2e' }}>{name}</h1>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <ExcalidrawViewer data={data} />
      </div>
    </div>
  )
}
