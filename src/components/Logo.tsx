import { useState } from 'react'

type LogoSize = 'sm' | 'md' | 'lg' | 'xl'

type LogoProps = {
  size?: LogoSize
  className?: string
}

const Logo = ({ size = 'md', className = '' }: LogoProps) => {
  const base = import.meta.env.BASE_URL
  const logoCandidates = [
    `${base}GMX-logo.jpg`,
    `${base}favicon.svg`,
  ]
  const [logoIndex, setLogoIndex] = useState(0)

  const sizeMap: Record<LogoSize, number> = {
    sm: 40,
    md: 52,
    lg: 76,
    xl: 108,
  }

  const pixelSize = sizeMap[size]

  return (
    <img
      src={logoCandidates[logoIndex]}
      alt="GMX Labs logo"
      width={pixelSize}
      height={pixelSize}
      className={className}
      onError={() => setLogoIndex((prev) => Math.min(prev + 1, logoCandidates.length - 1))}
      style={{ borderRadius: '10px', objectFit: 'cover' }}
    />
  )
}

export default Logo