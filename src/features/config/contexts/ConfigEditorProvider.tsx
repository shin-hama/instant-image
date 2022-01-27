import * as React from 'react'

import ConfigEditor from 'features/config/components/ConfigEditor'

const ConfigEditorContext = React.createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null)

export const ConfigEditorProvider: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <ConfigEditorContext.Provider value={setOpen}>
        {children}
      </ConfigEditorContext.Provider>
      <ConfigEditor open={open} onClose={handleClose} />
    </>
  )
}

export const useConfigEditor = () => {
  const setConfigEditor = React.useContext(ConfigEditorContext)
  if (setConfigEditor === null) {
    throw new Error('ConfigEditorProvider is not wrapped')
  }

  return setConfigEditor
}
