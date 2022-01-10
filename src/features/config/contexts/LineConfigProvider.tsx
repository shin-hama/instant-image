import * as React from 'react'
import Konva from 'konva'

export const LineConfigContext = React.createContext<Konva.LineConfig | null>(
  null
)
export const SetLineConfigContext = React.createContext<React.Dispatch<
  React.SetStateAction<Konva.LineConfig>
> | null>(null)

export const LineConfigProvider: React.FC = ({ children }) => {
  const [config, setConfig] = React.useState<Konva.LineConfig>({
    stroke: 'black',
    strokeWidth: 1,
  })

  return (
    <LineConfigContext.Provider value={config}>
      <SetLineConfigContext.Provider value={setConfig}>
        {children}
      </SetLineConfigContext.Provider>
    </LineConfigContext.Provider>
  )
}
