import { isSafeAssetSrc } from '@/lib/safe-url'

interface MediaFigureProps { src: string; alt: string; caption?: string; description?: string; kind?: 'image' | 'diagram' }

/** Shared by image and diagram pages. Sources must be same-origin assets or safe data URIs. Diagrams get the technical grid frame. */
export function MediaFigure({ src, alt, caption, description, kind = 'image' }: MediaFigureProps) {
  if (!isSafeAssetSrc(src)) {
    return <p role="alert" className="text-sm text-danger">Şəkil yüklənə bilmədi.</p>
  }
  const diagram = kind === 'diagram'
  return (
    <figure className="max-w-3xl">
      <div className={`panel overflow-hidden ${diagram ? 'hud' : ''}`}>
        {diagram && <div aria-hidden="true" className="panel-bar"><span className="label">DİAQRAM</span><span className="label">NETWORK</span></div>}
        <div className="relative overflow-x-auto p-3 sm:p-6">
          {diagram && <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0 opacity-60" />}
          <img src={src} alt={alt} loading="lazy" className="relative mx-auto h-auto max-w-full" />
        </div>
      </div>
      {caption && <figcaption className="mt-2 text-sm text-fg-muted">{caption}</figcaption>}
      {description && (
        <p className="mt-4 max-w-[68ch] leading-7">
          <span className="font-medium">Təsvir: </span>{description}
        </p>
      )}
    </figure>
  )
}
