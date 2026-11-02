import { Link } from 'react-router-dom'
import { EmptyState, buttonClasses } from '@/components/ui'
import { routes } from '@/lib/routes'

export function CurriculumNotFound() {
  return (
    <EmptyState
      label="404"
      title="Səhifə tapılmadı"
      description="Belə bir tədris yolu, modul və ya dərs yoxdur. Ünvanı yoxlayın və ya dashboard-a qayıdın."
      action={<Link to={routes.dashboard} className={buttonClasses('secondary')}>Dashboard-a qayıt</Link>}
    />
  )
}
