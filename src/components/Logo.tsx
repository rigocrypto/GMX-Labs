import { useState } from 'react'

type LogoSize = 'sm' | 'md' | 'lg' | 'xl'

type LogoProps = {
  size?: LogoSize
  className?: string
}

const Logo = ({ size = 'md', className = '' }: LogoProps) => {
  const [src, setSrc] = useState('/gmx-labs-logo.jpg')

  const sizeMap: Record<LogoSize, number> = {
    sm: 40,
    md: 52,
    lg: 76,
    xl: 108,
  }

  const pixelSize = sizeMap[size]

  return (
    <img
      src={src}
      alt="GMX Labs logo"
      width={pixelSize}
      height={pixelSize}
      className={className}
      onError={() => setSrc('/LuxChain Logo.jpg')}
      style={{ borderRadius: '10px', objectFit: 'cover' }}
    />
  )
}

export default Logo