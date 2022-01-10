import * as React from 'react'
import Konva from 'konva'

const ShapeConfigContext = React.createContext<Konva.ShapeConfig | null>(null)
const SetShapeConfigContext = React.createContext<React.Dispatch<
  React.SetStateAction<Konva.ShapeConfig>
> | null>(null)

export const ShapeConfigProvider: React.FC = ({ children }) => {
  const [config, setConfig] = React.useState<Konva.ShapeConfig>({})

  return (
    <ShapeConfigContext.Provider value={config}>
      <SetShapeConfigContext.Provider value={setConfig}>
        {children}
      </SetShapeConfigContext.Provider>
    </ShapeConfigContext.Provider>
  )
}

export const useShapeConfig = () => {
  const config = React.useContext(ShapeConfigContext)
  const setConfig = React.useContext(SetShapeConfigContext)

  if (config === null || setConfig === null) {
    throw new Error('ShapeConfigProvider is not wrapped')
  }

  return [config, setConfig] as const
}
