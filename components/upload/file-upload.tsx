'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { validateFile, formatFileSize } from '@/lib/file-utils'
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: string[]
  maxSize?: number
  className?: string
}

export function FileUpload({ 
  onFileSelect, 
  accept = ['.pdf', '.docx'],
  maxSize = 10 * 1024 * 1024,
  className 
}: FileUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setError(null)
    
    // Validate file
    const validation = validateFile(file)
    if (!validation.valid) {
      setError(validation.error!)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsUploading(false)
          setUploadedFile(file)
          onFileSelect(file)
          return 100
        }
        return prev + 10
      })
    }, 200)

  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize,
    multiple: false
  })

  const removeFile = () => {
    setUploadedFile(null)
    setUploadProgress(0)
    setError(null)
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        {!uploadedFile ? (
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive && !isDragReject && "border-blue-500 bg-blue-50",
              isDragReject && "border-red-500 bg-red-50",
              !isDragActive && "border-gray-300 hover:border-gray-400"
            )}
          >
            <input {...getInputProps()} />
            
            {isUploading ? (
              <div className="space-y-4">
                <Upload className="mx-auto h-12 w-12 text-blue-500 animate-pulse" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Uploading...</p>
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-xs text-gray-500">{uploadProgress}% complete</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-900">
                    {isDragActive 
                      ? "Drop your resume here" 
                      : "Upload your resume"
                    }
                  </p>
                  <p className="text-sm text-gray-500">
                    Drag and drop your resume, or click to browse
                  </p>
                  <p className="text-xs text-gray-400">
                    Supports PDF and DOCX files up to {formatFileSize(maxSize)}
                  </p>
                </div>
                <Button variant="outline" type="button">
                  Choose File
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-900 truncate">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-green-700">
                  {formatFileSize(uploadedFile.size)} • Uploaded successfully
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="text-green-600 hover:text-green-800 hover:bg-green-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center space-x-2 p-3 bg-red-50 rounded-lg border border-red-200">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}