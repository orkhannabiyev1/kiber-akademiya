/** Lesson registry. Add one import per lesson file; modules reference lessons by id (see learning-path.ts). */
import type { Lesson } from '@/types'
import { networkAGiris } from './network/network-a-giris'

export const lessons: Lesson[] = [networkAGiris]
