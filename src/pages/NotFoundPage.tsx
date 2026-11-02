import { Link } from 'react-router-dom'
import { Container, EmptyState, buttonClasses } from '@/components/ui'

export function NotFoundPage() {
  return (
    <Container className="py-16">
      <EmptyState
        title="Səhifə tapılmadı"
        description="Bu ünvanda səhifə yoxdur. Ünvanı yoxlayın və ya ana səhifəyə qayıdın."
        action={<Link to="/" className={buttonClasses('secondary')}>Ana səhifə</Link>}
      />
    </Container>
  )
}
