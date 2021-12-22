import Konva from 'konva'
import * as React from 'react'

type StageRefProps = React.RefObject<Konva.Stage> | undefined
export const StageRef = React.createContext<StageRefProps>(undefined)

export const StageRefProvider: React.FC = ({ children }) => {
  const stageRef = React.useRef<Konva.Stage>(null)

  return <StageRef.Provider value={stageRef}>{children}</StageRef.Provider>
}
