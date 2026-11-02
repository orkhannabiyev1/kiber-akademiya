/**
 * Curriculum as content-as-code. Normalized (ids, not nesting) so it maps to database tables later.
 * Hierarchy: LearningPath → Module → Lesson → Page. Lessons arrive in a later phase (lessonIds stays empty).
 * Slugs are used in URLs and must stay stable.
 */
import type { LearningPath, Module } from '@/types'

const PATH_ID = 'path-cybersecurity'

export const learningPaths: LearningPath[] = [
  {
    id: PATH_ID,
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Kibertəhlükəsizliyin əsaslarını sistemli şəkildə öyrən.',
    status: 'available',
    moduleIds: ['mod-network', 'mod-linux', 'mod-windows', 'mod-web-security', 'mod-cryptography', 'mod-security-fundamentals'],
  },
]

const planned = (id: string, slug: string, order: number, title: string, description: string): Module => ({
  id, pathId: PATH_ID, slug, title, description, order, status: 'coming_soon', lessonIds: [],
})

export const modules: Module[] = [
  {
    id: 'mod-network', pathId: PATH_ID, slug: 'network', order: 1, title: 'Network',
    description: 'Şəbəkələrin necə işlədiyi, protokollar və şəbəkə təhlükəsizliyinin əsasları.',
    status: 'available', lessonIds: ['lesson-network-a-giris'],
  },
  planned('mod-linux', 'linux', 2, 'Linux', 'Linux mühitində işləmək, əmr sətri və sistemlərin təhlükəsizliyi.'),
  planned('mod-windows', 'windows', 3, 'Windows', 'Windows sistemlərinin arxitekturası və təhlükəsizlik əsasları.'),
  planned('mod-web-security', 'web-security', 4, 'Web Security', 'Veb tətbiqlərin necə işlədiyi və tipik zəifliklərin anlaşılması.'),
  planned('mod-cryptography', 'cryptography', 5, 'Cryptography', 'Şifrələmə, hash və açıq açar kriptoqrafiyasının əsasları.'),
  planned('mod-security-fundamentals', 'security-fundamentals', 6, 'Security Fundamentals', 'Risk, təhdid, zəiflik və müdafiə prinsipləri kimi əsas anlayışlar.'),
]
