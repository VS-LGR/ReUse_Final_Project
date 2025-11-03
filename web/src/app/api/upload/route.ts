import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

/**
 * Upload de imagens para o servidor
 * Em produção, considere usar Supabase Storage, AWS S3, ou Vercel Blob Storage
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo fornecido' },
        { status: 400 }
      )
    }

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Apenas imagens são permitidas' },
        { status: 400 }
      )
    }

    // Validar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo: 5MB' },
        { status: 400 }
      )
    }

    // Converter para buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Gerar nome único para o arquivo
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split('.').pop() || 'jpg'
    const filename = `${timestamp}-${randomString}.${extension}`

    // Criar diretório se não existir
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Salvar arquivo
    const filepath = join(uploadDir, filename)
    await writeFile(filepath, buffer)

    // Retornar URL pública
    const url = `/uploads/${filename}`

    return NextResponse.json({
      success: true,
      url,
      filename,
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Erro ao fazer upload do arquivo' },
      { status: 500 }
    )
  }
}
