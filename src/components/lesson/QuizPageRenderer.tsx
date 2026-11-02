import { useId, useState } from 'react'
import { Button } from '@/components/ui'
import type { QuizPage } from '@/types'

/** Local-only quiz: nothing is stored or sent anywhere. Remounting (page change) resets it. */
export function QuizPageRenderer({ page }: { page: QuizPage }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)
  const name = useId()
  const isCorrect = checked && selected === page.correctOptionId

  const reset = () => { setSelected(null); setChecked(false) }

  return (
    <div className="max-w-[68ch]">
      <fieldset disabled={checked} className="min-w-0">
        <legend className="text-lg font-medium">{page.question}</legend>
        <div className="mt-4 flex flex-col gap-2">
          {page.options.map((option) => {
            const marker =
              checked && option.id === page.correctOptionId ? 'Düzgün cavab'
              : checked && option.id === selected ? 'Seçdiyiniz cavab'
              : null
            return (
              <label
                key={option.id}
                className="flex cursor-pointer items-start gap-3 rounded-md border border-line-strong bg-surface px-3 py-3 transition-colors hover:border-line-strong has-[:checked]:border-accent has-[:disabled]:cursor-default"
              >
                <input
                  type="radio"
                  name={name}
                  value={option.id}
                  checked={selected === option.id}
                  onChange={() => setSelected(option.id)}
                  className="mt-1 size-4 shrink-0 accent-accent"
                />
                <span className="flex-1">
                  {option.text}
                  {marker && <span className="ml-2 text-sm font-medium text-fg-muted">({marker})</span>}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!checked ? (
          <Button onClick={() => setChecked(true)} disabled={selected === null}>Yoxla</Button>
        ) : (
          <Button variant="secondary" onClick={reset}>Yenidən cəhd et</Button>
        )}
      </div>

      {/* Always in the DOM so screen readers announce the result. */}
      <div role="status" className="mt-4">
        {checked && (
          <div className={`border-l-2 py-1 pl-3 ${isCorrect ? 'border-success' : 'border-danger'}`}>
            <p className={`font-medium ${isCorrect ? 'text-success' : 'text-danger'}`}>{isCorrect ? 'Düzgündür.' : 'Səhvdir.'}</p>
            <p className="mt-1 leading-7">{page.explanation}</p>
          </div>
        )}
      </div>
    </div>
  )
}
