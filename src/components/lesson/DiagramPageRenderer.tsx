import type { DiagramPage } from '@/types'
import { MediaFigure } from './MediaFigure'

export const DiagramPageRenderer = ({ page }: { page: DiagramPage }) => (
  <MediaFigure kind="diagram" src={page.src} alt={page.alt} caption={page.caption} description={page.description} />
)
