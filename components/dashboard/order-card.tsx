'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Eye, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Order {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  created_at: string
  completed_at?: string
  amount: number
  optimized_resume_url?: string
  cover_letter_url?: string
}

interface OrderCardProps {
  order: Order
}

const statusConfig = {
  pending: {
    label: 'Pending Payment',
    icon: Clock,
    variant: 'secondary' as const,
    color: 'text-yellow-600'
  },
  processing: {
    label: 'Processing',
    icon: AlertCircle,
    variant: 'default' as const,
    color: 'text-blue-600'
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle,
    variant: 'default' as const,
    color: 'text-green-600'
  },
  failed: {
    label: 'Failed',
    icon: XCircle,
    variant: 'destructive' as const,
    color: 'text-red-600'
  }
}

export function OrderCard({ order }: OrderCardProps) {
  const config = statusConfig[order.status]
  const StatusIcon = config.icon

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Order #{order.id.slice(-8)}</CardTitle>
          <Badge variant={config.variant} className="flex items-center gap-1">
            <StatusIcon className="h-3 w-3" />
            {config.label}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            Created {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
          </span>
          <span className="font-semibold">
            ${(order.amount / 100).toFixed(2)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {order.status === 'completed' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Your optimized resume and cover letter are ready for download:
            </p>
            
            <div className="grid gap-2">
              {order.optimized_resume_url && (
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => handleDownload(order.optimized_resume_url!, 'optimized-resume.pdf')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Optimized Resume
                </Button>
              )}
              
              {order.cover_letter_url && (
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => handleDownload(order.cover_letter_url!, 'cover-letter.pdf')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Cover Letter
                </Button>
              )}
            </div>

            {order.completed_at && (
              <p className="text-xs text-gray-500">
                Completed {formatDistanceToNow(new Date(order.completed_at), { addSuffix: true })}
              </p>
            )}
          </div>
        )}

        {order.status === 'processing' && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Our AI is currently optimizing your resume. This usually takes 2-5 minutes.
            </p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        )}

        {order.status === 'pending' && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Payment is pending. Please complete your payment to start processing.
            </p>
            <Button size="sm" className="w-full">
              Complete Payment
            </Button>
          </div>
        )}

        {order.status === 'failed' && (
          <div className="space-y-2">
            <p className="text-sm text-red-600">
              There was an error processing your order. Please contact support.
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Contact Support
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}