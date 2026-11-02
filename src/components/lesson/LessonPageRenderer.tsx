import type { LessonPage } from '@/types'
import { CodePageRenderer } from './CodePageRenderer'
import { DiagramPageRenderer } from './DiagramPageRenderer'
import { ImagePageRenderer } from './ImagePageRenderer'
import { LabPageRenderer } from './LabPageRenderer'
import { QuizPageRenderer } from './QuizPageRenderer'
import { TextPageRenderer } from './TextPageRenderer'

/** The single dispatch point from page data to UI. Only known page types are ever rendered. */
export function LessonPageRenderer({ page }: { page: LessonPage }) {
  switch (page.type) {
    case 'text': return <TextPageRenderer page={page} />
    case 'image': return <ImagePageRenderer page={page} />
    case 'diagram': return <DiagramPageRenderer page={page} />
    case 'code': return <CodePageRenderer page={page} />
    case 'quiz': return <QuizPageRenderer page={page} />
    case 'lab': return <LabPageRenderer page={page} />
    default: {
      // Compile-time exhaustiveness; at runtime unknown types get a safe fallback.
      const unknownPage: never = page
      void unknownPage
      return <p className="text-sm text-fg-muted">Bu səhifə tipi dəstəklənmir.</p>
    }
  }
}
