// shared/ui-kits/Icon/index.tsx
import React from 'react'
import { IconName } from './src/type'
import { getIcon } from './src/list-icons-functions'


export interface IconProps extends React.SVGAttributes<HTMLOrSVGElement> {
  name: IconName,
  width?: number,
  height?: number,
  color?: string,
  className?: string,
}

const Icon: React.FC<IconProps> = ({
  name,
  width = 24,
  height = 24,
  color = 'currentColor',
  className = '',
  ...rest
}) => {
  const icon = getIcon(name, width, height, color)

  if (!icon) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return (
    <span
      className={`icon-wrapper ${className}`}
      {...rest}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 0 }}
    >
      {icon}
    </span>
  )
}

export default Icon