import { NextRequest, NextResponse } from 'next/server'

/**
 * Upload de imagens para Supabase Storage usando API REST
 * Requer variáveis de ambiente:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY (recomendado) ou NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar variáveis de ambiente
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase não configurado. Variáveis necessárias: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY')
      return NextResponse.json(
        { error: 'Storage não configurado' },
        { status: 500 }
      )
    }

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
    const arrayBuffer = await file.arrayBuffer()

    // Gerar nome único para o arquivo
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split('.').pop() || 'jpg'
    const filename = `offers/${timestamp}-${randomString}.${extension}`

    // Upload para Supabase Storage usando API REST
    const uploadUrl = `${supabaseUrl}/storage/v1/object/reuse-images/${filename}`
    
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': file.type,
        'x-upsert': 'false',
      },
      body: arrayBuffer,
    })

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text()
      console.error('Erro ao fazer upload no Supabase:', errorText)
      return NextResponse.json(
        { error: 'Erro ao fazer upload no Supabase' },
        { status: 500 }
      )
    }

    // URL pública da imagem
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/reuse-images/${filename}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: filename,
    })
  } catch (error: any) {
    console.error('Error uploading file to Supabase:', error)
    return NextResponse.json(
      { error: 'Erro ao fazer upload do arquivo: ' + (error.message || 'Erro desconhecido') },
      { status: 500 }
    )
  }
}
