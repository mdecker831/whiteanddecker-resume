'use client'
export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [message, setMessage] = useState('Waiting...')

  useEffect(() => {
    const id = searchParams.get('order_id')
    if (id) setMessage(`Order ${id} is processing`)
  }, [searchParams])

  return <div>{message}</div>
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
