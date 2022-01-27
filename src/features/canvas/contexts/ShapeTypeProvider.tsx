import * as React from 'react'

export const Shapes = ['Rect', 'Circle', 'Line', 'Free'] as const
export type Shape = typeof Shapes[number]
export type Text = 'Text'
export type Select = 'Select'
export type Mode = Shape | Text | Select

export const isShape = (str: string): str is Shape => {
  return Shapes.some((e) => e === str)
}

type ShapeTypeProps = {
  shapeType: Mode
  setShapeType: React.Dispatch<React.SetStateAction<Mode>>
}
export const ShapeTypeContext = React.createContext<ShapeTypeProps>({
  shapeType: 'Select',
  setShapeType: () => {
    throw new Error('setShapeType is not implemented by no wrapping')
  },
})
export const ShapeTypeProvider: React.FC = ({ children }) => {
  const [shapeType, setShapeType] = React.useState<Mode>('Select')

  return (
    <ShapeTypeContext.Provider value={{ shapeType, setShapeType }}>
      {children}
    </ShapeTypeContext.Provider>
  )
}
