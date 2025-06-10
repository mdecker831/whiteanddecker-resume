export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_FILE_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
export const ALLOWED_EXTENSIONS = ['.pdf', '.docx']

export function validateFile(file: File): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'File size must be less than 10MB'
    }
  }

  // Check file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Only PDF and DOCX files are allowed'
    }
  }

  // Check file extension
  const extension = file.name.toLowerCase().split('.').pop()
  if (!extension || !ALLOWED_EXTENSIONS.includes(`.${extension}`)) {
    return {
      valid: false,
      error: 'Only PDF and DOCX files are allowed'
    }
  }

  return { valid: true }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export async function extractTextFromFile(file: File): Promise<string> {
  // In a real implementation, you would use a library like pdf-parse or mammoth
  // For now, we'll return a placeholder
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      // This is a simplified version - in production you'd need proper PDF/DOCX parsing
      resolve(`Extracted text content from ${file.name}`)
    }
    reader.readAsText(file)
  })
}