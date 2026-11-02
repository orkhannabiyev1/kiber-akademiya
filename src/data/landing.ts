/** Landing-page copy and structure. Layout components must not hold this text. */
import type { BadgeTone } from '@/components/ui'
import { defaultPath, getModulesForPath, statusDisplay } from '@/lib/curriculum'

export interface AnchorLink { label: string; href: string }

export const landingNav: AnchorLink[] = [
  { label: 'Öyrənmə', href: '#path' },
  { label: 'Haqqında', href: '#method' },
]

export const hero = {
  tag: '> AZƏRBAYCAN DİLİNDƏ KİBERTƏHLÜKƏSİZLİK',
  title: 'Kibertəhlükəsizliyin əsaslarını sistemli şəkildə öyrən.',
  text: 'Şəbəkə, Windows, Linux və veb təhlükəsizliyi kimi mövzular bir öyrənmə yolunda toplanır: Azərbaycan dilində, ardıcıl proqramla və praktik istiqamətlə.',
  primaryCta: 'Öyrənməyə başla',
  secondaryCta: 'Kursu nəzərdən keçir',
} as const

export interface TopicPreview { id: string; name: string; description: string; status: string; tone: BadgeTone }

/** Preview only; the real module system comes from the content architecture later. */
export const pathPreview = {
  id: 'path',
  title: 'Bir öyrənmə yolu, ardıcıl mövzular',
  text: 'Məqalələr ayrı-ayrı qalmır. Kibertəhlükəsizlik bir yol kimi qurulur: hər mövzu modullara, modullar dərslərə, dərslər isə səhifələrə bölünür.',
  hierarchy: ['yol', 'modul', 'dərs', 'səhifə'],
  hierarchyLabel: 'Məzmunun strukturu',
  rootName: defaultPath.title,
  topics: getModulesForPath(defaultPath).map(
    (m): TopicPreview => ({ id: m.id, name: m.title, description: m.description, status: statusDisplay[m.status].label, tone: statusDisplay[m.status].tone }),
  ),
} as const

export const method = {
  id: 'method',
  title: 'Platforma necə işləyir',
  steps: [
    { title: 'Öyrən', text: 'Anlayışlar Azərbaycan dilində, addım-addım izah olunur.' },
    { title: 'Tətbiq et', text: 'Praktiki tapşırıqlar və laboratoriyalar mərhələli şəkildə əlavə olunacaq.' },
    { title: 'İrəlilə', text: 'Tamamladığın dərslər qeyd olunacaq və irəliləyişini görə biləcəksən.' },
  ],
} as const

export const finalCta = {
  title: 'Kibertəhlükəsizliyi öyrənməyə başla.',
  text: 'Hesab yarat və öyrənmə yoluna daxil ol.',
  cta: 'Başla',
} as const

export const footer = {
  description: 'Kibertəhlükəsizliyi Azərbaycan dilində sistemli öyrənmək üçün platforma.',
  links: [
    { label: 'Öyrənmə', href: '#path' },
    { label: 'Haqqında', href: '#method' },
  ] satisfies AnchorLink[],
} as const
