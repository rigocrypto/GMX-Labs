type LogoSize = 'sm' | 'md' | 'lg' | 'xl'

type LogoProps = {
  size?: LogoSize
  className?: string
}

const Logo = ({ size = 'md', className = '' }: LogoProps) => {
  const sizeMap: Record<LogoSize, number> = {
    sm: 36,
    md: 52,
    lg: 76,
    xl: 108,
  }

  const pixelSize = sizeMap[size]

  return (
    <img
      src="/LuxChain Logo.jpg"
      alt="GMX Labs logo"
      width={pixelSize}
      height={pixelSize}
      className={className}
      style={{ borderRadius: '999px', objectFit: 'cover' }}
    />
  )
}

export default Logo