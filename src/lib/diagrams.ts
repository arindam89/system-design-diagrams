import fs from 'fs'
import path from 'path'

const DIAGRAMS_DIR = path.join(process.cwd(), 'diagrams')

export interface DiagramInfo {
  slug: string
  name: string
}

export interface ExcalidrawDiagramData {
  elements?: unknown[]
  appState?: Record<string, unknown>
  files?: Record<string, unknown> | null
}

export function slugToName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function getDiagramList(): DiagramInfo[] {
  const files = fs.readdirSync(DIAGRAMS_DIR)
  return files
    .filter(f => f.endsWith('.excalidraw'))
    .map(f => {
      const slug = f.replace('.excalidraw', '')
      return { slug, name: slugToName(slug) }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getDiagramData(slug: string): ExcalidrawDiagramData {
  const filePath = path.join(DIAGRAMS_DIR, `${slug}.excalidraw`)
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content) as ExcalidrawDiagramData
}
