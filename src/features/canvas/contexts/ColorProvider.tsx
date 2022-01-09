import * as React from 'react'

type ColorContextType = {
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
}
export const ColorContext = React.createContext<ColorContextType>({
  color: '',
  setColor: () => {
    // no run
  },
})
export const ColorProvider: React.FC = ({ children }) => {
  const [color, setColor] = React.useState('')

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  )
}
