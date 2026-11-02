import type { ImagePage } from '@/types'
import { MediaFigure } from './MediaFigure'

export const ImagePageRenderer = ({ page }: { page: ImagePage }) => (
  <MediaFigure src={page.src} alt={page.alt} caption={page.caption} />
)
