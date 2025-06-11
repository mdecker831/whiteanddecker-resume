'use client'

import React from 'react'
import { clsx } from 'clsx'

interface ProgressProps {
  value: number
  max?: number
  className?: string
}

export function Progress({ value, max = 100, className }: ProgressProps) {
  const percentage = Math.min(100, (value / max) * 100)

  return (
    <div
      className={clsx(
        'relative w-full h-2 bg-gray-200 rounded-full overflow-hidden',
        className
      )}
    >
      <div
        className="h-full bg-blue-600 transition-all duration-200"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
