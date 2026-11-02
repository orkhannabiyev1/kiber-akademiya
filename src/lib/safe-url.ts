/** External links: https only (blocks javascript:, data:, http:). */
export const isSafeExternalUrl = (value: string): boolean => {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

/** Images: same-origin asset paths or small inline raster/SVG data URIs (SVG in <img> cannot run scripts). */
export const isSafeAssetSrc = (value: string): boolean =>
  (value.startsWith('/') && !value.startsWith('//')) || /^data:image\/(png|jpeg|webp|svg\+xml)[;,]/.test(value)
