/** Content model. Independent from UI; shaped to map onto Supabase tables later. */
export type Id = string

/** `available`: has content users can open. `coming_soon`: planned, no content yet. */
export type ContentStatus = 'available' | 'coming_soon'

export interface Course { id: Id; slug: string; title: string; description: string; pathIds: Id[] }
export interface LearningPath { id: Id; slug: string; title: string; description: string; status: ContentStatus; moduleIds: Id[] }
export interface Module { id: Id; pathId: Id; slug: string; title: string; description: string; order: number; status: ContentStatus; lessonIds: Id[] }
export interface Lesson {
  id: Id; moduleId: Id; slug: string; title: string; description: string; order: number
  pages: LessonPage[]
}

/**
 * Structured, HTML-free text. Content is data; the renderer decides how it looks.
 * Inline content is a list of plain strings and marked spans.
 */
export type InlineNode =
  | string
  | { type: 'code' | 'em' | 'strong'; text: string }
  | { type: 'link'; text: string; href: string }
export type Inline = InlineNode[]

export type TextBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; content: Inline }
  | { type: 'list'; ordered?: boolean; items: Inline[] }
  | { type: 'note'; title?: string; content: Inline }

export type CodeLanguage = 'bash' | 'shell' | 'text' | 'python' | 'javascript' | 'typescript' | 'html'

interface LessonPageBase { id: Id; title?: string }

export interface TextPage extends LessonPageBase { type: 'text'; blocks: TextBlock[] }
export interface ImagePage extends LessonPageBase { type: 'image'; src: string; alt: string; caption?: string }
/** Like an image, but the text description is mandatory: diagrams must be understandable without seeing them. */
export interface DiagramPage extends LessonPageBase { type: 'diagram'; src: string; alt: string; description: string; caption?: string }
export interface CodePage extends LessonPageBase { type: 'code'; language: CodeLanguage; code: string; description?: string }
export interface QuizOption { id: Id; text: string }
export interface QuizPage extends LessonPageBase {
  type: 'quiz'; question: string; options: QuizOption[]; correctOptionId: Id; explanation: string
}
export interface LabPage extends LessonPageBase { type: 'lab'; description: string; status: ContentStatus; instructions?: TextBlock[] }

export type LessonPage = TextPage | ImagePage | DiagramPage | CodePage | QuizPage | LabPage
export type LessonPageType = LessonPage['type']

