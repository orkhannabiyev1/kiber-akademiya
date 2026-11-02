import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { cx } from '@/lib/cx'

type ContainerProps<T extends ElementType> = { as?: T } & ComponentPropsWithoutRef<T>

export function Container<T extends ElementType = 'div'>({ as, className, ...props }: ContainerProps<T>) {
  const Tag: ElementType = as ?? 'div'
  return <Tag className={cx('mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8', className)} {...props} />
}
