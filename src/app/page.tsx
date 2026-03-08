import Link from 'next/link'
import { getDiagramList } from '@/lib/diagrams'

export default function HomePage() {
  const diagrams = getDiagramList()
  return (
    <div style={{ padding: '32px', maxWidth: '900px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#1a1a2e' }}>
        System Design Diagrams
      </h1>
      <p style={{ color: '#666', marginBottom: '32px', fontSize: '15px' }}>
        Select a diagram from the sidebar or click a card below to view it rendered in Excalidraw.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
        {diagrams.map(({ slug, name }) => (
          <Link
            key={slug}
            href={`/diagram/${slug}`}
            style={{
              display: 'block',
              padding: '16px',
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#1a1a2e',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  )
}
