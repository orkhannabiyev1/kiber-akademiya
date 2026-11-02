import type { TextPage } from '@/types'
import { TextBlocks } from './TextBlocks'

export const TextPageRenderer = ({ page }: { page: TextPage }) => <TextBlocks blocks={page.blocks} />
