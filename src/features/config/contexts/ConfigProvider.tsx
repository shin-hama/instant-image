import * as React from 'react'

import { ConfigEditorProvider } from './ConfigEditorProvider'
import { LineConfigProvider } from './LineConfigProvider'
import { ShapeConfigProvider } from './ShapeConfigProvider'

export const ConfigProvider: React.FC = ({ children }) => {
  return (
    <LineConfigProvider>
      <ShapeConfigProvider>
        {/* Config Editor Provider must be wrapped other config provider to use each ConfigProvider's Context in ConfigEditor  */}
        <ConfigEditorProvider>{children}</ConfigEditorProvider>
      </ShapeConfigProvider>
    </LineConfigProvider>
  )
}
