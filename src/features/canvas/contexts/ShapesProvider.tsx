import * as React from 'react'
import { useList } from 'react-use'
import { ListActions } from 'react-use/lib/useList'

const ShapesContext = React.createContext<React.ReactNodeArray>([])
const ShapesActionsContext =
  React.createContext<ListActions<React.ReactNode> | null>(null)

export const ShapesProvider: React.FC = ({ children }) => {
  const [shapes, actions] = useList<React.ReactNode>([])

  return (
    <ShapesContext.Provider value={shapes}>
      <ShapesActionsContext.Provider value={actions}>
        {children}
      </ShapesActionsContext.Provider>
    </ShapesContext.Provider>
  )
}

export const useShapes = () => {
  const shapes = React.useContext(ShapesContext)
  const actions = React.useContext(ShapesActionsContext)

  if (actions === null) {
    throw new Error('ShapesContextProvider is not wrapped')
  }

  return [shapes, actions] as const
}
