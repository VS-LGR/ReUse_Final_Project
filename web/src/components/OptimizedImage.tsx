'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
}

/**
 * Componente de imagem otimizada que lida com imagens externas
 * Desabilita otimização para URLs externas para evitar erros 400 no Vercel
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  priority,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  // Atualizar src quando a prop mudar
  useEffect(() => {
    setImageSrc(src)
    setImageError(false)
  }, [src])

  // Verificar se é URL externa
  const isExternalUrl =
    imageSrc.startsWith('http://') ||
    imageSrc.startsWith('https://') ||
    imageSrc.startsWith('//')

  // Para URLs externas (especialmente Unsplash), usar img tag normal
  // Isso evita o erro 400 do Next.js Image Optimization
  if (isExternalUrl || imageError) {
    if (fill) {
      return (
        <img
          src={imageSrc}
          alt={alt}
          className={className}
          onError={() => {
            setImageError(true)
            setImageSrc('/logo-placeholder.svg')
          }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )
    }

    return (
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={() => {
          setImageError(true)
          setImageSrc('/logo-placeholder.svg')
        }}
      />
    )
  }

  // Para imagens locais, usar Next.js Image com otimização
  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={className}
        priority={priority}
        onError={() => {
          setImageError(true)
          setImageSrc('/logo-placeholder.svg')
        }}
      />
    )
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={className}
      priority={priority}
      onError={() => {
        setImageError(true)
        setImageSrc('/logo-placeholder.svg')
      }}
    />
  )
}
