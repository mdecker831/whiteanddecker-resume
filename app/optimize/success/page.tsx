'use client'
export const dynamic = 'force-dynamic'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [message, setMessage] = useState('Waiting...')

  useEffect(() => {
    const id = searchParams.get('order_id')
    if (id) setMessage(`Order ${id} is processing`)
  }, [searchParams])

  return <div>{message}</div>
}
